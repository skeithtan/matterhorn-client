import React, { Component } from "react";
import InstitutionList from "./institution_list";
import InstitutionDetail from "./institution_detail";
import {
    InstitutionFormModal,
} from "./modals";
import graphql from "../../graphql";
import ErrorState from "../../components/error_state";


function makeInstitutionsQuery() {
    return graphql.query(`
        {
            countries {
                name
                institutions {
                    id
                    name
                }
            }
        }
    `);
}

class Institutions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionList : null,
            activeInstitution : null,
            addInstitutionIsShowing : false,
            memorandumToBeAdded : false,
            error : null,
        };

        this.fetchInstitutions = this.fetchInstitutions.bind(this);
        this.setActiveInstitution = this.setActiveInstitution.bind(this);

        this.toggleAddInstitution = this.toggleAddInstitution.bind(this);
        this.toggleMemorandumToBeAdded = this.toggleMemorandumToBeAdded.bind(this);

        this.onDeleteActiveInstitution = this.onDeleteActiveInstitution.bind(this);
        this.onAddInstitution = this.onAddInstitution.bind(this);

        this.fetchInstitutions();
    }

    fetchInstitutions() {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeInstitutionsQuery()
            .then(result => {
                this.setState({
                    institutionList : result.countries,
                });
            })
            .catch(error => this.setState({
                    error : error,
                }),
            );
    }

    onDeleteActiveInstitution() {
        this.setState({
            activeInstitution : null,
        });

        this.fetchInstitutions();
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

    onAddInstitution(institution) {
        this.setState({
            activeInstitution : institution,
        });
        this.toggleMemorandumToBeAdded();
    }

    toggleMemorandumToBeAdded() {
        this.setState({
            memorandumToBeAdded : !this.state.memorandumToBeAdded,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchInstitutions(this.state.activeYear)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList institutions={this.state.institutionList}
                                 activeInstitution={this.state.activeInstitution}
                                 setActiveInstitution={this.setActiveInstitution}
                                 toggleAddInstitution={this.toggleAddInstitution}/>

                <InstitutionDetail institution={this.state.activeInstitution}
                                   onDeleteActiveInstitution={this.onDeleteActiveInstitution}
                                   refreshInstitutions={this.fetchInstitutions}
                                   memorandumToBeAdded={this.state.memorandumToBeAdded}
                                   toggleMemorandumToBeAdded={this.toggleMemorandumToBeAdded}/>

                <InstitutionFormModal isOpen={this.state.addInstitutionIsShowing}
                                      toggle={this.toggleAddInstitution}
                                      onAddInstitution={this.onAddInstitution}
                                      refresh={this.fetchInstitutions}/>
            </div>
        );
    }
}

export default Institutions;