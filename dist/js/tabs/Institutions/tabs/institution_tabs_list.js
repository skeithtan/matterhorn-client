"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _institution_overview = require("./institution_overview");

var _institution_overview2 = _interopRequireDefault(_institution_overview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Overview",
    tab: function tab(institution, onDeleteActiveInstitution, refreshInstitutions) {
        return _react2.default.createElement(_institution_overview2.default, { institution: institution,
            onDeleteActiveInstitution: onDeleteActiveInstitution,
            refreshInstitutions: refreshInstitutions });
    },
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}, {
    name: "Memorandums",
    tab: function tab(institution) {
        return null;
    },
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}, {
    name: "Programs",
    tab: function tab(institution) {
        return null;
    },
    image: "./images/programsgrey.png",
    activeImage: "./images/programsgreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=institution_tabs_list.js.map