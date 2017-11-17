import React from "react";
import Reminders from "./Reminders/reminders";
import Institutions from "./Institutions/institutions";
import Students from "./Students/students";
import Programs from "./Programs/programs";
import Archives from "./Archives/archives";


const tabs = [
    {
        name : "Reminders",
        tab : <Reminders/>,
        image : "./images/bell.png",
    },
    {
        name : "Institutions",
        tab : <Institutions/>,
        image : "./images/uni.png",
    },
    {
        name : "Students",
        tab : <Students/>,
        image : "./images/student.png",
    },
    {
        name : "Programs",
        tab : <Programs/>,
        image : "./images/airplane.png",
    },
    {
        name : "Archives",
        tab : <Archives/>,
        image : "./images/archive.png",
    },
];

export default tabs;