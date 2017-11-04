import React, { Component } from "react";
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
} from "reactstrap";


class AddStudentModal extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    static addValidation() {
        addValidation({
            inputs : $("#add-student-modal").find(".text-input"),
            button : $("#add-student-modal-submit"),
            customValidations : [
                {
                    input : $("#add-student-email"),
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
            message : "Adding new student...",
        });

        $.post({
            url : `${settings.serverURL}/students/`,
            data : {
                category : $("#add-student-category").val(),
                id_number : $("#add-student-id-number").val(),
                college : $("#add-student-college").val(),
                family_name : $("#add-student-last-name").val(),
                first_name : $("#add-student-first-name").val(),
                middle_name : $("#add-student-middle-name").val(),
                nickname : $("#add-student-nickname").val(),
                nationality : $("#add-student-nationality").val(),
                home_address : $("#add-student-address").val(),
                phone_number : $("#add-student-contact-number").val(),
                birth_date : $("#add-student-birth-date").val(),
                sex : $("#add-student-sex").val(),
                emergency_contact_name : $("#add-student-emergency-contact-name").val(),
                emergency_contact_relationship : $("#add-student-emergency-contact-relationship").val(),
                emergency_contact_number : $("#add-student-emergency-contact-number").val(),
                email : $("#add-student-email").val(),
                civil_status : $("#add-student-civil-status").val(),
            },
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Successfully added student",
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to add student",
                });
            },
        });

        this.props.toggle();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="add-student-modal"
                   onOpened={AddStudentModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Add a Student</ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <h5 className="mb-3">Student Details</h5>
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
                            <Input type="date" id="add-student-birth-date" className="text-input" placeholder="Birth Date"/>
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

                        <br/>
                        <h5 className="mb-3">Contact Details</h5>
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

                        <br/>
                        <h5 className="mb-3">University Details</h5>
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
                    <Button outline color="success" id="add-student-modal-submit" onClick={this.submitForm}>Add</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class DeleteStudentModal extends Component {
    constructor(props) {
        super(props);

        this.confirmDelete = this.confirmDelete.bind(this);
    }

    confirmDelete() {
        const dismissToast = makeInfoToast({
            title : "Deleting",
            message : "Deleting student...",
        });

        $.ajax({
            url : `${settings.serverURL}/students/${this.props.student.idNumber}/`,
            method : "DELETE",
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Student deleted",
                    progressBar : false,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to delete student",
                    progressBar : false,
                });
            },
        });
        this.props.toggle();
    }

    render() {
        // Hardcoded, I know. Bare with me. You can fix it if you want.
        const first = this.props.student.firstName;
        const middle = this.props.student.middleName;
        const last = this.props.student.familyName;
        const name = first + " " + middle + " " + last;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="delete-student-modal">
                <ModalHeader className="text-danger">Are you sure you want to
                    delete {name}?</ModalHeader>
                <ModalBody>This cannot be undone.</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.confirmDelete}>Confirm Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class EditStudentModal extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        const dismissToast = makeInfoToast({
            title : "Editing",
            message : "Editing student...",
        });

        $.ajax({
            method : "PUT",
            url : `${settings.serverURL}/students/${this.props.student.idNumber}/`,
            data : {
                category : $("#edit-student-category").val(),
                id_number : $("#edit-student-id-number").val(),
                college : $("#edit-student-college").val(),
                family_name : $("#edit-student-last-name").val(),
                first_name : $("#edit-student-first-name").val(),
                middle_name : $("#edit-student-middle-name").val(),
                nickname : $("#edit-student-nickname").val(),
                nationality : $("#edit-student-nationality").val(),
                home_address : $("#edit-student-address").val(),
                phone_number : $("#edit-student-contact-number").val(),
                birth_date : $("#edit-student-birth-date").val(),
                sex : $("#edit-student-sex").val(),
                emergency_contact_name : $("#edit-student-emergency-contact-name").val(),
                emergency_contact_relationship : $("#edit-student-emergency-contact-relationship").val(),
                emergency_contact_number : $("#edit-student-emergency-contact-number").val(),
                email : $("#edit-student-email").val(),
                civil_status : $("#edit-student-civil-status").val(),
            },
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Successfully modified student",
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to edit student",
                });
            },
        });

        this.props.toggle();
    }

    static addValidation() {
        addValidation({
            inputs : $("#edit-student-modal").find(".text-input"),
            button : $("#edit-student-modal-submit"),
            customValidations : [
                {
                    input : $("#edit-student-email"),
                    validator : email => {
                        //This regex mess checks if email is a real email
                        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
                    },
                },
            ],
        });
    }

    render() {
        // Hardcoded, I know. Bare with me. You can fix it if you want.
        const first = this.props.student.firstName;
        const middle = this.props.student.middleName;
        const last = this.props.student.familyName;
        const name = first + " " + middle + " " + last;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="edit-student-modal"
                   onOpened={EditStudentModal.addValidation}>
                <ModalHeader toggle={this.props.toggle}>Edit {name}</ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <h5 className="mb-3">Student Details</h5>
                        <FormGroup>
                            <Label for="edit-student-id-number">ID Number</Label>
                            <Input id="edit-student-id-number" placeholder="ID Number" className="text-input"
                                   defaultValue={this.props.student.idNumber}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-first-name">First Name</Label>
                            <Input id="edit-student-first-name" placeholder="First Name" className="text-input"
                                   defaultValue={this.props.student.firstName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-middle-name">Middle Name</Label>
                            <Input id="edit-student-middle-name" placeholder="Middle Name" className="text-input"
                                   defaultValue={this.props.student.middleName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-last-name">Last Name</Label>
                            <Input id="edit-student-last-name" placeholder="Last Name" className="text-input"
                                   defaultValue={this.props.student.familyName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-nickname">Nickname</Label>
                            <Input id="edit-student-nickname" placeholder="Nickname" className="text-input"
                                   defaultValue={this.props.student.nickname}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-birth-date">Birth Date</Label>
                            <Input type="date" id="edit-student-birth-date" className="text-input"
                                   defaultValue={this.props.student.birthDate}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-sex">Sex</Label>
                            <Input type="select" id="edit-student-sex" defaultValue={this.props.student.sex}>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-address">Home Address</Label>
                            <Input type="textarea" id="edit-student-address" placeholder="Home Address"
                                   className="text-input" defaultValue={this.props.student.homeAddress}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-nationality">Nationality</Label>
                            <Input id="edit-student-nationality" placeholder="Nationality" className="text-input"
                                   defaultValue={this.props.student.nationality}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-civil-status">Civil Status</Label>
                            <Input type="select" id="edit-student-civil-status"
                                   defaultValue={this.props.student.civilStatus}>
                                <option value="S">Single</option>
                                <option value="M">Married</option>
                                <option value="D">Divorced</option>
                                <option value="W">Widowed</option>
                            </Input>
                        </FormGroup>

                        <br/>
                        <h5 className="mb-3">Contact Details</h5>
                        <FormGroup>
                            <Label for="edit-student-contact-number">Contact Number</Label>
                            <Input id="edit-student-contact-number" placeholder="Contact Number" className="text-input"
                                   defaultValue={this.props.student.phoneNumber}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-email">E-mail</Label>
                            <Input id="edit-student-email" placeholder="E-mail" className="text-input"
                                   defaultValue={this.props.student.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-emergency-contact-name">Emergency Contact Name</Label>
                            <Input id="edit-student-emergency-contact-name" placeholder="Emergency Contact Name"
                                   className="text-input" defaultValue={this.props.student.emergencyContactName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-emergency-contact-relationship">Emergency Contact
                                Relationship</Label>
                            <Input id="edit-student-emergency-contact-relationship"
                                   placeholder="Emergency Contact Relationship" className="text-input"
                                   defaultValue={this.props.student.emergencyContactRelationship}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="edit-student-emergency-contact-number">Emergency Contact
                                Number</Label>
                            <Input id="edit-student-emergency-contact-number"
                                   placeholder="Emergency Contact Number" className="text-input"
                                   defaultValue={this.props.student.emergencyContactNumber}/>
                        </FormGroup>

                        <br/>
                        <h5 className="mb-3">University Details</h5>
                        <FormGroup>
                            <Label for="edit-student-college">College</Label>
                            <Input type="select" id="edit-student-college" defaultValue={this.props.student.college}>
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
                            <Label for="edit-student-category">Student Type</Label>
                            <Input type="select" id="edit-student-category" defaultValue={this.props.student.category}>
                                <option value="IN">Inbound</option>
                                <option value="OUT">Outbound</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="success" id="edit-student-modal-submit"
                            onClick={this.submitForm}>Add</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    AddStudentModal,
    DeleteStudentModal,
    EditStudentModal,
};