"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AcceptApplicantModal = exports.DeployApplicantModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form_validator = require("../../../form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

var _reactstrap = require("reactstrap");

var _authorization = require("../../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeployApplicantModal = function (_Component) {
    _inherits(DeployApplicantModal, _Component);

    function DeployApplicantModal(props) {
        _classCallCheck(this, DeployApplicantModal);

        var _this = _possibleConstructorReturn(this, (DeployApplicantModal.__proto__ || Object.getPrototypeOf(DeployApplicantModal)).call(this, props));

        _this.state = {
            form: {
                default_units: "",
                total_units_enrolled: ""
            }
        };

        _this.getFormErrors = _this.getFormErrors.bind(_this);
        _this.deployStudent = _this.deployStudent.bind(_this);
        return _this;
    }

    _createClass(DeployApplicantModal, [{
        key: "deployStudent",
        value: function deployStudent() {
            $.post({
                url: _settings2.default.serverURL + "/programs/outbound/students/" + this.props.student.id + "/deploy/",
                beforeSend: _authorization2.default,
                data: this.state.form
            }).then(function (response) {
                console.log(response);
            }).fail(function (error) {
                console.log(error);
            });

            this.props.toggle();
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this2 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;
                _this2.setState({
                    form: form
                });
            };
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            var isValidIntegerValidator = {
                isValid: function isValid(fieldValue) {
                    return (/^-{0,1}\d+$/.test(fieldValue)
                    );
                },
                errorMessage: function errorMessage(fieldValue) {
                    return fieldValue + " must be a valid integer";
                }
            };

            var isPositiveIntegerValidator = {
                isValid: function isValid(fieldValue) {
                    return parseInt(fieldValue) > 0;
                },
                errorMessage: function errorMessage(fieldValue) {
                    return fieldValue + " must be greater than 0.";
                }
            };

            return (0, _form_validator2.default)([{
                name: "Default units",
                characterLimit: null,
                value: this.state.form.default_units,
                customValidators: [isValidIntegerValidator, isPositiveIntegerValidator]
            }, {
                name: "Total units enrolled",
                characterLimit: null,
                value: this.state.form.total_units_enrolled,
                customValidators: [isValidIntegerValidator, isPositiveIntegerValidator]
            }]);
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
                    { toggle: this.props.toggle },
                    "Deploy Student"
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
                                "Default Units"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Default Units",
                                onChange: this.getChangeHandler("default_units"),
                                valid: isValid("Default units"),
                                value: this.state.form.default_units }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Default units")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Total Units Enrolled"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Total Units Enrolled",
                                onChange: this.getChangeHandler("total_units_enrolled"),
                                valid: isValid("Total units enrolled"),
                                value: this.state.form.total_units_enrolled }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Total units enrolled")
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
                            onClick: this.deployStudent,
                            disabled: formHasErrors },
                        "Deploy Student"
                    )
                )
            );
        }
    }]);

    return DeployApplicantModal;
}(_react.Component);

var AcceptApplicantModal = function (_Component2) {
    _inherits(AcceptApplicantModal, _Component2);

    function AcceptApplicantModal(props) {
        _classCallCheck(this, AcceptApplicantModal);

        var _this3 = _possibleConstructorReturn(this, (AcceptApplicantModal.__proto__ || Object.getPrototypeOf(AcceptApplicantModal)).call(this, props));

        _this3.state = {
            form: {
                total_units_enrolled: "",
                inbound_courses: []
            }
        };

        _this3.getFormErrors = _this3.getFormErrors.bind(_this3);
        _this3.acceptStudent = _this3.acceptStudent.bind(_this3);
        return _this3;
    }

    _createClass(AcceptApplicantModal, [{
        key: "acceptStudent",
        value: function acceptStudent() {
            var _this4 = this;

            $.post({
                url: _settings2.default.serverURL + "/programs/inbound/students/" + this.props.student.id + "/accept/",
                beforeSend: _authorization2.default,
                data: JSON.stringify(this.state.form),
                contentType: "application/json"
            }).then(function () {
                _this4.props.refreshStudents();
                _izitoast2.default.success({
                    title: "Accepted",
                    message: "Student has been accepted"
                });
            }).fail(function (error) {
                console.log(error);

                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to accept student"
                });
            });

            this.props.toggle();
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this5 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;
                _this5.setState({
                    form: form
                });
            };
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            var isValidIntegerValidator = {
                isValid: function isValid(fieldValue) {
                    return (/^-{0,1}\d+$/.test(fieldValue)
                    );
                },
                errorMessage: function errorMessage(fieldValue) {
                    return fieldValue + " must be a valid integer";
                }
            };

            var isPositiveIntegerValidator = {
                isValid: function isValid(fieldValue) {
                    return parseInt(fieldValue) > 0;
                },
                errorMessage: function errorMessage(fieldValue) {
                    return fieldValue + " must be greater than 0.";
                }
            };

            return (0, _form_validator2.default)([{
                name: "Total units enrolled",
                characterLimit: null,
                value: this.state.form.total_units_enrolled,
                customValidators: [isValidIntegerValidator, isPositiveIntegerValidator]
            }]);
        }
    }, {
        key: "render",
        value: function render() {
            var _getFormErrors2 = this.getFormErrors(),
                formHasErrors = _getFormErrors2.formHasErrors,
                fieldErrors = _getFormErrors2.fieldErrors;

            function isValid(fieldName) {
                return fieldErrors[fieldName].length === 0;
            }

            function fieldError(fieldName) {
                return fieldErrors[fieldName][0];
            }

            console.log(formHasErrors, fieldErrors, isValid("Total units enrolled"));

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Accept Student"
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
                                "Total Units Enrolled"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Total Units Enrolled",
                                onChange: this.getChangeHandler("total_units_enrolled"),
                                valid: isValid("Total units enrolled"),
                                value: this.state.form.total_units_enrolled }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Total units enrolled")
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
                            onClick: this.acceptStudent,
                            disabled: formHasErrors },
                        "Accept Student"
                    )
                )
            );
        }
    }]);

    return AcceptApplicantModal;
}(_react.Component);

exports.DeployApplicantModal = DeployApplicantModal;
exports.AcceptApplicantModal = AcceptApplicantModal;
//# sourceMappingURL=modals.js.map