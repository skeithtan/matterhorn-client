import React from "react";
import InstitutionOverview from "./overview";
import Memorandums from "./memorandums";


const tabs = [
    {
        name : "Overview",
        tab : (institution, onDeleteActiveInstitution, refreshInstitutions) => {
            return <InstitutionOverview institution={institution}
                                        onDeleteActiveInstitution={onDeleteActiveInstitution}
                                        refreshInstitutions={refreshInstitutions}/>;
        },
        image : "./images/burgergrey.png",
        activeImage : "./images/burgergreen.png",
    },
    {
        name : "Memorandums",
        tab : institution => {
            return <Memorandums institution={institution}/>;
        },
        image : "./images/memorandumgrey.png",
        activeImage : "./images/memorandumgreen.png",
    },
];

export default tabs;