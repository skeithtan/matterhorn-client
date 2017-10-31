"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = graphql;

var _settings = require("./settings");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function graphql(object) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", _settings2.default.serverURL + "/graphql/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Token " + localStorage.token);
    xhr.onload = function () {
        return object.onResponse(xhr.response);
    };
    xhr.send(JSON.stringify({ query: object.query }));
}
//# sourceMappingURL=graphql.js.map