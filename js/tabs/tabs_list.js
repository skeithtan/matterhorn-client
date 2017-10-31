import React from "react";
import Home from "./home";
import Institutions from "./Institutions/institutions";


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
        name : "Programs",
        tab : undefined,
        image : "./images/airplane.png",
    },
    {
        name : "Students",
        tab : undefined,
        image : "./images/student.png",
    },
];

export default tabs;