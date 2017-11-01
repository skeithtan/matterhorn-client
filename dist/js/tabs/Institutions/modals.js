"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddInstitutionModal = undefined;

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
                    contact_person_number: (0, _jquery2.default)("#add-institution-contact-number").val()
                },
                beforeSend: _authorization2.default,
                success: function success() {
                    _this2.props.refresh();

                    _izitoast2.default.success({
                        title: "Success",
                        message: "Successfully added Institution",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to add Institution",
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
                            _react2.default.createElement(_reactstrap.Input, { id: "add-institution-address", placeholder: "Address", className: "text-input" })
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

exports.AddInstitutionModal = AddInstitutionModal;
//# sourceMappingURL=modals.js.map