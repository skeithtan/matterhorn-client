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
} from "reactstrap";


class InstitutionFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                name : "",
                country : "Afghanistan",
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
                optional : true,
            },
            {
                name : "Contact person number",
                characterLimit : 64,
                value : this.state.form.contact_person_number,
                optional : true,
            },
            {
                name : "Contact person email",
                characterLimit : 256,
                value : this.state.form.contact_person_email,
                optional : true,
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
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Successfully added institution",
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
        const { formHasErrors, fieldErrors } = this.getFormErrors();

        const countries = settings.countries.map((name, index) =>
            <option key={index}>{name}</option>,
        );

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.edit ? `Edit ${this.state.form.name}` : "Add an Institution"}
                </ModalHeader>
                <ModalBody className="form">
                    <Form>

                        <h5 className="mb-3">Institution Details</h5>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input placeholder="Institution Name"
                                   onChange={this.getChangeHandler("name")}
                                   valid={isValid("Name")}
                                   defaultValue={this.state.form.name}/>
                            <FormFeedback>{fieldError("Name")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Country</Label>
                            <Input type="select"
                                   onChange={this.getChangeHandler("country")}
                                   defaultValue={this.state.form.country}>
                                {countries}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="textarea" placeholder="Address"
                                   onChange={this.getChangeHandler("address")}
                                   valid={isValid("Address")}
                                   defaultValue={this.state.form.address}/>
                            <FormFeedback>{fieldError("Address")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Website</Label>
                            <InputGroup>
                                <InputGroupAddon>http://</InputGroupAddon>
                                <Input placeholder="Website"
                                       onChange={this.getChangeHandler("website")}
                                       valid={isValid("Website")}
                                       defaultValue={this.state.form.website}/>
                            </InputGroup>
                            <Input type="hidden" value={this.state.form.website}
                                   valid={isValid("Website")}/>
                            <FormFeedback><p>{fieldError("Website")}</p></FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Agreement Type</Label>
                            <Input type="select" onChange={this.getChangeHandler("agreement")}
                                   defaultValue={this.state.form.agreement}>
                                <option value="B">Bilateral</option>
                                <option value="M">Multilateral</option>
                            </Input>
                        </FormGroup>

                        <br/>

                        <h5 className="mb-3">Contact</h5>

                        <FormGroup>
                            <Label>Contact Person</Label>
                            <Input placeholder="Name"
                                   onChange={this.getChangeHandler("contact_person_name")}
                                   valid={isValid("Contact person name")}
                                   defaultValue={this.state.form.contact_person_name}/>
                            <FormFeedback>{fieldError("Contact person name")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Email</Label>
                            <Input type="email" placeholder="Email"
                                   onChange={this.getChangeHandler("contact_person_email")}
                                   valid={isValid("Contact person email")}
                                   defaultValue={this.state.form.contact_person_email}/>
                            <FormFeedback>{fieldError("Contact person email")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input placeholder="Number"
                                   onChange={this.getChangeHandler("contact_person_number")}
                                   valid={isValid("Contact person number")}
                                   defaultValue={this.state.form.contact_person_number}/>
                            <FormFeedback>{fieldError("Contact person number")}</FormFeedback>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success"
                            onClick={this.props.edit ? this.submitEditInstitutionForm : this.submitAddInstitutionForm}
                            disabled={formHasErrors}>
                        {this.props.edit ? "Save changes" : "Add"}
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
                    icon: '',
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
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="archive-institution-modal">
                <ModalHeader>Are you sure you want to
                    archive {this.props.institution.name}?</ModalHeader>
                <ModalFooter>
                    <Button outline color="warning" onClick={this.confirmArchive}>Confirm Archive</Button>
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

            console.log(this.state.form);
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
        const { formHasErrors, fieldErrors } = this.getFormErrors();

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


            return <ListGroupItem key={linkageCode} onClick={onClick}
                                  className={className}>
                <span className="mr-auto">{linkageString}</span>
                {isSelected && <h5 className="mb-0">✓</h5>}
            </ListGroupItem>;
        });

        let collegeInitiators = Object.entries(settings.colleges).map(college => {
            return <option key={college[0]} value={college[0]}>{college[1]}</option>;
        });

        collegeInitiators.unshift(
            <option key="null" value={""}>No college initiator</option>,
        );

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}
                   onOpened={this.setupUploadCare}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.edit ? "Edit memorandum" : `Add a memorandum to ${this.props.institution.name}`}
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <h5>Memorandum details</h5>
                        <FormGroup>
                            <Label>Category</Label>
                            <Input type="select" defaultValue={this.state.form.category}
                                   onChange={this.getChangeHandler("category")}>
                                <option value="MOA">Memorandum of Agreement</option>
                                <option value="MOU">Memorandum of Understanding</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>File Link</Label>
                            <Input type="hidden" role="uploadcare-uploader" name="content"
                                   data-public-key={settings.uploadcarePublicKey}
                                   valid={isValid("File")}/>
                            <FormFeedback>{fieldError("File")}</FormFeedback>
                            {this.props.edit &&
                            <small className="text-secondary">To change memorandum file, upload a new file. Otherwise,
                                leave this blank.</small>
                            }
                        </FormGroup>
                        <FormGroup>
                            <Label>Date Effective</Label>
                            <Input type="date" defaultValue={this.state.form.date_effective}
                                   onChange={this.getChangeHandler("date_effective")}
                                   valid={isValid("Date effective")}/>
                            <FormFeedback>{fieldError("Date effective")}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Expiration Date</Label>
                            <Input type="date" defaultValue={this.state.form.date_expiration}
                                   onChange={this.getChangeHandler("date_expiration")}/>
                            <small className="text-secondary">If the memorandum has no expiration date, leave this
                                blank.
                            </small>
                        </FormGroup>
                        <FormGroup>
                            <Label>College Initiator</Label>
                            <Input type="select" defaultValue={this.state.form.college_initiator}
                                   onChange={this.getChangeHandler("college_initiator")}>
                                {collegeInitiators}
                            </Input>
                        </FormGroup>
                        <br/>
                        <h5>Linkages</h5>
                        <small className="text-secondary mb-3 d-block">Select all linkages that apply to this
                            memorandum.
                        </small>
                        <ListGroup>
                            {linkages}
                        </ListGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success"
                            disabled={formHasErrors}
                            onClick={this.props.edit ? this.submitEditMemorandumForm : this.submitAddMemorandumForm}>
                        {this.props.edit ? "Save changes" : "Add"}
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
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="archive-memorandum-modal">
                <ModalHeader toggle={this.props.toggle}>Archive Memorandum</ModalHeader>
                <ModalFooter>
                    <Button outline color="warning" id="archive-memorandum-modal-submit"
                            onClick={this.confirmArchive}>Archive</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    InstitutionFormModal,
    ArchiveInstitutionModal,
    MemorandumFormModal,
    ArchiveMemorandumModal,
};