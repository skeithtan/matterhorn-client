import React from "react";
import Memorandums from "./memorandums";

const tabs = [
    {
        name : "Memorandums",
        tab : <Memorandums/>,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
    {
        name : "Programs",
        tab : undefined,
        image : "./images/programsgrey.png",
        activeImage : "./images/programsgreen.png",
    },
    {
        name : "Students",
        tab : undefined,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
];

export default tabs;