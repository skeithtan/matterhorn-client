"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddStudentModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form_validation = require("../../form_validation");

var _form_validation2 = _interopRequireDefault(_form_validation);

var _authorization = require("../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../dismissable_toast_maker");

var _dismissable_toast_maker2 = _interopRequireDefault(_dismissable_toast_maker);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// I'm assuming I need these imports


var AddStudentModal = function (_Component) {
    _inherits(AddStudentModal, _Component);

    function AddStudentModal(props) {
        _classCallCheck(this, AddStudentModal);

        return _possibleConstructorReturn(this, (AddStudentModal.__proto__ || Object.getPrototypeOf(AddStudentModal)).call(this, props));
    }

    _createClass(AddStudentModal, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true, id: "add-student-modal" },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { toggle: this.props.toggle },
                    "Add a Student"
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
                            _react2.default.createElement(_reactstrap.Input, { type: "date", id: "add-student-birth-date" })
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
                        { outline: true, color: "success", id: "add-student-modal-submit" },
                        "Add"
                    )
                )
            );
        }
    }]);

    return AddStudentModal;
}(_react.Component);

exports.AddStudentModal = AddStudentModal;
//# sourceMappingURL=modals.js.map