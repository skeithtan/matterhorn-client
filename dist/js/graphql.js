"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = graphql;
function graphql(object) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "http://127.0.0.1:8000/graphql/");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Token " + localStorage.token);
    xhr.onload = function () {
        return object.onResponse(xhr.response);
    };
    xhr.send(JSON.stringify({ query: object.query }));
}
//# sourceMappingURL=graphql.js.map