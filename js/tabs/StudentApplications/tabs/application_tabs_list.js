import React from "react";
import StudentOverview from "../../Students/tabs/overview";
import ApplicationRequirements from "./application_requirements";


const tabs = [
    {
        name : "Overview",
        tab : (inbound, applicant, refreshStudents) => <StudentOverview applicant
                                                                        student={applicant}
                                                                        refreshStudents={refreshStudents}/>,
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
    {
        name : "Requirements",
        tab : (inbound, applicant, refreshStudents) => <ApplicationRequirements student={applicant}
                                                                                inbound={inbound}
                                                                                refreshStudents={refreshStudents}/>,
        image : "./images/checklistgrey.png",
        activeImage : "./images/checklistgreen.png",
    },
];

export default tabs;