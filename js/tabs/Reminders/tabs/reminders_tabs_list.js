import React from "react";
import Memorandums from "./memorandums";

const tabs = [
    {
        name : "Memorandums",
        tab : setSidebarContent => <Memorandums setSidebarContent={ setSidebarContent }/>,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
];

export default tabs;