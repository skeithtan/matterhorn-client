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
            isValid : fieldValue => !isNaN(parseInt(text)),
            errorMessage : fieldValue => `${fieldValue} must be a valid integer`,
        };

        const isPositiveIntegerValidator = {
            isValid : fieldValue => parseInt(text) > 0,
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
                            disabled={formHasErrors}/>
                </ModalFooter>

            </Modal>
        );
    }
}