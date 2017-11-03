"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstitutionList = function (_Component) {
    _inherits(InstitutionList, _Component);

    function InstitutionList(props) {
        _classCallCheck(this, InstitutionList);

        return _possibleConstructorReturn(this, (InstitutionList.__proto__ || Object.getPrototypeOf(InstitutionList)).call(this, props));
    }

    _createClass(InstitutionList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "institution-list" },
                _react2.default.createElement(InstitutionListHead, null),
                _react2.default.createElement(InstitutionListTable, null)
            );
        }
    }]);

    return InstitutionList;
}(_react.Component);

var InstitutionListHead = function (_Component2) {
    _inherits(InstitutionListHead, _Component2);

    function InstitutionListHead(props) {
        _classCallCheck(this, InstitutionListHead);

        return _possibleConstructorReturn(this, (InstitutionListHead.__proto__ || Object.getPrototypeOf(InstitutionListHead)).call(this, props));
    }

    _createClass(InstitutionListHead, [{
        key: "render",
        value: function render() {
            return (
                // TODO: onChange function
                _react2.default.createElement(
                    "div",
                    { className: "page-head" },
                    _react2.default.createElement(
                        _reactstrap.Input,
                        { type: "select", id: "linkages", className: "mb-3" },
                        _react2.default.createElement(
                            "option",
                            { value: "S" },
                            "Scholarship"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "OI" },
                            "OJT / Internship"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "FE" },
                            "Faculty Exchange"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "SE" },
                            "Student Exchange"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "RE" },
                            "Researcher / Expert Exchange"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "SP" },
                            "Support for Projects Exchange"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "RP" },
                            "Research and Publication"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "AP" },
                            "Academic Program"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "PF" },
                            "Project Funding"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "EMPI" },
                            "Exchange of Materials, Publications and Information"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "CE" },
                            "Cultural Exchange"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "SAMC" },
                            "Seminars and Academic Meetings / Conferences"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "TAP" },
                            "Technical or Administrative Programs"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "O" },
                            "Established Office"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "ASE" },
                            "Administrative and Staff Exchange"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "EM" },
                            "Executive Meetings"
                        )
                    ),
                    _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" })
                )
            );
        }
    }]);

    return InstitutionListHead;
}(_react.Component);

var InstitutionListTable = function (_Component3) {
    _inherits(InstitutionListTable, _Component3);

    function InstitutionListTable(props) {
        _classCallCheck(this, InstitutionListTable);

        return _possibleConstructorReturn(this, (InstitutionListTable.__proto__ || Object.getPrototypeOf(InstitutionListTable)).call(this, props));
    }

    _createClass(InstitutionListTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionListRow, null),
                    _react2.default.createElement(InstitutionListRow, null),
                    _react2.default.createElement(InstitutionListRow, null)
                )
            );
        }
    }]);

    return InstitutionListTable;
}(_react.Component);

var InstitutionListRow = function (_Component4) {
    _inherits(InstitutionListRow, _Component4);

    function InstitutionListRow(props) {
        _classCallCheck(this, InstitutionListRow);

        return _possibleConstructorReturn(this, (InstitutionListRow.__proto__ || Object.getPrototypeOf(InstitutionListRow)).call(this, props));
    }

    _createClass(InstitutionListRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                null,
                "University Name"
            );
        }
    }]);

    return InstitutionListRow;
}(_react.Component);

exports.default = InstitutionList;
//# sourceMappingURL=institution_list.js.map