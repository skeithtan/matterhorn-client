import React from "react";
import StudentOverview from "./overview";
import ResidentAddressHistory from "./resident_address_history";

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
        name : "Residency",
        tab : (student) => {
            return <ResidentAddressHistory student={ student }/>;
        },
        image : "./images/housegrey.png",
        activeImage : "./images/housegreen.png",
    },
];

export default tabs;