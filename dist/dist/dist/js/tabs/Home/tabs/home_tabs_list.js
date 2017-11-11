"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _memorandums = require("./memorandums");

var _memorandums2 = _interopRequireDefault(_memorandums);

var _programs = require("./programs");

var _programs2 = _interopRequireDefault(_programs);

var _students = require("./students");

var _students2 = _interopRequireDefault(_students);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var tabs = [{
    name: "Memorandums",
    tab: _react2.default.createElement(_memorandums2.default, null),
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}, {
    name: "Programs",
    tab: _react2.default.createElement(_programs2.default, null),
    image: "./images/programsgrey.png",
    activeImage: "./images/programsgreen.png"
}, {
    name: "Students",
    tab: _react2.default.createElement(_students2.default, null),
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=home_tabs_list.js.map
//# sourceMappingURL=home_tabs_list.js.map
//# sourceMappingURL=home_tabs_list.js.map