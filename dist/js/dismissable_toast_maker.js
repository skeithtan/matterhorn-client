"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeErrorToast = exports.makeInfoToast = undefined;

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Creates and shows an info iziToast, returning a function that dismisses it
function makeInfoToast(settings) {
    var uuid = makeUUID();
    settings.id = uuid;
    settings.timeout = false;
    _izitoast2.default.info(settings);

    var toast = document.getElementById(uuid);

    return function () {
        _izitoast2.default.hide(toast, {
            transitionOut: "fadeOut"
        });
    };
}

function makeErrorToast(settings) {
    var uuid = makeUUID();
    settings.id = uuid;
    settings.timeout = false;
    _izitoast2.default.error(settings);

    var toast = document.getElementById(uuid);

    return function () {
        _izitoast2.default.hide(toast, {
            transitionOut: "fadeOut"
        });
    };
}

function makeUUID() {
    // Random string with very little collision possibility
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}

exports.makeInfoToast = makeInfoToast;
exports.makeErrorToast = makeErrorToast;
//# sourceMappingURL=dismissable_toast_maker.js.map