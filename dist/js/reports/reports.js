"use strict";

var _electron = require("electron");

var menus = [{
    label: "Reports",
    submenu: [{
        role: "Outbound Units"
    }, {
        role: "Units"
    }, {
        role: "International Students Statistics"
    }, {
        role: "Distribution of Students"
    }]
}];

if (process.platform === "darwin") {
    menus.unshift({
        label: _electron.app.getName(),
        submenu: [{ role: "about" }, { type: "separator" }, { role: "services", submenu: [] }, { type: "separator" }, { role: "hide" }, { role: "hideothers" }, { role: "unhide" }, { type: "separator" }, { role: "quit" }]
    });

    // Edit menu
    menus[1].submenu.push({ type: "separator" }, {
        label: "Speech",
        submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
    });

    // Window menu
    menus[3].submenu = [{ role: "close" }, { role: "minimize" }, { role: "zoom" }, { type: "separator" }, { role: "front" }];
}

var menu = _electron.Menu.buildFrommenus(menus);
_electron.Menu.setApplicationMenu(menu);
//# sourceMappingURL=reports.js.map