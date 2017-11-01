import React, { Component } from "react";
import InstitutionList from "./institution_list";
import InstitutionDetail from "./institution_detail";
import { AddInstitutionModal } from "./modals";
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
            institutionList : null,
            activeInstitution : null,
            addInstitutionIsShowing : false,
        };

        this.refreshInstitutions = this.refreshInstitutions.bind(this);
        this.setActiveInstitution = this.setActiveInstitution.bind(this);
        this.toggleAddInstitution = this.toggleAddInstitution.bind(this);

        this.refreshInstitutions();
    }

    refreshInstitutions() {
        fetchInstitutions(response => {
            this.setState({
                institutionList : response.data.countries,
            });
        });
    }

    toggleAddInstitution() {
        this.setState({
            addInstitutionIsShowing : !this.state.addInstitutionIsShowing,
        });
    }

    setActiveInstitution(institution) {
        this.setState({
            activeInstitution : institution,
        });
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList institutions={this.state.institutionList}
                                 activeInstitution={this.state.activeInstitution}
                                 setActiveInstitution={this.setActiveInstitution}
                                 toggleAddInstitution={this.toggleAddInstitution}/>
                <InstitutionDetail institution={this.state.activeInstitution}/>
                <AddInstitutionModal isOpen={this.state.addInstitutionIsShowing} toggle={this.toggleAddInstitution} refresh={this.refreshInstitutions}/>
            </div>
        );
    }
}

export default Institutions;