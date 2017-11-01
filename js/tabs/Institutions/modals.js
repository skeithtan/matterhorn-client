import React, { Component } from "react";
import addValidation from "../../form_validation";
import authorizeXHR from "../../authorization";
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
            },
            beforeSend: authorizeXHR,
            success : () => {
                this.props.refresh();

                iziToast.success({
                    title : "Success",
                    message : "Successfully added Institution",
                    progressBar : false,
                });
            },
            error : response => {
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to add Institution",
                    progressBar : false,
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
                <ModalBody>
                    <Form>
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
                            <Label for="add-institution-email">Email</Label>
                            <Input type="email" id="add-institution-email" placeholder="Email" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-address">Address</Label>
                            <Input id="add-institution-address" placeholder="Address" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-website">Website</Label>
                            <Input id="add-institution-website" placeholder="Website" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-contact-person">Contact Person</Label>
                            <Input id="add-institution-contact-person" placeholder="Name" className="text-input"/>
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

export { AddInstitutionModal };