"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SectionRowContent = exports.SectionFooter = exports.SectionRowTitle = exports.SectionRow = exports.SectionTable = exports.SectionTitle = exports.Section = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Component) {
    _inherits(Section, _Component);

    function Section(props) {
        _classCallCheck(this, Section);

        return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this, props));
    }

    _createClass(Section, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "section " + (this.props.collapsed && "collapsed") },
                this.props.children
            );
        }
    }]);

    return Section;
}(_react.Component);

var SectionTitle = function (_Component2) {
    _inherits(SectionTitle, _Component2);

    function SectionTitle(props) {
        _classCallCheck(this, SectionTitle);

        return _possibleConstructorReturn(this, (SectionTitle.__proto__ || Object.getPrototypeOf(SectionTitle)).call(this, props));
    }

    _createClass(SectionTitle, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "small",
                { className: "section-title" },
                this.props.children
            );
        }
    }]);

    return SectionTitle;
}(_react.Component);

var SectionFooter = function (_Component3) {
    _inherits(SectionFooter, _Component3);

    function SectionFooter(props) {
        _classCallCheck(this, SectionFooter);

        return _possibleConstructorReturn(this, (SectionFooter.__proto__ || Object.getPrototypeOf(SectionFooter)).call(this, props));
    }

    _createClass(SectionFooter, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "small",
                { className: "section-footer" },
                this.props.children
            );
        }
    }]);

    return SectionFooter;
}(_react.Component);

var SectionTable = function (_Component4) {
    _inherits(SectionTable, _Component4);

    function SectionTable(props) {
        _classCallCheck(this, SectionTable);

        return _possibleConstructorReturn(this, (SectionTable.__proto__ || Object.getPrototypeOf(SectionTable)).call(this, props));
    }

    _createClass(SectionTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroup,
                { className: this.props.className },
                this.props.children
            );
        }
    }]);

    return SectionTable;
}(_react.Component);

var SectionRow = function (_Component5) {
    _inherits(SectionRow, _Component5);

    function SectionRow(props) {
        _classCallCheck(this, SectionRow);

        return _possibleConstructorReturn(this, (SectionRow.__proto__ || Object.getPrototypeOf(SectionRow)).call(this, props));
    }

    _createClass(SectionRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                { onClick: this.props.onClick,
                    className: "section-row " + (this.props.className || "") + " " + (this.props.collapsed && "collapsed"),
                    active: this.props.active,
                    action: this.props.selectable },
                this.props.children
            );
        }
    }]);

    return SectionRow;
}(_react.Component);

var SectionRowTitle = function (_Component6) {
    _inherits(SectionRowTitle, _Component6);

    function SectionRowTitle(props) {
        _classCallCheck(this, SectionRowTitle);

        return _possibleConstructorReturn(this, (SectionRowTitle.__proto__ || Object.getPrototypeOf(SectionRowTitle)).call(this, props));
    }

    _createClass(SectionRowTitle, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "small",
                { className: "font-weight-bold" },
                this.props.children
            );
        }
    }]);

    return SectionRowTitle;
}(_react.Component);

var SectionRowContent = function (_Component7) {
    _inherits(SectionRowContent, _Component7);

    function SectionRowContent(props) {
        _classCallCheck(this, SectionRowContent);

        return _possibleConstructorReturn(this, (SectionRowContent.__proto__ || Object.getPrototypeOf(SectionRowContent)).call(this, props));
    }

    _createClass(SectionRowContent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "p",
                { className: "m-0 " + (this.props.className || "") + " " + (this.props.large ? "lead" : ""),
                    onClick: this.props.onClick },
                this.props.children
            );
        }
    }]);

    return SectionRowContent;
}(_react.Component);

exports.Section = Section;
exports.SectionTitle = SectionTitle;
exports.SectionTable = SectionTable;
exports.SectionRow = SectionRow;
exports.SectionRowTitle = SectionRowTitle;
exports.SectionFooter = SectionFooter;
exports.SectionRowContent = SectionRowContent;
//# sourceMappingURL=section.js.map