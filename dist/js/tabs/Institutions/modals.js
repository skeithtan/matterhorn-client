"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteInstitutionModal = exports.InstitutionFormModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../dismissable_toast_maker");

var _dismissable_toast_maker2 = _interopRequireDefault(_dismissable_toast_maker);

var _form_validator = require("../../form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

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

var InstitutionFormModal = function (_Component) {
    _inherits(InstitutionFormModal, _Component);

    function InstitutionFormModal(props) {
        _classCallCheck(this, InstitutionFormModal);

        var _this = _possibleConstructorReturn(this, (InstitutionFormModal.__proto__ || Object.getPrototypeOf(InstitutionFormModal)).call(this, props));

        _this.state = {
            form: {
                name: "",
                country: "Afghanistan",
                address: "",
                website: "",
                contact_person_email: "",
                contact_person_name: "",
                contact_person_number: "",
                agreement: "B"
            }
        };

        _this.getFormErrors = _this.getFormErrors.bind(_this);
        _this.getChangeHandler = _this.getChangeHandler.bind(_this);

        _this.submitAddInstitutionForm = _this.submitAddInstitutionForm.bind(_this);
        _this.submitEditInstitutionForm = _this.submitEditInstitutionForm.bind(_this);

        if (_this.props.edit) {
            _this.state.form = props.institution;
            _this.state.form.contact_person_number = props.institution.contactPersonNumber;
            _this.state.form.contact_person_email = props.institution.contactPersonEmail;
            _this.state.form.contact_person_name = props.institution.contactPersonName;
        }
        return _this;
    }

    _createClass(InstitutionFormModal, [{
        key: "getFormErrors",
        value: function getFormErrors() {
            return (0, _form_validator2.default)([{
                name: "Name",
                characterLimit: 64,
                value: this.state.form.name
            }, {
                name: "Address",
                characterLimit: 256,
                value: this.state.form.address
            }, {
                name: "Website",
                characterLimit: 256,
                value: this.state.form.website
            }, {
                name: "Contact person name",
                characterLimit: 256,
                value: this.state.form.contact_person_name
            }, {
                name: "Contact person number",
                characterLimit: 64,
                value: this.state.form.contact_person_number
            }, {
                name: "Contact person email",
                characterLimit: 256,
                value: this.state.form.contact_person_email,
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
            }]);
        }
    }, {
        key: "submitAddInstitutionForm",
        value: function submitAddInstitutionForm() {
            var _this2 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Adding",
                message: "Adding new institution..."
            });
            _jquery2.default.post({
                url: _settings2.default.serverURL + "/institutions/",
                data: this.state.form,
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this2.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully added institution"
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to add institution"
                    });
                }
            });

            this.props.toggle();
        }
    }, {
        key: "submitEditInstitutionForm",
        value: function submitEditInstitutionForm() {
            var _this3 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Editing",
                message: "Editing institution..."
            });

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/institutions/" + this.state.form.id + "/",
                data: this.state.form,
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this3.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully modified institution"
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to edit institution"
                    });
                }
            });

            this.props.toggle();
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this4 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;
                _this4.setState({
                    form: form
                });
            };
        }
    }, {
        key: "render",
        value: function render() {
            var formErrors = this.getFormErrors();
            var formHasErrors = formErrors.formHasErrors;
            var fieldErrors = formErrors.fieldErrors;

            var countries = _settings2.default.countries.map(function (name, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index },
                    name
                );
            });

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true,
                    onOpened: InstitutionFormModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    this.props.edit ? "Edit " + this.state.form.name : "Add an Institution"
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
                            "Institution Details"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Institution Name", className: "text-input",
                                onChange: this.getChangeHandler("name"),
                                valid: fieldErrors["Name"].length === 0,
                                defaultValue: this.state.form.name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldErrors["Name"][0]
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Country"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", onChange: this.getChangeHandler("country"),
                                    defaultValue: this.state.form.country },
                                countries
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea", placeholder: "Address",
                                className: "text-input", onChange: this.getChangeHandler("address"),
                                valid: fieldErrors["Address"].length === 0,
                                defaultValue: this.state.form.address }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldErrors["Address"][0]
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Website"
                            ),
                            _react2.default.createElement(
                                _reactstrap.InputGroup,
                                null,
                                _react2.default.createElement(
                                    _reactstrap.InputGroupAddon,
                                    null,
                                    "http://"
                                ),
                                _react2.default.createElement(_reactstrap.Input, { placeholder: "Website", className: "text-input",
                                    onChange: this.getChangeHandler("website"),
                                    valid: fieldErrors["Website"].length === 0,
                                    defaultValue: this.state.form.website })
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "hidden", value: this.state.form.website,
                                valid: fieldErrors["Website"].length === 0 }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    fieldErrors["Website"][0]
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Agreement Type"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", onChange: this.getChangeHandler("agreement"),
                                    defaultValue: this.state.form.agreement },
                                _react2.default.createElement(
                                    "option",
                                    { value: "B" },
                                    "Bilateral"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "M" },
                                    "Multilateral"
                                )
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-3" },
                            "Contact"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Contact Person"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Name", className: "text-input",
                                onChange: this.getChangeHandler("contact_person_name"),
                                valid: fieldErrors["Contact person name"].length === 0,
                                defaultValue: this.state.form.contact_person_name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldErrors["Contact person name"][0]
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Contact Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email", placeholder: "Email", className: "text-input",
                                onChange: this.getChangeHandler("contact_person_email"),
                                valid: fieldErrors["Contact person email"].length === 0,
                                defaultValue: this.state.form.contact_person_email }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldErrors["Contact person email"][0]
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
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Number", className: "text-input",
                                onChange: this.getChangeHandler("contact_person_number"),
                                valid: fieldErrors["Contact person number"].length === 0,
                                defaultValue: this.state.form.contact_person_number }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldErrors["Contact person number"][0]
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success",
                            onClick: this.props.edit ? this.submitEditInstitutionForm : this.submitAddInstitutionForm,
                            disabled: formHasErrors },
                        this.props.edit ? "Edit" : "Add"
                    )
                )
            );
        }
    }]);

    return InstitutionFormModal;
}(_react.Component);

var DeleteInstitutionModal = function (_Component2) {
    _inherits(DeleteInstitutionModal, _Component2);

    function DeleteInstitutionModal(props) {
        _classCallCheck(this, DeleteInstitutionModal);

        var _this5 = _possibleConstructorReturn(this, (DeleteInstitutionModal.__proto__ || Object.getPrototypeOf(DeleteInstitutionModal)).call(this, props));

        _this5.confirmDelete = _this5.confirmDelete.bind(_this5);
        return _this5;
    }

    _createClass(DeleteInstitutionModal, [{
        key: "confirmDelete",
        value: function confirmDelete() {
            var _this6 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Deleting",
                message: "Deleting institution..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/",
                method: "DELETE",
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this6.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Institution deleted",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to delete institution",
                        progressBar: false
                    });
                }
            });
            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "delete-institution-modal" },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { className: "text-danger" },
                    "Are you sure you want to delete ",
                    this.props.institution.name,
                    "?"
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    null,
                    "This cannot be undone."
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { color: "danger", onClick: this.confirmDelete },
                        "Confirm Delete"
                    )
                )
            );
        }
    }]);

    return DeleteInstitutionModal;
}(_react.Component);

var AddMemorandumModal = function (_Component3) {
    _inherits(AddMemorandumModal, _Component3);

    function AddMemorandumModal(props) {
        _classCallCheck(this, AddMemorandumModal);

        var _this7 = _possibleConstructorReturn(this, (AddMemorandumModal.__proto__ || Object.getPrototypeOf(AddMemorandumModal)).call(this, props));

        _this7.state = {
            memorandumType: "Agreement"
        };
        return _this7;
    }

    _createClass(AddMemorandumModal, [{
        key: "submitForm",
        value: function submitForm() {
            //TODO
        }
    }, {
        key: "setMemorandumType",
        value: function setMemorandumType(type) {
            this.setState({
                memorandumType: type
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            return _react2.default.createElement(
                _reactstrap.Modal,
                { id: "add-memorandum-modal", isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true,
                    onOpened: AddMemorandumModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Add a Memorandum"
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
                                { "for": "add-institution-name" },
                                "Type of Memorandum"
                            ),
                            _react2.default.createElement(
                                _reactstrap.ButtonGroup,
                                null,
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true,
                                        color: "success",
                                        active: this.state.memorandumType === "Agreement",
                                        onClick: function onClick() {
                                            return _this8.setMemorandumType("Agreement");
                                        } },
                                    "Agreement"
                                ),
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true,
                                        color: "success",
                                        active: this.state.memorandumType === "Understanding",
                                        onClick: function onClick() {
                                            return _this8.setMemorandumType("Understanding");
                                        } },
                                    "Understanding"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-name" },
                                "Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-name", placeholder: "Institution Name", className: "text-input" })
                        )
                    )
                ),
                _react2.default.createElement(_reactstrap.ModalFooter, null)
            );
        }
    }], [{
        key: "addValidation",
        value: function addValidation() {
            //TODO
        }
    }]);

    return AddMemorandumModal;
}(_react.Component);

exports.InstitutionFormModal = InstitutionFormModal;
exports.DeleteInstitutionModal = DeleteInstitutionModal;
//# sourceMappingURL=modals.js.map