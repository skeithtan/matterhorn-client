import React from "react";
import Memorandums from "./memorandums";
import Programs from "./programs";
import Students from "./students";

const tabs = [
    {
        name : "Memorandums",
        tab : setSidebarContent => <Memorandums setSidebarContent={setSidebarContent}/>,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
    {
        name : "Programs",
        tab : setSidebarContent => <Programs setSidebarContent={setSidebarContent}/>,
        image : "./images/programsgrey.png",
        activeImage : "./images/programsgreen.png",
    },
    {
        name : "Students",
        tab : setSidebarContent => <Students setSidebarContent={setSidebarContent}/>,
        image : "./images/studentgrey.png",
        activeImage : "./images/studentgreen.png",
    },
];

export default tabs;