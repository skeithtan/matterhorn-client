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
            academic_years: null,
            step: "Overview"
        };

        _this11.resetForm = _this11.resetForm.bind(_this11);
        _this11.onTermClick = _this11.onTermClick.bind(_this11);
        _this11.overviewForm = _this11.overviewForm.bind(_this11);
        _this11.requirementForm = _this11.requirementForm.bind(_this11);
        _this11.getChangeHandler = _this11.getChangeHandler.bind(_this11);
        _this11.submitAddProgramForm = _this11.submitAddProgramForm.bind(_this11);
        _this11.getOverviewFormErrors = _this11.getOverviewFormErrors.bind(_this11);
        _this11.getRequirementFormErrors = _this11.getRequirementFormErrors.bind(_this11);

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
                },
                step: "Overview"
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
                value: this.state.form.terms_available.toString(),
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
        key: "getRequirementFormErrors",
        value: function getRequirementFormErrors() {
            return (0, _form_validator2.default)([{
                name: "Requirements deadline",
                characterLimit: null,
                value: this.state.form.requirement_deadline
            }]);
        }
    }, {
        key: "submitAddProgramForm",
        value: function submitAddProgramForm() {
            var _this12 = this;

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Adding",
                message: "Adding program..."
            });

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/programs/outbound/",
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
            var index = this.state.form.terms_available.indexOf(term);
            if (index < 0) {
                this.state.form.terms_available.push(term);
            } else {
                this.state.form.terms_available.splice(index, 1);
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
                        active: _this14.state.form.terms_available.includes(term) },
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
        key: "requirementForm",
        value: function requirementForm(fieldErrors) {
            function isValid(fieldName) {
                return fieldErrors[fieldName].length === 0;
            }

            function fieldError(fieldName) {
                return fieldErrors[fieldName][0];
            }

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
                            "Requirements Deadline"
                        ),
                        _react2.default.createElement(_reactstrap.Input, { type: "date",
                            value: this.state.form.requirement_deadline,
                            onChange: this.getChangeHandler("requirement_deadline"),
                            valid: isValid("Requirements deadline") }),
                        _react2.default.createElement(
                            _reactstrap.FormFeedback,
                            null,
                            fieldError("Requirements deadline")
                        )
                    ),
                    _react2.default.createElement(ProgramFormRequirements, null)
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this15 = this;

            var _ref = this.state.step === "Overview" ? this.getOverviewFormErrors() : this.getRequirementFormErrors(),
                formHasErrors = _ref.formHasErrors,
                fieldErrors = _ref.fieldErrors;

            var formBody = void 0;
            var shouldShowFormFooter = false;

            if (this.state.academic_years === null) {
                formBody = _react2.default.createElement(_loading2.default, null);
            } else if (this.state.academic_years.length === 0) {
                formBody = ProgramFormModal.noAcademicYearsState();
            } else if (this.state.step === "Overview") {
                formBody = this.overviewForm(fieldErrors);
                shouldShowFormFooter = true;
            } else {
                formBody = this.requirementForm(fieldErrors);
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
                    this.state.step === "Requirement" && _react2.default.createElement(
                        "div",
                        { className: "d-flex flex-row w-100" },
                        _react2.default.createElement(
                            _reactstrap.Button,
                            { outline: true,
                                color: "success",
                                className: "mr-auto",
                                onClick: function onClick() {
                                    return _this15.setState({ step: "Overview" });
                                } },
                            "Back"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Button,
                            { outline: true,
                                color: "success",
                                onClick: this.props.edit ? this.submitEditInstitutionForm : this.submitAddProgramForm,
                                disabled: formHasErrors },
                            this.props.edit ? "Save changes" : "Add"
                        )
                    ),
                    this.state.step === "Overview" && _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            onClick: function onClick() {
                                return _this15.setState({ step: "Requirement" });
                            },
                            disabled: formHasErrors },
                        "Next"
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

var ProgramFormRequirements = function (_Component4) {
    _inherits(ProgramFormRequirements, _Component4);

    function ProgramFormRequirements(props) {
        _classCallCheck(this, ProgramFormRequirements);

        var _this16 = _possibleConstructorReturn(this, (ProgramFormRequirements.__proto__ || Object.getPrototypeOf(ProgramFormRequirements)).call(this, props));

        _this16.state = {
            requirements: [""]
        };

        _this16.handleAddRequirement = _this16.handleAddRequirement.bind(_this16);
        _this16.handleRemoveRequirement = _this16.handleRemoveRequirement.bind(_this16);
        _this16.handleRequirementChange = _this16.handleRequirementChange.bind(_this16);

        return _this16;
    }

    _createClass(ProgramFormRequirements, [{
        key: "handleRequirementChange",
        value: function handleRequirementChange(index) {
            var _this17 = this;

            return function (newValue) {
                var requirements = _this17.state.requirements.map(function (requirement, candidateIndex) {
                    if (index !== candidateIndex) {
                        return requirement;
                    }

                    return newValue;
                });

                _this17.setState({
                    requirements: requirements
                });
            };
        }
    }, {
        key: "handleAddRequirement",
        value: function handleAddRequirement() {
            this.setState({
                requirements: this.state.requirements.concat([""])
            });
        }
    }, {
        key: "handleRemoveRequirement",
        value: function handleRemoveRequirement(index) {
            var _this18 = this;

            return function () {
                _this18.setState({
                    requirements: _this18.state.requirements.filter(function (requirement, candidateIndex) {
                        return candidateIndex !== index;
                    })
                });
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this19 = this;

            var requirements = this.state.requirements.map(function (requirement, index) {
                return _react2.default.createElement(ProgramFormRequirementRow, { key: index,
                    isLastItem: index + 1 === _this19.state.requirements.length,
                    hasRemoveButton: index > 0,
                    onRemoveButtonClick: _this19.handleRemoveRequirement(index),
                    onAddButtonClick: _this19.handleAddRequirement,
                    onValueChange: _this19.handleRequirementChange(index),
                    value: requirement });
            });

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "p",
                    null,
                    "Applicant Requirements"
                ),
                requirements
            );
        }
    }]);

    return ProgramFormRequirements;
}(_react.Component);

var ProgramFormRequirementRow = function (_Component5) {
    _inherits(ProgramFormRequirementRow, _Component5);

    function ProgramFormRequirementRow(props) {
        _classCallCheck(this, ProgramFormRequirementRow);

        var _this20 = _possibleConstructorReturn(this, (ProgramFormRequirementRow.__proto__ || Object.getPrototypeOf(ProgramFormRequirementRow)).call(this, props));

        _this20.state = {
            value: _this20.props.value
        };

        _this20.onValueChange = _this20.onValueChange.bind(_this20);
        _this20.validateInput = _this20.validateInput.bind(_this20);
        return _this20;
    }

    _createClass(ProgramFormRequirementRow, [{
        key: "onValueChange",
        value: function onValueChange(event) {
            var value = event.target.value;
            this.props.onValueChange(value);
            this.setState({
                value: value
            });
        }
    }, {
        key: "validateInput",
        value: function validateInput() {
            return (0, _form_validator2.default)([{
                name: "Requirement",
                characterLimit: 64,
                value: this.state.value
            }]);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                value: props.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _validateInput = this.validateInput(),
                formHasErrors = _validateInput.formHasErrors,
                fieldErrors = _validateInput.fieldErrors;

            return _react2.default.createElement(
                _reactstrap.FormGroup,
                null,
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row" },
                    _react2.default.createElement(_reactstrap.Input, { placeholder: "Requirement",
                        value: this.state.value,
                        onChange: this.onValueChange,
                        className: "w-75 mr-2",
                        valid: !formHasErrors }),
                    this.props.hasRemoveButton && _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "danger",
                            className: "mr-2",
                            onClick: this.props.onRemoveButtonClick },
                        "-"
                    ),
                    this.props.isLastItem && _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            onClick: this.props.onAddButtonClick },
                        "+"
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "hidden",
                    valid: !formHasErrors }),
                _react2.default.createElement(
                    _reactstrap.FormFeedback,
                    null,
                    fieldErrors["Requirement"][0]
                )
            );
        }
    }]);

    return ProgramFormRequirementRow;
}(_react.Component);

exports.InstitutionFormModal = InstitutionFormModal;
exports.MemorandumFormModal = MemorandumFormModal;
exports.ProgramFormModal = ProgramFormModal;
//# sourceMappingURL=modals.js.map