import React, { Component } from "react";
import { Button } from "reactstrap";
import LoadingSpinner from "../../loading";
import {
    InstitutionDetailOverview,
    InstitutionContact,
} from "./institution_detail_overview";


import {
    DeleteInstitutionModal,
    EditInstitutionModal,
} from "./modals";


import Memorandums from "./memorandums";
import graphql from "../../graphql";


function fetchInstitution(id, onResponse) {
    graphql({
        query : `
        {
            institution(id:${id}) {
                id
                name
                email
                address
                website
                contactPersonName
                contactPersonNumber
                country {
                    name
                }
                agreement
            }
        }
       `,
        onResponse : onResponse,
    });
}

class InstitutionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution : null,
            institutionID : null,
            deleteInstitutionIsShowing : false,
            editInstitutionIsShowing : false,
        };

        this.toggleDeleteInstitution = this.toggleDeleteInstitution.bind(this);
        this.toggleEditInstitution = this.toggleEditInstitution.bind(this);
    }

    toggleDeleteInstitution() {
        this.setState({
            deleteInstitutionIsShowing : !this.state.deleteInstitutionIsShowing,
        });
    }

    toggleEditInstitution() {
        this.setState({
            editInstitutionIsShowing : !this.state.editInstitutionIsShowing,
        });
    }

    static unselectedState() {
        return (
            <div className="loading-container">
                <h3>Select an institution to see its details</h3>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const institution = nextProps.institution;

        if (institution === null) {
            this.setState({
                institution : null,
                institutionID : null,
            });

            return;
        }

        // Inform state about an active institution
        this.setState({
            institutionID : institution.institutionID,
        });

        //Fetch active institution details
        fetchInstitution(nextProps.institution.id, response => {
            this.setState({
                institution : response.data.institution,
            });
        });
    }


    render() {
        //User has not selected yet, no activeInstitution ID
        if (this.state.institutionID === null) {
            return InstitutionDetail.unselectedState();
        }

        //User has already selected, but we haven't fetched it from the database yet
        if (this.state.institution === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div id="institution-detail" className="container-fluid d-flex flex-column p-0">
                <InstitutionDetailHead institution={this.state.institution}
                                       toggleDeleteInstitution={this.toggleDeleteInstitution}
                                       toggleEditInstitution={this.toggleEditInstitution}/>
                <InstitutionDetailBody institution={this.state.institution}/>

                {this.state.institution !== null && //If activeInstitution is not null
                <DeleteInstitutionModal isOpen={this.state.deleteInstitutionIsShowing}
                                        institution={this.state.institution}
                                        toggle={this.toggleDeleteInstitution}
                                        refresh={this.props.onDeleteActiveInstitution}/>}

                {this.state.institution !== null &&
                <EditInstitutionModal isOpen={this.state.editInstitutionIsShowing}
                                      institution={this.state.institution}
                                      toggle={this.toggleEditInstitution}/>}
            </div>
        );
    }
}

class InstitutionDetailHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">{this.props.institution.name}</h4>
                    <h4 className="text-muted d-inline-block font-weight-normal mb-0">{this.props.institution.country.name}</h4>
                </div>

                <div id="institution-actions">
                    <Button outline size="sm" color="success" className="mr-2"
                            onClick={this.props.toggleEditInstitution}>Edit Institution</Button>
                    <Button outline size="sm" color="danger"
                            onClick={this.props.toggleDeleteInstitution}>Delete</Button>
                </div>
            </div>
        );
    }
}

class InstitutionDetailBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <InstitutionDetailOverview institution={this.props.institution}/>
                <InstitutionContact institution={this.props.institution}/>
                <Memorandums/>
            </div>
        );
    }
}


export default InstitutionDetail;