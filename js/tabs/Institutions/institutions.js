import React, { Component } from "react";
import InstitutionList from "./institution_list";
import graphql from "../../graphql";


function fetchInstitutions(onResponse) {
    graphql({
        query : `
        {
            countries {
                name
                institutionSet {
                    id
                    name
                }
            }
        }
        `,
        onResponse : onResponse,
    });
}

class Institutions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionList : null, //TODO: Real data
            filteredList : null,
            activeInstitution : null,
        };

        fetchInstitutions(response => this.setState({
            institutionList: response.data.countries
        }));

        this.setActiveInstitution = this.setActiveInstitution.bind(this);
    }

    setActiveInstitution(institution) {
        this.setState({
            activeInstitution : institution,
        });
    }

    render() {
        const filteredList = this.state.filteredList;
        const institutionList = this.state.institutionList;
        const showingList = filteredList === null ? institutionList : filteredList;

        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList institutions={this.state.institutionList}
                                 activeInstitution={this.state.activeInstitution}
                                 setActiveInstitution={this.setActiveInstitution}/>
            </div>
        );
    }
}

export default Institutions;