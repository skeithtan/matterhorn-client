import MemorandumArchives from "./memorandums";
import React from "react";
import StudentArchives from "./students";
import ProgramArchives from "./programs";


const tabs = [
    {
        name : "Memorandums",
        tab : setSidebarContent => <MemorandumArchives setSidebarContent={ setSidebarContent }/>,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
    {
        name : "Programs",
        tab : setSidebarContent => <ProgramArchives setSidebarContent={ setSidebarContent }/>,
        image : "./images/airplanegrey.png",
        activeImage : "./images/airplanegreen.png",
    },
    {
        name : "Students",
        tab : setSidebarContent => <StudentArchives setSidebarContent={ setSidebarContent }/>,
        image : "./images/studentgrey.png",
        activeImage : "./images/studentgreen.png",
    },
    {
        name : "Institutions",
        tab : undefined,
        image : "./images/institutiongrey.png",
        activeImage : "./images/institutiongreen.png",
    },
];

export default tabs;