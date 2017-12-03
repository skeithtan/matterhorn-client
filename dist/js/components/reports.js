"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReportTitleContainer = exports.ReportHead = exports.ReportBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportBar = function (_Component) {
    _inherits(ReportBar, _Component);

    function ReportBar(props) {
        _classCallCheck(this, ReportBar);

        return _possibleConstructorReturn(this, (ReportBar.__proto__ || Object.getPrototypeOf(ReportBar)).call(this, props));
    }

    _createClass(ReportBar, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "report-bar bg-dlsu-lighter d-flex flex-row p-3 pt-2 pb-2 align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto d-flex flex-row" },
                    this.props.children
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { color: "light",
                            onClick: function onClick() {
                                return window.print();
                            } },
                        "Print report"
                    )
                )
            );
        }
    }]);

    return ReportBar;
}(_react.Component);

var ReportHead = function (_Component2) {
    _inherits(ReportHead, _Component2);

    function ReportHead() {
        _classCallCheck(this, ReportHead);

        return _possibleConstructorReturn(this, (ReportHead.__proto__ || Object.getPrototypeOf(ReportHead)).apply(this, arguments));
    }

    _createClass(ReportHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-row align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row mr-auto align-items-center" },
                    _react2.default.createElement("img", { src: "../images/dlsu_green.png",
                        className: "report-dlsu-logo mr-2" }),
                    _react2.default.createElement(
                        "div",
                        { className: "d-flex flex-column" },
                        _react2.default.createElement(
                            "div",
                            null,
                            "External Relations and Internationalization Office"
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            "De La Salle University Manila"
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-column text-right" },
                    _react2.default.createElement(
                        "div",
                        null,
                        "Report Generated"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        this.props.children
                    )
                )
            );
        }
    }]);

    return ReportHead;
}(_react.Component);

var ReportTitleContainer = function (_Component3) {
    _inherits(ReportTitleContainer, _Component3);

    function ReportTitleContainer() {
        _classCallCheck(this, ReportTitleContainer);

        return _possibleConstructorReturn(this, (ReportTitleContainer.__proto__ || Object.getPrototypeOf(ReportTitleContainer)).apply(this, arguments));
    }

    _createClass(ReportTitleContainer, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column align-items-center justify-content-center p-5" },
                this.props.children
            );
        }
    }]);

    return ReportTitleContainer;
}(_react.Component);

exports.ReportBar = ReportBar;
exports.ReportHead = ReportHead;
exports.ReportTitleContainer = ReportTitleContainer;
//# sourceMappingURL=reports.js.map