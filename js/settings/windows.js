import { BrowserWindow } from "electron";
import url from "url";
import path from "path";

function makeRequirementsWindow() {
    let reportWindow = new BrowserWindow({
        width : 400,
        height : 600,
        minWidth : 400,
        minHeight : 600,
    });

    reportWindow.loadURL(url.format({
        pathname : path.join(__dirname, "../../../html/settings/requirements.html"),
        protocol : "file:",
        slashes : true,
    }));

    reportWindow.on("closed", () => reportWindow = null);
}

export {
    makeRequirementsWindow,
};