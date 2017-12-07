"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _memorandums = require("./memorandums");

var _memorandums2 = _interopRequireDefault(_memorandums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Memorandums",
    tab: function tab(setSidebarContent) {
        return _react2.default.createElement(_memorandums2.default, { setSidebarContent: setSidebarContent });
    },
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=reminders_tabs_list.js.map