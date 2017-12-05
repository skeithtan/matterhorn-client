"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeRequirementsWindow = undefined;

var _electron = require("electron");

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeRequirementsWindow() {
    var reportWindow = new _electron.BrowserWindow({
        width: 400,
        height: 600,
        minWidth: 400,
        minHeight: 600
    });

    reportWindow.loadURL(_url2.default.format({
        pathname: _path2.default.join(__dirname, "../../../html/settings/requirements.html"),
        protocol: "file:",
        slashes: true
    }));

    reportWindow.on("closed", function () {
        return reportWindow = null;
    });
}

exports.makeRequirementsWindow = makeRequirementsWindow;
//# sourceMappingURL=windows.js.map