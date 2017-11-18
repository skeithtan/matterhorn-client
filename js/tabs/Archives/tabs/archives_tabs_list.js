import MemorandumArchives from "./memorandums";
import React from "react";
import StudentArchives from "./students";
import ProgramArchives from "./programs";
import InstitutionArchives from "./instititutions";


const tabs = [
    {
        name : "Memorandums",
        tab : setSidebarContent => <MemorandumArchives setSidebarContent={setSidebarContent}/>,
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
    {
        name : "Students",
        tab : setSidebarContent => <StudentArchives setSidebarContent={setSidebarContent}/>,
        image : "./images/studentgrey.png",
        activeImage : "./images/studentgreen.png",
    },
    {
        name : "Institutions",
        tab : setSidebarContent => <InstitutionArchives setSidebarContent={setSidebarContent}/>,
        image : "./images/institutiongrey.png",
        activeImage : "./images/institutiongreen.png",
    },
];

export default tabs;