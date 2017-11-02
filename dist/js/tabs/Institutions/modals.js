"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditInstitutionModal = exports.DeleteInstitutionModal = exports.AddInstitutionModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form_validation = require("../../form_validation");

var _form_validation2 = _interopRequireDefault(_form_validation);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

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

var AddInstitutionModal = function (_Component) {
    _inherits(AddInstitutionModal, _Component);

    function AddInstitutionModal(props) {
        _classCallCheck(this, AddInstitutionModal);

        var _this = _possibleConstructorReturn(this, (AddInstitutionModal.__proto__ || Object.getPrototypeOf(AddInstitutionModal)).call(this, props));

        _this.submitForm = _this.submitForm.bind(_this);
        return _this;
    }

    _createClass(AddInstitutionModal, [{
        key: "submitForm",
        value: function submitForm() {
            var _this2 = this;

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/institutions/",
                data: {
                    name: (0, _jquery2.default)("#add-institution-name").val(),
                    country: (0, _jquery2.default)("#add-institution-country-list").val(),
                    email: (0, _jquery2.default)("#add-institution-email").val(),
                    address: (0, _jquery2.default)("#add-institution-address").val(),
                    website: (0, _jquery2.default)("#add-institution-website").val(),
                    contact_person_name: (0, _jquery2.default)("#add-institution-contact-person").val(),
                    contact_person_number: (0, _jquery2.default)("#add-institution-contact-number").val(),
                    agreement: (0, _jquery2.default)("#add-institution-agreement-type").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    _this2.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully added institution",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to add institution",
                        progressBar: false
                    });
                }
            });

            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            var countries = _settings2.default.countries.map(function (name, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index },
                    name
                );
            });

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "add-institution-modal",
                    onOpened: AddInstitutionModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Add an Institution"
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Form,
                        null,
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-name" },
                                "Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-name", placeholder: "Institution Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-country" },
                                "Country"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-institution-country-list" },
                                countries
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-email" },
                                "Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email", id: "add-institution-email", placeholder: "Email", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-address" },
                                "Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea", id: "add-institution-address", placeholder: "Address",
                                className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-website" },
                                "Website"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-website", placeholder: "Website", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-contact-person" },
                                "Contact Person"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-contact-person", placeholder: "Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-contact-number" },
                                "Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-contact-number", placeholder: "Number", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-agreement-type" },
                                "Agreement Type"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-institution-agreement-type" },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", id: "add-institution-modal-submit",
                            onClick: this.submitForm },
                        "Add"
                    )
                )
            );
        }
    }], [{
        key: "addValidation",
        value: function addValidation() {
            (0, _form_validation2.default)({
                inputs: (0, _jquery2.default)("#add-institution-modal").find(".text-input"),
                button: (0, _jquery2.default)("#add-institution-modal-submit"),
                customValidations: [{
                    input: (0, _jquery2.default)("#add-institution-email"),
                    validator: function validator(email) {
                        //This regex mess checks if email is a real email
                        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                        );
                    }
                }]
            });
        }
    }]);

    return AddInstitutionModal;
}(_react.Component);

var DeleteInstitutionModal = function (_Component2) {
    _inherits(DeleteInstitutionModal, _Component2);

    function DeleteInstitutionModal(props) {
        _classCallCheck(this, DeleteInstitutionModal);

        var _this3 = _possibleConstructorReturn(this, (DeleteInstitutionModal.__proto__ || Object.getPrototypeOf(DeleteInstitutionModal)).call(this, props));

        _this3.confirmDelete = _this3.confirmDelete.bind(_this3);
        return _this3;
    }

    _createClass(DeleteInstitutionModal, [{
        key: "confirmDelete",
        value: function confirmDelete() {
            var _this4 = this;

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/",
                method: "DELETE",
                beforeSend: _authorization2.default,
                success: function success() {
                    _this4.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Institution deleted",
                        progressBar: false
                    });
                },
                error: function error(response) {
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
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "add-institution-modal" },
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

var EditInstitutionModal = function (_Component3) {
    _inherits(EditInstitutionModal, _Component3);

    function EditInstitutionModal(props) {
        _classCallCheck(this, EditInstitutionModal);

        var _this5 = _possibleConstructorReturn(this, (EditInstitutionModal.__proto__ || Object.getPrototypeOf(EditInstitutionModal)).call(this, props));

        _this5.submitForm = _this5.submitForm.bind(_this5);
        return _this5;
    }

    _createClass(EditInstitutionModal, [{
        key: "submitForm",
        value: function submitForm() {
            var _this6 = this;

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/",
                data: {
                    name: (0, _jquery2.default)("#edit-institution-name").val(),
                    country: (0, _jquery2.default)("#edit-institution-country-list").val(),
                    email: (0, _jquery2.default)("#edit-institution-email").val(),
                    address: (0, _jquery2.default)("#edit-institution-address").val(),
                    website: (0, _jquery2.default)("#edit-institution-website").val(),
                    contact_person_name: (0, _jquery2.default)("#edit-institution-contact-person").val(),
                    contact_person_number: (0, _jquery2.default)("#edit-institution-contact-number").val(),
                    agreement: (0, _jquery2.default)("#edit-institution-agreement-type").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    _this6.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully modified institution",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to edit institution",
                        progressBar: false
                    });
                }
            });

            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            var countries = _settings2.default.countries.map(function (name, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index },
                    name
                );
            });

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "edit-institution-modal",
                    onOpened: EditInstitutionModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Edit ",
                    this.props.institution.name
                ),
                _react2.default.createElement(
                    _reactstrap.ModalBody,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Form,
                        null,
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-name" },
                                "Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-institution-name", defaultValue: this.props.institution.name,
                                placeholder: "Institution Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-country" },
                                "Country"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-institution-country-list",
                                    defaultValue: this.props.institution.country.name },
                                countries
                            )
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-email" },
                                "Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email", id: "edit-institution-email", defaultValue: this.props.institution.email,
                                placeholder: "Email", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-address" },
                                "Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea", id: "edit-institution-address",
                                defaultValue: this.props.institution.address,
                                placeholder: "Address", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-website" },
                                "Website"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-institution-website", defaultValue: this.props.institution.website,
                                placeholder: "Website", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-contact-person" },
                                "Contact Person"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-institution-contact-person",
                                defaultValue: this.props.institution.contactPersonName,
                                placeholder: "Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-contact-number" },
                                "Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-institution-contact-number",
                                defaultValue: this.props.institution.contactPersonNumber, placeholder: "Number",
                                className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-institution-agreement-type" },
                                "Agreement Type"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-institution-agreement-type",
                                    defaultValue: this.props.institution.agreement },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", id: "edit-institution-modal-submit",
                            onClick: this.submitForm },
                        "Edit"
                    )
                )
            );
        }
    }], [{
        key: "addValidation",
        value: function addValidation() {
            (0, _form_validation2.default)({
                inputs: (0, _jquery2.default)("#edit-institution-modal").find(".text-input"),
                button: (0, _jquery2.default)("#edit-institution-modal-submit"),
                customValidations: [{
                    input: (0, _jquery2.default)("#edit-institution-email"),
                    validator: function validator(email) {
                        //This regex mess checks if email is a real email
                        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                        );
                    }
                }]
            });
        }
    }]);

    return EditInstitutionModal;
}(_react.Component);

exports.AddInstitutionModal = AddInstitutionModal;
exports.DeleteInstitutionModal = DeleteInstitutionModal;
exports.EditInstitutionModal = EditInstitutionModal;
//# sourceMappingURL=modals.js.map