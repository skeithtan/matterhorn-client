import React from "react";
import Reminders from "./Reminders/reminders";
import Institutions from "./Institutions/institutions";
import Students from "./Students/students";
import Programs from "./OutboundPrograms/outbound_programs";
import InboundPrograms from "./InboundPrograms/inbound_programs";
import Archives from "./Archives/archives";
import StudentApplications from "./StudentApplications/student_applications";

function getTabs() {
    let tabs = [
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
    ];


    if (localStorage.userType === "program_assistant" || localStorage.userType === "VP") {
        tabs = tabs.concat([
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
        ]);
    }

    if (localStorage.userType === "VP") {
        tabs.push({
            name : "Archives",
            tab : <Archives/>,
            image : "./images/archive.png",
        });
    }

    return tabs;
}


export default getTabs;