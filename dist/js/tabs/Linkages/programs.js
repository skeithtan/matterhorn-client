"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        return _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));
    }

    _createClass(Programs, [{
        key: "render",
        value: function render() {
            return (
                // w-100 was something I added. If it breaks, this might be it.
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-column p-0 h-100 w-100" },
                    _react2.default.createElement(ProgramsHead, null),
                    _react2.default.createElement(ProgramsBody, null)
                )
            );
        }
    }]);

    return Programs;
}(_react.Component);

var ProgramsHead = function (_Component2) {
    _inherits(ProgramsHead, _Component2);

    function ProgramsHead(props) {
        _classCallCheck(this, ProgramsHead);

        return _possibleConstructorReturn(this, (ProgramsHead.__proto__ || Object.getPrototypeOf(ProgramsHead)).call(this, props));
    }

    _createClass(ProgramsHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" },
                        "University Name",
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted ml-2" },
                            "Country"
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true, size: "sm", color: "success" },
                    "Add Program"
                )
            );
        }
    }]);

    return ProgramsHead;
}(_react.Component);

var ProgramsBody = function (_Component3) {
    _inherits(ProgramsBody, _Component3);

    function ProgramsBody(props) {
        _classCallCheck(this, ProgramsBody);

        return _possibleConstructorReturn(this, (ProgramsBody.__proto__ || Object.getPrototypeOf(ProgramsBody)).call(this, props));
    }

    _createClass(ProgramsBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "page-body" });
        }
    }]);

    return ProgramsBody;
}(_react.Component);

var Program = function (_Component4) {
    _inherits(Program, _Component4);

    function Program(props) {
        _classCallCheck(this, Program);

        return _possibleConstructorReturn(this, (Program.__proto__ || Object.getPrototypeOf(Program)).call(this, props));
    }

    _createClass(Program, [{
        key: "render",
        value: function render() {}
    }]);

    return Program;
}(_react.Component);

exports.default = Programs;
//# sourceMappingURL=programs.js.map