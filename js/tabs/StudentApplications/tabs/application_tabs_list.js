import React from "react";
import StudentOverview from "../../Students/tabs/overview";

const tabs = [
    {
        name : "Overview",
        tab : (applicant, refreshStudents) => {
            return <StudentOverview applicant
                                    student={ applicant }
                                    refreshStudents={ refreshStudents }/>;
        },
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
    {
        name : "Requirements",
        tab : null,
        image : "./images/checklistgrey.png",
        activeImage : "./images/checklistgreen.png",
    },
];

export default tabs;