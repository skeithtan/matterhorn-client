"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditMemorandumModal = exports.DeleteMemorandumModal = exports.AddMemorandumModal = exports.EditInstitutionModal = exports.DeleteInstitutionModal = exports.AddInstitutionModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form_validation = require("../../form_validation");

var _form_validation2 = _interopRequireDefault(_form_validation);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../dismissable_toast_maker");

var _dismissable_toast_maker2 = _interopRequireDefault(_dismissable_toast_maker);

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

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Adding",
                message: "Adding new institution..."
            });

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
                            _react2.default.createElement(
                                _reactstrap.InputGroup,
                                null,
                                _react2.default.createElement(
                                    _reactstrap.InputGroupAddon,
                                    null,
                                    "http://"
                                ),
                                _react2.default.createElement(_reactstrap.Input, { id: "add-institution-website", placeholder: "Website", className: "text-input" })
                            )
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
                                { "for": "add-institution-email" },
                                "Contact Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email", id: "add-institution-email", placeholder: "Email",
                                className: "text-input" })
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
                    _this4.props.refresh();
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

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Editing",
                message: "Editing institution..."
            });

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
                    dismissToast();
                    _this6.props.refresh();
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
                            _react2.default.createElement(
                                _reactstrap.InputGroup,
                                null,
                                _react2.default.createElement(
                                    _reactstrap.InputGroupAddon,
                                    null,
                                    "http://"
                                ),
                                _react2.default.createElement(_reactstrap.Input, { id: "edit-institution-website", defaultValue: this.props.institution.website,
                                    placeholder: "Website", className: "text-input" })
                            )
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
                                { "for": "edit-institution-email" },
                                "Contact Email"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "email", id: "edit-institution-email",
                                defaultValue: this.props.institution.contactPersonEmail,
                                placeholder: "Email", className: "text-input" })
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

var AddMemorandumModal = function (_Component4) {
    _inherits(AddMemorandumModal, _Component4);

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
        value: function addValidation() {
            (0, _form_validation2.default)({
                inputs: (0, _jquery2.default)("#add-memorandum-modal").find(".text-input"),
                button: (0, _jquery2.default)("#add-memorandum-modal-submit")
            });
        }
    }]);

    return AddMemorandumModal;
}(_react.Component);

var DeleteMemorandumModal = function (_Component5) {
    _inherits(DeleteMemorandumModal, _Component5);

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

var EditMemorandumModal = function (_Component6) {
    _inherits(EditMemorandumModal, _Component6);

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
        value: function addValidation() {
            (0, _form_validation2.default)({
                inputs: (0, _jquery2.default)("#edit-memorandum-modal").find(".text-input"),
                button: (0, _jquery2.default)("#edit-memorandum-modal-submit")
            });
        }
    }]);

    return EditMemorandumModal;
}(_react.Component);

exports.AddInstitutionModal = AddInstitutionModal;
exports.DeleteInstitutionModal = DeleteInstitutionModal;
exports.EditInstitutionModal = EditInstitutionModal;
exports.AddMemorandumModal = AddMemorandumModal;
exports.DeleteMemorandumModal = DeleteMemorandumModal;
exports.EditMemorandumModal = EditMemorandumModal;
//# sourceMappingURL=modals.js.map