"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _section = require("../../components/section");

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TermList = function (_Component) {
    _inherits(TermList, _Component);

    function TermList(props) {
        _classCallCheck(this, TermList);

        return _possibleConstructorReturn(this, (TermList.__proto__ || Object.getPrototypeOf(TermList)).call(this, props));
    }

    _createClass(TermList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "term-list" },
                _react2.default.createElement(TermListHead, null),
                _react2.default.createElement(TermListTable, null)
            );
        }
    }]);

    return TermList;
}(_react.Component);

var TermListHead = function (_Component2) {
    _inherits(TermListHead, _Component2);

    function TermListHead(props) {
        _classCallCheck(this, TermListHead);

        return _possibleConstructorReturn(this, (TermListHead.__proto__ || Object.getPrototypeOf(TermListHead)).call(this, props));
    }

    _createClass(TermListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "ml-auto" },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    "Academic Years"
                )
            );
        }
    }]);

    return TermListHead;
}(_react.Component);

var TermListTable = function (_Component3) {
    _inherits(TermListTable, _Component3);

    function TermListTable(props) {
        _classCallCheck(this, TermListTable);

        return _possibleConstructorReturn(this, (TermListTable.__proto__ || Object.getPrototypeOf(TermListTable)).call(this, props));
    }

    _createClass(TermListTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(TermRow, null),
                    _react2.default.createElement(TermRow, null),
                    _react2.default.createElement(TermRow, null)
                )
            );
        }
    }]);

    return TermListTable;
}(_react.Component);

var TermRow = function (_Component4) {
    _inherits(TermRow, _Component4);

    function TermRow(props) {
        _classCallCheck(this, TermRow);

        return _possibleConstructorReturn(this, (TermRow.__proto__ || Object.getPrototypeOf(TermRow)).call(this, props));
    }

    _createClass(TermRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.SectionRow,
                null,
                "2016 - 2017"
            );
        }
    }]);

    return TermRow;
}(_react.Component);

exports.default = TermList;
//# sourceMappingURL=year_list.js.map