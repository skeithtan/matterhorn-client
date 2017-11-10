"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramList = function (_Component) {
    _inherits(ProgramList, _Component);

    function ProgramList(props) {
        _classCallCheck(this, ProgramList);

        return _possibleConstructorReturn(this, (ProgramList.__proto__ || Object.getPrototypeOf(ProgramList)).call(this, props));
    }

    _createClass(ProgramList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "h-100 d-flex flex-column" },
                _react2.default.createElement(ProgramListHead, null),
                _react2.default.createElement(ProgramListTable, null)
            );
        }
    }]);

    return ProgramList;
}(_react.Component);

var ProgramListHead = function (_Component2) {
    _inherits(ProgramListHead, _Component2);

    function ProgramListHead(props) {
        _classCallCheck(this, ProgramListHead);

        return _possibleConstructorReturn(this, (ProgramListHead.__proto__ || Object.getPrototypeOf(ProgramListHead)).call(this, props));
    }

    _createClass(ProgramListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row w-100 mb-2 align-items-center" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0 text-secondary" },
                            "Programs"
                        ),
                        _react2.default.createElement(
                            "h4",
                            { className: "page-head-title mb-0" },
                            "2017-2018"
                        )
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" })
            );
        }
    }]);

    return ProgramListHead;
}(_react.Component);

var ProgramListTable = function (_Component3) {
    _inherits(ProgramListTable, _Component3);

    function ProgramListTable(props) {
        _classCallCheck(this, ProgramListTable);

        return _possibleConstructorReturn(this, (ProgramListTable.__proto__ || Object.getPrototypeOf(ProgramListTable)).call(this, props));
    }

    _createClass(ProgramListTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(ProgramListSection, null),
                _react2.default.createElement(ProgramListSection, null)
            );
        }
    }]);

    return ProgramListTable;
}(_react.Component);

var ProgramListSection = function (_Component4) {
    _inherits(ProgramListSection, _Component4);

    function ProgramListSection(props) {
        _classCallCheck(this, ProgramListSection);

        return _possibleConstructorReturn(this, (ProgramListSection.__proto__ || Object.getPrototypeOf(ProgramListSection)).call(this, props));
    }

    _createClass(ProgramListSection, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Institution Name"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(ProgramRow, null),
                    _react2.default.createElement(ProgramRow, null),
                    _react2.default.createElement(ProgramRow, null)
                )
            );
        }
    }]);

    return ProgramListSection;
}(_react.Component);

var ProgramRow = function (_Component5) {
    _inherits(ProgramRow, _Component5);

    function ProgramRow(props) {
        _classCallCheck(this, ProgramRow);

        return _possibleConstructorReturn(this, (ProgramRow.__proto__ || Object.getPrototypeOf(ProgramRow)).call(this, props));
    }

    _createClass(ProgramRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.SectionRow,
                null,
                _react2.default.createElement(
                    _section.SectionRowContent,
                    null,
                    "Program Name"
                )
            );
        }
    }]);

    return ProgramRow;
}(_react.Component);

exports.default = ProgramList;
//# sourceMappingURL=program_list.js.map