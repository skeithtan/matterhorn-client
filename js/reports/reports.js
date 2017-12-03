import {
    app,
    Menu,
} from "electron";


const menus = [
    {
        label : "Reports",
        submenu : [
            {
                label : "Outbound Units",
                click : () => {
                    console.log("Hello, World");
                },
            },
            {
                label : "Units",
                click : () => {
                    console.log("Hello, World");
                },
            },
            {
                label : "International Students Statistics",
                click : () => {
                    console.log("Hello, World");
                },
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

    // Edit menu
    menus[1].submenu.push(
        { type : "separator" },
        {
            label : "Speech",
            submenu : [
                { role : "startspeaking" },
                { role : "stopspeaking" },
            ],
        },
    );

    // Window menu
    menus[3].submenu = [
        { role : "close" },
        { role : "minimize" },
        { role : "zoom" },
        { type : "separator" },
        { role : "front" },
    ];
}

export default menus;