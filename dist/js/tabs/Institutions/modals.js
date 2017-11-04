"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditMemorandumModal = exports.DeleteMemorandumModal = exports.AddMemorandumModal = exports.DeleteInstitutionModal = exports.InstitutionFormModal = undefined;

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

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

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
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Institution Name",
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
                                onChange: this.getChangeHandler("address"),
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
                                _react2.default.createElement(_reactstrap.Input, { placeholder: "Website",
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
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Name",
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
                            _react2.default.createElement(_reactstrap.Input, { type: "email", placeholder: "Email",
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
                            _react2.default.createElement(_reactstrap.Input, { placeholder: "Number",
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

        _this7.submitForm = _this7.submitForm.bind(_this7);
        return _this7;
    }

    _createClass(AddMemorandumModal, [{
        key: "submitForm",
        value: function submitForm() {
            var _this8 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Adding",
                message: "Adding new memorandum..."
            });

            console.log(this.props.institution.id);

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/memorandums/",
                data: {
                    institution: this.props.institution.id,
                    category: (0, _jquery2.default)("#add-memorandum-category").val(),
                    memorandum_file: (0, _jquery2.default)("#add-memorandum-file").val(),
                    date_effective: (0, _jquery2.default)("#add-memorandum-date-effective").val(),
                    date_expiration: (0, _jquery2.default)("#add-memorandum-expiration-date").val(),
                    college_initiator: (0, _jquery2.default)("#add-memorandum-college-initiator").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this8.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully added memorandum"
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to add memorandum"
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
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "add-memorandum-modal",
                    onOpened: AddMemorandumModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Add a Memorandum to ",
                    this.props.institution.name
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
                                { "for": "add-memorandum-category" },
                                "Category"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { id: "add-memorandum-category", type: "select" },
                                _react2.default.createElement(
                                    "option",
                                    { value: "MOA" },
                                    "Memorandum of Agreement"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "MOU" },
                                    "Memorandum of Understanding"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-memorandum-file" },
                                "File Link"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-memorandum-file", placeholder: "File Link", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-memorandum-date-effective" },
                                "Date Effective"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "add-memorandum-date-effective", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-memorandum-expiration-date" },
                                "Expiration Date"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "add-memorandum-expiration-date", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-memorandum-college-initiator" },
                                "College Initiator"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-memorandum-college-initiator" },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", id: "add-memorandum-modal-submit",
                            onClick: this.submitForm },
                        "Add Memorandum"
                    )
                )
            );
        }
    }], [{
        key: "addValidation",
        value: function (_addValidation) {
            function addValidation() {
                return _addValidation.apply(this, arguments);
            }

            addValidation.toString = function () {
                return _addValidation.toString();
            };

            return addValidation;
        }(function () {
            addValidation({
                inputs: (0, _jquery2.default)("#add-memorandum-modal").find(".text-input"),
                button: (0, _jquery2.default)("#add-memorandum-modal-submit")
            });
        })
    }]);

    return AddMemorandumModal;
}(_react.Component);

var DeleteMemorandumModal = function (_Component4) {
    _inherits(DeleteMemorandumModal, _Component4);

    function DeleteMemorandumModal(props) {
        _classCallCheck(this, DeleteMemorandumModal);

        var _this9 = _possibleConstructorReturn(this, (DeleteMemorandumModal.__proto__ || Object.getPrototypeOf(DeleteMemorandumModal)).call(this, props));

        _this9.confirmDelete = _this9.confirmDelete.bind(_this9);
        return _this9;
    }

    _createClass(DeleteMemorandumModal, [{
        key: "confirmDelete",
        value: function confirmDelete() {
            var _this10 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Deleting",
                message: "Deleting memorandum..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/memorandums/" + this.props.memorandum.id,
                method: "DELETE",
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this10.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Memorandum deleted",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to delete memorandum",
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
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "delete-memorandum-modal" },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Delete Memorandum"
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
                        { color: "danger", id: "delete-memorandum-modal-submit",
                            onClick: this.confirmDelete },
                        "Delete"
                    )
                )
            );
        }
    }]);

    return DeleteMemorandumModal;
}(_react.Component);

var EditMemorandumModal = function (_Component5) {
    _inherits(EditMemorandumModal, _Component5);

    function EditMemorandumModal(props) {
        _classCallCheck(this, EditMemorandumModal);

        var _this11 = _possibleConstructorReturn(this, (EditMemorandumModal.__proto__ || Object.getPrototypeOf(EditMemorandumModal)).call(this, props));

        _this11.submitForm = _this11.submitForm.bind(_this11);
        return _this11;
    }

    _createClass(EditMemorandumModal, [{
        key: "submitForm",
        value: function submitForm() {
            var _this12 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Editing",
                message: "Editing memorandum..."
            });

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/memorandums/" + this.props.memorandum.id + "/",
                data: {
                    institution: this.props.institution.id,
                    category: (0, _jquery2.default)("#edit-memorandum-category").val(),
                    memorandum_file: (0, _jquery2.default)("#edit-memorandum-file").val(),
                    date_effective: (0, _jquery2.default)("#edit-memorandum-date-effective").val(),
                    date_expiration: (0, _jquery2.default)("#edit-memorandum-expiration-date").val(),
                    college_initiator: (0, _jquery2.default)("#edit-memorandum-college-initiator").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this12.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully modified memorandum"
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to edit memorandum"
                    });
                }
            });

            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            var memorandum = this.props.memorandum;
            var dateEffective = (0, _moment2.default)(memorandum.dateEffective).format("YYYY-MM-DD");
            var dateExpiration = (0, _moment2.default)(memorandum.dateExpiration).format("YYYY-MM-DD");

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "edit-memorandum-modal",
                    onOpened: EditMemorandumModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Edit Memorandum"
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
                                { "for": "edit-memorandum-category" },
                                "Category"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { id: "edit-memorandum-category", type: "select", defaultValue: memorandum.category },
                                _react2.default.createElement(
                                    "option",
                                    { value: "MOA" },
                                    "Memorandum of Agreement"
                                ),
                                _react2.default.createElement(
                                    "option",
                                    { value: "MOU" },
                                    "Memorandum of Understanding"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-memorandum-file" },
                                "File Link"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-memorandum-file", placeholder: "File Link", className: "text-input",
                                defaultValue: memorandum.memorandumFile })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-memorandum-date-effective" },
                                "Date Effective"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "edit-memorandum-date-effective", className: "text-input",
                                defaultValue: dateEffective })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-memorandum-expiration-date" },
                                "Expiration Date"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "edit-memorandum-expiration-date", className: "text-input",
                                defaultValue: dateExpiration })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-memorandum-college-initiator" },
                                "College Initiator"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-memorandum-college-initiator",
                                    defaultValue: memorandum.collegeInitiator },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", id: "edit-memorandum-modal-submit",
                            onClick: this.submitForm },
                        "Edit"
                    )
                )
            );
        }
    }], [{
        key: "addValidation",
        value: function (_addValidation2) {
            function addValidation() {
                return _addValidation2.apply(this, arguments);
            }

            addValidation.toString = function () {
                return _addValidation2.toString();
            };

            return addValidation;
        }(function () {
            addValidation({
                inputs: (0, _jquery2.default)("#edit-memorandum-modal").find(".text-input"),
                button: (0, _jquery2.default)("#edit-memorandum-modal-submit")
            });
        })
    }]);

    return EditMemorandumModal;
}(_react.Component);

exports.InstitutionFormModal = InstitutionFormModal;
exports.DeleteInstitutionModal = DeleteInstitutionModal;
exports.AddMemorandumModal = AddMemorandumModal;
exports.DeleteMemorandumModal = DeleteMemorandumModal;
exports.EditMemorandumModal = EditMemorandumModal;
//# sourceMappingURL=modals.js.map