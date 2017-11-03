import React from "react";
import Home from "./home";
import Institutions from "./Institutions/institutions";
import Students from "./Students/students";
import Linkages from "./Linkages/linkages";


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
        name : "Linkages",
        tab : <Linkages/>,
        image : "./images/linkwhite.png"
    },
];

export default tabs;