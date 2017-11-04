"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditStudentModal = exports.DeleteStudentModal = exports.AddStudentModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../dismissable_toast_maker");

var _dismissable_toast_maker2 = _interopRequireDefault(_dismissable_toast_maker);

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

var AddStudentModal = function (_Component) {
    _inherits(AddStudentModal, _Component);

    function AddStudentModal(props) {
        _classCallCheck(this, AddStudentModal);

        var _this = _possibleConstructorReturn(this, (AddStudentModal.__proto__ || Object.getPrototypeOf(AddStudentModal)).call(this, props));

        _this.submitForm = _this.submitAddInstitutionForm.bind(_this);
        return _this;
    }

    _createClass(AddStudentModal, [{
        key: "submitAddInstitutionForm",
        value: function submitForm() {
            var _this2 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Adding",
                message: "Adding new student..."
            });

            _jquery2.default.post({
                url: _settings2.default.serverURL + "/students/",
                data: {
                    category: (0, _jquery2.default)("#add-student-category").val(),
                    id_number: (0, _jquery2.default)("#add-student-id-number").val(),
                    college: (0, _jquery2.default)("#add-student-college").val(),
                    family_name: (0, _jquery2.default)("#add-student-last-name").val(),
                    first_name: (0, _jquery2.default)("#add-student-first-name").val(),
                    middle_name: (0, _jquery2.default)("#add-student-middle-name").val(),
                    nickname: (0, _jquery2.default)("#add-student-nickname").val(),
                    nationality: (0, _jquery2.default)("#add-student-nationality").val(),
                    home_address: (0, _jquery2.default)("#add-student-address").val(),
                    phone_number: (0, _jquery2.default)("#add-student-contact-number").val(),
                    birth_date: (0, _jquery2.default)("#add-student-birth-date").val(),
                    sex: (0, _jquery2.default)("#add-student-sex").val(),
                    emergency_contact_name: (0, _jquery2.default)("#add-student-emergency-contact-name").val(),
                    emergency_contact_relationship: (0, _jquery2.default)("#add-student-emergency-contact-relationship").val(),
                    emergency_contact_number: (0, _jquery2.default)("#add-student-emergency-contact-number").val(),
                    email: (0, _jquery2.default)("#add-student-email").val(),
                    civil_status: (0, _jquery2.default)("#add-student-civil-status").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this2.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully added student"
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to add student"
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
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "add-student-modal",
                    onOpened: AddStudentModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Add a Student"
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
                                { "for": "add-student-id-number" },
                                "ID Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-id-number", placeholder: "ID Number", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-first-name" },
                                "First Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-first-name", placeholder: "First Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-middle-name" },
                                "Middle Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-middle-name", placeholder: "Middle Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-last-name" },
                                "Last Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-last-name", placeholder: "Last Name", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-nickname" },
                                "Nickname"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-nickname", placeholder: "Nickname", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-birth-date" },
                                "Birth Date"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "add-student-birth-date", className: "text-input", placeholder: "Birth Date" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-sex" },
                                "Sex"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-student-sex" },
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
                                { "for": "add-student-address" },
                                "Home Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea", id: "add-student-address", placeholder: "Home Address",
                                className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-nationality" },
                                "Nationality"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-nationality", placeholder: "Nationality", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-civil-status" },
                                "Civil Status"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-student-civil-status" },
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
                                { "for": "add-student-contact-number" },
                                "Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-contact-number", placeholder: "Contact Number", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-email" },
                                "E-mail"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-email", placeholder: "E-mail", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-emergency-contact-name" },
                                "Emergency Contact Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-emergency-contact-name", placeholder: "Emergency Contact Name",
                                className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-emergency-contact-relationship" },
                                "Emergency Contact Relationship"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-emergency-contact-relationship",
                                placeholder: "Emergency Contact Relationship", className: "text-input" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-emergency-contact-number" },
                                "Emergency Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-student-emergency-contact-number",
                                placeholder: "Emergency Contact Number", className: "text-input" })
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
                                { "for": "add-student-college" },
                                "College"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-student-college" },
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
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-student-category" },
                                "Student Type"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "add-student-category" },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", id: "add-student-modal-submit", onClick: this.submitAddInstitutionForm },
                        "Add"
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
                inputs: (0, _jquery2.default)("#add-student-modal").find(".text-input"),
                button: (0, _jquery2.default)("#add-student-modal-submit"),
                customValidations: [{
                    input: (0, _jquery2.default)("#add-student-email"),
                    validator: function validator(email) {
                        //This regex mess checks if email is a real email
                        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                        );
                    }
                }]
            });
        })
    }]);

    return AddStudentModal;
}(_react.Component);

var DeleteStudentModal = function (_Component2) {
    _inherits(DeleteStudentModal, _Component2);

    function DeleteStudentModal(props) {
        _classCallCheck(this, DeleteStudentModal);

        var _this3 = _possibleConstructorReturn(this, (DeleteStudentModal.__proto__ || Object.getPrototypeOf(DeleteStudentModal)).call(this, props));

        _this3.confirmDelete = _this3.confirmDelete.bind(_this3);
        return _this3;
    }

    _createClass(DeleteStudentModal, [{
        key: "confirmDelete",
        value: function confirmDelete() {
            var _this4 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Deleting",
                message: "Deleting student..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/students/" + this.props.student.idNumber + "/",
                method: "DELETE",
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this4.props.refresh();
                    _izitoast2.default.success({
                        title: "Success",
                        message: "Student deleted",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to delete student",
                        progressBar: false
                    });
                }
            });
            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            // Hardcoded, I know. Bare with me. You can fix it if you want.
            var first = this.props.student.firstName;
            var middle = this.props.student.middleName;
            var last = this.props.student.familyName;
            var name = first + " " + middle + " " + last;

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "delete-student-modal" },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { className: "text-danger" },
                    "Are you sure you want to delete ",
                    name,
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

    return DeleteStudentModal;
}(_react.Component);

var EditStudentModal = function (_Component3) {
    _inherits(EditStudentModal, _Component3);

    function EditStudentModal(props) {
        _classCallCheck(this, EditStudentModal);

        var _this5 = _possibleConstructorReturn(this, (EditStudentModal.__proto__ || Object.getPrototypeOf(EditStudentModal)).call(this, props));

        _this5.submitForm = _this5.submitAddInstitutionForm.bind(_this5);
        return _this5;
    }

    _createClass(EditStudentModal, [{
        key: "submitAddInstitutionForm",
        value: function submitForm() {
            var _this6 = this;

            var dismissToast = (0, _dismissable_toast_maker2.default)({
                title: "Editing",
                message: "Editing student..."
            });

            _jquery2.default.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/students/" + this.props.student.idNumber + "/",
                data: {
                    category: (0, _jquery2.default)("#edit-student-category").val(),
                    id_number: (0, _jquery2.default)("#edit-student-id-number").val(),
                    college: (0, _jquery2.default)("#edit-student-college").val(),
                    family_name: (0, _jquery2.default)("#edit-student-last-name").val(),
                    first_name: (0, _jquery2.default)("#edit-student-first-name").val(),
                    middle_name: (0, _jquery2.default)("#edit-student-middle-name").val(),
                    nickname: (0, _jquery2.default)("#edit-student-nickname").val(),
                    nationality: (0, _jquery2.default)("#edit-student-nationality").val(),
                    home_address: (0, _jquery2.default)("#edit-student-address").val(),
                    phone_number: (0, _jquery2.default)("#edit-student-contact-number").val(),
                    birth_date: (0, _jquery2.default)("#edit-student-birth-date").val(),
                    sex: (0, _jquery2.default)("#edit-student-sex").val(),
                    emergency_contact_name: (0, _jquery2.default)("#edit-student-emergency-contact-name").val(),
                    emergency_contact_relationship: (0, _jquery2.default)("#edit-student-emergency-contact-relationship").val(),
                    emergency_contact_number: (0, _jquery2.default)("#edit-student-emergency-contact-number").val(),
                    email: (0, _jquery2.default)("#edit-student-email").val(),
                    civil_status: (0, _jquery2.default)("#edit-student-civil-status").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this6.props.refresh();
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
        key: "render",
        value: function render() {
            // Hardcoded, I know. Bare with me. You can fix it if you want.
            var first = this.props.student.firstName;
            var middle = this.props.student.middleName;
            var last = this.props.student.familyName;
            var name = first + " " + middle + " " + last;

            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "edit-student-modal",
                    onOpened: EditStudentModal.addValidation },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Edit ",
                    name
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
                                { "for": "edit-student-id-number" },
                                "ID Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-id-number", placeholder: "ID Number", className: "text-input",
                                defaultValue: this.props.student.idNumber })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-first-name" },
                                "First Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-first-name", placeholder: "First Name", className: "text-input",
                                defaultValue: this.props.student.firstName })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-middle-name" },
                                "Middle Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-middle-name", placeholder: "Middle Name", className: "text-input",
                                defaultValue: this.props.student.middleName })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-last-name" },
                                "Last Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-last-name", placeholder: "Last Name", className: "text-input",
                                defaultValue: this.props.student.familyName })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-nickname" },
                                "Nickname"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-nickname", placeholder: "Nickname", className: "text-input",
                                defaultValue: this.props.student.nickname })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-birth-date" },
                                "Birth Date"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "edit-student-birth-date", className: "text-input",
                                defaultValue: this.props.student.birthDate })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-sex" },
                                "Sex"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-student-sex", defaultValue: this.props.student.sex },
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
                                { "for": "edit-student-address" },
                                "Home Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { type: "textarea", id: "edit-student-address", placeholder: "Home Address",
                                className: "text-input", defaultValue: this.props.student.homeAddress })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-nationality" },
                                "Nationality"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-nationality", placeholder: "Nationality", className: "text-input",
                                defaultValue: this.props.student.nationality })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-civil-status" },
                                "Civil Status"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-student-civil-status",
                                    defaultValue: this.props.student.civilStatus },
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
                                { "for": "edit-student-contact-number" },
                                "Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-contact-number", placeholder: "Contact Number", className: "text-input",
                                defaultValue: this.props.student.phoneNumber })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-email" },
                                "E-mail"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-email", placeholder: "E-mail", className: "text-input",
                                defaultValue: this.props.student.email })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-emergency-contact-name" },
                                "Emergency Contact Name"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-emergency-contact-name", placeholder: "Emergency Contact Name",
                                className: "text-input", defaultValue: this.props.student.emergencyContactName })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-emergency-contact-relationship" },
                                "Emergency Contact Relationship"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-emergency-contact-relationship",
                                placeholder: "Emergency Contact Relationship", className: "text-input",
                                defaultValue: this.props.student.emergencyContactRelationship })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-emergency-contact-number" },
                                "Emergency Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "edit-student-emergency-contact-number",
                                placeholder: "Emergency Contact Number", className: "text-input",
                                defaultValue: this.props.student.emergencyContactNumber })
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
                                { "for": "edit-student-college" },
                                "College"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-student-college", defaultValue: this.props.student.college },
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
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "edit-student-category" },
                                "Student Type"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Input,
                                { type: "select", id: "edit-student-category", defaultValue: this.props.student.category },
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
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", id: "edit-student-modal-submit",
                            onClick: this.submitAddInstitutionForm },
                        "Add"
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
                inputs: (0, _jquery2.default)("#edit-student-modal").find(".text-input"),
                button: (0, _jquery2.default)("#edit-student-modal-submit"),
                customValidations: [{
                    input: (0, _jquery2.default)("#edit-student-email"),
                    validator: function validator(email) {
                        //This regex mess checks if email is a real email
                        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                        );
                    }
                }]
            });
        })
    }]);

    return EditStudentModal;
}(_react.Component);

exports.AddStudentModal = AddStudentModal;
exports.DeleteStudentModal = DeleteStudentModal;
exports.EditStudentModal = EditStudentModal;
//# sourceMappingURL=modals.js.map