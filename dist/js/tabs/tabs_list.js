"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _home = require("./home");

var _home2 = _interopRequireDefault(_home);

var _institutions = require("./Institutions/institutions");

var _institutions2 = _interopRequireDefault(_institutions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Home",
    tab: _react2.default.createElement(_home2.default, null),
    image: "./images/home.png"
}, {
    name: "Institutions",
    tab: _react2.default.createElement(_institutions2.default, null),
    image: "./images/uni.png"
}, {
    name: "Programs",
    tab: undefined,
    image: "./images/airplane.png"
}, {
    name: "Students",
    tab: undefined,
    image: "./images/student.png"
}];

exports.default = tabs;
//# sourceMappingURL=tabs_list.js.map