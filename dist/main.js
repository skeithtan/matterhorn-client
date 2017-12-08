"use strict";

var _require = require("electron"),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain,
    Menu = _require.Menu;

var path = require("path");
var url = require("url");

var _require2 = require("./dist/js/menu"),
    menu = _require2.default,
    toggleMenus = _require2.toggleMenus,
    restrictMenusByUserType = _require2.restrictMenusByUserType;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.


var mainWindow = void 0;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1100,
        minHeight: 800,
        frame: process.platform !== "darwin", // No frame on macs
        titleBarStyle: "hiddenInset"
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    Menu.setApplicationMenu(menu);
    toggleMenus(false);

    ipcMain.on("signed-in", function (event, isSignedIn) {
        toggleMenus(isSignedIn);
    });

    ipcMain.on("user-type", function (event, userType) {
        restrictMenusByUserType(userType);
    });

    // React Developer Tools

    var _require3 = require("electron-devtools-installer"),
        installExtension = _require3.default,
        REACT_DEVELOPER_TOOLS = _require3.REACT_DEVELOPER_TOOLS;

    installExtension(REACT_DEVELOPER_TOOLS).then(function (name) {
        console.log("Added Extension:  " + name);
    }).catch(function (err) {
        console.log("An error occurred: ", err);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map