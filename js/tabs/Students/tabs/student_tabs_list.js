import React from "react";
import StudentOverview from "./overview";

const tabs = [
    {
        name : "Overview",
        tab : (student, onDeleteActiveStudent, refreshStudents) => {
            return <StudentOverview student={ student }
                                    onDeleteActiveStudent={ onDeleteActiveStudent }
                                    refreshStudents={ refreshStudents }/>;
        },
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
    {
        name : "Residency History",
        tab : undefined,
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
];

export default tabs;