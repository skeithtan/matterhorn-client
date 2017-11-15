import React, { Component } from "react";
import LoadingSpinner from "../../../components/loading";
import graphql from "../../../graphql";
import { Button } from "reactstrap";

import {
    DeleteInstitutionModal,
    InstitutionFormModal,
} from "../modals";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionRowContent,
} from "../../../components/section";


function fetchInstitution(id, onResult) {
    graphql.query(`
    {
        institution(id:${id}) {
            id
            name
            address
            website
            contact_person_email
            contact_person_name
            contact_person_number
            country {
                name
            }
            agreement
        }
    }    
    `).then(onResult);
}

class InstitutionOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution : null,
            institutionID : props.institution.id,
        };

        this.props.setSidebarContent(null);

        this.onEditInstitution = this.onEditInstitution.bind(this);

        //Fetch active institution details
        fetchInstitution(props.institution.id, result => {
            const institution = result.institution;

            //Make country = country.name for simplicity
            institution.country = institution.country.name;

            this.setState({
                institution : institution,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            institutionID : nextProps.institution.id,
            institution : null,
        });

        fetchInstitution(nextProps.institution.id, result => {
            const institution = result.institution;

            //Make country = country.name for simplicity
            institution.country = institution.country.name;

            this.setState({
                institution : institution,
            });
        });
    }

    onEditInstitution() {
        //Refresh and fetch new data from server
        this.setState({
            institution : null,
        });

        fetchInstitution(this.state.institutionID, result => {
            const institution = result.institution;

            //Make country = country.name for simplicity
            institution.country = institution.country.name;

            this.setState({
                institution : institution,
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
                <OverviewHead institution={this.state.institution}
                              onDeleteInstitution={this.props.onDeleteActiveInstitution}
                              onEditInstitution={this.onEditInstitution}/>
                <OverviewBody institution={this.state.institution}/>
            </div>
        );
    }
}

class OverviewHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteInstitutionIsShowing : false,
            editInstitutionIsShowing : false,
        };

        this.toggleEditInstitution = this.toggleEditInstitution.bind(this);
        this.toggleDeleteInstitution = this.toggleDeleteInstitution.bind(this);
    }

    toggleEditInstitution() {
        this.setState({
            editInstitutionIsShowing : !this.state.editInstitutionIsShowing,
        });
    }

    toggleDeleteInstitution() {
        this.setState({
            deleteInstitutionIsShowing : !this.state.deleteInstitutionIsShowing,
        });
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Overview</h5>
                    <h4 className="page-head-title mb-0">{this.props.institution.name}</h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success" className="mr-2"
                            onClick={this.toggleEditInstitution}>Edit Institution</Button>
                    <Button outline size="sm" color="warning"
                            onClick={this.toggleDeleteInstitution}>Archive</Button>
                </div>

                <DeleteInstitutionModal isOpen={this.state.deleteInstitutionIsShowing}
                                        institution={this.props.institution}
                                        toggle={this.toggleDeleteInstitution}
                                        refresh={this.props.onDeleteInstitution}/>

                <InstitutionFormModal edit
                                      isOpen={this.state.editInstitutionIsShowing}
                                      institution={this.props.institution}
                                      refresh={this.props.onEditInstitution}
                                      toggle={this.toggleEditInstitution}/>
            </div>
        );
    }
}

class OverviewBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <InstitutionDetails institution={this.props.institution}/>
                <ContactDetails institution={this.props.institution}/>
            </div>
        );
    }
}

class InstitutionDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;
        const agreementType = this.props.institution.agreement === "B" ? "Bilateral" : "Multilateral";
        const website = `http://${institution.website}`;

        function openWebsite() {
            const { shell } = require("electron");
            shell.openExternal(website);
        }

        return (
            <Section>
                <SectionTitle>Institution details</SectionTitle>
                <SectionTable>
                    <SectionRow>
                        <SectionRowTitle>Address</SectionRowTitle>
                        <SectionRowContent large>{institution.address}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Country</SectionRowTitle>
                        <SectionRowContent large>{institution.country}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Website</SectionRowTitle>
                        <SectionRowContent large className="text-primary"
                                           onClick={openWebsite}>{website}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Agreement Type</SectionRowTitle>
                        <SectionRowContent large>{agreementType}</SectionRowContent>
                    </SectionRow>
                </SectionTable>
            </Section>
        );
    }
}

class ContactDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;

        const noContactDetails = institution.contact_person_number.length === 0
            && institution.contact_person_name.length === 0
            && institution.contact_person_email.length === 0;

        if (noContactDetails) {
            return null;
        }

        return (
            <Section>
                <SectionTitle>Contact Details</SectionTitle>
                <SectionTable>
                    {institution.contact_person_name.length > 0 &&
                    <SectionRow>
                        <SectionRowTitle>Contact Person</SectionRowTitle>
                        <SectionRowContent large>{institution.contact_person_name}</SectionRowContent>
                    </SectionRow>
                    }

                    {institution.contact_person_email.length > 0 &&
                    <SectionRow>
                        <SectionRowTitle>Contact Person Email</SectionRowTitle>
                        <SectionRowContent large>{institution.contact_person_email}</SectionRowContent>
                    </SectionRow>
                    }

                    {institution.contact_person_number.length > 0 &&
                    <SectionRow>
                        <SectionRowTitle>Contact Person Number</SectionRowTitle>
                        <SectionRowContent large>{institution.contact_person_number}</SectionRowContent>
                    </SectionRow>
                    }
                </SectionTable>
            </Section>
        );
    }
}


export default InstitutionOverview;