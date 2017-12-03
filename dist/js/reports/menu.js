"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleMenus = exports.default = undefined;

var _electron = require("electron");

var _windows = require("./windows");

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
            label: "Outbound Default Vs Total"
        }]
    }, {
        label: "International Students Statistics",
        submenu: [{
            label: "By Country"
        }, {
            label: "By College"
        }]
    }, {
        label: "Distribution of Students",
        click: function click() {
            console.log("Hello, World");
        }
    }]
}, {
    label: "Edit",
    submenu: [{ role: "undo" }, { role: "redo" }, { type: "separator" }, { role: "cut" }, { role: "copy" }, { role: "paste" }, { role: "pasteandmatchstyle" }, { role: "delete" }, { role: "selectall" }]
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
    menus[4].submenu = [{ role: "close" }, { role: "minimize" }, { role: "zoom" }, { type: "separator" }, { role: "front" }];
}

var menu = _electron.Menu.buildFromTemplate(menus);

function toggleMenus(enabled) {
    var reportsMenu = process.platform === "darwin" ? menu.items[1] : menu.items[0];

    reportsMenu.enabled = false;

    function applyToSubmenus(submenu) {
        submenu.items.forEach(function (item) {
            if (item.submenu) {
                applyToSubmenus(item.submenu);
                return;
            }

            item.enabled = enabled;
        });
    }

    applyToSubmenus(reportsMenu.submenu);
}

exports.default = menu;
exports.toggleMenus = toggleMenus;
//# sourceMappingURL=menu.js.map