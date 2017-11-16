"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _memorandums = require("./memorandums");

var _memorandums2 = _interopRequireDefault(_memorandums);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Memorandums",
    tab: function tab(setSidebarContent) {
        return _react2.default.createElement(_memorandums2.default, { setSidebarContent: setSidebarContent });
    },
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}, {
    name: "Programs",
    tab: undefined,
    image: "./images/programsgrey.png",
    activeImage: "./images/programsgreen.png"
}, {
    name: "Students",
    tab: undefined,
    image: "./images/studentgrey.png",
    activeImage: "./images/studentgreen.png"
}, {
    name: "Institutions",
    tab: undefined,
    image: "./images/institutiongrey.png",
    activeImage: "./images/institutiongreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=archives_tabs_list.js.map