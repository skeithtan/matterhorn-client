import React from "react";
import InstitutionOverview from "./overview";
import Memorandums from "./memorandums";
import Programs from "./programs";


const tabs = [
    {
        name : "Overview",
        tab : (institution, setSidebarContent, onDeleteActiveInstitution, refreshInstitutions) => {
            return <InstitutionOverview institution={institution}
                                        setSidebarContent={setSidebarContent}
                                        onDeleteActiveInstitution={onDeleteActiveInstitution}
                                        refreshInstitutions={refreshInstitutions}/>;
        },
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
    {
        name : "Memorandums",
        tab : (institution, setSidebarContent) => {
            return <Memorandums institution={institution} setSidebarContent={setSidebarContent}
            />;
        },
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
    {
        name : "Programs",
        tab : (institution, setSidebarContent) => {
            return <Programs institution={institution} setSidebarContent={setSidebarContent}
            />;
        },
        image : "./images/airplanegrey.png",
        activeImage : "./images/airplanegreen.png",
    },
];

export default tabs;