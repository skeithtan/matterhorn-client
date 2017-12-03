import { app } from "electron";
import {
    makeReportWindow,
    reportFiles,
} from "./windows";


const menus = [
        {
            label : "Generate Reports",
            submenu : [
                {
                    label : "Units",
                    submenu : [
                        {
                            label : "Outbound and Inbound",
                            click : () => makeReportWindow(reportFiles.outboundAndInboundUnits),
                        },
                        {
                            label : "Outbound Default Vs Total",
                        },
                    ],
                },
                {
                    label : "International Students Statistics",
                    submenu : [
                        {
                            label : "By Country",
                        },
                        {
                            label : "By College",
                        },
                    ],
                },
                {
                    label : "Distribution of Students",
                    click : () => {
                        console.log("Hello, World");
                    },
                },
            ],
        },
        {
            label : "Edit",
            submenu : [
                { role : "undo" },
                { role : "redo" },
                { type : "separator" },
                { role : "cut" },
                { role : "copy" },
                { role : "paste" },
                { role : "pasteandmatchstyle" },
                { role : "delete" },
                { role : "selectall" },
            ],
        },
        {
            label : "View",
            submenu : [
                { role : "reload" },
                { role : "forcereload" },
                { role : "toggledevtools" },
                { type : "separator" },
                { role : "resetzoom" },
                { role : "zoomin" },
                { role : "zoomout" },
                { type : "separator" },
                { role : "togglefullscreen" },
            ],
        },
        {
            role : "window",
            submenu : [
                { role : "minimize" },
                { role : "close" },
            ],
        },
        {
            role : "help",
            submenu : [],
        },
    ]
;

if (process.platform === "darwin") {
    menus.unshift({
        label : app.getName(),
        submenu : [
            { role : "about" },
            { type : "separator" },
            { role : "services", submenu : [] },
            { type : "separator" },
            { role : "hide" },
            { role : "hideothers" },
            { role : "unhide" },
            { type : "separator" },
            { role : "quit" },
        ],
    });

    // Window menu
    menus[4].submenu = [
        { role : "close" },
        { role : "minimize" },
        { role : "zoom" },
        { type : "separator" },
        { role : "front" },
    ];
}

export default menus;