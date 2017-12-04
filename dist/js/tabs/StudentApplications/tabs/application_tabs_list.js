"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _overview = require("../../Students/tabs/overview");

var _overview2 = _interopRequireDefault(_overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Overview",
    tab: function tab(applicant, refreshStudents) {
        return _react2.default.createElement(_overview2.default, { applicant: true,
            student: applicant,
            refreshStudents: refreshStudents });
    },
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}, {
    name: "Requirements",
    tab: null,
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=application_tabs_list.js.map