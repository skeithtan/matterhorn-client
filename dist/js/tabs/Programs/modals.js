"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StudentFormModal = exports.AcademicYearFormModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _form_validator = require("../../form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcademicYearFormModal = function (_Component) {
    _inherits(AcademicYearFormModal, _Component);

    function AcademicYearFormModal(props) {
        _classCallCheck(this, AcademicYearFormModal);

        var _this = _possibleConstructorReturn(this, (AcademicYearFormModal.__proto__ || Object.getPrototypeOf(AcademicYearFormModal)).call(this, props));

        _this.state = {
            form: {
                academic_year_start: "",
                terms: [{
                    number: 1,
                    start_date: "",
                    end_date: ""
                }, {
                    number: 2,
                    start_date: "",
                    end_date: ""
                }, {
                    number: 3,
                    start_date: "",
                    end_date: ""
                }]
            }
        };

        _this.dateIsWithinAcademicYear = _this.dateIsWithinAcademicYear.bind(_this);
        _this.getTermChangeHandler = _this.getTermChangeHandler.bind(_this);
        _this.getYearChangeHandler = _this.getYearChangeHandler.bind(_this);
        _this.getFormErrors = _this.getFormErrors.bind(_this);
        return _this;
    }

    _createClass(AcademicYearFormModal, [{
        key: "dateIsWithinAcademicYear",
        value: function dateIsWithinAcademicYear(date) {
            var academicYearStart = this.state.form.academic_year_start;
            if (!AcademicYearFormModal.yearIsValid(academicYearStart)) {
                // Cannot verify if it's valid without a valid academic year
                return true;
            }

            var parsedYear = parseInt(academicYearStart);

            academicYearStart = (0, _moment2.default)().dayOfYear(1).year(parsedYear);
            var academicYearEnd = (0, _moment2.default)().dayOfYear(356).year(parsedYear + 1); //Limit of term dates

            var dateMoment = (0, _moment2.default)(date);

            return dateMoment.isSameOrAfter(academicYearStart) && dateMoment.isSameOrBefore(academicYearEnd);
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            var term1 = this.state.form.terms[0];
            var term2 = this.state.form.terms[1];
            var term3 = this.state.form.terms[2];

            return (0, _form_validator2.default)([{
                name: "Academic year start",
                characterLimit: null,
                value: this.state.form.academic_year_start,
                customValidators: [{
                    isValid: AcademicYearFormModal.yearIsValid,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be a valid year.";
                    }
                }]
            }, {
                name: "Term 1 start date",
                characterLimit: null,
                value: term1.start_date,
                customValidators: [{
                    isValid: this.dateIsWithinAcademicYear,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be within the academic years";
                    }
                }]
            }, {
                name: "Term 1 end date",
                characterLimit: null,
                value: term1.end_date,
                customValidators: [{
                    isValid: this.dateIsWithinAcademicYear,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be within the academic years";
                    }
                }, {
                    isValid: function isValid(fieldValue) {
                        return AcademicYearFormModal.dateIsBetween({
                            date: fieldValue,
                            before: term1.start_date,
                            after: term2.start_date
                        });
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be between Term 1 start date and Term 2 start date";
                    }
                }]
            }, {
                name: "Term 2 start date",
                characterLimit: null,
                value: term2.start_date,
                customValidators: [{
                    isValid: this.dateIsWithinAcademicYear,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be within the academic years";
                    }
                }, {
                    isValid: function isValid(fieldValue) {
                        return AcademicYearFormModal.dateIsBetween({
                            date: fieldValue,
                            before: term1.end_date,
                            after: term2.end_date
                        });
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be between Term 1 end date and Term 2 end date";
                    }
                }]
            }, {
                name: "Term 2 end date",
                characterLimit: null,
                value: term2.end_date,
                customValidators: [{
                    isValid: this.dateIsWithinAcademicYear,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be within the academic years";
                    }
                }, {
                    isValid: function isValid(fieldValue) {
                        return AcademicYearFormModal.dateIsBetween({
                            date: fieldValue,
                            before: term2.start_date,
                            after: term3.start_date
                        });
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be between Term 2 start date and Term 3 start date";
                    }
                }]
            }, {
                name: "Term 3 start date",
                characterLimit: null,
                value: term3.start_date,
                customValidators: [{
                    isValid: this.dateIsWithinAcademicYear,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be within the academic years";
                    }
                }, {
                    isValid: function isValid(fieldValue) {
                        return AcademicYearFormModal.dateIsBetween({
                            date: fieldValue,
                            before: term2.end_date,
                            after: term3.end_date
                        });
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be between Term 2 end date and Term 3 end date";
                    }
                }]
            }, {
                name: "Term 3 end date",
                characterLimit: null,
                value: term3.end_date,
                customValidators: [{
                    isValid: this.dateIsWithinAcademicYear,
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be within the academic years";
                    }
                }, {
                    isValid: function isValid(fieldValue) {
                        return AcademicYearFormModal.dateIsBetween({
                            date: fieldValue,
                            before: term3.start_date,
                            after: null
                        });
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be after Term 3 start date";
                    }
                }]
            }]);
        }
    }, {
        key: "getTermChangeHandler",
        value: function getTermChangeHandler(term, fieldName) {
            var _this2 = this;

            var form = this.state.form;
            return function (event) {
                var value = event.target.value;
                term[fieldName] = value;
                _this2.setState({
                    form: form
                });
            };
        }
    }, {
        key: "getYearChangeHandler",
        value: function getYearChangeHandler() {
            var _this3 = this;

            var form = this.state.form;

            return function (event) {
                var year = event.target.value;
                form.academic_year_start = year;
                _this3.setState({
                    form: form
                });
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _getFormErrors = this.getFormErrors(),
                formHasErrors = _getFormErrors.formHasErrors,
                fieldErrors = _getFormErrors.fieldErrors;

            var term1 = this.state.form.terms[0];
            var term2 = this.state.form.terms[1];
            var term3 = this.state.form.terms[2];

            var academicYearFull = this.state.form.academic_year_start + " - " + (parseInt(this.state.form.academic_year_start) + 1);

            var academicYearEnd = "";
            if (AcademicYearFormModal.yearIsValid(this.state.form.academic_year_start)) {
                academicYearEnd = parseInt(this.state.form.academic_year_start) + 1;
            }

            function isValid(fieldName) {
                return fieldErrors[fieldName].length === 0;
            }

            function fieldError(fieldName) {
                return fieldErrors[fieldName][0];
            }

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    this.props.edit ? "Edit " + academicYearFull : "Add an Academic Year"
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    _react2.default.createElement(
                        _reactstrap.Form,
                        null,
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Academic Year Start"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Academic Year Start",
                                onChange: this.getYearChangeHandler(),
                                valid: isValid("Academic year start"),
                                defaultValue: this.state.form.academic_year_start }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Academic year start")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Academic Year End"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Academic Year End",
                                value: academicYearEnd,
                                disabled: true }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Academic year start")
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-3" },
                            "Terms"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Term 1 Start"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                onChange: this.getTermChangeHandler(term1, "start_date"),
                                valid: isValid("Term 1 start date"),
                                defaultValue: term1.start_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Term 1 start date")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Term 1 End"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                onChange: this.getTermChangeHandler(term1, "end_date"),
                                valid: isValid("Term 1 end date"),
                                defaultValue: term1.end_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Term 1 end date")
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Term 2 Start"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                onChange: this.getTermChangeHandler(term2, "start_date"),
                                valid: isValid("Term 2 start date"),
                                defaultValue: term2.start_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Term 2 start date")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Term 2 End"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                onChange: this.getTermChangeHandler(term2, "end_date"),
                                valid: isValid("Term 2 end date"),
                                defaultValue: term2.end_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Term 2 end date")
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Term 3 Start"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                onChange: this.getTermChangeHandler(term3, "start_date"),
                                valid: isValid("Term 3 start date"),
                                defaultValue: term3.start_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Term 3 start date")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Term 3 End"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                onChange: this.getTermChangeHandler(term3, "end_date"),
                                valid: isValid("Term 3 end date"),
                                defaultValue: term3.end_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Term 3 end date")
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            disabled: formHasErrors },
                        this.props.edit ? "Save changes" : "Add"
                    )
                )
            );
        }
    }], [{
        key: "yearIsValid",
        value: function yearIsValid(academicYearStart) {
            var year = parseInt(academicYearStart);
            if (isNaN(year)) {
                return false;
            }

            return year > 1900 && year < 2500;
        }
    }, {
        key: "dateIsBetween",
        value: function dateIsBetween(object) {
            var date = object.date,
                before = object.before,
                after = object.after;


            if (!date) {
                return true;
            }

            var dateMoment = (0, _moment2.default)(date);

            if (before === "" && after === "") {
                // Cannot validate without values
                return true;
            }

            if (before && before.length > 1) {
                var beforeMoment = (0, _moment2.default)(before);

                if (beforeMoment.isAfter(dateMoment)) {
                    return false;
                }
            }

            if (after && after.length > 1) {
                var afterMoment = (0, _moment2.default)(after);

                if (afterMoment.isBefore(dateMoment)) {
                    return false;
                }
            }

            return true;
        }
    }]);

    return AcademicYearFormModal;
}(_react.Component);

function fetchAllStudents(onResult) {
    _graphql2.default.query("\n    {\n        students {\n            id\n            first_name\n            middle_name\n            family_name\n        }\n    }\n    ").then(onResult);
}

var StudentFormModal = function (_Component2) {
    _inherits(StudentFormModal, _Component2);

    function StudentFormModal(props) {
        _classCallCheck(this, StudentFormModal);

        var _this4 = _possibleConstructorReturn(this, (StudentFormModal.__proto__ || Object.getPrototypeOf(StudentFormModal)).call(this, props));

        _this4.componentWillReceiveProps(props);
        return _this4;
    }

    _createClass(StudentFormModal, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            var _this5 = this;

            this.state = {
                studentList: null,
                form: {
                    study_field: "",
                    students: []
                }
            };

            fetchAllStudents(function (result) {
                _this5.setState({
                    studentList: result.students
                });
            });

            if (newProps.program !== undefined) {
                Object.assign(this.state.form, newProps.program);
                this.state.form.students = [];
            }
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this6 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;

                _this6.setState({
                    form: form
                });
            };
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.studyFields === null) {}

            if (this.props.studyFields.length === 0) {}

            var studyFields = this.props.studyFields.map(function (studyField, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index, value: studyField.id },
                    studyField.studyField
                );
            });

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true,
                    id: "add-students-modal" },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    null,
                    "Add Students to ",
                    this.props.activeProgram.name
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    _react2.default.createElement(
                        _reactstrap.Form,
                        null,
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Study Field"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", defaultValue: this.state.form.category,
                                    onChange: this.getChangeHandler("study_field") },
                                studyFields
                            )
                        ),
                        _react2.default.createElement("br", null),
                        this.state.studentList !== null && _react2.default.createElement(
                            "div",
                            null,
                            _react2.default.createElement(
                                "h5",
                                null,
                                "Students"
                            ),
                            _react2.default.createElement(
                                "small",
                                { className: "text-secondary mb-3 d-block" },
                                "Select all students that apply to this study field."
                            ),
                            _react2.default.createElement(_reactstrap.ListGroup, null)
                        )
                    )
                )
            );
        }
    }]);

    return StudentFormModal;
}(_react.Component);

exports.AcademicYearFormModal = AcademicYearFormModal;
exports.StudentFormModal = StudentFormModal;
//# sourceMappingURL=modals.js.map