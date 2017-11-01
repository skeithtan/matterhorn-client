"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddInstitutionModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _settings = require("../../settings");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddInstitutionModal = function (_Component) {
    _inherits(AddInstitutionModal, _Component);

    function AddInstitutionModal(props) {
        _classCallCheck(this, AddInstitutionModal);

        return _possibleConstructorReturn(this, (AddInstitutionModal.__proto__ || Object.getPrototypeOf(AddInstitutionModal)).call(this, props));
    }

    _createClass(AddInstitutionModal, [{
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
                { isOpen: this.props.isOpen, toggle: this.props.toggle, backdrop: true },
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
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-name", placeholder: "Institution Name" })
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
                            _react2.default.createElement(_reactstrap.Input, { type: "email", id: "add-institution-email", placeholder: "Email" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-address" },
                                "Address"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-address", placeholder: "Address" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-website" },
                                "Website"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-website", placeholder: "Website" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-contact-person" },
                                "Contact Person"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-contact-person", placeholder: "Name" })
                        ),
                        _react2.default.createElement(
                            _reactstrap.FormGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Label,
                                { "for": "add-institution-contact-number" },
                                "Contact Number"
                            ),
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-contact-number", placeholder: "Number" })
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success" },
                        "Add"
                    )
                )
            );
        }
    }]);

    return AddInstitutionModal;
}(_react.Component);

exports.AddInstitutionModal = AddInstitutionModal;
//# sourceMappingURL=modals.js.map