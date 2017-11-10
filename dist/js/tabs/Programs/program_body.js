"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _program_list = require("./program_list");

var _program_list2 = _interopRequireDefault(_program_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramBody = function (_Component) {
    _inherits(ProgramBody, _Component);

    function ProgramBody(props) {
        _classCallCheck(this, ProgramBody);

        return _possibleConstructorReturn(this, (ProgramBody.__proto__ || Object.getPrototypeOf(ProgramBody)).call(this, props));
    }

    _createClass(ProgramBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(_program_list2.default, null)
                )
            );
        }
    }]);

    return ProgramBody;
}(_react.Component);

// TODO


var ProgramListTabBar = function (_Component2) {
    _inherits(ProgramListTabBar, _Component2);

    function ProgramListTabBar(props) {
        _classCallCheck(this, ProgramListTabBar);

        return _possibleConstructorReturn(this, (ProgramListTabBar.__proto__ || Object.getPrototypeOf(ProgramListTabBar)).call(this, props));
    }

    _createClass(ProgramListTabBar, [{
        key: "render",
        value: function render() {}
    }]);

    return ProgramListTabBar;
}(_react.Component);

var ProgramListTab = function (_Component3) {
    _inherits(ProgramListTab, _Component3);

    function ProgramListTab(props) {
        _classCallCheck(this, ProgramListTab);

        return _possibleConstructorReturn(this, (ProgramListTab.__proto__ || Object.getPrototypeOf(ProgramListTab)).call(this, props));
    }

    _createClass(ProgramListTab, [{
        key: "render",
        value: function render() {}
    }]);

    return ProgramListTab;
}(_react.Component);

var ProgramDetails = function (_Component4) {
    _inherits(ProgramDetails, _Component4);

    function ProgramDetails(props) {
        _classCallCheck(this, ProgramDetails);

        return _possibleConstructorReturn(this, (ProgramDetails.__proto__ || Object.getPrototypeOf(ProgramDetails)).call(this, props));
    }

    _createClass(ProgramDetails, [{
        key: "render",
        value: function render() {}
    }]);

    return ProgramDetails;
}(_react.Component);

exports.default = ProgramBody;
//# sourceMappingURL=program_body.js.map