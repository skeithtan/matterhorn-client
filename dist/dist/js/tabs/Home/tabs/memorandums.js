"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// TODO: Queries

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        return _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));
    }

    _createClass(Memorandums, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "d-flex flex-column align-items-center page-body" }, _react2.default.createElement(_reactstrap.Card, { className: "home-card mt-4" }, _react2.default.createElement(_reactstrap.CardBody, { className: "p-0" }, _react2.default.createElement("div", { className: "d-flex flex-row p-3 justify-content-between align-items-center" }, _react2.default.createElement("div", null, _react2.default.createElement("small", { className: "text-uppercase text-secondary" }, "Institution name"), _react2.default.createElement("h6", { className: "mb-0" }, "Institution Name")), _react2.default.createElement("div", null, _react2.default.createElement("small", { className: "text-uppercase text-secondary" }, "Memorandum type"), _react2.default.createElement("h6", { className: "mb-0" }, "Memorandum of [Category]")), _react2.default.createElement(_reactstrap.CardSubtitle, { className: "text-danger" }, "Expiring in 2 months")), _react2.default.createElement("div", { className: "d-flex flex-column p-0" }, _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998")), _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998")), _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998"))))), _react2.default.createElement(_reactstrap.Card, { className: "home-card mt-4" }, _react2.default.createElement(_reactstrap.CardBody, { className: "p-0" }, _react2.default.createElement("div", { className: "d-flex flex-row p-3 justify-content-between align-items-center" }, _react2.default.createElement("div", null, _react2.default.createElement("small", { className: "text-uppercase text-secondary" }, "Institution name"), _react2.default.createElement("h6", { className: "mb-0" }, "Institution Name")), _react2.default.createElement("div", null, _react2.default.createElement("small", { className: "text-uppercase text-secondary" }, "Memorandum type"), _react2.default.createElement("h6", { className: "mb-0" }, "Memorandum of [Category]")), _react2.default.createElement(_reactstrap.CardSubtitle, { className: "text-danger" }, "Expiring in 2 months")), _react2.default.createElement("div", { className: "d-flex flex-column p-0" }, _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998")), _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998")), _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998"))))), _react2.default.createElement(_reactstrap.Card, { className: "home-card mt-4" }, _react2.default.createElement(_reactstrap.CardBody, { className: "p-0" }, _react2.default.createElement("div", { className: "d-flex flex-row p-3 justify-content-between align-items-center" }, _react2.default.createElement("div", null, _react2.default.createElement("small", { className: "text-uppercase text-secondary" }, "Institution name"), _react2.default.createElement("h6", { className: "mb-0" }, "Institution Name")), _react2.default.createElement("div", null, _react2.default.createElement("small", { className: "text-uppercase text-secondary" }, "Memorandum type"), _react2.default.createElement("h6", { className: "mb-0" }, "Memorandum of [Category]")), _react2.default.createElement(_reactstrap.CardSubtitle, { className: "text-danger" }, "Expiring in 2 months")), _react2.default.createElement("div", { className: "d-flex flex-column p-0" }, _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998")), _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998")), _react2.default.createElement(_section.SectionRow, null, _react2.default.createElement(_section.SectionRowTitle, null, "Date Effective"), _react2.default.createElement(_section.SectionRowContent, null, "June 18, 1998"))))));
        }
    }]);

    return Memorandums;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map
//# sourceMappingURL=memorandums.js.map