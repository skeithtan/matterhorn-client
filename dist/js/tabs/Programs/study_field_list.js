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

var StudyFieldList = function (_Component) {
    _inherits(StudyFieldList, _Component);

    function StudyFieldList(props) {
        _classCallCheck(this, StudyFieldList);

        return _possibleConstructorReturn(this, (StudyFieldList.__proto__ || Object.getPrototypeOf(StudyFieldList)).call(this, props));
    }

    _createClass(StudyFieldList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "h-100 d-flex flex-column" },
                _react2.default.createElement(StudyFieldListHead, null),
                _react2.default.createElement(StudyFieldListTable, null)
            );
        }
    }]);

    return StudyFieldList;
}(_react.Component);

var StudyFieldListHead = function (_Component2) {
    _inherits(StudyFieldListHead, _Component2);

    function StudyFieldListHead(props) {
        _classCallCheck(this, StudyFieldListHead);

        return _possibleConstructorReturn(this, (StudyFieldListHead.__proto__ || Object.getPrototypeOf(StudyFieldListHead)).call(this, props));
    }

    _createClass(StudyFieldListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls ml-auto" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "ml-auto" },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "w-100" },
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Study Fields"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title mb-0" },
                        "Program Name"
                    )
                )
            );
        }
    }]);

    return StudyFieldListHead;
}(_react.Component);

var StudyFieldListTable = function (_Component3) {
    _inherits(StudyFieldListTable, _Component3);

    function StudyFieldListTable(props) {
        _classCallCheck(this, StudyFieldListTable);

        return _possibleConstructorReturn(this, (StudyFieldListTable.__proto__ || Object.getPrototypeOf(StudyFieldListTable)).call(this, props));
    }

    _createClass(StudyFieldListTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(StudyFieldRow, null),
                    _react2.default.createElement(StudyFieldRow, null),
                    _react2.default.createElement(StudyFieldRow, null)
                )
            );
        }
    }]);

    return StudyFieldListTable;
}(_react.Component);

var StudyFieldRow = function (_Component4) {
    _inherits(StudyFieldRow, _Component4);

    function StudyFieldRow(props) {
        _classCallCheck(this, StudyFieldRow);

        return _possibleConstructorReturn(this, (StudyFieldRow.__proto__ || Object.getPrototypeOf(StudyFieldRow)).call(this, props));
    }

    _createClass(StudyFieldRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.SectionRow,
                null,
                _react2.default.createElement(
                    _section.SectionRowContent,
                    null,
                    "Study Field Name"
                )
            );
        }
    }]);

    return StudyFieldRow;
}(_react.Component);

exports.default = StudyFieldList;
//# sourceMappingURL=study_field_list.js.map