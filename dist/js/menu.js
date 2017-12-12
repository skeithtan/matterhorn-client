"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.restrictMenusByUserType = exports.toggleMenus = exports.default = undefined;

var _electron = require("electron");

var _windows = require("./reports/windows");

var _windows2 = require("./settings/windows");

var menus = [{
    label: "Generate Reports",
    submenu: [{
        label: "Units",
        submenu: [{
            label: "Outbound and Inbound",
            click: function click() {
                return (0, _windows.makeReportWindow)(_windows.reportFiles.outboundAndInboundUnits);
            }
        }, {
            label: "Outbound Default Vs Total",
            click: function click() {
                return (0, _windows.makeReportWindow)(_windows.reportFiles.outboundDefaultVsTotalUnits);
            }
        }]
    }, {
        label: "International Students Statistics",
        submenu: [{
            label: "By Country",
            click: function click() {
                return (0, _windows.makeReportWindow)(_windows.reportFiles.studentStatisticsCountry);
            }
        }, {
            label: "By College",
            click: function click() {
                return (0, _windows.makeReportWindow)(_windows.reportFiles.studentStatisticsCollege);
            }
        }]
    }, {
        label: "Distribution of Students",
        submenu: [{
            label: "By Institution",
            click: function click() {
                return (0, _windows.makeReportWindow)(_windows.reportFiles.distributionOfStudents);
            }
        }, {
            label: "By Country",
            click: function click() {
                return (0, _windows.makeReportWindow)(_windows.reportFiles.distributionPerCountry);
            }
        }]
    }]
}, {
    label: "Settings",
    submenu: [{
        label: "Define Application Requirements",
        click: _windows2.makeRequirementsWindow
    }]
}, {
    label: "Edit",
    submenu: [{ role: "cut" }, { role: "copy" }, { role: "paste" }, { role: "pasteandmatchstyle" }, { role: "delete" }, { role: "selectall" }]
}, {
    label: "View",
    submenu: [{ role: "reload" }, { role: "forcereload" }, { role: "toggledevtools" }, { type: "separator" }, { role: "resetzoom" }, { role: "zoomin" }, { role: "zoomout" }, { type: "separator" }, { role: "togglefullscreen" }]
}, {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
}, {
    role: "help",
    submenu: []
}];

if (process.platform === "darwin") {
    menus.unshift({
        label: _electron.app.getName(),
        submenu: [{ role: "about" }, { type: "separator" }, { role: "services", submenu: [] }, { type: "separator" }, { role: "hide" }, { role: "hideothers" }, { role: "unhide" }, { type: "separator" }, { role: "quit" }]
    });

    // Window menu
    menus[5].submenu = [{ role: "close" }, { role: "minimize" }, { role: "zoom" }, { type: "separator" }, { role: "front" }];
}

var menu = _electron.Menu.buildFromTemplate(menus);

function restrictMenu(submenu, enabled) {
    submenu.items.forEach(function (item) {
        if (item.submenu) {
            restrictMenu(item.submenu, enabled);
            return;
        }

        item.enabled = enabled;
    });
}

function toggleMenus(enabled) {
    var reportsMenu = process.platform === "darwin" ? menu.items[1] : menu.items[0];
    var settingsMenu = process.platform === "darwin" ? menu.items[2] : menu.items[1];

    restrictMenu(reportsMenu.submenu, enabled);
    restrictMenu(settingsMenu.submenu, enabled);
}

function restrictMenusByUserType(userType) {
    if (userType === "administrative_assistant") {
        var settingsMenu = process.platform === "darwin" ? menu.items[2] : menu.items[1];
        restrictMenu(settingsMenu.submenu, false);
    }
}

exports.default = menu;
exports.toggleMenus = toggleMenus;
exports.restrictMenusByUserType = restrictMenusByUserType;
//# sourceMappingURL=menu.js.map