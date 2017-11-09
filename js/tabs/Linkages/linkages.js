import React, { Component } from "react";
import InstitutionList from "../Institutions/institution_list";
import LinkageList from "./linkage_list";
import Programs from "./programs";
import StudentList from "./student_list";
import graphql from "../../graphql";

function fetchInstitutions(onResponse) {
    graphql({
        query : `
        {
            countries {
                name
                institution_set {
                    id
                    name
                }
            }
        }
        `,
        onResponse : onResponse,
    });
}

class Linkages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionList : null,
            activeInstitution : null,
        };

        this.setActiveInstitution = this.setActiveInstitution.bind(this);
    }

    setActiveInstitution(institution) {
        this.setState({
            activeInstitution : institution,
        });
    }

    render() {
        fetchInstitutions(response => {
            this.setState({
                institutionList : response.data.countries,
            });
        });

        return (
            <div id="linkages-page" className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList institutions={this.state.institutionList}
                                 activeInstitution={this.state.activeInstitution}
                                 setActiveInstitution={this.setActiveInstitution}/>
                <LinkageList/>
                <Programs/>
                <StudentList/>
            </div>
        );
    }
}


export default Linkages;