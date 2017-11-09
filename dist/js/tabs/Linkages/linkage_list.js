"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../components/section");

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkageList = function (_Component) {
    _inherits(LinkageList, _Component);

    function LinkageList(props) {
        _classCallCheck(this, LinkageList);

        return _possibleConstructorReturn(this, (LinkageList.__proto__ || Object.getPrototypeOf(LinkageList)).call(this, props));
    }

    _createClass(LinkageList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "linkage-list" },
                _react2.default.createElement(LinkageListHead, null),
                _react2.default.createElement(LinkageListTable, null)
            );
        }
    }]);

    return LinkageList;
}(_react.Component);

var LinkageListHead = function (_Component2) {
    _inherits(LinkageListHead, _Component2);

    function LinkageListHead(props) {
        _classCallCheck(this, LinkageListHead);

        return _possibleConstructorReturn(this, (LinkageListHead.__proto__ || Object.getPrototypeOf(LinkageListHead)).call(this, props));
    }

    _createClass(LinkageListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row w-100 mb-2 align-items-center" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0 text-secondary" },
                            "Linkages"
                        ),
                        _react2.default.createElement(
                            "h4",
                            { className: "page-head-title mb-0" },
                            "Institution name"
                        )
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" })
            );
        }
    }]);

    return LinkageListHead;
}(_react.Component);

var LinkageListTable = function (_Component3) {
    _inherits(LinkageListTable, _Component3);

    function LinkageListTable(props) {
        _classCallCheck(this, LinkageListTable);

        return _possibleConstructorReturn(this, (LinkageListTable.__proto__ || Object.getPrototypeOf(LinkageListTable)).call(this, props));
    }

    _createClass(LinkageListTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(LinkageListRow, null),
                    _react2.default.createElement(LinkageListRow, null),
                    _react2.default.createElement(LinkageListRow, null),
                    _react2.default.createElement(LinkageListRow, null)
                )
            );
        }
    }]);

    return LinkageListTable;
}(_react.Component);

var LinkageListRow = function (_Component4) {
    _inherits(LinkageListRow, _Component4);

    function LinkageListRow(props) {
        _classCallCheck(this, LinkageListRow);

        return _possibleConstructorReturn(this, (LinkageListRow.__proto__ || Object.getPrototypeOf(LinkageListRow)).call(this, props));
    }

    _createClass(LinkageListRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.SectionRow,
                null,
                "Linkage Name"
            );
        }
    }]);

    return LinkageListRow;
}(_react.Component);

exports.default = LinkageList;
//# sourceMappingURL=linkage_list.js.map