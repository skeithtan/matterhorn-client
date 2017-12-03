import React from "react";
import Memorandums from "./memorandums";
import Programs from "./programs";

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
];

export default tabs;