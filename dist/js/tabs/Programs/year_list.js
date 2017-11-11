"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _section = require("../../components/section");

var _reactstrap = require("reactstrap");

var _loading = require("../../loading");

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YearList = function (_Component) {
    _inherits(YearList, _Component);

    function YearList(props) {
        _classCallCheck(this, YearList);

        return _possibleConstructorReturn(this, (YearList.__proto__ || Object.getPrototypeOf(YearList)).call(this, props));
    }

    _createClass(YearList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "term-list" },
                _react2.default.createElement(YearListHead, null),
                _react2.default.createElement(YearListTable, { yearList: this.props.yearList,
                    setActiveYear: this.props.setActiveYear })
            );
        }
    }]);

    return YearList;
}(_react.Component);

var YearListHead = function (_Component2) {
    _inherits(YearListHead, _Component2);

    function YearListHead(props) {
        _classCallCheck(this, YearListHead);

        return _possibleConstructorReturn(this, (YearListHead.__proto__ || Object.getPrototypeOf(YearListHead)).call(this, props));
    }

    _createClass(YearListHead, [{
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
                    { className: "page-head-title mb-0" },
                    "Academic Years"
                )
            );
        }
    }]);

    return YearListHead;
}(_react.Component);

var YearListTable = function (_Component3) {
    _inherits(YearListTable, _Component3);

    function YearListTable(props) {
        _classCallCheck(this, YearListTable);

        return _possibleConstructorReturn(this, (YearListTable.__proto__ || Object.getPrototypeOf(YearListTable)).call(this, props));
    }

    _createClass(YearListTable, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.props.yearList === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var rows = this.props.yearList.map(function (year, index) {
                var yearStart = Number(year.academic_year_start);
                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    { key: index,
                        onClick: function onClick() {
                            return _this4.props.setActiveYear(year.academic_year_start);
                        } },
                    yearStart,
                    " - ",
                    yearStart + 1
                );
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    rows
                )
            );
        }
    }]);

    return YearListTable;
}(_react.Component);

exports.default = YearList;
//# sourceMappingURL=year_list.js.map