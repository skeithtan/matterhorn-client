"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iziToast = require("iziToast");

var _iziToast2 = _interopRequireDefault(_iziToast);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

//Creates and shows an info iziToast, returning a function that dismisses it
function makeInfoToast(settings) {
    var uuid = makeUUID();
    settings.id = uuid;
    settings.timeout = false;
    _iziToast2.default.info(settings);

    return function () {
        var toast = document.getElementById(uuid);
        _iziToast2.default.hide({}, toast);
    };
}

function makeUUID() {
    // Random string with very little collision possibility
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}

exports.default = makeInfoToast;
//# sourceMappingURL=dismissable_toast_maker.js.map
//# sourceMappingURL=dismissable_toast_maker.js.map