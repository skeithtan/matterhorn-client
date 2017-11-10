"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpandContent = exports.CollapseContent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollapseContent = function (_Component) {
    _inherits(CollapseContent, _Component);

    function CollapseContent(props) {
        _classCallCheck(this, CollapseContent);

        return _possibleConstructorReturn(this, (CollapseContent.__proto__ || Object.getPrototypeOf(CollapseContent)).call(this, props));
    }

    _createClass(CollapseContent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "collapse-content", onClick: this.props.expand },
                _react2.default.createElement("img", { src: "./images/expand.png", className: "expand-image" }),
                _react2.default.createElement(
                    "h4",
                    null,
                    this.props.title
                )
            );
        }
    }]);

    return CollapseContent;
}(_react.Component);

var ExpandContent = function (_Component2) {
    _inherits(ExpandContent, _Component2);

    function ExpandContent(props) {
        _classCallCheck(this, ExpandContent);

        return _possibleConstructorReturn(this, (ExpandContent.__proto__ || Object.getPrototypeOf(ExpandContent)).call(this, props));
    }

    _createClass(ExpandContent, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "expand-content" },
                this.props.children
            );
        }
    }]);

    return ExpandContent;
}(_react.Component);

exports.CollapseContent = CollapseContent;
exports.ExpandContent = ExpandContent;
//# sourceMappingURL=collapse_content.js.map