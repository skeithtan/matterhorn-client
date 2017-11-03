import React, { Component } from "react";
import InstitutionList from "./institution_list";
import Programs from "./programs";
import StudentList from "./student_list";
import graphql from "../../graphql";

// TODO: GraphQL query for institutions with a specified linkage
// TODO: Prop passing n shit

class Linkages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionList: null,
            activeLinkage: null,
            activeInstitution: null,
            activeProgram: null,
        };

        this.setActiveLinkage = this.setActiveLinkage.bind(this);
        this.setActiveInstitution = this.setActiveInstitution.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.refreshInstitutions = this.refreshInstitutions.bind(this);
    }

    refreshInstitutions() {
        // TODO given the fetching query
    }

    setActiveLinkage(linkage) {
        this.setState({
            activeLinkage: linkage,
        });
    }
    
    setActiveInstitution(institution) {
        this.setState({
            activeInstitution: institution,
        });
    }

    setActiveProgram(program) {
        this.setState({
            activeProgram: program,
        });
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList/>
                <Programs/>
                <StudentList/>
            </div>
        )
    }
}

export default Linkages;