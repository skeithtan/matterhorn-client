import React, {Component} from "react";
import graphql from "../../../graphql";

function fetchInstitution(id, onResponse) {
    graphql({
        query: `
        {
        }
        `
    });
}

class InstitutionPrograms extends Component {

}

export default InstitutionPrograms;