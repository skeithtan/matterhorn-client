import React, { Component } from "react";
import authorizeXHR from "../../authorization";
import makeInfoToast from "../../dismissable_toast_maker";
import validateForm from "../../form_validator";
import graphql from "../../graphql";
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
    FormFeedback,
} from "reactstrap";


function fetchInstitutions(onResult) {
    graphql.query(`
    {
        institutions {
            id
            name
        }
    }
    `).then(onResult);
}

class StudentFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                id_number : "",
                first_name : "",
                middle_name : "",
                family_name : "",
                nickname : "",
                birth_date : "",
                sex : "F",
                home_address : "",
                nationality : "",
                civil_status : "S",
                phone_number : "",
                email : "",
                emergency_contact_name : "",
                emergency_contact_relationship : "",
                emergency_contact_number : "",
                college : "CCS",
                category : "IN",
            },
            institutions : null,
        };

        this.getFormErrors = this.getFormErrors.bind(this);
        this.getChangeHandler = this.getChangeHandler.bind(this);
        this.submitAddStudentForm = this.submitAddStudentForm.bind(this);
        this.submitEditStudentForm = this.submitEditStudentForm.bind(this);
        this.fetchingInstitutions = this.fetchingInstitutions.bind(this);
        this.noInstitutions = this.noInstitutions.bind(this);

        fetchInstitutions(result => {
            const institutions = result.institutions;
            const form = this.state.form;

            // Set default institution if institutions exist
            if (institutions.length > 0) {
                form.institution = institutions[0].id;
            }

            this.setState({
                institutions : institutions,
                form : form,
            });
        });

        if (props.edit) {
            // Copy the object, do not equate, otherwise the object changes along with the form.
            Object.assign(this.state.form, props.student);

            if(props.student.category === "IN") {
                this.state.form.institution = props.student.institution.id;
            }
        }
    }

    getFormErrors() {
        return validateForm([
            {
                name : "ID Number",
                characterLimit : 8,
                value : this.state.form.id_number,
                customValidators : [{
                    isValid : fieldValue => fieldValue.length === 8,
                    errorMessage : fieldName => `${fieldName} must be exactly 8 characters.`,
                }],
            },
            {
                name : "First name",
                characterLimit : 64,
                value : this.state.form.first_name,
            },
            {
                name : "Middle name",
                characterLimit : 64,
                optional : true,
                value : this.state.form.middle_name,
            },
            {
                name : "Family name",
                characterLimit : 64,
                value : this.state.form.family_name,
            },
            {
                name : "Nickname",
                characterLimit : 64,
                value : this.state.form.nickname,
                optional : true,
            },
            {
                name : "Birth date",
                characterLimit : null,
                value : this.state.form.birth_date,
            },
            {
                name : "Home address",
                characterLimit : 256,
                value : this.state.form.home_address,
            },
            {
                name : "Nationality",
                characterLimit : 64,
                optional : true,
                value : this.state.form.nationality,
            },
            {
                name : "Phone number",
                characterLimit : 64,
                value : this.state.form.phone_number,
            },
            {
                name : "Email",
                characterLimit : 256,
                value : this.state.form.email,
                customValidators : [{
                    // isValid checks if the form value is a valid email through this messy regex.
                    isValid : fieldValue => /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(fieldValue),
                    errorMessage : fieldName => `${fieldName} must be a valid email.`,
                }],
            },
            {
                name : "Emergency contact name",
                characterLimit : 64,
                value : this.state.form.emergency_contact_name,
            },
            {
                name : "Emergency contact relationship",
                characterLimit : 32,
                value : this.state.form.emergency_contact_relationship,
            },
            {
                name : "Emergency contact number",
                characterLimit : 64,
                value : this.state.form.emergency_contact_number,
            },
        ]);
    }

    getChangeHandler(fieldName) {
        const form = this.state.form;
        return event => {
            form[fieldName] = event.target.value;
            this.setState({
                form : form,
            });
        };
    }

    submitAddStudentForm() {
        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new student...",
        });

        if (this.state.form.category === "OUT") {
            // Outbound students do not have an institution
            this.state.form.institution = null;
        }

        $.post({
            url : `${settings.serverURL}/students/`,
            data : this.state.form,
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

    submitEditStudentForm() {
        const dismissToast = makeInfoToast({
            title : "Editing",
            message : "Editing student...",
        });

        if (this.state.form.category === "OUT") {
            // Outbound students do not have an institution
            this.state.form.institution = null;
        }

        $.ajax({
            method : "PUT",
            url : `${settings.serverURL}/students/${this.state.form.id}/`,
            data : this.state.form,
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

    fetchingInstitutions() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>
                    Please wait...
                </ModalHeader>
                <ModalBody className="form">
                    Institutions are loading...
                </ModalBody>
            </Modal>
        );
    }

    noInstitutions() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>
                    Institutions need to be configured first.
                </ModalHeader>
                <ModalBody className="form">
                    Institutions must exist students can be added.
                </ModalBody>
            </Modal>
        );
    }

    render() {
        const formErrors = this.getFormErrors();
        const formHasErrors = formErrors.formHasErrors;
        const fieldErrors = formErrors.fieldErrors;

        if (this.state.institutions === null) {
            return this.fetchingInstitutions();
        }

        if (this.state.institutions.length === 0) {
            return this.noInstitutions();
        }

        const institutions = this.state.institutions.map(institution => {
            return <option value={institution.id} key={institution.id}>{institution.name}</option>;
        });

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.edit ? `Edit ${this.state.form.first_name} ${this.state.form.family_name}` : "Add a Student"}
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <h5 className="mb-3">Student Details</h5>

                        <FormGroup>
                            <Label>ID Number</Label>
                            <Input placeholder="ID Number"
                                   onChange={this.getChangeHandler("id_number")}
                                   valid={isValid("ID Number")}
                                   defaultValue={this.state.form.id_number}/>
                            <FormFeedback>{fieldError("ID Number")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>First Name</Label>
                            <Input placeholder="First Name"
                                   onChange={this.getChangeHandler("first_name")}
                                   valid={isValid("First name")}
                                   defaultValue={this.state.form.first_name}/>
                            <FormFeedback>{fieldError("First name")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Middle Name</Label>
                            <Input placeholder="Middle Name"
                                   onChange={this.getChangeHandler("middle_name")}
                                   valid={isValid("Middle name")}
                                   defaultValue={this.state.form.middle_name}/>
                            <FormFeedback>{fieldError("Middle name")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Family Name</Label>
                            <Input placeholder="Last Name"
                                   onChange={this.getChangeHandler("family_name")}
                                   valid={isValid("Family name")}
                                   defaultValue={this.state.form.family_name}/>
                            <FormFeedback>{fieldError("Family name")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Nickname</Label>
                            <Input placeholder="Nickname"
                                   onChange={this.getChangeHandler("nickname")}
                                   valid={isValid("Nickname")}
                                   defaultValue={this.state.form.nickname}/>
                            <FormFeedback>{fieldError("Nickname")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Birth Date</Label>
                            <Input type="date"
                                   placeholder="Birth Date"
                                   onChange={this.getChangeHandler("birth_date")}
                                   valid={isValid("Birth date")}
                                   defaultValue={this.state.form.birth_date}/>
                            <FormFeedback>{fieldError("Birth date")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Sex</Label>
                            <Input type="select" onChange={this.getChangeHandler("sex")}
                                   defaultValue={this.state.form.sex}>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Home Address</Label>
                            <Input type="textarea"
                                   placeholder="Home Address"
                                   onChange={this.getChangeHandler("home_address")}
                                   valid={isValid("Home address")}
                                   defaultValue={this.state.form.home_address}/>
                            <FormFeedback>{fieldError("Home address")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Nationality</Label>
                            <Input placeholder="Nationality"
                                   onChange={this.getChangeHandler("nationality")}
                                   valid={isValid("Nationality")}
                                   defaultValue={this.state.form.nationality}/>
                            <FormFeedback>{fieldError("Nationality")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Civil Status</Label>
                            <Input type="select"
                                   onChange={this.getChangeHandler("civil_status")}
                                   defaultValue={this.state.form.civil_status}>
                                <option value="S">Single</option>
                                <option value="M">Married</option>
                                <option value="D">Divorced</option>
                                <option value="W">Widowed</option>
                            </Input>
                        </FormGroup>

                        <br/>
                        <h5 className="mb-3">Contact Details</h5>
                        <FormGroup>
                            <Label>Phone Number</Label>
                            <Input placeholder="Phone Number"
                                   onChange={this.getChangeHandler("phone_number")}
                                   valid={isValid("Phone number")}
                                   defaultValue={this.state.form.phone_number}/>
                            <FormFeedback>{fieldError("Phone number")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email"
                                   onChange={this.getChangeHandler("email")}
                                   valid={isValid("Email")}
                                   defaultValue={this.state.form.email}/>
                            <FormFeedback>{fieldError("Email")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Emergency Contact Name</Label>
                            <Input placeholder="Emergency Contact Name"
                                   onChange={this.getChangeHandler("emergency_contact_name")}
                                   valid={isValid("Emergency contact name")}
                                   defaultValue={this.state.form.emergency_contact_name}/>
                            <FormFeedback>{fieldError("Emergency contact name")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Emergency Contact Relationship</Label>
                            <Input placeholder="Emergency Contact Relationship"
                                   onChange={this.getChangeHandler("emergency_contact_relationship")}
                                   valid={isValid("Emergency contact relationship")}
                                   defaultValue={this.state.form.emergency_contact_relationship}/>
                            <FormFeedback>{fieldError("Emergency contact relationship")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Emergency Contact Number</Label>
                            <Input placeholder="Emergency Contact Number"
                                   onChange={this.getChangeHandler("emergency_contact_number")}
                                   valid={isValid("Emergency contact number")}
                                   defaultValue={this.state.form.emergency_contact_number}/>
                            <FormFeedback>{fieldError("Emergency contact number")}</FormFeedback>
                        </FormGroup>

                        <br/>
                        <h5 className="mb-3">University Details</h5>
                        <FormGroup>
                            <Label>Student Type</Label>
                            <Input type="select" onChange={this.getChangeHandler("category")}
                                   defaultValue={this.state.form.category}>
                                <option value="IN">Inbound</option>
                                <option value="OUT">Outbound</option>
                            </Input>
                        </FormGroup>

                        {this.state.form.category === "IN" &&
                        <FormGroup>
                            <Label>Institution</Label>
                            <Input type="select" onChange={this.getChangeHandler("institution")}
                                   defaultValue={this.state.form.institution}>
                                {institutions}
                            </Input>
                        </FormGroup>
                        }

                        <FormGroup>
                            <Label>College</Label>
                            <Input type="select" onChange={this.getChangeHandler("college")}
                                   defaultValue={this.state.form.college}>
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
                    <Button outline color="success"
                            onClick={this.props.edit ? this.submitEditStudentForm : this.submitAddStudentForm}
                            disabled={formHasErrors}>
                        {this.props.edit ? "Save changes" : "Add"}
                    </Button>
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
            title : "Archiving",
            message : "Archiving student...",
        });

        $.ajax({
            url : `${settings.serverURL}/students/${this.props.student.id}/`,
            method : "DELETE",
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.refresh();
                iziToast.success({
                    title : "Success",
                    message : "Student archived",
                    progressBar : false,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to archive student",
                    progressBar : false,
                });
            },
        });
        this.props.toggle();
    }

    render() {
        const first = this.props.student.first_name;
        const middle = this.props.student.middle_name;
        const last = this.props.student.family_name;
        const name = first + " " + middle + " " + last;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} backdrop={true} id="archive-student-modal">
                <ModalHeader>Are you sure you want to
                    archive {name}?</ModalHeader>
                <ModalFooter>
                    <Button outline color="warning" onClick={this.confirmDelete}>Confirm Archive</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    StudentFormModal,
    DeleteStudentModal,
};