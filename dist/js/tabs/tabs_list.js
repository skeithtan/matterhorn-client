"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _home = require("./Home/home");

var _home2 = _interopRequireDefault(_home);

var _institutions = require("./Institutions/institutions");

var _institutions2 = _interopRequireDefault(_institutions);

var _students = require("./Students/students");

var _students2 = _interopRequireDefault(_students);

var _programs = require("./Programs/programs");

var _programs2 = _interopRequireDefault(_programs);

var _archives = require("./Archives/archives");

var _archives2 = _interopRequireDefault(_archives);

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
    name: "Students",
    tab: _react2.default.createElement(_students2.default, null),
    image: "./images/student.png"
}, {
    name: "Programs",
    tab: _react2.default.createElement(_programs2.default, null),
    image: "./images/airplane.png"
}, {
    name: "Archives",
    tab: _react2.default.createElement(_archives2.default, null),
    image: "./images/archive.png"
}];

exports.default = tabs;
//# sourceMappingURL=tabs_list.js.map