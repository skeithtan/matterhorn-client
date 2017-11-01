"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function authorizeXHR(xhr) {
    xhr.setRequestHeader("Authorization", "Token " + localStorage.token);
}

exports.default = authorizeXHR;
//# sourceMappingURL=authorization.js.map
//# sourceMappingURL=authorization.js.map