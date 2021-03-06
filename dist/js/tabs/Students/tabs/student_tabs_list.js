"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _overview = require("./overview");

var _overview2 = _interopRequireDefault(_overview);

var _resident_address_history = require("./resident_address_history");

var _resident_address_history2 = _interopRequireDefault(_resident_address_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Overview",
    tab: function tab(student, onArchiveActiveStudent, refreshStudents) {
        return _react2.default.createElement(_overview2.default, { student: student,
            onArchiveActiveStudent: onArchiveActiveStudent,
            refreshStudents: refreshStudents });
    },
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}, {
    name: "Residency",
    tab: function tab(student, onArchiveStudent, refreshStudents, setSidebarContent) {
        return _react2.default.createElement(_resident_address_history2.default, { student: student,
            setSidebarContent: setSidebarContent });
    },
    image: "./images/housegrey.png",
    activeImage: "./images/housegreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=student_tabs_list.js.map