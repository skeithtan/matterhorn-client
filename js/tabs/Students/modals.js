import React, { Component } from "react";
import authorizeXHR from "../../authorization";
import { makeInfoToast } from "../../dismissable_toast_maker";
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
    FormFeedback, ButtonGroup,
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

function fetchInboundPrograms(onResult) {
    graphql.query(`
    {
        inbound_programs {
            id
            name
        }
    }
    `).then(onResult);
}

function fetchOutboundPrograms(onResult) {
    graphql.query(`
    {
        outbound_programs {
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
            studentProgramForm : {
                terms_duration : [],
                application_requirements : [],
            },
            programs : null,
            institutions : null,
        };

        this.resetForm = this.resetForm.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);
        this.getChangeHandler = this.getChangeHandler.bind(this);
        this.getSecondChangeHandler = this.getSecondChangeHandler.bind(this);
        this.submitAddStudentForm = this.submitAddStudentForm.bind(this);
        this.submitEditStudentForm = this.submitEditStudentForm.bind(this);
        this.fetchingInstitutions = this.fetchingInstitutions.bind(this);
        this.fetchingPrograms = this.fetchingPrograms.bind(this);
        this.noInstitutions = this.noInstitutions.bind(this);
        this.onSubmitAddStudentForm = this.onSubmitAddStudentForm.bind(this);
        this.setPrograms = this.setPrograms.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onTermClick = this.onTermClick.bind(this);
        this.applicantForm = this.applicantForm.bind(this);
        this.getApplicantFormErrors = this.getApplicantFormErrors.bind(this);

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

        if (this.props.applicant) {
            this.setPrograms("IN");
        }

        if (props.edit) {
            // Copy the object, do not equate, otherwise the object changes along with the form.
            Object.assign(this.state.form, props.student);

            if (props.student.category === "IN") {
                this.state.form.institution = props.student.institution.id;
            }
        }
    }

    setPrograms(category) {
        if (category === "IN") {
            fetchInboundPrograms(result => {
                const programs = result.inbound_programs;
                const form = this.state.studentProgramForm;

                if (programs.length > 0) {
                    form.program = programs[0].id;
                }

                this.setState({
                    programs : programs,
                    studentProgramForm : form,
                });
            });
        } else {
            fetchOutboundPrograms(result => {
                const programs = result.outbound_programs;
                const form = this.state.studentProgramForm;

                if (programs.length > 0) {
                    form.program = programs[0].id;
                }

                this.setState({
                    programs : programs,
                    studentProgramForm : form,
                });
            });
        }
    }

    resetForm() {
        this.setState({
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
        });
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

    getApplicantFormErrors() {
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
            {
                name : "Terms duration",
                characterLimit : null,
                value : this.state.studentProgramForm.terms_duration.toString(),
                customValidators : [{
                    isValid : fieldValue => [1, 3].toString() !== fieldValue,
                    errorMessage : fieldName => `${fieldName} must be consecutive`,
                }],
            },
        ]);
    }

    getChangeHandler(fieldName) {
        const form = this.state.form;
        return event => {
            if (fieldName === "category") {
                this.setPrograms(event.target.value);
            }

            form[fieldName] = event.target.value;
            this.setState({
                form : form,
            });
        };
    }

    getSecondChangeHandler(fieldName) {
        const form = this.state.studentProgramForm;
        return event => {
            form[fieldName] = event.target.value;
            this.setState({
                studentProgramForm : form,
            });
        };
    }

    onCategoryChange(category) {
        this.setPrograms(category);
    }

    onTermClick(term) {
        const index = this.state.studentProgramForm.terms_duration.indexOf(term);
        if (index < 0) {
            this.state.studentProgramForm.terms_duration.push(term);
        } else {
            this.state.studentProgramForm.terms_duration.splice(index, 1);
        }

        this.setState({
            studentProgramForm : this.state.studentProgramForm,
        });
        console.log(this.state.studentProgramForm.terms_duration);
    }

    submitAddStudentForm() {
        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new student...",
        });

        $.post({
            url : `${settings.serverURL}/students/`,
            data : this.state.form,
            beforeSend : authorizeXHR,
        }).done(student => {
            dismissToast();
            const form = this.state.studentProgramForm;
            form.student = student.id;
            this.setState({
                studentProgramForm : form,
            });
            this.onSubmitAddStudentForm(student);
            iziToast.success({
                title : "Added",
                message : "Successfully added student",
            });
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to add student",
            });
        });
    }

    onSubmitAddStudentForm(student) {
        let url = "/programs/";
        if (student.category === "IN") {
            url += "inbound/";
        } else {
            url += "outbound/";
        }

        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new applicant...",
        });

        $.post({
            url : `${settings.serverURL}${url}${this.state.studentProgramForm.program}/students/`,
            data : JSON.stringify(this.state.studentProgramForm),
            contentType : "application/json",
            beforeSend : authorizeXHR,
        }).done(student => {
            dismissToast();
            iziToast.success({
                title : "Added",
                message : "Successfully added applicant",
            });
            this.resetForm();
            this.props.refresh();
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to add student",
            });
        });

        console.log(settings.serverURL + "" + url + "" + this.state.studentProgramForm.program + "/students");

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
                this.resetForm();
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
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader toggle={ this.props.toggle }>
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
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader toggle={ this.props.toggle }>
                    Institutions need to be configured first.
                </ModalHeader>
                <ModalBody className="form">
                    Institutions must exist students can be added.
                </ModalBody>
            </Modal>
        );
    }

    fetchingPrograms() {
        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader toggle={ this.props.toggle }>
                    Please wait...
                </ModalHeader>
                <ModalBody className="form">
                    Programs are loading...
                </ModalBody>
            </Modal>
        );
    }

    applicantForm() {
        if (!this.props.applicant) {
            return null;
        }

        if (this.state.programs !== null) {
            const programs = this.state.programs.map(program => {
                return <option value={ program.id } key={ program.id }>{ program.name }</option>;
            });

            const termButtons = [1, 2, 3].map(term =>
                <Button outline
                        color="success"
                        key={ term }
                        onClick={ () => this.onTermClick(term) }
                        active={ this.state.studentProgramForm.terms_duration.includes(term) }>
                    { term }
                </Button>,
            );

            return (
                <div>
                    <br/>
                    <h5 className="mb-3">Program Details</h5>
                    <FormGroup>
                        <Label>Program</Label>
                        <Input type="select"
                               onChange={ this.getSecondChangeHandler("program") }
                               value={ this.state.studentProgramForm.program }>
                            { programs }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Terms Available</Label>
                        <div className="d-block w-100">
                            <ButtonGroup>
                                { termButtons }
                            </ButtonGroup>
                        </div>
                    </FormGroup>
                </div>
            );
        }
    }

    render() {
        const formErrors = this.props.applicant ? this.getApplicantFormErrors() : this.getFormErrors();
        const formHasErrors = formErrors.formHasErrors;
        const fieldErrors = formErrors.fieldErrors;

        if (this.state.institutions === null) {
            return this.fetchingInstitutions();
        }

        if (this.state.institutions.length === 0) {
            return this.noInstitutions();
        }

        if (this.props.applicant) {
            if (this.state.programs === null) {
                return this.fetchingPrograms();
            }
        }

        const institutions = this.state.institutions.map(institution => {
            return <option value={ institution.id }
                           key={ institution.id }>{ institution.name }</option>;
        });

        institutions.unshift(
            <option value={ "" } key={ 0 }>Select an institution</option>,
        );

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader toggle={ this.props.toggle }>
                    { this.props.edit ? `Edit ${this.state.form.first_name} ${this.state.form.family_name}` : "Add a Student" }
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <h5 className="mb-3">Student Details</h5>

                        <FormGroup>
                            <Label>ID Number</Label>
                            <Input placeholder="ID Number"
                                   onChange={ this.getChangeHandler("id_number") }
                                   valid={ isValid("ID Number") }
                                   value={ this.state.form.id_number }/>
                            <FormFeedback>{ fieldError("ID Number") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>First Name</Label>
                            <Input placeholder="First Name"
                                   onChange={ this.getChangeHandler("first_name") }
                                   valid={ isValid("First name") }
                                   value={ this.state.form.first_name }/>
                            <FormFeedback>{ fieldError("First name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Middle Name</Label>
                            <Input placeholder="Middle Name"
                                   onChange={ this.getChangeHandler("middle_name") }
                                   valid={ isValid("Middle name") }
                                   value={ this.state.form.middle_name }/>
                            <FormFeedback>{ fieldError("Middle name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Family Name</Label>
                            <Input placeholder="Last Name"
                                   onChange={ this.getChangeHandler("family_name") }
                                   valid={ isValid("Family name") }
                                   value={ this.state.form.family_name }/>
                            <FormFeedback>{ fieldError("Family name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Nickname</Label>
                            <Input placeholder="Nickname"
                                   onChange={ this.getChangeHandler("nickname") }
                                   valid={ isValid("Nickname") }
                                   value={ this.state.form.nickname }/>
                            <FormFeedback>{ fieldError("Nickname") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Birth Date</Label>
                            <Input type="date"
                                   placeholder="Birth Date"
                                   onChange={ this.getChangeHandler("birth_date") }
                                   valid={ isValid("Birth date") }
                                   value={ this.state.form.birth_date }/>
                            <FormFeedback>{ fieldError("Birth date") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Sex</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("sex") }
                                   value={ this.state.form.sex }>
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Home Address</Label>
                            <Input type="textarea"
                                   placeholder="Home Address"
                                   onChange={ this.getChangeHandler("home_address") }
                                   valid={ isValid("Home address") }
                                   value={ this.state.form.home_address }/>
                            <FormFeedback>{ fieldError("Home address") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Nationality</Label>
                            <Input placeholder="Nationality"
                                   onChange={ this.getChangeHandler("nationality") }
                                   valid={ isValid("Nationality") }
                                   value={ this.state.form.nationality }/>
                            <FormFeedback>{ fieldError("Nationality") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Civil Status</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("civil_status") }
                                   value={ this.state.form.civil_status }>
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
                                   onChange={ this.getChangeHandler("phone_number") }
                                   valid={ isValid("Phone number") }
                                   value={ this.state.form.phone_number }/>
                            <FormFeedback>{ fieldError("Phone number") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="Email"
                                   onChange={ this.getChangeHandler("email") }
                                   valid={ isValid("Email") }
                                   value={ this.state.form.email }/>
                            <FormFeedback>{ fieldError("Email") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Emergency Contact Name</Label>
                            <Input placeholder="Emergency Contact Name"
                                   onChange={ this.getChangeHandler("emergency_contact_name") }
                                   valid={ isValid("Emergency contact name") }
                                   value={ this.state.form.emergency_contact_name }/>
                            <FormFeedback>{ fieldError("Emergency contact name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Emergency Contact Relationship</Label>
                            <Input placeholder="Emergency Contact Relationship"
                                   onChange={ this.getChangeHandler("emergency_contact_relationship") }
                                   valid={ isValid("Emergency contact relationship") }
                                   value={ this.state.form.emergency_contact_relationship }/>
                            <FormFeedback>{ fieldError("Emergency contact relationship") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Emergency Contact Number</Label>
                            <Input placeholder="Emergency Contact Number"
                                   onChange={ this.getChangeHandler("emergency_contact_number") }
                                   valid={ isValid("Emergency contact number") }
                                   value={ this.state.form.emergency_contact_number }/>
                            <FormFeedback>{ fieldError("Emergency contact number") }</FormFeedback>
                        </FormGroup>

                        <br/>
                        <h5 className="mb-3">University Details</h5>
                        <FormGroup>
                            <Label>Student Category</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("category") }
                                   value={ this.state.form.category }>
                                <option value="IN">Inbound</option>
                                <option value="OUT">Outbound</option>
                            </Input>
                        </FormGroup>

                        { this.state.form.category === "IN" &&
                        <FormGroup>
                            <Label>Institution</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("institution") }
                                   value={ this.state.form.institution }>
                                { institutions }
                            </Input>
                        </FormGroup>
                        }

                        <FormGroup>
                            <Label>College</Label>
                            <Input type="select"
                                   onChange={ this.getChangeHandler("college") }
                                   value={ this.state.form.college }>
                                <option value="CCS">College of Computer Studies</option>
                                <option value="RVRCOB">Ramon V. del Rosario College of Business</option>
                                <option value="CLA">College of Liberal Arts</option>
                                <option value="SOE">School of Economics</option>
                                <option value="GCOE">Gokongwei College of Engineering</option>
                                <option value="COL">College of Law</option>
                                <option value="BAGCED">Brother Andrew Gonzales College of Education</option>
                            </Input>
                        </FormGroup>

                        { this.applicantForm() }

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            onClick={ this.props.edit ? this.submitEditStudentForm : this.submitAddStudentForm }
                            disabled={ formHasErrors }>
                        { this.props.edit ? "Save changes" : "Add" }
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

}

class ResidenceAddressFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                date_effective : "",
                contact_person_name : "",
                contact_person_number : "",
                address : "",
                residence : "",
            },
        };

        this.resetForm = this.resetForm.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);
        this.getChangeHandler = this.getChangeHandler.bind(this);
        this.submitAddResidenceAddressForm = this.submitAddResidenceAddressForm.bind(this);
        this.submitEditResidenceAddressForm = this.submitEditResidenceAddressForm.bind(this);

        if (this.props.edit) {
            Object.assign(this.state.form, props.residence);
        }
    }

    resetForm() {
        this.setState({
            form : {
                date_effective : "",
                contact_person_name : "",
                contact_person_number : "",
                address : "",
                residence : "",
            },
        });
    }

    getFormErrors() {
        return validateForm([
            {
                name : "Date effective",
                value : this.state.form.date_effective,
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
                name : "Address",
                characterLimit : 256,
                value : this.state.form.address,
            },
            {
                name : "Residence type",
                characterLimit : 64,
                value : this.state.form.residence,
            },
        ]);
    }

    submitEditResidenceAddressForm() {
        const dismissToast = makeInfoToast({
            title : "Editing",
            message : "Editing residence address...",
        });

        $.ajax({
            url : `${settings.serverURL}/students/${this.props.student.id}/residency/${this.props.residence.id}/`,
            method : "PUT",
            beforeSend : authorizeXHR,
            data : this.state.form,
        }).done(() => {
            dismissToast();
            this.resetForm();
            iziToast.success({
                title : "Edited",
                message : "Successfully edited residence address",
            });

            this.props.refreshResidences();
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to edit residence address",
            });
        });

        this.props.toggle();
    }

    submitAddResidenceAddressForm() {
        this.props.toggle();

        const dismissToast = makeInfoToast({
            title : "Adding",
            message : "Adding new residence address...",
        });

        $.post({
            url : `${settings.serverURL}/students/${this.props.student.id}/residency/`,
            beforeSend : authorizeXHR,
            data : this.state.form,
        }).done(() => {
            dismissToast();
            this.resetForm();
            iziToast.success({
                title : "Added",
                message : "Successfully added residence address",
            });

            this.props.refreshResidences();
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to add residence address",
            });
        });
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
        const {formHasErrors, fieldErrors} = this.getFormErrors();

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={ this.props.isOpen }
                   toggle={ this.props.toggle }
                   backdrop={ true }>
                <ModalHeader>
                    { this.props.edit ? "Edit Residence Address" : "Add a Residence Address" }
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="textarea"
                                   placeholder="Address"
                                   onChange={ this.getChangeHandler("address") }
                                   valid={ isValid("Address") }
                                   value={ this.state.form.address }/>
                            <FormFeedback>{ fieldError("Address") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Person</Label>
                            <Input placeholder="Name"
                                   onChange={ this.getChangeHandler("contact_person_name") }
                                   valid={ isValid("Contact person name") }
                                   value={ this.state.form.contact_person_name }/>
                            <FormFeedback>{ fieldError("Contact person name") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Contact Number</Label>
                            <Input placeholder="Number"
                                   onChange={ this.getChangeHandler("contact_person_number") }
                                   valid={ isValid("Contact person number") }
                                   value={ this.state.form.contact_person_number }/>
                            <FormFeedback>{ fieldError("Contact person number") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Residence Type</Label>
                            <Input placeholder="Residence Type"
                                   onChange={ this.getChangeHandler("residence") }
                                   valid={ isValid("Residence type") }
                                   value={ this.state.form.residence }/>
                            <FormFeedback>{ fieldError("Residence type") }</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Date Effective</Label>
                            <Input type="date"
                                   value={ this.state.form.date_effective }
                                   onChange={ this.getChangeHandler("date_effective") }
                                   valid={ isValid("Date effective") }/>
                            <FormFeedback>{ fieldError("Date effective") }</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            disabled={ formHasErrors }
                            onClick={ this.props.edit ? this.submitEditResidenceAddressForm : this.submitAddResidenceAddressForm }>
                        { this.props.edit ? "Save changes" : "Add" }
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    StudentFormModal,
    ResidenceAddressFormModal,
};