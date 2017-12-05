"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProgramFormModal = exports.MemorandumFormModal = exports.InstitutionFormModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../dismissable_toast_maker");

var _form_validator = require("../../form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

var _settings = require("../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _reactstrap = require("reactstrap");

var _outbound_programs = require("../OutboundPrograms/outbound_programs");

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

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
                country: "",
                address: "",
                website: "",
                contact_person_email: "",
                contact_person_name: "",
                contact_person_number: "",
                agreement: "B"
            }
        };

        _this.resetForm = _this.resetForm.bind(_this);
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
        key: "resetForm",
        value: function resetForm() {
            this.setState({
                form: {
                    name: "",
                    country: "",
                    address: "",
                    website: "",
                    contact_person_email: "",
                    contact_person_name: "",
                    contact_person_number: "",
                    agreement: "B"
                }
            });
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            return (0, _form_validator2.default)([{
                name: "Name",
                characterLimit: 64,
                value: this.state.form.name
            }, {
                name: "Country",
                value: this.state.form.country
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

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Adding",
                message: "Adding new institution..."
            });
            _jquery2.default.post({
                url: _settings2.default.serverURL + "/institutions/",
                data: this.state.form,
                beforeSend: _authorization2.default,
                success: function success(institution) {
                    dismissToast();
                    _this2.resetForm();
                    _this2.props.refresh();
                    _this2.props.onAddInstitution(institution);
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully added institution " + _this2.state.form.name + "."
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

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Editing",
                message: "Editing institution..."
            });

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/institutions/" + this.state.form.id + "/",
                data: this.state.form,
                beforeSend: _authorization2.default
            }).done(function () {
                _this3.resetForm();
                dismissToast();
                _this3.props.refresh();
                _izitoast2.default.success({
                    title: "Success",
                    message: "Successfully modified institution"
                });
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to edit institution"
                });
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
            var _getFormErrors = this.getFormErrors(),
                formHasErrors = _getFormErrors.formHasErrors,
                fieldErrors = _getFormErrors.fieldErrors;

            var countries = _settings2.default.countries.map(function (name, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index },
                    name
                );
            });

            countries.unshift(_react2.default.createElement(
                "option",
                { key: "X",
                    value: "" },
                "Select a country"
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
                                value: this.state.form.name }),
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
                                    valid: isValid("Country"),
                                    value: this.state.form.country },
                                countries
                            ),
                            _react2.default.createElement(
                                _reactstrap.FormFeedback,
                                null,
                                fieldError("Country")
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
                                    value: this.state.form.website })
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "hidden",
                                value: this.state.form.website,
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
                                { type: "select",
                                    onChange: this.getChangeHandler("agreement"),
                                    value: this.state.form.agreement },
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
                                "Contact Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email",
                                placeholder: "Email",
                                onChange: this.getChangeHandler("contact_person_email"),
                                valid: isValid("Contact person email"),
                                value: this.state.form.contact_person_email }),
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
                                value: this.state.form.contact_person_number }),
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
                        { outline: true,
                            color: "success",
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

var MemorandumFormModal = function (_Component2) {
    _inherits(MemorandumFormModal, _Component2);

    function MemorandumFormModal(props) {
        _classCallCheck(this, MemorandumFormModal);

        var _this5 = _possibleConstructorReturn(this, (MemorandumFormModal.__proto__ || Object.getPrototypeOf(MemorandumFormModal)).call(this, props));

        _this5.resetForm = _this5.resetForm.bind(_this5);
        _this5.getFormErrors = _this5.getFormErrors.bind(_this5);
        _this5.setupUploadCare = _this5.setupUploadCare.bind(_this5);
        _this5.getChangeHandler = _this5.getChangeHandler.bind(_this5);
        _this5.submitAddMemorandumForm = _this5.submitAddMemorandumForm.bind(_this5);
        _this5.submitEditMemorandumForm = _this5.submitEditMemorandumForm.bind(_this5);
        _this5.memorandumToggle = _this5.memorandumToggle.bind(_this5);

        _this5.componentWillReceiveProps(props);
        return _this5;
    }

    _createClass(MemorandumFormModal, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
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

            if (newProps.memorandum !== undefined) {
                Object.assign(this.state.form, newProps.memorandum);
                this.state.form.category = newProps.memorandum.category === "Agreement" ? "MOA" : "MOU";
                this.state.form.linkages = []; //Do not use prop linkage = make a new one.

                Object.assign(this.state.form.linkages, newProps.memorandum.linkages);
            }
        }
    }, {
        key: "resetForm",
        value: function resetForm() {
            this.setState({
                form: {
                    category: "MOA",
                    memorandum_file: "",
                    date_effective: "",
                    date_expiration: "",
                    college_initiator: "",
                    linkages: []
                }
            });
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
        key: "setupUploadCare",
        value: function setupUploadCare() {
            var _this7 = this;

            var widget = uploadcare.SingleWidget("[role=uploadcare-uploader]");
            var form = this.state.form;
            var setMemorandumFile = function setMemorandumFile(link) {
                form.memorandum_file = link;
                _this7.setState({
                    form: form
                });
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
            var _this8 = this;

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Adding",
                message: "Adding new memorandum..."
            });

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/memorandums/",
                data: this.state.form,
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this8.resetForm();
                    _this8.props.refresh();
                    if (_this8.props.memorandumToBeAdded) {
                        _this8.props.toggleMemorandumToBeAdded();
                    }
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
            var _this9 = this;

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
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
                    dismissToast();
                    _this9.resetForm();
                    var memorandum = response;
                    _this9.props.onEditSuccess(memorandum);
                    _this9.props.refresh();

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
        key: "memorandumToggle",
        value: function memorandumToggle() {
            this.props.toggle();
            if (this.props.memorandumToBeAdded) {
                this.props.toggleMemorandumToBeAdded();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            var _getFormErrors2 = this.getFormErrors(),
                formHasErrors = _getFormErrors2.formHasErrors,
                fieldErrors = _getFormErrors2.fieldErrors;

            var linkages = Object.entries(_settings2.default.linkages).map(function (linkage) {
                var linkageCode = linkage[0];
                var linkageString = linkage[1];

                var isSelected = _this10.state.form.linkages.includes(linkageCode);
                var className = isSelected ? "bg-dlsu-lighter text-white d-flex" : "d-flex";

                var onClick = function onClick() {
                    var form = _this10.state.form;

                    if (isSelected) {
                        var _linkages = form.linkages;
                        // Remove from linkages the selected linkage
                        _linkages.splice(_linkages.indexOf(linkageCode), 1);
                    } else {
                        form.linkages.push(linkageCode);
                    }

                    _this10.setState({
                        form: form
                    });
                };

                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    { key: linkageCode,
                        onClick: onClick,
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
                    { key: college[0],
                        value: college[0] },
                    college[1]
                );
            });

            collegeInitiators.unshift(_react2.default.createElement(
                "option",
                { key: "null",
                    value: "" },
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
                { isOpen: this.props.isOpen,
                    toggle: this.memorandumToggle,
                    backdrop: true,
                    onOpened: this.setupUploadCare },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.memorandumToggle },
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
                                { type: "select",
                                    value: this.state.form.category,
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
                            _react2.default.createElement(_reactstrap.Input, { type: "hidden",
                                role: "uploadcare-uploader",
                                name: "content",
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
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                value: this.state.form.date_effective,
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
                            _react2.default.createElement(_reactstrap.Input, { type: "date",
                                value: this.state.form.date_expiration,
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
                                { type: "select",
                                    value: this.state.form.college_initiator,
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
                        { outline: true,
                            color: "success",
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

var ProgramFormModal = function (_Component3) {
    _inherits(ProgramFormModal, _Component3);

    function ProgramFormModal(props) {
        _classCallCheck(this, ProgramFormModal);

        var _this11 = _possibleConstructorReturn(this, (ProgramFormModal.__proto__ || Object.getPrototypeOf(ProgramFormModal)).call(this, props));

        _this11.state = {
            form: {
                institution: _this11.props.institution,
                name: "",
                linkage: "SE",
                academic_year: "",
                terms_available: [],
                is_graduate: false,
                requirement_deadline: ""
            },
            academic_years: null
        };

        _this11.resetForm = _this11.resetForm.bind(_this11);
        _this11.onTermClick = _this11.onTermClick.bind(_this11);
        _this11.overviewForm = _this11.overviewForm.bind(_this11);
        _this11.getChangeHandler = _this11.getChangeHandler.bind(_this11);
        _this11.submitAddProgramForm = _this11.submitAddProgramForm.bind(_this11);
        _this11.getOverviewFormErrors = _this11.getOverviewFormErrors.bind(_this11);

        (0, _outbound_programs.fetchYears)(function (result) {
            _this11.setState({
                academic_years: result.academic_years.map(function (academicYear) {
                    return academicYear.academic_year_start;
                })
            });
        });
        return _this11;
    }

    _createClass(ProgramFormModal, [{
        key: "resetForm",
        value: function resetForm() {
            this.setState({
                form: {
                    institution: this.props.institution,
                    name: "",
                    linkage: "SE",
                    academic_year: "",
                    terms_available: [],
                    is_graduate: false,
                    requirement_deadline: ""
                }
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.state.form.institution = props.institution;

            this.setState({
                form: this.state.form
            });
        }
    }, {
        key: "getOverviewFormErrors",
        value: function getOverviewFormErrors() {

            return (0, _form_validator2.default)([{
                name: "Program name",
                characterLimit: 64,
                value: this.state.form.name
            }, {
                name: "Academic year",
                characterLimit: null,
                value: this.state.form.academic_year
            }, {
                name: "Terms available",
                characterLimit: null,
                value: this.state.form.terms_duration.toString(),
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
        key: "submitAddProgramForm",
        value: function submitAddProgramForm() {
            var _this12 = this;

            var url = "/programs/";
            if (this.props.inbound) {
                url += "inbound/";
            } else {
                url += "outbound/";
            }

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Adding",
                message: "Adding program..."
            });

            _jquery2.default.post({
                url: "" + _settings2.default.serverURL + url,
                data: JSON.stringify(this.state.form),
                contentType: "application/json",
                beforeSend: _authorization2.default
            }).done(function () {
                dismissToast();
                _this12.resetForm();
                _this12.props.refresh();
                _izitoast2.default.success({
                    title: "Success",
                    message: "Successfully added program"
                });
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to add memorandum"
                });
            });

            this.props.toggle();
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this13 = this;

            var form = this.state.form;

            return function (event) {
                var value = event.target.value;

                form[fieldName] = value;
                _this13.setState({
                    form: form
                });
            };
        }
    }, {
        key: "onTermClick",
        value: function onTermClick(term) {
            var index = this.state.form.terms_duration.indexOf(term);
            if (index < 0) {
                this.state.form.terms_duration.push(term);
            } else {
                this.state.form.terms_duration.splice(index, 1);
            }

            this.setState({
                form: this.state.form
            });
        }
    }, {
        key: "setIsGraduate",
        value: function setIsGraduate(isGraduate) {
            this.state.form.is_graduate = isGraduate;
            this.setState({
                form: this.state.form
            });
        }
    }, {
        key: "overviewForm",
        value: function overviewForm(fieldErrors) {
            var _this14 = this;

            function isValid(fieldName) {
                return fieldErrors[fieldName].length === 0;
            }

            function fieldError(fieldName) {
                return fieldErrors[fieldName][0];
            }

            var termButtons = [1, 2, 3].map(function (term) {
                return _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        color: "success",
                        key: term,
                        onClick: function onClick() {
                            return _this14.onTermClick(term);
                        },
                        active: _this14.state.form.terms_duration.includes(term) },
                    term
                );
            });

            var academicYears = this.state.academic_years.map(function (academicYear) {
                return _react2.default.createElement(
                    "option",
                    { key: academicYear,
                        onClick: _this14.getChangeHandler("academic_year"),
                        value: academicYear },
                    academicYear + " - " + (academicYear + 1)
                );
            });

            academicYears.unshift(_react2.default.createElement(
                "option",
                { key: 0,
                    onClick: this.getChangeHandler("academic_year"),
                    value: "" },
                "Select an academic year"
            ));

            return _react2.default.createElement(
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
                            "Program Name"
                        ),
                        _react2.default.createElement(_reactstrap.Input, { placeholder: "Program Name",
                            onChange: this.getChangeHandler("name"),
                            valid: isValid("Program name"),
                            value: this.state.form.name }),
                        _react2.default.createElement(
                            _reactstrap.FormFeedback,
                            null,
                            fieldError("Program name")
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.FormGroup,
                        null,
                        _react2.default.createElement(
                            "div",
                            { className: "d-block w-100" },
                            _react2.default.createElement(
                                _reactstrap.ButtonGroup,
                                null,
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true,
                                        color: "success",
                                        onClick: function onClick() {
                                            return _this14.setIsGraduate(false);
                                        },
                                        active: !this.state.form.is_graduate },
                                    "Undergraduate program"
                                ),
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true,
                                        color: "success",
                                        onClick: function onClick() {
                                            return _this14.setIsGraduate(true);
                                        },
                                        active: this.state.form.is_graduate },
                                    "Graduate program"
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.FormGroup,
                        null,
                        _react2.default.createElement(
                            _reactstrap.Label,
                            null,
                            "Academic Years"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Input,
                            { type: "select",
                                onChange: this.getChangeHandler("academic_year"),
                                valid: isValid("Academic year"),
                                value: this.state.form.academic_year },
                            academicYears
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormFeedback,
                            null,
                            fieldError("Academic year")
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
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "invalid-feedback d-block" },
                            fieldError("Terms available")
                        )
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _getOverviewFormError = this.getOverviewFormErrors(),
                formHasErrors = _getOverviewFormError.formHasErrors,
                fieldErrors = _getOverviewFormError.fieldErrors;

            var formBody = void 0;
            var shouldShowFormFooter = false;

            if (this.state.academic_years === null) {
                formBody = _react2.default.createElement(_loading2.default, null);
            } else if (this.state.academic_years.length === 0) {
                formBody = ProgramFormModal.noAcademicYearsState();
            } else {
                formBody = this.overviewForm(fieldErrors);
                shouldShowFormFooter = true;
            }

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Add a program"
                ),
                formBody,
                shouldShowFormFooter && _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            onClick: this.props.edit ? this.submitEditInstitutionForm : this.submitAddProgramForm,
                            disabled: formHasErrors },
                        this.props.edit ? "Save changes" : "Add"
                    )
                )
            );
        }
    }], [{
        key: "noAcademicYearsState",
        value: function noAcademicYearsState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container p-5" },
                _react2.default.createElement(
                    "h4",
                    null,
                    "There are no academic years yet."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Define the academic years in the outbound programs tab."
                )
            );
        }
    }]);

    return ProgramFormModal;
}(_react.Component);

exports.InstitutionFormModal = InstitutionFormModal;
exports.MemorandumFormModal = MemorandumFormModal;
exports.ProgramFormModal = ProgramFormModal;
//# sourceMappingURL=modals.js.map