import React, {Component} from "react";
// I'm assuming I need these imports
import addValidation from "../../form_validation";
import authorizeXHR from "../../authorization";
import makeInfoToast from "../../dismissable_toast_maker";
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

class AddStudentModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="add-student-modal">
                <ModalHeader toggle={this.props.toggle}>Add a Student</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="add-student-id-number">ID Number</Label>
                            <Input id="add-student-id-number" placeholder="ID Number" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-first-name">First Name</Label>
                            <Input id="add-student-first-name" placeholder="First Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-middle-name">Middle Name</Label>
                            <Input id="add-student-middle-name" placeholder="Middle Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-last-name">Last Name</Label>
                            <Input id="add-student-last-name" placeholder="Last Name" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-nickname">Nickname</Label>
                            <Input id="add-student-nickname" placeholder="Nickname" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-birth-date">Birth Date</Label>
                            <Input type="date" id="add-student-birth-date"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-sex">Sex</Label>
                            <Input type="select" id="add-student-sex">
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-address">Home Address</Label>
                            <Input type="textarea" id="add-student-address" placeholder="Home Address"
                                   className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-nationality">Nationality</Label>
                            <Input id="add-student-nationality" placeholder="Nationality" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-civil-status">Civil Status</Label>
                            <Input type="select" id="add-student-civil-status">
                                <option value="S">Single</option>
                                <option value="M">Married</option>
                                <option value="D">Divorced</option>
                                <option value="W">Widowed</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-contact-number">Contact Number</Label>
                            <Input id="add-student-contact-number" placeholder="Contact Number" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-email">E-mail</Label>
                            <Input id="add-student-email" placeholder="E-mail" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-emergency-contact-name">Emergency Contact Name</Label>
                            <Input id="add-student-emergency-contact-name" placeholder="Emergency Contact Name"
                                   className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-emergency-contact-relationship">Emergency Contact
                                Relationship</Label>
                            <Input id="add-student-emergency-contact-relationship"
                                   placeholder="Emergency Contact Relationship" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-emergency-contact-number">Emergency Contact
                                Number</Label>
                            <Input id="add-student-emergency-contact-number"
                                   placeholder="Emergency Contact Number" className="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-college">College</Label>
                            <Input type="select" id="add-student-college">
                                <option value="CCS">College of Computer Studies</option>
                                <option value="RVRCOB">Ramon V. del Rosario College of Business</option>
                                <option value="CLA">College of Liberal Arts</option>
                                <option value="SOE">School of Economics</option>
                                <option value="GCOE">Gokongwei College of Engineering</option>
                                <option value="COL">College of Law</option>
                                <option value="BAGCED">Brother Andrew Gonzales College of Education</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="add-student-category">Student Type</Label>
                            <Input type="select" id="add-student-category">
                                <option value="IN">Inbound</option>
                                <option value="OUT">Outbound</option>
                            </Input>
                        </FormGroup>


                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success" id="add-student-modal-submit">Add</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    AddStudentModal,
};