import React, { Component } from "react";
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

import settings from "../../settings";


class AddInstitutionModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const countries = settings.countries.map((name, index) =>
            <option key={index}>{name}</option>,
        );

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>Add an Institution</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="add-institution-name">Name</Label>
                            <Input id="add-institution-name" placeholder="Institution Name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-country">Country</Label>
                            <Input type="select" id="add-institution-country-list">
                                {countries}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-email">Email</Label>
                            <Input type="email" id="add-institution-email" placeholder="Email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-address">Address</Label>
                            <Input id="add-institution-address" placeholder="Address"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-website">Website</Label>
                            <Input id="add-institution-website" placeholder="Website"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-contact-person">Contact Person</Label>
                            <Input id="add-institution-contact-person" placeholder="Name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-institution-contact-number">Contact Number</Label>
                            <Input id="add-institution-contact-number" placeholder="Number"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success">Add</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export { AddInstitutionModal };