import {
    app,
    Menu,
} from "electron";
import {
    makeReportWindow,
    reportFiles,
} from "./reports/windows";
import { makeRequirementsWindow } from "./settings/windows";


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
                            click : () => makeReportWindow(reportFiles.outboundDefaultVsTotalUnits),
                        },
                    ],
                },
                {
                    label : "International Students Statistics",
                    submenu : [
                        {
                            label : "By Country",
                            click : () => makeReportWindow(reportFiles.studentStatisticsCountry),
                        },
                        {
                            label : "By College",
                            click : () => makeReportWindow(reportFiles.studentStatisticsCollege),
                        },
                    ],
                },
                {
                    label : "Distribution of Students",
                    submenu : [
                        {
                            label : "By Institution",
                            click : () => makeReportWindow(reportFiles.distributionOfStudents),
                        },
                        {
                            label : "By Country",
                            click : () => makeReportWindow(reportFiles.distributionPerCountry),
                        },
                    ],
                },
            ],
        },
        {
            label : "Settings",
            submenu : [
                {
                    label : "Define Application Requirements",
                    click : makeRequirementsWindow,
                },
            ],
        },
        {
            label : "Edit",
            submenu : [
                {role : "cut"},
                {role : "copy"},
                {role : "paste"},
                {role : "pasteandmatchstyle"},
                {role : "delete"},
                {role : "selectall"},
            ],
        },
        {
            label : "View",
            submenu : [
                {role : "reload"},
                {role : "forcereload"},
                {role : "toggledevtools"},
                {type : "separator"},
                {role : "resetzoom"},
                {role : "zoomin"},
                {role : "zoomout"},
                {type : "separator"},
                {role : "togglefullscreen"},
            ],
        },
        {
            role : "window",
            submenu : [
                {role : "minimize"},
                {role : "close"},
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
            {role : "about"},
            {type : "separator"},
            {role : "services", submenu : []},
            {type : "separator"},
            {role : "hide"},
            {role : "hideothers"},
            {role : "unhide"},
            {type : "separator"},
            {role : "quit"},
        ],
    });

    // Window menu
    menus[5].submenu = [
        {role : "close"},
        {role : "minimize"},
        {role : "zoom"},
        {type : "separator"},
        {role : "front"},
    ];
}

const menu = Menu.buildFromTemplate(menus);

function restrictMenu(submenu, enabled) {
    submenu.items.forEach(item => {
        if (item.submenu) {
            restrictMenu(item.submenu, enabled);
            return;
        }

        item.enabled = enabled;
    });
}

function toggleMenus(enabled) {
    const reportsMenu = process.platform === "darwin" ? menu.items[1] : menu.items[0];
    const settingsMenu = process.platform === "darwin" ? menu.items[2] : menu.items[1];

    restrictMenu(reportsMenu.submenu, enabled);
    restrictMenu(settingsMenu.submenu, enabled);
}

function restrictMenusByUserType(userType) {
    if (userType === "administrative_assistant") {
        const settingsMenu = process.platform === "darwin" ? menu.items[2] : menu.items[1];
        restrictMenu(settingsMenu.submenu, false);
    }
}

export {
    menu as default,
    toggleMenus,
    restrictMenusByUserType
};