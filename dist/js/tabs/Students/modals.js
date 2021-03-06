"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResidenceAddressFormModal = exports.StudentFormModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../dismissable_toast_maker");

var _form_validator = require("../../form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _settings = require("../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitutions(onResult) {
    _graphql2.default.query("\n    {\n        institutions {\n            id\n            name\n        }\n    }\n    ").then(onResult);
}

function fetchInboundPrograms(onResult) {
    _graphql2.default.query("\n    {\n        inbound_programs {\n            id\n            name\n        }\n    }\n    ").then(onResult);
}

function fetchOutboundPrograms(onResult) {
    _graphql2.default.query("\n    {\n        outbound_programs {\n            id\n            name\n        }\n    }\n    ").then(onResult);
}

var StudentFormModal = function (_Component) {
    _inherits(StudentFormModal, _Component);

    function StudentFormModal(props) {
        _classCallCheck(this, StudentFormModal);

        var _this = _possibleConstructorReturn(this, (StudentFormModal.__proto__ || Object.getPrototypeOf(StudentFormModal)).call(this, props));

        _this.state = {
            form: {
                id_number: "",
                first_name: "",
                middle_name: "",
                family_name: "",
                nickname: "",
                birth_date: "",
                sex: "F",
                home_address: "",
                nationality: "",
                civil_status: "S",
                phone_number: "",
                email: "",
                emergency_contact_name: "",
                emergency_contact_relationship: "",
                emergency_contact_number: "",
                college: "CCS",
                category: "IN"
            },
            studentProgramForm: {
                terms_duration: [],
                application_requirements: []
            },
            programs: null,
            institutions: null
        };

        _this.resetForm = _this.resetForm.bind(_this);
        _this.getFormErrors = _this.getFormErrors.bind(_this);
        _this.getChangeHandler = _this.getChangeHandler.bind(_this);
        _this.getSecondChangeHandler = _this.getSecondChangeHandler.bind(_this);
        _this.submitAddStudentForm = _this.submitAddStudentForm.bind(_this);
        _this.submitEditStudentForm = _this.submitEditStudentForm.bind(_this);
        _this.fetchingInstitutions = _this.fetchingInstitutions.bind(_this);
        _this.fetchingPrograms = _this.fetchingPrograms.bind(_this);
        _this.noInstitutions = _this.noInstitutions.bind(_this);
        _this.onSubmitAddStudentForm = _this.onSubmitAddStudentForm.bind(_this);
        _this.setPrograms = _this.setPrograms.bind(_this);
        _this.onCategoryChange = _this.onCategoryChange.bind(_this);
        _this.onTermClick = _this.onTermClick.bind(_this);
        _this.applicantForm = _this.applicantForm.bind(_this);
        _this.getApplicantFormErrors = _this.getApplicantFormErrors.bind(_this);

        fetchInstitutions(function (result) {
            var institutions = result.institutions;
            var form = _this.state.form;

            // Set default institution if institutions exist
            if (institutions.length > 0) {
                form.institution = institutions[0].id;
            }

            _this.setState({
                institutions: institutions,
                form: form
            });
        });

        if (_this.props.applicant) {
            _this.setPrograms("IN");
        }

        if (props.edit) {
            // Copy the object, do not equate, otherwise the object changes along with the form.
            Object.assign(_this.state.form, props.student);

            if (props.student.category === "IN") {
                _this.state.form.institution = props.student.institution.id;
            }
        }
        return _this;
    }

    _createClass(StudentFormModal, [{
        key: "setPrograms",
        value: function setPrograms(category) {
            var _this2 = this;

            if (category === "IN") {
                fetchInboundPrograms(function (result) {
                    var programs = result.inbound_programs;
                    var form = _this2.state.studentProgramForm;

                    if (programs.length > 0) {
                        form.program = programs[0].id;
                    }

                    _this2.setState({
                        programs: programs,
                        studentProgramForm: form
                    });
                });
            } else {
                fetchOutboundPrograms(function (result) {
                    var programs = result.outbound_programs;
                    var form = _this2.state.studentProgramForm;

                    if (programs.length > 0) {
                        form.program = programs[0].id;
                    }

                    _this2.setState({
                        programs: programs,
                        studentProgramForm: form
                    });
                });
            }
        }
    }, {
        key: "resetForm",
        value: function resetForm() {
            this.setState({
                form: {
                    id_number: "",
                    first_name: "",
                    middle_name: "",
                    family_name: "",
                    nickname: "",
                    birth_date: "",
                    sex: "F",
                    home_address: "",
                    nationality: "",
                    civil_status: "S",
                    phone_number: "",
                    email: "",
                    emergency_contact_name: "",
                    emergency_contact_relationship: "",
                    emergency_contact_number: "",
                    college: "CCS",
                    category: "IN"
                }
            });
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            return (0, _form_validator2.default)([{
                name: "ID Number",
                characterLimit: 8,
                value: this.state.form.id_number,
                customValidators: [{
                    isValid: function isValid(fieldValue) {
                        return fieldValue.length === 8;
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be exactly 8 characters.";
                    }
                }]
            }, {
                name: "First name",
                characterLimit: 64,
                value: this.state.form.first_name
            }, {
                name: "Middle name",
                characterLimit: 64,
                optional: true,
                value: this.state.form.middle_name
            }, {
                name: "Family name",
                characterLimit: 64,
                value: this.state.form.family_name
            }, {
                name: "Nickname",
                characterLimit: 64,
                value: this.state.form.nickname,
                optional: true
            }, {
                name: "Birth date",
                characterLimit: null,
                value: this.state.form.birth_date
            }, {
                name: "Home address",
                characterLimit: 256,
                value: this.state.form.home_address
            }, {
                name: "Nationality",
                characterLimit: 64,
                optional: true,
                value: this.state.form.nationality
            }, {
                name: "Phone number",
                characterLimit: 64,
                value: this.state.form.phone_number
            }, {
                name: "Email",
                characterLimit: 256,
                value: this.state.form.email,
                customValidators: [{
                    // isValid checks if the form value is a valid email through this messy regex.
                    isValid: function isValid(fieldValue) {
                        return (/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(fieldValue)
                        );
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be a valid email.";
                    }
                }]
            }, {
                name: "Emergency contact name",
                characterLimit: 64,
                value: this.state.form.emergency_contact_name
            }, {
                name: "Emergency contact relationship",
                characterLimit: 32,
                value: this.state.form.emergency_contact_relationship
            }, {
                name: "Emergency contact number",
                characterLimit: 64,
                value: this.state.form.emergency_contact_number
            }]);
        }
    }, {
        key: "getApplicantFormErrors",
        value: function getApplicantFormErrors() {
            return (0, _form_validator2.default)([{
                name: "ID Number",
                characterLimit: 8,
                value: this.state.form.id_number,
                customValidators: [{
                    isValid: function isValid(fieldValue) {
                        return fieldValue.length === 8;
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be exactly 8 characters.";
                    }
                }]
            }, {
                name: "First name",
                characterLimit: 64,
                value: this.state.form.first_name
            }, {
                name: "Middle name",
                characterLimit: 64,
                optional: true,
                value: this.state.form.middle_name
            }, {
                name: "Family name",
                characterLimit: 64,
                value: this.state.form.family_name
            }, {
                name: "Nickname",
                characterLimit: 64,
                value: this.state.form.nickname,
                optional: true
            }, {
                name: "Birth date",
                characterLimit: null,
                value: this.state.form.birth_date
            }, {
                name: "Home address",
                characterLimit: 256,
                value: this.state.form.home_address
            }, {
                name: "Nationality",
                characterLimit: 64,
                optional: true,
                value: this.state.form.nationality
            }, {
                name: "Phone number",
                characterLimit: 64,
                value: this.state.form.phone_number
            }, {
                name: "Email",
                characterLimit: 256,
                value: this.state.form.email,
                customValidators: [{
                    // isValid checks if the form value is a valid email through this messy regex.
                    isValid: function isValid(fieldValue) {
                        return (/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(fieldValue)
                        );
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be a valid email.";
                    }
                }]
            }, {
                name: "Emergency contact name",
                characterLimit: 64,
                value: this.state.form.emergency_contact_name
            }, {
                name: "Emergency contact relationship",
                characterLimit: 32,
                value: this.state.form.emergency_contact_relationship
            }, {
                name: "Emergency contact number",
                characterLimit: 64,
                value: this.state.form.emergency_contact_number
            }, {
                name: "Terms duration",
                characterLimit: null,
                value: this.state.studentProgramForm.terms_duration.toString(),
                customValidators: [{
                    isValid: function isValid(fieldValue) {
                        return [1, 3].toString() !== fieldValue;
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " must be consecutive";
                    }
                }]
            }]);
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this3 = this;

            var form = this.state.form;
            return function (event) {
                if (fieldName === "category") {
                    _this3.setPrograms(event.target.value);
                }

                form[fieldName] = event.target.value;
                _this3.setState({
                    form: form
                });
            };
        }
    }, {
        key: "getSecondChangeHandler",
        value: function getSecondChangeHandler(fieldName) {
            var _this4 = this;

            var form = this.state.studentProgramForm;
            return function (event) {
                form[fieldName] = event.target.value;
                _this4.setState({
                    studentProgramForm: form
                });
            };
        }
    }, {
        key: "onCategoryChange",
        value: function onCategoryChange(category) {
            this.setPrograms(category);
        }
    }, {
        key: "onTermClick",
        value: function onTermClick(term) {
            var index = this.state.studentProgramForm.terms_duration.indexOf(term);
            if (index < 0) {
                this.state.studentProgramForm.terms_duration.push(term);
            } else {
                this.state.studentProgramForm.terms_duration.splice(index, 1);
            }

            this.setState({
                studentProgramForm: this.state.studentProgramForm
            });
            console.log(this.state.studentProgramForm.terms_duration);
        }
    }, {
        key: "submitAddStudentForm",
        value: function submitAddStudentForm() {
            var _this5 = this;

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/students/",
                data: this.state.form,
                beforeSend: _authorization2.default
            }).done(function (student) {
                var form = _this5.state.studentProgramForm;
                form.student = student.id;
                _this5.setState({
                    studentProgramForm: form
                });
                _this5.onSubmitAddStudentForm(student);
            }).fail(function (response) {
                console.log(response);
            });
        }
    }, {
        key: "onSubmitAddStudentForm",
        value: function onSubmitAddStudentForm(student) {
            var _this6 = this;

            var url = "/programs/";
            if (student.category === "IN") {
                url += "inbound/";
            } else {
                url += "outbound/";
            }

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Adding",
                message: "Adding new applicant..."
            });

            _jquery2.default.post({
                url: "" + _settings2.default.serverURL + url + this.state.studentProgramForm.program + "/students/",
                data: JSON.stringify(this.state.studentProgramForm),
                contentType: "application/json",
                beforeSend: _authorization2.default
            }).done(function (student) {
                dismissToast();
                _izitoast2.default.success({
                    title: "Added",
                    message: "Successfully added applicant"
                });
                _this6.resetForm();
                _this6.props.refresh();
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to add applicant"
                });
            });

            this.props.toggle();
        }
    }, {
        key: "submitEditStudentForm",
        value: function submitEditStudentForm() {
            var _this7 = this;

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Editing",
                message: "Editing student..."
            });

            if (this.state.form.category === "OUT") {
                // Outbound students do not have an institution
                this.state.form.institution = null;
            }

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/students/" + this.state.form.id + "/",
                data: this.state.form,
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this7.resetForm();
                    _this7.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully modified student"
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to edit student"
                    });
                }
            });

            this.props.toggle();
        }
    }, {
        key: "fetchingInstitutions",
        value: function fetchingInstitutions() {
            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Please wait..."
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    "Institutions are loading..."
                )
            );
        }
    }, {
        key: "noInstitutions",
        value: function noInstitutions() {
            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Institutions need to be configured first."
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    "Institutions must exist students can be added."
                )
            );
        }
    }, {
        key: "fetchingPrograms",
        value: function fetchingPrograms() {
            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Please wait..."
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    "Programs are loading..."
                )
            );
        }
    }, {
        key: "applicantForm",
        value: function applicantForm() {
            var _this8 = this;

            if (!this.props.applicant) {
                return null;
            }

            if (this.state.programs !== null) {
                var programs = this.state.programs.map(function (program) {
                    return _react2.default.createElement(
                        "option",
                        { value: program.id, key: program.id },
                        program.name
                    );
                });

                var termButtons = [1, 2, 3].map(function (term) {
                    return _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            key: term,
                            onClick: function onClick() {
                                return _this8.onTermClick(term);
                            },
                            active: _this8.state.studentProgramForm.terms_duration.includes(term) },
                        term
                    );
                });

                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement("br", null),
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-3" },
                        "Program Details"
                    ),
                    _react2.default.createElement(
                        _reactstrap.FormGroup,
                        null,
                        _react2.default.createElement(
                            _reactstrap.Label,
                            null,
                            "Program"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Input,
                            { type: "select",
                                onChange: this.getSecondChangeHandler("program"),
                                value: this.state.studentProgramForm.program },
                            programs
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.FormGroup,
                        null,
                        _react2.default.createElement(
                            _reactstrap.Label,
                            null,
                            "Terms Available"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "d-block w-100" },
                            _react2.default.createElement(
                                _reactstrap.ButtonGroup,
                                null,
                                termButtons
                            )
                        )
                    )
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var formErrors = this.props.applicant ? this.getApplicantFormErrors() : this.getFormErrors();
            var formHasErrors = formErrors.formHasErrors;
            var fieldErrors = formErrors.fieldErrors;

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

            var institutions = this.state.institutions.map(function (institution) {
                return _react2.default.createElement(
                    "option",
                    { value: institution.id,
                        key: institution.id },
                    institution.name
                );
            });

            institutions.unshift(_react2.default.createElement(
                "option",
                { value: "", key: 0 },
                "Select an institution"
            ));

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
                    this.props.edit ? "Edit " + this.state.form.first_name + " " + this.state.form.family_name : "Add a Student"
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    _react2.default.createElement(
                        _reactstrap.Form,
                        null,
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-3" },
                            "Student Details"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "ID Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "ID Number",
                                onChange: this.getChangeHandler("id_number"),
                                valid: isValid("ID Number"),
                                value: this.state.form.id_number }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("ID Number")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "First Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "First Name",
                                onChange: this.getChangeHandler("first_name"),
                                valid: isValid("First name"),
                                value: this.state.form.first_name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("First name")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Middle Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Middle Name",
                                onChange: this.getChangeHandler("middle_name"),
                                valid: isValid("Middle name"),
                                value: this.state.form.middle_name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Middle name")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Family Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Last Name",
                                onChange: this.getChangeHandler("family_name"),
                                valid: isValid("Family name"),
                                value: this.state.form.family_name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Family name")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Nickname"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Nickname",
                                onChange: this.getChangeHandler("nickname"),
                                valid: isValid("Nickname"),
                                value: this.state.form.nickname }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Nickname")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Birth Date"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                placeholder: "Birth Date",
                                onChange: this.getChangeHandler("birth_date"),
                                valid: isValid("Birth date"),
                                value: this.state.form.birth_date }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Birth date")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Sex"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select",
                                    onChange: this.getChangeHandler("sex"),
                                    value: this.state.form.sex },
                                _react2.default.createElement(
                                    "option",
                                    { value: "F" },
                                    "Female"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "M" },
                                    "Male"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Home Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea",
                                placeholder: "Home Address",
                                onChange: this.getChangeHandler("home_address"),
                                valid: isValid("Home address"),
                                value: this.state.form.home_address }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Home address")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Nationality"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Nationality",
                                onChange: this.getChangeHandler("nationality"),
                                valid: isValid("Nationality"),
                                value: this.state.form.nationality }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Nationality")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Civil Status"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select",
                                    onChange: this.getChangeHandler("civil_status"),
                                    value: this.state.form.civil_status },
                                _react2.default.createElement(
                                    "option",
                                    { value: "S" },
                                    "Single"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "M" },
                                    "Married"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "D" },
                                    "Divorced"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "W" },
                                    "Widowed"
                                )
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-3" },
                            "Contact Details"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Phone Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Phone Number",
                                onChange: this.getChangeHandler("phone_number"),
                                valid: isValid("Phone number"),
                                value: this.state.form.phone_number }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Phone number")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Email",
                                onChange: this.getChangeHandler("email"),
                                valid: isValid("Email"),
                                value: this.state.form.email }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Email")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Emergency Contact Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Emergency Contact Name",
                                onChange: this.getChangeHandler("emergency_contact_name"),
                                valid: isValid("Emergency contact name"),
                                value: this.state.form.emergency_contact_name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Emergency contact name")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Emergency Contact Relationship"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Emergency Contact Relationship",
                                onChange: this.getChangeHandler("emergency_contact_relationship"),
                                valid: isValid("Emergency contact relationship"),
                                value: this.state.form.emergency_contact_relationship }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Emergency contact relationship")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Emergency Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Emergency Contact Number",
                                onChange: this.getChangeHandler("emergency_contact_number"),
                                valid: isValid("Emergency contact number"),
                                value: this.state.form.emergency_contact_number }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Emergency contact number")
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-3" },
                            "University Details"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Student Category"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select",
                                    onChange: this.getChangeHandler("category"),
                                    value: this.state.form.category },
                                _react2.default.createElement(
                                    "option",
                                    { value: "IN" },
                                    "Inbound"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "OUT" },
                                    "Outbound"
                                )
                            )
                        ),
                        this.state.form.category === "IN" && _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Institution"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select",
                                    onChange: this.getChangeHandler("institution"),
                                    value: this.state.form.institution },
                                institutions
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "College"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select",
                                    onChange: this.getChangeHandler("college"),
                                    value: this.state.form.college },
                                _react2.default.createElement(
                                    "option",
                                    { value: "CCS" },
                                    "College of Computer Studies"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "RVRCOB" },
                                    "Ramon V. del Rosario College of Business"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "CLA" },
                                    "College of Liberal Arts"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "SOE" },
                                    "School of Economics"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "GCOE" },
                                    "Gokongwei College of Engineering"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "COL" },
                                    "College of Law"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "BAGCED" },
                                    "Brother Andrew Gonzales College of Education"
                                )
                            )
                        ),
                        this.applicantForm()
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            onClick: this.props.edit ? this.submitEditStudentForm : this.submitAddStudentForm,
                            disabled: formHasErrors },
                        this.props.edit ? "Save changes" : "Add"
                    )
                )
            );
        }
    }]);

    return StudentFormModal;
}(_react.Component);

var ResidenceAddressFormModal = function (_Component2) {
    _inherits(ResidenceAddressFormModal, _Component2);

    function ResidenceAddressFormModal(props) {
        _classCallCheck(this, ResidenceAddressFormModal);

        var _this9 = _possibleConstructorReturn(this, (ResidenceAddressFormModal.__proto__ || Object.getPrototypeOf(ResidenceAddressFormModal)).call(this, props));

        _this9.state = {
            form: {
                date_effective: "",
                contact_person_name: "",
                contact_person_number: "",
                address: "",
                residence: ""
            }
        };

        _this9.resetForm = _this9.resetForm.bind(_this9);
        _this9.getFormErrors = _this9.getFormErrors.bind(_this9);
        _this9.getChangeHandler = _this9.getChangeHandler.bind(_this9);
        _this9.submitAddResidenceAddressForm = _this9.submitAddResidenceAddressForm.bind(_this9);
        _this9.submitEditResidenceAddressForm = _this9.submitEditResidenceAddressForm.bind(_this9);

        if (_this9.props.edit) {
            Object.assign(_this9.state.form, props.residence);
        }
        return _this9;
    }

    _createClass(ResidenceAddressFormModal, [{
        key: "resetForm",
        value: function resetForm() {
            this.setState({
                form: {
                    date_effective: "",
                    contact_person_name: "",
                    contact_person_number: "",
                    address: "",
                    residence: ""
                }
            });
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            return (0, _form_validator2.default)([{
                name: "Date effective",
                value: this.state.form.date_effective
            }, {
                name: "Contact person name",
                characterLimit: 256,
                value: this.state.form.contact_person_name
            }, {
                name: "Contact person number",
                characterLimit: 64,
                value: this.state.form.contact_person_number
            }, {
                name: "Address",
                characterLimit: 256,
                value: this.state.form.address
            }, {
                name: "Residence type",
                characterLimit: 64,
                value: this.state.form.residence
            }]);
        }
    }, {
        key: "submitEditResidenceAddressForm",
        value: function submitEditResidenceAddressForm() {
            var _this10 = this;

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Editing",
                message: "Editing residence address..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/students/" + this.props.student.id + "/residency/" + this.props.residence.id + "/",
                method: "PUT",
                beforeSend: _authorization2.default,
                data: this.state.form
            }).done(function () {
                dismissToast();
                _this10.resetForm();
                _izitoast2.default.success({
                    title: "Edited",
                    message: "Successfully edited residence address"
                });

                _this10.props.refreshResidences();
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to edit residence address"
                });
            });

            this.props.toggle();
        }
    }, {
        key: "submitAddResidenceAddressForm",
        value: function submitAddResidenceAddressForm() {
            var _this11 = this;

            this.props.toggle();

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Adding",
                message: "Adding new residence address..."
            });

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/students/" + this.props.student.id + "/residency/",
                beforeSend: _authorization2.default,
                data: this.state.form
            }).done(function () {
                dismissToast();
                _this11.resetForm();
                _izitoast2.default.success({
                    title: "Added",
                    message: "Successfully added residence address"
                });

                _this11.props.refreshResidences();
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to add residence address"
                });
            });
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this12 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;
                _this12.setState({
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
                    null,
                    this.props.edit ? "Edit Residence Address" : "Add a Residence Address"
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
                                "Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea",
                                placeholder: "Address",
                                onChange: this.getChangeHandler("address"),
                                valid: isValid("Address"),
                                value: this.state.form.address }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Address")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Contact Person"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Name",
                                onChange: this.getChangeHandler("contact_person_name"),
                                valid: isValid("Contact person name"),
                                value: this.state.form.contact_person_name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Contact person name")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Number",
                                onChange: this.getChangeHandler("contact_person_number"),
                                valid: isValid("Contact person number"),
                                value: this.state.form.contact_person_number }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Contact person number")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Residence Type"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Residence Type",
                                onChange: this.getChangeHandler("residence"),
                                valid: isValid("Residence type"),
                                value: this.state.form.residence }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Residence type")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Date Effective"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                value: this.state.form.date_effective,
                                onChange: this.getChangeHandler("date_effective"),
                                valid: isValid("Date effective") }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Date effective")
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
                            disabled: formHasErrors,
                            onClick: this.props.edit ? this.submitEditResidenceAddressForm : this.submitAddResidenceAddressForm },
                        this.props.edit ? "Save changes" : "Add"
                    )
                )
            );
        }
    }]);

    return ResidenceAddressFormModal;
}(_react.Component);

exports.StudentFormModal = StudentFormModal;
exports.ResidenceAddressFormModal = ResidenceAddressFormModal;
//# sourceMappingURL=modals.js.map