"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeleteMemorandumModal = exports.MemorandumFormModal = exports.DeleteInstitutionModal = exports.InstitutionFormModal = undefined;

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
            // Copy the object, do not equate, otherwise the object changes along with the form.
            Object.assign(_this.state.form, props.institution);
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
                value: this.state.form.contact_person_name,
                optional: true
            }, {
                name: "Contact person number",
                characterLimit: 64,
                value: this.state.form.contact_person_number,
                optional: true
            }, {
                name: "Contact person email",
                characterLimit: 256,
                value: this.state.form.contact_person_email,
                optional: true,
                customValidators: [{
                    // isValid checks if the form value is a valid email through this messy regex.
                    // It also lets blank values pass because it's an optional field
                    isValid: function isValid(fieldValue) {
                        return fieldValue.length === 0 || /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i.test(fieldValue);
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

            function isValid(fieldName) {
                return fieldErrors[fieldName].length === 0;
            }

            function fieldError(fieldName) {
                return fieldErrors[fieldName][0];
            }

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true },
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
                                valid: isValid("Name"),
                                defaultValue: this.state.form.name }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Name")
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
                                { type: "select",
                                    onChange: this.getChangeHandler("country"),
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
                                valid: isValid("Address"),
                                defaultValue: this.state.form.address }),
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
                                    valid: isValid("Website"),
                                    defaultValue: this.state.form.website })
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "hidden", value: this.state.form.website,
                                valid: isValid("Website") }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                _react2.default.createElement(
                                    "p",
                                    null,
                                    fieldError("Website")
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
                                valid: isValid("Contact person name"),
                                defaultValue: this.state.form.contact_person_name }),
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
                                "Contact Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email", placeholder: "Email",
                                onChange: this.getChangeHandler("contact_person_email"),
                                valid: isValid("Contact person email"),
                                defaultValue: this.state.form.contact_person_email }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Contact person email")
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
                                defaultValue: this.state.form.contact_person_number }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Contact person number")
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
                        this.props.edit ? "Save changes" : "Add"
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

var MemorandumFormModal = function (_Component3) {
    _inherits(MemorandumFormModal, _Component3);

    function MemorandumFormModal(props) {
        _classCallCheck(this, MemorandumFormModal);

        var _this7 = _possibleConstructorReturn(this, (MemorandumFormModal.__proto__ || Object.getPrototypeOf(MemorandumFormModal)).call(this, props));

        _this7.getFormErrors = _this7.getFormErrors.bind(_this7);
        _this7.setupUploadCare = _this7.setupUploadCare.bind(_this7);
        _this7.getChangeHandler = _this7.getChangeHandler.bind(_this7);
        _this7.submitAddMemorandumForm = _this7.submitAddMemorandumForm.bind(_this7);
        _this7.submitEditMemorandumForm = _this7.submitEditMemorandumForm.bind(_this7);

        _this7.componentWillReceiveProps(props);
        return _this7;
    }

    _createClass(MemorandumFormModal, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            var _this8 = this;

            this.state = {
                form: {
                    category: "MOA",
                    memorandum_file: "",
                    date_effective: "",
                    date_expiration: "",
                    college_initiator: "",
                    linkages: []
                }
            };

            if (newProps.edit) {
                Object.assign(this.state.form, newProps.memorandum);
                this.state.form.linkages = []; //Do not use prop linkage = make a new one.

                // Linkages are in linkage.linkage format from graphQL. Convert to array form.
                newProps.memorandum.linkages.forEach(function (linkage) {
                    _this8.state.form.linkages.push(linkage.code);
                });
            }
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            return (0, _form_validator2.default)([{
                name: "Date effective",
                characterLimit: null,
                value: this.state.form.date_effective
            }, {
                name: "File",
                characterLimit: null,
                value: this.state.form.memorandum_file
            }]);
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this9 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;
                _this9.setState({
                    form: form
                });
            };
        }
    }, {
        key: "setupUploadCare",
        value: function setupUploadCare() {
            var _this10 = this;

            var widget = uploadcare.SingleWidget("[role=uploadcare-uploader]");
            var form = this.state.form;
            var setMemorandumFile = function setMemorandumFile(link) {
                form.memorandum_file = link;
                _this10.setState({
                    form: form
                });

                console.log(_this10.state.form);
            };

            widget.onChange(function (file) {
                if (file) {
                    file.done(function (info) {
                        setMemorandumFile(info.cdnUrl);
                    });
                }
            });
        }
    }, {
        key: "submitAddMemorandumForm",
        value: function submitAddMemorandumForm() {
            var _this11 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Adding",
                message: "Adding new memorandum..."
            });

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/memorandums/",
                data: this.state.form,
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this11.props.refresh();
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
        key: "submitEditMemorandumForm",
        value: function submitEditMemorandumForm() {
            var _this12 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Editing",
                message: "Editing memorandum..."
            });

            if (this.state.form.college_initiator === "") {
                this.state.form.college_initiator = null;
            }

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/memorandums/" + this.state.form.id + "/",
                // The array requires this to be JSON.
                data: JSON.stringify(this.state.form),
                contentType: "application/json",
                beforeSend: _authorization2.default,
                success: function success(response) {
                    console.log(response);
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
            var _this13 = this;

            var formErrors = this.getFormErrors();
            var formHasErrors = formErrors.formHasErrors;
            var fieldErrors = formErrors.fieldErrors;

            var linkages = Object.entries(_settings2.default.linkages).map(function (linkage) {
                var linkageCode = linkage[0];
                var linkageString = linkage[1];
                var isSelected = _this13.state.form.linkages.includes(linkageCode);
                var className = isSelected ? "bg-dlsu-lighter text-white d-flex" : "d-flex";

                var onClick = function onClick() {
                    var form = _this13.state.form;

                    if (isSelected) {
                        var _linkages = form.linkages;
                        _linkages.splice(_linkages.indexOf(linkageCode), 1);
                    } else {
                        form.linkages.push(linkageCode);
                    }

                    _this13.setState({
                        form: form
                    });
                };

                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    { key: linkageCode, onClick: onClick,
                        className: className },
                    _react2.default.createElement(
                        "span",
                        { className: "mr-auto" },
                        linkageString
                    ),
                    isSelected && _react2.default.createElement(
                        "h5",
                        { className: "mb-0" },
                        "\u2713"
                    )
                );
            });

            var collegeInitiators = Object.entries(_settings2.default.colleges).map(function (college) {
                return _react2.default.createElement(
                    "option",
                    { key: college[0], value: college[0] },
                    college[1]
                );
            });

            collegeInitiators.unshift(_react2.default.createElement(
                "option",
                { key: "null", value: "" },
                "No college initiator"
            ));

            function isValid(fieldName) {
                return fieldErrors[fieldName].length === 0;
            }

            function fieldError(fieldName) {
                return fieldErrors[fieldName][0];
            }

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true,
                    onOpened: this.setupUploadCare },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    this.props.edit ? "Edit memorandum" : "Add a memorandum to " + this.props.institution.name
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    { className: "form" },
                    _react2.default.createElement(
                        _reactstrap.Form,
                        null,
                        _react2.default.createElement(
                            "h5",
                            null,
                            "Memorandum details"
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Category"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", defaultValue: this.state.form.category,
                                    onChange: this.getChangeHandler("category") },
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
                                null,
                                "File Link"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "hidden", role: "uploadcare-uploader", name: "content",
                                "data-public-key": _settings2.default.uploadcarePublicKey,
                                valid: isValid("File") }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("File")
                            ),
                            this.props.edit && _react2.default.createElement(
                                "small",
                                { className: "text-secondary" },
                                "To change memorandum file, upload a new file. Otherwise, leave this blank."
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
                            _react2.default.createElement(_reactstrap.Input, { type: "date", defaultValue: this.state.form.date_effective,
                                onChange: this.getChangeHandler("date_effective"),
                                valid: isValid("Date effective") }),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Date effective")
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "Expiration Date"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", defaultValue: this.state.form.date_expiration,
                                onChange: this.getChangeHandler("date_expiration") }),
                            _react2.default.createElement(
                                "small",
                                { className: "text-secondary" },
                                "If the memorandum has no expiration date, leave this blank."
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                null,
                                "College Initiator"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", defaultValue: this.state.form.college_initiator,
                                    onChange: this.getChangeHandler("college_initiator") },
                                collegeInitiators
                            )
                        ),
                        _react2.default.createElement("br", null),
                        _react2.default.createElement(
                            "h5",
                            null,
                            "Linkages"
                        ),
                        _react2.default.createElement(
                            "small",
                            { className: "text-secondary mb-3 d-block" },
                            "Select all linkages that apply to this memorandum."
                        ),
                        _react2.default.createElement(
                            _reactstrap.ListGroup,
                            null,
                            linkages
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success",
                            disabled: formHasErrors,
                            onClick: this.props.edit ? this.submitEditMemorandumForm : this.submitAddMemorandumForm },
                        this.props.edit ? "Save changes" : "Add"
                    )
                )
            );
        }
    }]);

    return MemorandumFormModal;
}(_react.Component);

var DeleteMemorandumModal = function (_Component4) {
    _inherits(DeleteMemorandumModal, _Component4);

    function DeleteMemorandumModal(props) {
        _classCallCheck(this, DeleteMemorandumModal);

        var _this14 = _possibleConstructorReturn(this, (DeleteMemorandumModal.__proto__ || Object.getPrototypeOf(DeleteMemorandumModal)).call(this, props));

        _this14.confirmDelete = _this14.confirmDelete.bind(_this14);
        return _this14;
    }

    _createClass(DeleteMemorandumModal, [{
        key: "confirmDelete",
        value: function confirmDelete() {
            var _this15 = this;

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
                    _this15.props.refresh();
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
                    { className: "text-danger", toggle: this.props.toggle },
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

exports.InstitutionFormModal = InstitutionFormModal;
exports.DeleteInstitutionModal = DeleteInstitutionModal;
exports.MemorandumFormModal = MemorandumFormModal;
exports.DeleteMemorandumModal = DeleteMemorandumModal;
//# sourceMappingURL=modals.js.map