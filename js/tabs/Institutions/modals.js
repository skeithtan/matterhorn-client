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
            this.state.form.contact_person_number = props.institution.contactPersonNumber;
            this.state.form.contact_person_email = props.institution.contactPersonEmail;
            this.state.form.contact_person_name = props.institution.contactPersonName;
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
                            <Input placeholder="Institution Name" className="text-input"
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
                                   className="text-input" onChange={this.getChangeHandler("address")}
                                   valid={fieldErrors["Address"].length === 0}
                                   defaultValue={this.state.form.address}/>
                            <FormFeedback>{fieldErrors["Address"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Website</Label>
                            <InputGroup>
                                <InputGroupAddon>http://</InputGroupAddon>
                                <Input placeholder="Website" className="text-input"
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
                            <Input placeholder="Name" className="text-input"
                                   onChange={this.getChangeHandler("contact_person_name")}
                                   valid={fieldErrors["Contact person name"].length === 0}
                                   defaultValue={this.state.form.contact_person_name}/>
                            <FormFeedback>{fieldErrors["Contact person name"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Email</Label>
                            <Input type="email" placeholder="Email" className="text-input"
                                   onChange={this.getChangeHandler("contact_person_email")}
                                   valid={fieldErrors["Contact person email"].length === 0}
                                   defaultValue={this.state.form.contact_person_email}/>
                            <FormFeedback>{fieldErrors["Contact person email"][0]}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input placeholder="Number" className="text-input"
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
                    title : "Success",
                    message : "Institution deleted",
                    progressBar : false,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to delete institution",
                    progressBar : false,
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

        this.state = {
            memorandumType : "Agreement",
        };
    }

    static addValidation() {
        //TODO
    }

    submitForm() {
        //TODO
    }

    setMemorandumType(type) {
        this.setState({
            memorandumType : type,
        });
    }

    render() {
        return (
            <Modal id="add-memorandum-modal" isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}
                   onOpened={AddMemorandumModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Add a Memorandum</ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Label for="add-institution-name">Type of Memorandum</Label>
                            <ButtonGroup>
                                <Button outline
                                        color="success"
                                        active={this.state.memorandumType === "Agreement"}
                                        onClick={() => this.setMemorandumType("Agreement")}>
                                    Agreement
                                </Button>

                                <Button outline
                                        color="success"
                                        active={this.state.memorandumType === "Understanding"}
                                        onClick={() => this.setMemorandumType("Understanding")}>
                                    Understanding
                                </Button>
                            </ButtonGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-name">Name</Label>
                            <Input id="add-institution-name" placeholder="Institution Name" className="text-input"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        );
    }
}

export {
    InstitutionFormModal,
    DeleteInstitutionModal,
};