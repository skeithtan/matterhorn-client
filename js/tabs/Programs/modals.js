import React, { Component } from "react";
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
import validateForm from "../../form_validator";
import moment from "moment";


class AcademicYearFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                academic_year_start : "",
                terms : [{
                    number : 1,
                    start_date : "",
                    end_date : "",
                }, {
                    number : 2,
                    start_date : "",
                    end_date : "",
                }, {
                    number : 3,
                    start_date : "",
                    end_date : "",
                }],
            },
        };

        this.dateIsWithinAcademicYear = this.dateIsWithinAcademicYear.bind(this);
        this.getTermChangeHandler = this.getTermChangeHandler.bind(this);
        this.getYearChangeHandler = this.getYearChangeHandler.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);
    }

    static yearIsValid(academicYearStart) {
        const year = parseInt(academicYearStart);
        if (isNaN(year)) {
            return false;
        }

        return year > 1900 && year < 2500;
    }

    static dateIsBetween(object) {
        const { date, before, after } = object;

        if (!date) {
            return true;
        }

        const dateMoment = moment(date);

        if (before === "" && after === "") {
            // Cannot validate without values
            return true;
        }

        if (before && before.length > 1) {
            const beforeMoment = moment(before);

            if (beforeMoment.isAfter(dateMoment)) {
                return false;
            }
        }

        if (after && after.length > 1) {
            const afterMoment = moment(after);

            if (afterMoment.isBefore(dateMoment)) {
                return false;
            }
        }

        return true;
    }

    dateIsWithinAcademicYear(date) {
        let academicYearStart = this.state.form.academic_year_start;
        if (!AcademicYearFormModal.yearIsValid(academicYearStart)) {
            // Cannot verify if it's valid without a valid academic year
            return true;
        }

        const parsedYear = parseInt(academicYearStart);

        academicYearStart = moment().dayOfYear(1).year(parsedYear);
        const academicYearEnd = moment().dayOfYear(356).year(parsedYear + 1); //Limit of term dates

        const dateMoment = moment(date);

        return dateMoment.isSameOrAfter(academicYearStart) && dateMoment.isSameOrBefore(academicYearEnd);
    }

    getFormErrors() {
        const term1 = this.state.form.terms[0];
        const term2 = this.state.form.terms[1];
        const term3 = this.state.form.terms[2];


        return validateForm([
            {
                name : "Academic year start",
                characterLimit : null,
                value : this.state.form.academic_year_start,
                customValidators : [{
                    isValid : AcademicYearFormModal.yearIsValid,
                    errorMessage : fieldName => `${fieldName} must be a valid year.`,
                }],
            },
            {
                name : "Term 1 start date",
                characterLimit : null,
                value : term1.start_date,
                customValidators : [{
                    isValid : this.dateIsWithinAcademicYear,
                    errorMessage : fieldName => `${fieldName} must be within the academic years`,
                }],
            },
            {
                name : "Term 1 end date",
                characterLimit : null,
                value : term1.end_date,
                customValidators : [{
                    isValid : this.dateIsWithinAcademicYear,
                    errorMessage : fieldName => `${fieldName} must be within the academic years`,
                }, {
                    isValid : fieldValue => AcademicYearFormModal.dateIsBetween({
                        date : fieldValue,
                        before : term1.start_date,
                        after : term2.start_date,
                    }),
                    errorMessage : fieldName => `${fieldName} must be between Term 1 start date and Term 2 start date`,
                }],
            },
            {
                name : "Term 2 start date",
                characterLimit : null,
                value : term2.start_date,
                customValidators : [{
                    isValid : this.dateIsWithinAcademicYear,
                    errorMessage : fieldName => `${fieldName} must be within the academic years`,
                }, {
                    isValid : fieldValue => AcademicYearFormModal.dateIsBetween({
                        date : fieldValue,
                        before : term1.end_date,
                        after : term2.end_date,
                    }),
                    errorMessage : fieldName => `${fieldName} must be between Term 1 end date and Term 2 end date`,
                }],
            },
            {
                name : "Term 2 end date",
                characterLimit : null,
                value : term2.end_date,
                customValidators : [{
                    isValid : this.dateIsWithinAcademicYear,
                    errorMessage : fieldName => `${fieldName} must be within the academic years`,
                }, {
                    isValid : fieldValue => AcademicYearFormModal.dateIsBetween({
                        date : fieldValue,
                        before : term2.start_date,
                        after : term3.start_date,
                    }),
                    errorMessage : fieldName => `${fieldName} must be between Term 2 start date and Term 3 start date`,
                }],
            },
            {
                name : "Term 3 start date",
                characterLimit : null,
                value : term3.start_date,
                customValidators : [{
                    isValid : this.dateIsWithinAcademicYear,
                    errorMessage : fieldName => `${fieldName} must be within the academic years`,
                }, {
                    isValid : fieldValue => AcademicYearFormModal.dateIsBetween({
                        date : fieldValue,
                        before : term2.end_date,
                        after : term3.end_date,
                    }),
                    errorMessage : fieldName => `${fieldName} must be between Term 2 end date and Term 3 end date`,
                }],
            },
            {
                name : "Term 3 end date",
                characterLimit : null,
                value : term3.end_date,
                customValidators : [{
                    isValid : this.dateIsWithinAcademicYear,
                    errorMessage : fieldName => `${fieldName} must be within the academic years`,
                }, {
                    isValid : fieldValue => AcademicYearFormModal.dateIsBetween({
                        date : fieldValue,
                        before : term3.start_date,
                        after : null,
                    }),
                    errorMessage : fieldName => `${fieldName} must be after Term 3 start date`,
                }],
            },

        ]);
    }

    getTermChangeHandler(term, fieldName) {
        const form = this.state.form;
        return event => {
            const value = event.target.value;
            term[fieldName] = value;
            this.setState({
                form : form,
            });
        };
    }

    getYearChangeHandler() {
        const form = this.state.form;

        return event => {
            const year = event.target.value;
            form.academic_year_start = year;
            this.setState({
                form : form,
            });
        };
    }

    render() {
        const { formHasErrors, fieldErrors } = this.getFormErrors();
        const term1 = this.state.form.terms[0];
        const term2 = this.state.form.terms[1];
        const term3 = this.state.form.terms[2];

        const academicYearFull = `${this.state.form.academic_year_start} - ${parseInt(this.state.form.academic_year_start) + 1}`;

        let academicYearEnd = "";
        if (AcademicYearFormModal.yearIsValid(this.state.form.academic_year_start)) {
            academicYearEnd = parseInt(this.state.form.academic_year_start) + 1;
        }


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
                    {this.props.edit ? `Edit ${academicYearFull}` : "Add an Academic Year"}
                </ModalHeader>

                <ModalBody className="form">
                    <Form>

                        <FormGroup>
                            <Label>Academic Year Start</Label>
                            <Input placeholder="Academic Year Start"
                                   onChange={this.getYearChangeHandler()}
                                   valid={isValid("Academic year start")}
                                   defaultValue={this.state.form.academic_year_start}/>
                            <FormFeedback>{fieldError("Academic year start")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Academic Year End</Label>
                            <Input placeholder="Academic Year End"
                                   value={academicYearEnd}
                                   disabled/>
                            <FormFeedback>{fieldError("Academic year start")}</FormFeedback>
                        </FormGroup>

                        <br/>
                        <h5 className="mb-3">Terms</h5>

                        <FormGroup>
                            <Label>Term 1 Start</Label>
                            <Input type="date"
                                   onChange={this.getTermChangeHandler(term1, "start_date")}
                                   valid={isValid("Term 1 start date")}
                                   defaultValue={term1.start_date}/>
                            <FormFeedback>{fieldError("Term 1 start date")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Term 1 End</Label>
                            <Input type="date"
                                   onChange={this.getTermChangeHandler(term1, "end_date")}
                                   valid={isValid("Term 1 end date")}
                                   defaultValue={term1.end_date}/>
                            <FormFeedback>{fieldError("Term 1 end date")}</FormFeedback>
                        </FormGroup>

                        <br/>

                        <FormGroup>
                            <Label>Term 2 Start</Label>
                            <Input type="date"
                                   onChange={this.getTermChangeHandler(term2, "start_date")}
                                   valid={isValid("Term 2 start date")}
                                   defaultValue={term2.start_date}/>
                            <FormFeedback>{fieldError("Term 2 start date")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Term 2 End</Label>
                            <Input type="date"
                                   onChange={this.getTermChangeHandler(term2, "end_date")}
                                   valid={isValid("Term 2 end date")}
                                   defaultValue={term2.end_date}/>
                            <FormFeedback>{fieldError("Term 2 end date")}</FormFeedback>
                        </FormGroup>

                        <br/>

                        <FormGroup>
                            <Label>Term 3 Start</Label>
                            <Input type="date"
                                   onChange={this.getTermChangeHandler(term3, "start_date")}
                                   valid={isValid("Term 3 start date")}
                                   defaultValue={term3.start_date}/>
                            <FormFeedback>{fieldError("Term 3 start date")}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label>Term 3 End</Label>
                            <Input type="date"
                                   onChange={this.getTermChangeHandler(term3, "end_date")}
                                   valid={isValid("Term 3 end date")}
                                   defaultValue={term3.end_date}/>
                            <FormFeedback>{fieldError("Term 3 end date")}</FormFeedback>
                        </FormGroup>

                    </Form>

                </ModalBody>

                <ModalFooter>
                    <Button outline
                            color="success"
                            disabled={formHasErrors}>
                        {this.props.edit ? "Save changes" : "Add"}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export { AcademicYearFormModal };