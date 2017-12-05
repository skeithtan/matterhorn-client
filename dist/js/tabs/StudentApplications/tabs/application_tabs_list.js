"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _overview = require("../../Students/tabs/overview");

var _overview2 = _interopRequireDefault(_overview);

var _application_requirements = require("./application_requirements");

var _application_requirements2 = _interopRequireDefault(_application_requirements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Overview",
    tab: function tab(inbound, applicant, refreshStudents) {
        return _react2.default.createElement(_overview2.default, { applicant: true,
            student: applicant,
            refreshStudents: refreshStudents });
    },
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}, {
    name: "Requirements",
    tab: function tab(inbound, applicant, refreshStudents) {
        return _react2.default.createElement(_application_requirements2.default, { student: applicant,
            inbound: inbound,
            refreshStudents: refreshStudents });
    },
    image: "./images/checklistgrey.png",
    activeImage: "./images/checklistgreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=application_tabs_list.js.map