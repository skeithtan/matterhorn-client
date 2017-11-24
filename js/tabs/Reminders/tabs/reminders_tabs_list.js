import React from "react";
import Memorandums from "./memorandums";
import Programs from "./programs";
import Students from "./students";

const tabs = [
    {
        name : "Memorandums",
        tab : setSidebarContent => <Memorandums setSidebarContent={ setSidebarContent }/>,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
    {
        name : "Outbound Programs",
        tab : undefined,
        image : "./images/airplanegrey.png",
        activeImage : "./images/airplanegreen.png",
    },
    {
        name : "Students",
        tab : undefined,
        image : "./images/studentgrey.png",
        activeImage : "./images/studentgreen.png",
    },
];

export default tabs;