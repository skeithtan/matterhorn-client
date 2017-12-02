import React from "react";
import Reminders from "./Reminders/reminders";
import Institutions from "./Institutions/institutions";
import Students from "./Students/students";
import Programs from "./OutboundPrograms/outbound_programs";
import InboundPrograms from "./InboundPrograms/inbound_programs";
import Archives from "./Archives/archives";
import StudentApplications from "./StudentApplications/student_applications";


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
        name : "Student Applications",
        tab : <StudentApplications/>,
        image : "./images/checklist.png",
    },
    {
        name : "Inbound Programs",
        tab : <InboundPrograms/>,
        image : "./images/inbound.png",
    },
    {
        name : "Outbound Programs",
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