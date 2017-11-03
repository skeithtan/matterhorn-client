import React, {Component} from "react";
import {Button, ListGroup, ListGroupItem} from "reactstrap";
import LoadingSpinner from "../../../loading";

import {
    DeleteInstitutionModal,
    EditInstitutionModal,
} from "../modals";


import graphql from "../../../graphql";


function fetchInstitution(id, onResponse) {
    graphql({
        query: `
        {
            institution(id:${id}) {
                id
                name
                address
                website
                contactPersonEmail
                contactPersonName
                contactPersonNumber
                country {
                    name
                }
                agreement
            }
        }
       `,
        onResponse: onResponse,
    });
}

class InstitutionOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution: null,
            institutionID: props.institution.id,
            deleteInstitutionIsShowing: false,
            editInstitutionIsShowing: false,
        };

        this.toggleDeleteInstitution = this.toggleDeleteInstitution.bind(this);
        this.toggleEditInstitution = this.toggleEditInstitution.bind(this);
        this.onEditInstitution = this.onEditInstitution.bind(this);

        //Fetch active institution details
        fetchInstitution(props.institution.id, response => {
            console.log(response);
            this.setState({
                institution: response.data.institution,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            institutionID: nextProps.institution.id,
            institution: null
        });

        fetchInstitution(nextProps.institution.id, response => {
            this.setState({
                institution: response.data.institution,
            });
        });
    }

    toggleDeleteInstitution() {
        this.setState({
            deleteInstitutionIsShowing: !this.state.deleteInstitutionIsShowing,
        });
    }

    toggleEditInstitution() {
        this.setState({
            editInstitutionIsShowing: !this.state.editInstitutionIsShowing,
        });
    }

    onEditInstitution() {
        //Refresh and fetch new data from server
        this.setState({
            institution: null,
        });

        fetchInstitution(this.state.institutionID, response => {
            const institution = response.data.institution;
            this.setState({
                institution: institution,
            });

            this.props.refreshInstitutions();
        });
    }

    render() {
        //User has already selected, but we haven't fetched it from the database yet
        if (this.state.institution === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div className="d-flex flex-column p-0 h-100">
                <InstitutionOverviewHead institution={this.state.institution}
                                         toggleDeleteInstitution={this.toggleDeleteInstitution}
                                         toggleEditInstitution={this.toggleEditInstitution}/>
                <InstitutionOverviewBody institution={this.state.institution}/>

                {this.state.institution !== null && //If activeInstitution is not null
                <DeleteInstitutionModal isOpen={this.state.deleteInstitutionIsShowing}
                                        institution={this.state.institution}
                                        toggle={this.toggleDeleteInstitution}
                                        refresh={this.props.onDeleteActiveInstitution}/>}

                {this.state.institution !== null &&
                <EditInstitutionModal isOpen={this.state.editInstitutionIsShowing}
                                      institution={this.state.institution}
                                      refresh={this.onEditInstitution}
                                      toggle={this.toggleEditInstitution}/>}
            </div>
        );
    }
}

class InstitutionOverviewHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">{this.props.institution.name}
                        <small className="text-muted ml-2">{this.props.institution.country.name}</small>
                    </h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success" className="mr-2"
                            onClick={this.props.toggleEditInstitution}>Edit Institution</Button>
                    <Button outline size="sm" color="danger"
                            onClick={this.props.toggleDeleteInstitution}>Delete</Button>
                </div>
            </div>
        );
    }
}

class InstitutionOverviewBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <InstitutionDetailOverview institution={this.props.institution}/>
                <InstitutionContact institution={this.props.institution}/>
            </div>
        );
    }
}

class InstitutionDetailOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;
        const agreementType = this.props.institution.agreement === "B" ? "Bilateral" : "Multilateral";
        const website = `http://${institution.website}`;

        function openWebsite() {
            const {shell} = require("electron");
            shell.openExternal(website);
        }

        return (
            <div className="section">
                <small className="section-title">Institution details</small>
                <ListGroup>
                    <InstitutionDetailRow fieldName="Address" fieldValue={institution.address}/>

                    <ListGroupItem>
                        <small className="font-weight-bold">Website</small>
                        <p className="lead m-0 text-primary" onClick={openWebsite}>{website}</p>
                    </ListGroupItem>

                    <InstitutionDetailRow fieldName="Agreement Type" fieldValue={agreementType}/>
                </ListGroup>
            </div>
        );
    }
}

class InstitutionContact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;

        return (
            <div className="section">
                <small className="section-title">Contact details</small>
                <ListGroup>
                    <InstitutionDetailRow fieldName="Contact Person" fieldValue={institution.contactPersonName}/>
                    <InstitutionDetailRow fieldName="Contact Person Email" fieldValue={institution.contactPersonEmail}/>
                    <InstitutionDetailRow fieldName="Contact Phone Number"
                                          fieldValue={institution.contactPersonNumber}/>
                </ListGroup>
            </div>
        );
    }
}

class InstitutionDetailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem onClick={this.props.onClick}>
                <small className="font-weight-bold">{this.props.fieldName}</small>
                <p className="lead m-0">{this.props.fieldValue}</p>
            </ListGroupItem>
        );
    }
}


export default InstitutionOverview;