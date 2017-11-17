"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _overview = require("./overview");

var _overview2 = _interopRequireDefault(_overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Overview",
    tab: function tab(student, onDeleteActiveStudent, refreshStudents) {
        return _react2.default.createElement(_overview2.default, { student: student,
            onDeleteActiveStudent: onDeleteActiveStudent,
            refreshStudents: refreshStudents });
    },
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}, {
    name: "Residency",
    tab: undefined,
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=student_tabs_list.js.map