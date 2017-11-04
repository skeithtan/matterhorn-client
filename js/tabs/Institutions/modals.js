import React, { Component } from "react";
import authorizeXHR from "../../authorization";
import makeInfoToast from "../../dismissable_toast_maker";
import validateForm from "../../form_validator";
import settings from "../../settings";
import iziToast from "izitoast";
import moment from "moment";
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
    ButtonGroup,
    FormFeedback,
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
            this.state.form = props.institution;
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
                    isValid : fieldValue => /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(fieldValue),
                    errorMessage : fieldName => `${fieldName} must be a valid email.`,
                }],
            },
        ]);
    }

    submitAddInstitutionForm() {
        const dismissToast = makeInfoToast({
            title: "Adding",
            message: "Adding new institution...",
        });
        $.post({
            url : `${settings.serverURL}/institutions/`,
            data : this.state.form,
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title: "Success",
                    message: "Successfully added institution",
                });
            },
            error: response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to add institution",
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
        const formErrors = this.getFormErrors();
        const formHasErrors = formErrors.formHasErrors;
        const fieldErrors = formErrors.fieldErrors;

        const countries = settings.countries.map((name, index) =>
            <option key={index}>{name}</option>,
        );

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}
                   onOpened={InstitutionFormModal.addValidation}>
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
                                   valid={fieldErrors["Name"].length === 0}
                                   defaultValue={this.state.form.name}/>
                            <FormFeedback>{fieldErrors["Name"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Country</Label>
                            <Input type="select" onChange={this.getChangeHandler("country")}
                                   defaultValue={this.state.form.country}>
                                {countries}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="textarea" placeholder="Address"
                                   onChange={this.getChangeHandler("address")}
                                   valid={fieldErrors["Address"].length === 0}
                                   defaultValue={this.state.form.address}/>
                            <FormFeedback>{fieldErrors["Address"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Website</Label>
                            <InputGroup>
                                <InputGroupAddon>http://</InputGroupAddon>
                                <Input placeholder="Website"
                                       onChange={this.getChangeHandler("website")}
                                       valid={fieldErrors["Website"].length === 0}
                                       defaultValue={this.state.form.website}/>
                            </InputGroup>
                            <Input type="hidden" value={this.state.form.website}
                                   valid={fieldErrors["Website"].length === 0}/>
                            <FormFeedback><p>{fieldErrors["Website"][0]}</p></FormFeedback>
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
                                   valid={fieldErrors["Contact person name"].length === 0}
                                   defaultValue={this.state.form.contact_person_name}/>
                            <FormFeedback>{fieldErrors["Contact person name"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Email</Label>
                            <Input type="email" placeholder="Email"
                                   onChange={this.getChangeHandler("contact_person_email")}
                                   valid={fieldErrors["Contact person email"].length === 0}
                                   defaultValue={this.state.form.contact_person_email}/>
                            <FormFeedback>{fieldErrors["Contact person email"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input placeholder="Number"
                                   onChange={this.getChangeHandler("contact_person_number")}
                                   valid={fieldErrors["Contact person number"].length === 0}
                                   defaultValue={this.state.form.contact_person_number}/>
                            <FormFeedback>{fieldErrors["Contact person number"][0]}</FormFeedback>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success"
                            onClick={this.props.edit ? this.submitEditInstitutionForm : this.submitAddInstitutionForm}
                            disabled={formHasErrors}>
                        {this.props.edit ? "Edit" : "Add"}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class DeleteInstitutionModal extends Component {
    constructor(props) {
        super(props);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    confirmDelete() {
        const dismissToast = makeInfoToast({
            title: "Deleting",
            message: "Deleting institution...",
        });

        $.ajax({
            url: `${settings.serverURL}/institutions/${this.props.institution.id}/`,
            method: "DELETE",
            beforeSend: authorizeXHR,
            success: () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title: "Success",
                    message: "Institution deleted",
                    progressBar: false,
                });
            },
            error: response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to delete institution",
                    progressBar: false,
                });
            },
        });
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="delete-institution-modal">
                <ModalHeader className="text-danger">Are you sure you want to
                    delete {this.props.institution.name}?</ModalHeader>
                <ModalBody>This cannot be undone.</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.confirmDelete}>Confirm Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class AddMemorandumModal extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        const dismissToast = makeInfoToast({
            title: "Adding",
            message: "Adding new memorandum...",
        });

        console.log(this.props.institution.id);

        $.post({
            url: `${settings.serverURL}/institutions/${this.props.institution.id}/memorandums/`,
            data: {
                institution: this.props.institution.id,
                category: $("#add-memorandum-category").val(),
                memorandum_file: $("#add-memorandum-file").val(),
                date_effective: $("#add-memorandum-date-effective").val(),
                date_expiration: $("#add-memorandum-expiration-date").val(),
                college_initiator: $("#add-memorandum-college-initiator").val(),
            },
            beforeSend: authorizeXHR,
            success: () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title: "Success",
                    message: "Successfully added memorandum",
                });
            },
            error: response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to add memorandum",
                });
            },
        });

        this.props.toggle();
    }

    static addValidation() {
        addValidation({
            inputs: $("#add-memorandum-modal").find(".text-input"),
            button: $("#add-memorandum-modal-submit"),
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="add-memorandum-modal"
                   onOpened={AddMemorandumModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Add a Memorandum to {this.props.institution.name}</ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Label for="add-memorandum-category">Category</Label>
                            <Input id="add-memorandum-category" type="select">
                                <option value="MOA">Memorandum of Agreement</option>
                                <option value="MOU">Memorandum of Understanding</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-memorandum-file">File Link</Label>
                            <Input id="add-memorandum-file" placeholder="File Link" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-memorandum-date-effective">Date Effective</Label>
                            <Input type="date" id="add-memorandum-date-effective" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-memorandum-expiration-date">Expiration Date</Label>
                            <Input type="date" id="add-memorandum-expiration-date" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-memorandum-college-initiator">College Initiator</Label>
                            <Input type="select" id="add-memorandum-college-initiator">
                                <option value="CCS">College of Computer Studies</option>
                                <option value="RVRCOB">Ramon V. del Rosario College of Business</option>
                                <option value="CLA">College of Liberal Arts</option>
                                <option value="SOE">School of Economics</option>
                                <option value="GCOE">Gokongwei College of Engineering</option>
                                <option value="COL">College of Law</option>
                                <option value="BAGCED">Brother Andrew Gonzales College of Education</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success" id="add-memorandum-modal-submit"
                            onClick={this.submitForm}>Add Memorandum</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class DeleteMemorandumModal extends Component {
    constructor(props) {
        super(props);

        this.confirmDelete = this.confirmDelete.bind(this);
    }

    confirmDelete() {
        const dismissToast = makeInfoToast({
            title: "Deleting",
            message: "Deleting memorandum...",
        });

        $.ajax({
            url: `${settings.serverURL}/institutions/${this.props.institution.id}/memorandums/${this.props.memorandum.id}`,
            method: "DELETE",
            beforeSend: authorizeXHR,
            success: () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title: "Success",
                    message: "Memorandum deleted",
                    progressBar: false,
                });
            },
            error: response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to delete memorandum",
                    progressBar: false,
                });
            },
        });
        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="delete-memorandum-modal">
                <ModalHeader toggle={this.props.toggle}>Delete Memorandum</ModalHeader>
                <ModalBody>This cannot be undone.</ModalBody>
                <ModalFooter>
                    <Button color="danger" id="delete-memorandum-modal-submit"
                            onClick={this.confirmDelete}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class EditMemorandumModal extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        const dismissToast = makeInfoToast({
            title: "Editing",
            message: "Editing memorandum...",
        });

        $.ajax({
            method: "PUT",
            url: `${settings.serverURL}/institutions/${this.props.institution.id}/memorandums/${this.props.memorandum.id}/`,
            data: {
                institution: this.props.institution.id,
                category: $("#edit-memorandum-category").val(),
                memorandum_file: $("#edit-memorandum-file").val(),
                date_effective: $("#edit-memorandum-date-effective").val(),
                date_expiration: $("#edit-memorandum-expiration-date").val(),
                college_initiator: $("#edit-memorandum-college-initiator").val(),
            },
            beforeSend: authorizeXHR,
            success: () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title: "Success",
                    message: "Successfully modified memorandum",
                });
            },
            error: response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to edit memorandum",
                });
            },
        });

        this.props.toggle();
    }

    static addValidation() {
        addValidation({
            inputs: $("#edit-memorandum-modal").find(".text-input"),
            button: $("#edit-memorandum-modal-submit"),
        });
    }

    render() {
        const memorandum = this.props.memorandum;
        const dateEffective = moment(memorandum.dateEffective).format("YYYY-MM-DD");
        const dateExpiration = moment(memorandum.dateExpiration).format("YYYY-MM-DD");

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="edit-memorandum-modal"
                   onOpened={EditMemorandumModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Edit Memorandum</ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Label for="edit-memorandum-category">Category</Label>
                            <Input id="edit-memorandum-category" type="select" defaultValue={memorandum.category}>
                                <option value="MOA">Memorandum of Agreement</option>
                                <option value="MOU">Memorandum of Understanding</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-memorandum-file">File Link</Label>
                            <Input id="edit-memorandum-file" placeholder="File Link" className="text-input"
                                   defaultValue={memorandum.memorandumFile}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-memorandum-date-effective">Date Effective</Label>
                            <Input type="date" id="edit-memorandum-date-effective" className="text-input"
                                   defaultValue={dateEffective}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-memorandum-expiration-date">Expiration Date</Label>
                            <Input type="date" id="edit-memorandum-expiration-date" className="text-input"
                                   defaultValue={dateExpiration}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-memorandum-college-initiator">College Initiator</Label>
                            <Input type="select" id="edit-memorandum-college-initiator"
                                   defaultValue={memorandum.collegeInitiator}>
                                <option value="CCS">College of Computer Studies</option>
                                <option value="RVRCOB">Ramon V. del Rosario College of Business</option>
                                <option value="CLA">College of Liberal Arts</option>
                                <option value="SOE">School of Economics</option>
                                <option value="GCOE">Gokongwei College of Engineering</option>
                                <option value="COL">College of Law</option>
                                <option value="BAGCED">Brother Andrew Gonzales College of Education</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success" id="edit-memorandum-modal-submit"
                            onClick={this.submitForm}>Edit</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    InstitutionFormModal,
    DeleteInstitutionModal,
    AddMemorandumModal,
    DeleteMemorandumModal,
    EditMemorandumModal,
};