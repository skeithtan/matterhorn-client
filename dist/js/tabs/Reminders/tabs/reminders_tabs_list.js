"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _memorandumsRefactor = require("./memorandums-refactor");

var _memorandumsRefactor2 = _interopRequireDefault(_memorandumsRefactor);

var _programs = require("./programs");

var _programs2 = _interopRequireDefault(_programs);

var _students = require("./students");

var _students2 = _interopRequireDefault(_students);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Memorandums",
    tab: function tab(setSidebarContent) {
        return _react2.default.createElement(_memorandumsRefactor2.default, { setSidebarContent: setSidebarContent });
    },
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}, {
    name: "Outbound Programs",
    tab: undefined,
    image: "./images/airplanegrey.png",
    activeImage: "./images/airplanegreen.png"
}, {
    name: "Students",
    tab: undefined,
    image: "./images/studentgrey.png",
    activeImage: "./images/studentgreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=reminders_tabs_list.js.map