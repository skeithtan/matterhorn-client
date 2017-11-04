import React, { Component } from "react";
import addValidation from "../../form_validation";
import authorizeXHR from "../../authorization";
import makeInfoToast from "../../dismissable_toast_maker";
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
} from "reactstrap";


class AddInstitutionModal extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    static addValidation() {
        addValidation({
            inputs : $("#add-institution-modal").find(".text-input"),
            button : $("#add-institution-modal-submit"),
            customValidations : [
                {
                    input : $("#add-institution-email"),
                    validator : email => {
                        //This regex mess checks if email is a real email
                        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                    },
                },
            ],
        });
    }

    submitForm() {
        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new institution...",
        });

        $.post({
            url : `${settings.serverURL}/institutions/`,
            data : {
                name : $("#add-institution-name").val(),
                country : $("#add-institution-country-list").val(),
                email : $("#add-institution-email").val(),
                address : $("#add-institution-address").val(),
                website : $("#add-institution-website").val(),
                contact_person_name : $("#add-institution-contact-person").val(),
                contact_person_number : $("#add-institution-contact-number").val(),
                agreement : $("#add-institution-agreement-type").val(),
            },
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

    render() {
        const countries = settings.countries.map((name, index) =>
            <option key={index}>{name}</option>,
        );

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="add-institution-modal"
                   onOpened={AddInstitutionModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Add an Institution</ModalHeader>
                <ModalBody className="form">
                    <Form>

                        <h5 className="mb-3">Institution Details</h5>
                        <FormGroup>
                            <Label for="add-institution-name">Name</Label>
                            <Input id="add-institution-name" placeholder="Institution Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-country">Country</Label>
                            <Input type="select" id="add-institution-country-list">
                                {countries}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-address">Address</Label>
                            <Input type="textarea" id="add-institution-address" placeholder="Address"
                                   className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-website">Website</Label>
                            <InputGroup>
                                <InputGroupAddon>http://</InputGroupAddon>
                                <Input id="add-institution-website" placeholder="Website" className="text-input"/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-agreement-type">Agreement Type</Label>
                            <Input type="select" id="add-institution-agreement-type">
                                <option value="B">Bilateral</option>
                                <option value="M">Multilateral</option>
                            </Input>
                        </FormGroup>

                        <br/>

                        <h5 className="mb-3">Contact</h5>
                        <FormGroup>
                            <Label for="add-institution-contact-person">Contact Person</Label>
                            <Input id="add-institution-contact-person" placeholder="Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-email">Contact Email</Label>
                            <Input type="email" id="add-institution-email" placeholder="Email"
                                   className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-contact-number">Contact Number</Label>
                            <Input id="add-institution-contact-number" placeholder="Number" className="text-input"/>
                        </FormGroup>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success" id="add-institution-modal-submit"
                            onClick={this.submitForm}>Add</Button>
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

class EditInstitutionModal extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        const dismissToast = makeInfoToast({
            title : "Editing",
            message : "Editing institution...",
        });

        $.ajax({
            method : "PUT",
            url : `${settings.serverURL}/institutions/${this.props.institution.id}/`,
            data : {
                name : $("#edit-institution-name").val(),
                country : $("#edit-institution-country-list").val(),
                email : $("#edit-institution-email").val(),
                address : $("#edit-institution-address").val(),
                website : $("#edit-institution-website").val(),
                contact_person_name : $("#edit-institution-contact-person").val(),
                contact_person_number : $("#edit-institution-contact-number").val(),
                agreement : $("#edit-institution-agreement-type").val(),
            },
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

    static addValidation() {
        addValidation({
            inputs : $("#edit-institution-modal").find(".text-input"),
            button : $("#edit-institution-modal-submit"),
            customValidations : [
                {
                    input : $("#edit-institution-email"),
                    validator : email => {
                        //This regex mess checks if email is a real email
                        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                    },
                },
            ],
        });
    }

    render() {
        const countries = settings.countries.map((name, index) =>
            <option key={index}>{name}</option>,
        );

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="edit-institution-modal"
                   onOpened={EditInstitutionModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Edit {this.props.institution.name}</ModalHeader>
                <ModalBody className="form">
                    <Form>

                        <h5 className="mb-3">Institution Details</h5>
                        <FormGroup>
                            <Label for="edit-institution-name">Name</Label>
                            <Input id="edit-institution-name" defaultValue={this.props.institution.name}
                                   placeholder="Institution Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-institution-country">Country</Label>
                            <Input type="select" id="edit-institution-country-list"
                                   defaultValue={this.props.institution.country.name}>
                                {countries}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-institution-address">Address</Label>
                            <Input type="textarea" id="edit-institution-address"
                                   defaultValue={this.props.institution.address}
                                   placeholder="Address" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-institution-website">Website</Label>
                            <InputGroup>
                                <InputGroupAddon>http://</InputGroupAddon>
                                <Input id="edit-institution-website" defaultValue={this.props.institution.website}
                                       placeholder="Website" className="text-input"/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-institution-agreement-type">Agreement Type</Label>
                            <Input type="select" id="edit-institution-agreement-type"
                                   defaultValue={this.props.institution.agreement}>
                                <option value="B">Bilateral</option>
                                <option value="M">Multilateral</option>
                            </Input>
                        </FormGroup>

                        <br/>

                        <h5 className="mb-3">Contact</h5>
                        <FormGroup>
                            <Label for="edit-institution-contact-person">Contact Person</Label>
                            <Input id="edit-institution-contact-person"
                                   defaultValue={this.props.institution.contactPersonName}
                                   placeholder="Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-institution-email">Contact Email</Label>
                            <Input type="email" id="edit-institution-email" defaultValue={this.props.institution.contactPersonEmail}
                                   placeholder="Email" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-institution-contact-number">Contact Number</Label>
                            <Input id="edit-institution-contact-number"
                                   defaultValue={this.props.institution.contactPersonNumber} placeholder="Number"
                                   className="text-input"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success" id="edit-institution-modal-submit"
                            onClick={this.submitForm}>Edit</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

export {
    AddInstitutionModal,
    DeleteInstitutionModal,
    EditInstitutionModal,
};