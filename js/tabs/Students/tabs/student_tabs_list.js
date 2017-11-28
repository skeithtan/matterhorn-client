import React from "react";
import StudentOverview from "./overview";
import ResidentAddressHistory from "./resident_address_history";


const tabs = [
    {
        name : "Overview",
        tab : (student, onArchiveActiveStudent, refreshStudents) => {
            return <StudentOverview student={student}
                                    onArchiveActiveStudent={onArchiveActiveStudent}
                                    refreshStudents={refreshStudents}/>;
        },
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
    {
        name : "Residency",
        tab : (student, onArchiveStudent, refreshStudents, setSidebarContent) => {
            return <ResidentAddressHistory student={student}
                                           setSidebarContent={setSidebarContent}/>;
        },
        image : "./images/housegrey.png",
        activeImage : "./images/housegreen.png",
    },
];

export default tabs;