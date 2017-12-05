import React, { Component } from "react";
import validateForm from "../../../form_validator";
import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import authorizeXHR from "../../../authorization";
import settings from "../../../settings";
import iziToast from "izitoast";


class DeployApplicantModal extends Component {
    constructor(props) {
        super(props);


        this.state = {
            form : {
                default_units : "",
                total_units_enrolled : "",
            },
        };

        this.getFormErrors = this.getFormErrors.bind(this);
        this.deployStudent = this.deployStudent.bind(this);
    }

    deployStudent() {
        $.post({
            url : `${settings.serverURL}/programs/outbound/students/${this.props.student.id}/deploy/`,
            beforeSend : authorizeXHR,
            data : this.state.form,
        }).then(response => {
            console.log(response);
        }).fail(error => {
            console.log(error);
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

    getFormErrors() {
        const isValidIntegerValidator = {
            isValid : fieldValue => /^-{0,1}\d+$/.test(fieldValue),
            errorMessage : fieldValue => `${fieldValue} must be a valid integer`,
        };

        const isPositiveIntegerValidator = {
            isValid : fieldValue => parseInt(fieldValue) > 0,
            errorMessage : fieldValue => `${fieldValue} must be greater than 0.`,
        };

        return validateForm([
            {
                name : "Default units",
                characterLimit : null,
                value : this.state.form.default_units,
                customValidators : [isValidIntegerValidator, isPositiveIntegerValidator],
            },
            {
                name : "Total units enrolled",
                characterLimit : null,
                value : this.state.form.total_units_enrolled,
                customValidators : [isValidIntegerValidator, isPositiveIntegerValidator],
            },
        ]);
    }

    render() {

        const { formHasErrors, fieldErrors } = this.getFormErrors();

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        return (
            <Modal isOpen={this.props.isOpen}
                   toggle={this.props.toggle}
                   backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>
                    Deploy Student
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Label>Default Units</Label>
                            <Input placeholder="Default Units"
                                   onChange={this.getChangeHandler("default_units")}
                                   valid={isValid("Default units")}
                                   value={this.state.form.default_units}/>
                            <FormFeedback>{fieldError("Default units")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Total Units Enrolled</Label>
                            <Input placeholder="Total Units Enrolled"
                                   onChange={this.getChangeHandler("total_units_enrolled")}
                                   valid={isValid("Total units enrolled")}
                                   value={this.state.form.total_units_enrolled}/>
                            <FormFeedback>{fieldError("Total units enrolled")}</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            onClick={this.deployStudent}
                            disabled={formHasErrors}>
                        Deploy Student
                    </Button>
                </ModalFooter>

            </Modal>
        );
    }
}

class AcceptApplicantModal extends Component {
    constructor(props) {
        super(props);


        this.state = {
            form : {
                total_units_enrolled : "",
                inbound_courses : [],
            },
        };

        this.getFormErrors = this.getFormErrors.bind(this);
        this.acceptStudent = this.acceptStudent.bind(this);
    }

    acceptStudent() {
        $.post({
            url : `${settings.serverURL}/programs/inbound/students/${this.props.student.id}/accept/`,
            beforeSend : authorizeXHR,
            data : JSON.stringify(this.state.form),
            contentType : "application/json",
        }).then(() => {
            this.props.refreshStudents();
            iziToast.success({
                title : "Accepted",
                message : "Student has been accepted",
            });
        }).fail(error => {
            console.log(error);

            iziToast.error({
                title : "Error",
                message : "Unable to accept student",
            });
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

    getFormErrors() {
        const isValidIntegerValidator = {
            isValid : fieldValue => /^-{0,1}\d+$/.test(fieldValue),
            errorMessage : fieldValue => `${fieldValue} must be a valid integer`,
        };

        const isPositiveIntegerValidator = {
            isValid : fieldValue => parseInt(fieldValue) > 0,
            errorMessage : fieldValue => `${fieldValue} must be greater than 0.`,
        };

        return validateForm([
            {
                name : "Total units enrolled",
                characterLimit : null,
                value : this.state.form.total_units_enrolled,
                customValidators : [isValidIntegerValidator, isPositiveIntegerValidator],
            },
        ]);
    }

    render() {

        const { formHasErrors, fieldErrors } = this.getFormErrors();

        function isValid(fieldName) {
            return fieldErrors[fieldName].length === 0;
        }

        function fieldError(fieldName) {
            return fieldErrors[fieldName][0];
        }

        console.log(formHasErrors, fieldErrors, isValid("Total units enrolled"));


        return (
            <Modal isOpen={this.props.isOpen}
                   toggle={this.props.toggle}
                   backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>
                    Accept Student
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Label>Total Units Enrolled</Label>
                            <Input placeholder="Total Units Enrolled"
                                   onChange={this.getChangeHandler("total_units_enrolled")}
                                   valid={isValid("Total units enrolled")}
                                   value={this.state.form.total_units_enrolled}/>
                            <FormFeedback>{fieldError("Total units enrolled")}</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            onClick={this.acceptStudent}
                            disabled={formHasErrors}>
                        Accept Student
                    </Button>
                </ModalFooter>

            </Modal>
        );
    }
}


export {
    DeployApplicantModal,
    AcceptApplicantModal,
};