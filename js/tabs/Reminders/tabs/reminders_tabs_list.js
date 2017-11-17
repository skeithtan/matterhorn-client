import React from "react";
import Memorandums from "./memorandums";
import Programs from "./programs";
import Students from "./students";

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
        tab : <Students/>,
        image : "./images/studentgrey.png",
        activeImage : "./images/studentgreen.png",
    },
];

export default tabs;