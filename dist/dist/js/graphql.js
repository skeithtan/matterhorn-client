"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = require("./settings");

var _settings2 = _interopRequireDefault(_settings);

var _lokka = require("lokka");

var _lokka2 = _interopRequireDefault(_lokka);

var _lokkaTransportHttp = require("lokka-transport-http");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var headers = { "Authorization": "Token " + localStorage.token };

var graphql = new _lokka2.default({
    transport: new _lokkaTransportHttp.Transport(_settings2.default.serverURL + "/graphql/", { headers: headers })
});

exports.default = graphql;
//# sourceMappingURL=graphql.js.map
//# sourceMappingURL=graphql.js.map