"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reportFiles = exports.makeReportWindow = undefined;

var _electron = require("electron");

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeReportWindow(file) {
    var reportWindow = new _electron.BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 1000,
        maxWidth: 1000,
        minHeight: 800
    });

    reportWindow.loadURL(_url2.default.format({
        pathname: _path2.default.join(__dirname, file),
        protocol: "file:",
        slashes: true
    }));

    reportWindow.on("closed", function () {
        return reportWindow = null;
    });
}

var reportFiles = {
    outboundAndInboundUnits: "../../../reports/outbound_and_inbound_units.html"
};

exports.makeReportWindow = makeReportWindow;
exports.reportFiles = reportFiles;
//# sourceMappingURL=windows.js.map