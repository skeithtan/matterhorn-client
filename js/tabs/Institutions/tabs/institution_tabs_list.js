import React from "react";
import InstitutionOverview from "./institution_overview";

const tabs = [
    {
        name: "Overview",
        tab: (institution, onDeleteActiveInstitution, refreshInstitutions) => {
            return <InstitutionOverview institution={institution}
                                        onDeleteActiveInstitution={onDeleteActiveInstitution}
                                        refreshInstitutions={refreshInstitutions}/>
        },
        image: "./images/burgergrey.png",
        activeImage: "./images/burgergreen.png",
    },
    {
        name: "Memorandums",
        tab: institution => {
            return null;
        },
        image: "./images/memorandumgrey.png",
        activeImage: "./images/memorandumgreen.png",
    },
    {
        name: "Programs",
        tab: institution => {
            return null;
        },
        image: "./images/programsgrey.png",
        activeImage: "./images/programsgreen.png",
    },
];

export default tabs;