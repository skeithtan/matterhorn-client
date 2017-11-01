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
} from "reactstrap";

import settings from "../../settings";


class AddInstitutionModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const countries = settings.countries.map((name, index) =>
            <option key={index}>{name}</option>
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
                    </Form>
                </ModalBody>
            </Modal>
        );
    }
}

export { AddInstitutionModal };