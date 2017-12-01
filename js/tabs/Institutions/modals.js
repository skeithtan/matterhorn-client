import React, { Component } from "react";
import authorizeXHR from "../../authorization";
import makeInfoToast from "../../dismissable_toast_maker";
import validateForm from "../../form_validator";
import settings from "../../settings";
import iziToast from "izitoast";
import $ from "jquery";

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    FormFeedback,
    ListGroup,
    ListGroupItem,
    ButtonGroup,
} from "reactstrap";
import { fetchYears } from "../OutboundPrograms/outbound_programs";
import LoadingSpinner from "../../components/loading";


class InstitutionFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                name : "",
                country : "",
                address : "",
                website : "",
                contact_person_email : "",
                contact_person_name : "",
                contact_person_number : "",
                agreement : "B",
            },
        };

        this.getFormErrors = this.getFormErrors.bind(this);
        this.getChangeHandler = this.getChangeHandler.bind(this);

        this.submitAddInstitutionForm = this.submitAddInstitutionForm.bind(this);
        this.submitEditInstitutionForm = this.submitEditInstitutionForm.bind(this);

        if (this.props.edit) {
            // Copy the object, do not equate, otherwise the object changes along with the form.
            Object.assign(this.state.form, props.institution);
        }
    }

    getFormErrors() {
        return validateForm([
            {
                name : "Name",
                characterLimit : 64,
                value : this.state.form.name,
            },
            {
                name : "Country",
                value : this.state.form.country,
            },
            {
                name : "Address",
                characterLimit : 256,
                value : this.state.form.address,
            },
            {
                name : "Website",
                characterLimit : 256,
                value : this.state.form.website,
            },
            {
                name : "Contact person name",
                characterLimit : 256,
                value : this.state.form.contact_person_name,
            },
            {
                name : "Contact person number",
                characterLimit : 64,
                value : this.state.form.contact_person_number,
            },
            {
                name : "Contact person email",
                characterLimit : 256,
                value : this.state.form.contact_person_email,
                customValidators : [{
                    // isValid checks if the form value is a valid email through this messy regex.
                    // It also lets blank values pass because it's an optional field
                    isValid : fieldValue => fieldValue.length === 0 || /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(fieldValue),
                    errorMessage : fieldName => `${fieldName} must be a valid email.`,
                }],
            },
        ]);
    }

    submitAddInstitutionForm() {
        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new institution...",
        });
        $.post({
            url : `${settings.serverURL}/institutions/`,
            data : this.state.form,
            beforeSend : authorizeXHR,
            success : institution => {
                dismissToast();
                this.props.refresh();
                this.props.onAddInstitution(institution);
                iziToast.success({
                    title : "Success",
                    message : `Successfully added institution ${this.state.form.name}.`,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to add institution",
                });
            },
        });

        this.props.toggle();
    }

    submitEditInstitutionForm() {
        const dismissToast = makeInfoToast({
            title : "Editing",
            message : "Editing institution...",
        });

        $.ajax({
            method : "PUT",
            url : `${settings.serverURL}/institutions/${this.state.form.id}/`,
            data : this.state.form,
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Successfully modified institution",
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to edit institution",
                });
            },
        });

        this.props.toggle();
    }

    getChangeHandler(fieldName) {
        const form = this.state.form;

        return event => {
            const value = event.target.value;

            form[fieldName] = value;
            this.setState({
                form : form,
            });
        };
    }

    render() {
        const {formHasErrors, fieldErrors} = this.getFormErrors();

        const countries = settings.countries.map((name, index) =>
            <option key={ index }>{ name }</option>,
        );

        countries.unshift(<option key="X"
                                  value="">Select a country</option>);

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader toggle={ this.props.toggle }>
                    { this.props.edit ? `Edit ${this.state.form.name}` : "Add an Institution" }
                </ModalHeader>
                <ModalBody className="form">
                    <Form>

                        <h5 className="mb-3">Institution Details</h5>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input placeholder="Institution Name"
                                   onChange={ this.getChangeHandler("name") }
                                   valid={ isValid("Name") }
                                   defaultValue={ this.state.form.name }/>
                            <FormFeedback>{ fieldError("Name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Country</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("country") }
                                   valid={ isValid("Country") }
                                   defaultValue={ this.state.form.country }>
                                { countries }
                            </Input>
                            <FormFeedback>{ fieldError("Country") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="textarea"
                                   placeholder="Address"
                                   onChange={ this.getChangeHandler("address") }
                                   valid={ isValid("Address") }
                                   defaultValue={ this.state.form.address }/>
                            <FormFeedback>{ fieldError("Address") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Website</Label>
                            <InputGroup>
                                <InputGroupAddon>http://</InputGroupAddon>
                                <Input placeholder="Website"
                                       onChange={ this.getChangeHandler("website") }
                                       valid={ isValid("Website") }
                                       defaultValue={ this.state.form.website }/>
                            </InputGroup>
                            <Input type="hidden"
                                   value={ this.state.form.website }
                                   valid={ isValid("Website") }/>
                            <FormFeedback><p>{ fieldError("Website") }</p></FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Agreement Type</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("agreement") }
                                   defaultValue={ this.state.form.agreement }>
                                <option value="B">Bilateral</option>
                                <option value="M">Multilateral</option>
                            </Input>
                        </FormGroup>

                        <br/>

                        <h5 className="mb-3">Contact</h5>

                        <FormGroup>
                            <Label>Contact Person</Label>
                            <Input placeholder="Name"
                                   onChange={ this.getChangeHandler("contact_person_name") }
                                   valid={ isValid("Contact person name") }
                                   defaultValue={ this.state.form.contact_person_name }/>
                            <FormFeedback>{ fieldError("Contact person name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Email</Label>
                            <Input type="email"
                                   placeholder="Email"
                                   onChange={ this.getChangeHandler("contact_person_email") }
                                   valid={ isValid("Contact person email") }
                                   defaultValue={ this.state.form.contact_person_email }/>
                            <FormFeedback>{ fieldError("Contact person email") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input placeholder="Number"
                                   onChange={ this.getChangeHandler("contact_person_number") }
                                   valid={ isValid("Contact person number") }
                                   defaultValue={ this.state.form.contact_person_number }/>
                            <FormFeedback>{ fieldError("Contact person number") }</FormFeedback>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            onClick={ this.props.edit ? this.submitEditInstitutionForm : this.submitAddInstitutionForm }
                            disabled={ formHasErrors }>
                        { this.props.edit ? "Save changes" : "Add" }
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class ArchiveInstitutionModal extends Component {
    constructor(props) {
        super(props);
        this.confirmArchive = this.confirmArchive.bind(this);
    }

    confirmArchive() {
        const dismissToast = makeInfoToast({
            title : "Deleting",
            message : "Deleting institution...",
        });

        $.ajax({
            url : `${settings.serverURL}/institutions/${this.props.institution.id}/`,
            method : "DELETE",
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    icon : "",
                    title : "Success",
                    message : "Institution archived",
                    progressBar : false,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to archive institution",
                    progressBar : false,
                });
            },
        });
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }
                   id="archive-institution-modal">
                <ModalHeader className="text-yellow">
                    Are you sure you want to archive { this.props.institution.name }?
                </ModalHeader>
                <ModalFooter>
                    <Button outline
                            color="warning"
                            onClick={ this.confirmArchive }>Confirm Archive</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class MemorandumFormModal extends Component {
    constructor(props) {
        super(props);
        this.getFormErrors = this.getFormErrors.bind(this);
        this.setupUploadCare = this.setupUploadCare.bind(this);
        this.getChangeHandler = this.getChangeHandler.bind(this);
        this.submitAddMemorandumForm = this.submitAddMemorandumForm.bind(this);
        this.submitEditMemorandumForm = this.submitEditMemorandumForm.bind(this);

        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(newProps) {
        this.state = {
            form : {
                category : "MOA",
                memorandum_file : "",
                date_effective : "",
                date_expiration : "",
                college_initiator : "",
                linkages : [],
            },
        };

        if (newProps.memorandum !== undefined) {
            Object.assign(this.state.form, newProps.memorandum);
            this.state.form.category = newProps.memorandum.category === "Agreement" ? "MOA" : "MOU";
            this.state.form.linkages = []; //Do not use prop linkage = make a new one.

            Object.assign(this.state.form.linkages, newProps.memorandum.linkages);
        }
    }

    getFormErrors() {
        return validateForm([
            {
                name : "Date effective",
                characterLimit : null,
                value : this.state.form.date_effective,
            },
            {
                name : "File",
                characterLimit : null,
                value : this.state.form.memorandum_file,
            },
        ]);
    }

    getChangeHandler(fieldName) {
        const form = this.state.form;

        return event => {
            const value = event.target.value;

            form[fieldName] = value;
            this.setState({
                form : form,
            });

        };

    }

    setupUploadCare() {
        const widget = uploadcare.SingleWidget("[role=uploadcare-uploader]");
        const form = this.state.form;
        const setMemorandumFile = link => {
            form.memorandum_file = link;
            this.setState({
                form : form,
            });
        };

        widget.onChange(file => {
            if (file) {
                file.done(info => {
                    setMemorandumFile(info.cdnUrl);
                });
            }
        });
    }

    submitAddMemorandumForm() {
        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new memorandum...",
        });

        $.post({
            url : `${settings.serverURL}/institutions/${this.props.institution.id}/memorandums/`,
            data : this.state.form,
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Successfully added memorandum",
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to add memorandum",
                });
            },
        });

        this.props.toggle();
    }

    submitEditMemorandumForm() {
        const dismissToast = makeInfoToast({
            title : "Editing",
            message : "Editing memorandum...",
        });

        if (this.state.form.college_initiator === "") {
            this.state.form.college_initiator = null;
        }

        $.ajax({
            method : "PUT",
            url : `${settings.serverURL}/memorandums/${this.state.form.id}/`,
            // The array requires this to be JSON.
            data : JSON.stringify(this.state.form),
            contentType : "application/json",
            beforeSend : authorizeXHR,
            success : (response) => {
                dismissToast();
                const memorandum = response;
                this.props.onEditSuccess(memorandum);
                this.props.refresh();

                iziToast.success({
                    title : "Success",
                    message : "Successfully modified memorandum",
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to edit memorandum",
                });
            },
        });

        this.props.toggle();
    }

    render() {
        const {formHasErrors, fieldErrors} = this.getFormErrors();

        const linkages = Object.entries(settings.linkages).map(linkage => {
            const linkageCode = linkage[0];
            const linkageString = linkage[1];

            const isSelected = this.state.form.linkages.includes(linkageCode);
            const className = isSelected ? "bg-dlsu-lighter text-white d-flex" : "d-flex";

            const onClick = () => {
                const form = this.state.form;

                if (isSelected) {
                    const linkages = form.linkages;
                    // Remove from linkages the selected linkage
                    linkages.splice(linkages.indexOf(linkageCode), 1);
                } else {
                    form.linkages.push(linkageCode);
                }

                this.setState({
                    form : form,
                });
            };


            return <ListGroupItem key={ linkageCode }
                                  onClick={ onClick }
                                  className={ className }>
                <span className="mr-auto">{ linkageString }</span>
                { isSelected && <h5 className="mb-0">✓</h5> }
            </ListGroupItem>;
        });

        let collegeInitiators = Object.entries(settings.colleges).map(college => {
            return <option key={ college[0] }
                           value={ college[0] }>{ college[1] }</option>;
        });

        collegeInitiators.unshift(
            <option key="null"
                    value={ "" }>No college initiator</option>,
        );

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }
                   onOpened={ this.setupUploadCare }>
                <ModalHeader toggle={ this.props.toggle }>
                    { this.props.edit ? "Edit memorandum" : `Add a memorandum to ${this.props.institution.name}` }
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <h5>Memorandum details</h5>
                        <FormGroup>
                            <Label>Category</Label>
                            <Input type="select"
                                   defaultValue={ this.state.form.category }
                                   onChange={ this.getChangeHandler("category") }>
                                <option value="MOA">Memorandum of Agreement</option>
                                <option value="MOU">Memorandum of Understanding</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>File Link</Label>
                            <Input type="hidden"
                                   role="uploadcare-uploader"
                                   name="content"
                                   data-public-key={ settings.uploadcarePublicKey }
                                   valid={ isValid("File") }/>
                            <FormFeedback>{ fieldError("File") }</FormFeedback>
                            { this.props.edit &&
                            <small className="text-secondary">To change memorandum file, upload a new file. Otherwise,
                                leave this blank.</small>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Date Effective</Label>
                            <Input type="date"
                                   defaultValue={ this.state.form.date_effective }
                                   onChange={ this.getChangeHandler("date_effective") }
                                   valid={ isValid("Date effective") }/>
                            <FormFeedback>{ fieldError("Date effective") }</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Expiration Date</Label>
                            <Input type="date"
                                   defaultValue={ this.state.form.date_expiration }
                                   onChange={ this.getChangeHandler("date_expiration") }/>
                            <small className="text-secondary">If the memorandum has no expiration date, leave this
                                blank.
                            </small>
                        </FormGroup>
                        <FormGroup>
                            <Label>College Initiator</Label>
                            <Input type="select"
                                   defaultValue={ this.state.form.college_initiator }
                                   onChange={ this.getChangeHandler("college_initiator") }>
                                { collegeInitiators }
                            </Input>
                        </FormGroup>
                        <br/>
                        <h5>Linkages</h5>
                        <small className="text-secondary mb-3 d-block">Select all linkages that apply to this
                            memorandum.
                        </small>
                        <ListGroup>
                            { linkages }
                        </ListGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            disabled={ formHasErrors }
                            onClick={ this.props.edit ? this.submitEditMemorandumForm : this.submitAddMemorandumForm }>
                        { this.props.edit ? "Save changes" : "Add" }
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

}

class ArchiveMemorandumModal extends Component {
    constructor(props) {
        super(props);

        this.confirmArchive = this.confirmArchive.bind(this);
    }

    confirmArchive() {
        const dismissToast = makeInfoToast({
            title : "Archiving",
            message : "Archiving memorandum...",
        });

        $.ajax({
            url : `${settings.serverURL}/memorandums/${this.props.memorandum.id}`,
            method : "DELETE",
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.onDeleteSuccess();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Memorandum archived",
                    progressBar : false,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to archive memorandum",
                    progressBar : false,
                });
            },
        });
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }
                   id="archive-memorandum-modal">
                <ModalHeader toggle={ this.props.toggle }
                             className="text-yellow">Are you sure you want to archive this memorandum?</ModalHeader>
                <ModalFooter>
                    <Button outline
                            color="warning"
                            id="archive-memorandum-modal-submit"
                            onClick={ this.confirmArchive }>Archive</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class ProgramFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                name : "",
                linkage : "SE",
                academic_year : "",
                terms_available : [],
                is_graduate : false,
                requirement_deadline : "",
            },
            academic_years : null,
        };

        this.formBody = this.formBody.bind(this);
        this.onTermClick = this.onTermClick.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);
        this.submitAddProgramForm = this.submitAddProgramForm.bind(this);
        this.getChangeHandler = this.getChangeHandler.bind(this);

        fetchYears(result => {
            this.setState({
                academic_years : result.academic_years.map(academicYear => academicYear.academic_year_start),
            });
        });
    }

    getFormErrors() {

        return validateForm([
            {
                name : "Program name",
                characterLimit : 64,
                value : this.state.form.name,
            },
            {
                name : "Academic year",
                characterLimit : null,
                value : this.state.form.academic_year,
            },
            {
                name : "Terms available",
                characterLimit : null,
                value : this.state.form.terms_available.toString(),
                customValidators : [{
                    isValid : fieldValue => [1, 3].toString() !== fieldValue,
                    errorMessage : fieldName => `${fieldName} must be consecutive`,
                }],
            },
            {
                name : "Requirements deadline",
                characterLimit : null,
                value : this.state.form.requirement_deadline,
            },
        ]);
    }

    submitAddProgramForm() {
        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding program...",
        });

        $.post({
            url : `${settings.serverURL}/programs/outbound/`,
            data : JSON.stringify(this.state.form),
            contentType : "application/json",
            beforeSend : authorizeXHR,
        }).done(() => {
            dismissToast();
            this.props.refresh();
            iziToast.success({
                title : "Success",
                message : "Successfully added memorandum",
            });
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to add memorandum",
            });
        });

        this.props.toggle();
    }

    getChangeHandler(fieldName) {
        const form = this.state.form;

        return event => {
            const value = event.target.value;

            form[fieldName] = value;
            this.setState({
                form : form,
            });
        };
    }

    onTermClick(term) {
        const index = this.state.form.terms_available.indexOf(term);
        if (index < 0) {
            this.state.form.terms_available.push(term);
        } else {
            this.state.form.terms_available.splice(index, 1);
        }

        this.setState({
            form : this.state.form,
        });
    }


    setIsGraduate(isGraduate) {
        this.state.form.is_graduate = isGraduate;
        this.setState({
            form : this.state.form,
        });
    }

    static noAcademicYearsState() {
        return (
            <div className="loading-container p-5">
                <h4>There are no academic years yet.</h4>
                <p>Define the academic years in the outbound programs tab.</p>
            </div>
        );
    }

    formBody(fieldErrors) {

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        const termButtons = [1, 2, 3].map(term =>
            <Button outline
                    color="success"
                    key={ term }
                    onClick={ () => this.onTermClick(term) }
                    active={ this.state.form.terms_available.includes(term) }>
                { term }
            </Button>,
        );

        const academicYears = this.state.academic_years.map(academicYear =>
            <option key={ academicYear }
                    onClick={ this.getChangeHandler("academic_year") }
                    value={ academicYear }>{ `${academicYear} - ${academicYear + 1}` }</option>,
        );

        academicYears.unshift(
            <option key={ 0 }
                    onClick={ this.getChangeHandler("academic_year") }
                    value={ "" }>Select an academic year</option>,
        );

        return (
            <ModalBody className="form">
                <Form>
                    <FormGroup>
                        <Label>Program Name</Label>
                        <Input placeholder="Program Name"
                               onChange={ this.getChangeHandler("name") }
                               valid={ isValid("Program name") }
                               defaultValue={ this.state.form.name }/>
                        <FormFeedback>{ fieldError("Program name") }</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <div className="d-block w-100">
                            <ButtonGroup>
                                <Button outline
                                        color="success"
                                        onClick={ () => this.setIsGraduate(false) }
                                        active={ !this.state.form.is_graduate }>
                                    Undergraduate program
                                </Button>
                                <Button outline
                                        color="success"
                                        onClick={ () => this.setIsGraduate(true) }
                                        active={ this.state.form.is_graduate }>
                                    Graduate program
                                </Button>
                            </ButtonGroup>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Academic Years</Label>
                        <Input type="select"
                               onChange={ this.getChangeHandler("academic_year") }
                               valid={ isValid("Academic year") }
                               defaultValue={ this.state.form.academic_year }>
                            { academicYears }
                        </Input>
                        <FormFeedback>{ fieldError("Academic year") }</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label>Terms Available</Label>
                        <div className="d-block w-100">
                            <ButtonGroup>
                                { termButtons }
                            </ButtonGroup>
                        </div>
                        <div className="invalid-feedback d-block">{ fieldError("Terms available") }</div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Requirements Deadline</Label>
                        <Input type="date"
                               defaultValue={ this.state.form.requirement_deadline }
                               onChange={ this.getChangeHandler("requirement_deadline") }
                               valid={ isValid("Requirements deadline") }/>
                        <FormFeedback>{ fieldError("Requirements deadline") }</FormFeedback>
                    </FormGroup>


                </Form>
            </ModalBody>
        );
    }

    render() {
        const {formHasErrors, fieldErrors} = this.getFormErrors();

        let formBody;
        let shouldShowFormFooter = false;

        if (this.state.academic_years === null) {
            formBody = <LoadingSpinner/>;
        } else if (this.state.academic_years.length === 0) {
            formBody = ProgramFormModal.noAcademicYearsState();
        } else {
            formBody = this.formBody(fieldErrors);
            shouldShowFormFooter = true;
        }

        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader toggle={ this.props.toggle }>
                    Add a program
                </ModalHeader>
                { formBody }

                { shouldShowFormFooter &&
                <ModalFooter>
                    <Button outline
                            color="success"
                            onClick={ this.props.edit ? this.submitEditInstitutionForm : this.submitAddProgramForm }
                            disabled={ formHasErrors }>
                        { this.props.edit ? "Save changes" : "Add" }
                    </Button>
                </ModalFooter>
                }
            </Modal>

        );
    }
}

export {
    InstitutionFormModal,
    ArchiveInstitutionModal,
    MemorandumFormModal,
    ArchiveMemorandumModal,
    ProgramFormModal,
};