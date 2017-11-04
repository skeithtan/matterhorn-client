"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _overview = require("./overview");

var _overview2 = _interopRequireDefault(_overview);

var _memorandums = require("./memorandums");

var _memorandums2 = _interopRequireDefault(_memorandums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabs = [{
    name: "Overview",
    tab: function tab(institution, onDeleteActiveInstitution, refreshInstitutions) {
        return _react2.default.createElement(_overview2.default, { institution: institution,
            onDeleteActiveInstitution: onDeleteActiveInstitution,
            refreshInstitutions: refreshInstitutions });
    },
    image: "./images/burgergrey.png",
    activeImage: "./images/burgergreen.png"
}, {
    name: "Memorandums",
    tab: function tab(institution) {
        return _react2.default.createElement(_memorandums2.default, { institution: institution });
    },
    image: "./images/memorandumgrey.png",
    activeImage: "./images/memorandumgreen.png"
}];

exports.default = tabs;
//# sourceMappingURL=institution_tabs_list.js.map