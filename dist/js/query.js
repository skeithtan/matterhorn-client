"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function graphql(object) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/graphQL");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Token " + localStorage.token);
    xhr.onload = function () {
        return object.onResponse(xhr.response);
    };
    xhr.send(JSON.stringify({ query: object.query }));
}

exports.default = graphql;
//# sourceMappingURL=graphql.js.map