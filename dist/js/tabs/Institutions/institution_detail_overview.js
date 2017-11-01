"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InstitutionContact = exports.InstitutionDetailOverview = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstitutionDetailOverview = function (_Component) {
    _inherits(InstitutionDetailOverview, _Component);

    function InstitutionDetailOverview(props) {
        _classCallCheck(this, InstitutionDetailOverview);

        return _possibleConstructorReturn(this, (InstitutionDetailOverview.__proto__ || Object.getPrototypeOf(InstitutionDetailOverview)).call(this, props));
    }

    _createClass(InstitutionDetailOverview, [{
        key: "render",
        value: function render() {
            var institution = this.props.institution;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Institution details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Email", fieldValue: institution.email }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Address", fieldValue: institution.address }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Website", fieldValue: institution.website })
                )
            );
        }
    }]);

    return InstitutionDetailOverview;
}(_react.Component);

var InstitutionContact = function (_Component2) {
    _inherits(InstitutionContact, _Component2);

    function InstitutionContact(props) {
        _classCallCheck(this, InstitutionContact);

        return _possibleConstructorReturn(this, (InstitutionContact.__proto__ || Object.getPrototypeOf(InstitutionContact)).call(this, props));
    }

    _createClass(InstitutionContact, [{
        key: "render",
        value: function render() {
            var institution = this.props.institution;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Contact"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Contact Person", fieldValue: institution.contactPersonName }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Contact Phone Number",
                        fieldValue: institution.contactPersonNumber })
                )
            );
        }
    }]);

    return InstitutionContact;
}(_react.Component);

var InstitutionDetailRow = function (_Component3) {
    _inherits(InstitutionDetailRow, _Component3);

    function InstitutionDetailRow(props) {
        _classCallCheck(this, InstitutionDetailRow);

        return _possibleConstructorReturn(this, (InstitutionDetailRow.__proto__ || Object.getPrototypeOf(InstitutionDetailRow)).call(this, props));
    }

    _createClass(InstitutionDetailRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                null,
                _react2.default.createElement(
                    "small",
                    { className: "font-weight-bold" },
                    this.props.fieldName
                ),
                _react2.default.createElement(
                    "p",
                    { className: "m-0" },
                    this.props.fieldValue
                )
            );
        }
    }]);

    return InstitutionDetailRow;
}(_react.Component);

exports.InstitutionDetailOverview = InstitutionDetailOverview;
exports.InstitutionContact = InstitutionContact;
//# sourceMappingURL=institution_detail_overview.js.map