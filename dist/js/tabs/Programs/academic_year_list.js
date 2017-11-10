"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _section = require("../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AcademicYearList = function (_Component) {
    _inherits(AcademicYearList, _Component);

    function AcademicYearList(props) {
        _classCallCheck(this, AcademicYearList);

        return _possibleConstructorReturn(this, (AcademicYearList.__proto__ || Object.getPrototypeOf(AcademicYearList)).call(this, props));
    }

    _createClass(AcademicYearList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "year-list" },
                _react2.default.createElement(AcademicYearListHead, null),
                _react2.default.createElement(AcademicYearListTable, null)
            );
        }
    }]);

    return AcademicYearList;
}(_react.Component);

var AcademicYearListHead = function (_Component2) {
    _inherits(AcademicYearListHead, _Component2);

    function AcademicYearListHead(props) {
        _classCallCheck(this, AcademicYearListHead);

        return _possibleConstructorReturn(this, (AcademicYearListHead.__proto__ || Object.getPrototypeOf(AcademicYearListHead)).call(this, props));
    }

    _createClass(AcademicYearListHead, [{
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
                            "h4",
                            { className: "page-head-title mb-0" },
                            "Academic Years"
                        )
                    )
                )
            );
        }
    }]);

    return AcademicYearListHead;
}(_react.Component);

var AcademicYearListTable = function (_Component3) {
    _inherits(AcademicYearListTable, _Component3);

    function AcademicYearListTable(props) {
        _classCallCheck(this, AcademicYearListTable);

        return _possibleConstructorReturn(this, (AcademicYearListTable.__proto__ || Object.getPrototypeOf(AcademicYearListTable)).call(this, props));
    }

    _createClass(AcademicYearListTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(AcademicYearRow, null),
                    _react2.default.createElement(AcademicYearRow, null),
                    _react2.default.createElement(AcademicYearRow, null),
                    _react2.default.createElement(AcademicYearRow, null)
                )
            );
        }
    }]);

    return AcademicYearListTable;
}(_react.Component);

var AcademicYearRow = function (_Component4) {
    _inherits(AcademicYearRow, _Component4);

    function AcademicYearRow(props) {
        _classCallCheck(this, AcademicYearRow);

        return _possibleConstructorReturn(this, (AcademicYearRow.__proto__ || Object.getPrototypeOf(AcademicYearRow)).call(this, props));
    }

    _createClass(AcademicYearRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.SectionRow,
                null,
                "2016 - 2017"
            );
        }
    }]);

    return AcademicYearRow;
}(_react.Component);

exports.default = AcademicYearList;
//# sourceMappingURL=academic_year_list.js.map