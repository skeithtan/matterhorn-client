import React from "react";
import Home from "./Home/home";
import Institutions from "./Institutions/institutions";
import Students from "./Students/students";
import Programs from "./Programs/programs";

const tabs = [
    {
        name : "Home",
        tab : <Home/>,
        image : "./images/home.png",
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
        image : "./images/airplane.png"
    },
];

export default tabs;