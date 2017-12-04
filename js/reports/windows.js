import { BrowserWindow } from "electron";
import url from "url";
import path from "path";


function makeReportWindow(file) {
    let reportWindow = new BrowserWindow({
        width : 1000,
        height : 800,
        minWidth : 1000,
        maxWidth : 1000,
        minHeight : 800,
    });

    reportWindow.loadURL(url.format({
        pathname : path.join(__dirname, file),
        protocol : "file:",
        slashes : true,
    }));

    reportWindow.on("closed", () => reportWindow = null);
}

const reportFiles = {
    outboundAndInboundUnits : "../../../reports/outbound_and_inbound_units.html",
    distributionOfStudents : "../../../reports/distribution_of_students.html",
    studentStatisticsCountry : "../../../reports/student_statistics_country.html",
};

export {
    makeReportWindow,
    reportFiles,
};