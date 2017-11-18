import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import ArchivesHead from "../archive_head";
import LoadingSpinner from "../../../components/loading";
import { Table } from "reactstrap";
import { InstitutionSidebarPane } from "./sidebar_panes";


function fetchInstitutions(year, onResult) {
    graphql.query(`
    {
        institutions(archived: true, year_archived: ${year}) {
            id
            name
            country {
                name
            }
            archived_at
            archiver
        }
    }
    `).then(onResult);
}

class InstitutionArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
            institutions : null,
            activeInstitutionId : null,
        };

        this.setActiveYear = this.setActiveYear.bind(this);
        this.refreshInstitutions = this.refreshInstitutions.bind(this);
        this.setActiveInstitution = this.setActiveInstitution.bind(this);

        fetchInstitutions(this.state.activeYear, result => {
            result.institutions.forEach(institution => {
                //Make country = country.name for simplicity
                institution.country = institution.country.name;
            });

            this.setState({
                institutions : result.institutions,
            });
        });
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
            institutions : null,
            activeInstitutionId : null,
        });

        this.props.setSidebarContent(null);

        fetchInstitutions(year, result => {
            result.institutions.forEach(institution => {
                //Make country = country.name for simplicity
                return institution.country = institution.country.name;
            });

            this.setState({
                institutions : resut.institutions,
            });
        });
    }

    setActiveInstitution(institution) {
        this.setState({
            activeInstitutionId : institution.id,
        });

        this.props.setSidebarContent(<InstitutionSidebarPane institution={institution}/>);
    }

    refreshInstitutions() {
        this.setActiveYear(this.state.activeYear);
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <ArchivesHead setActiveYear={this.setActiveYear}
                              activeYear={this.state.activeYear}>Institution Archives</ArchivesHead>
                <InstitutionArchivesTable institutions={this.state.institutions}
                                          activeYear={this.state.activeYear}
                                          setSidebarContent={this.props.setSidebarContent}
                                          activeInstitutionId={this.state.activeInstitutionId}
                                          setActiveInstitution={this.setActiveInstitution}/>
            </div>
        );
    }
}

class InstitutionArchivesTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There were no archived institutions in {this.props.activeYear}</h3>
            </div>
        );
    }

    render() {
        if (this.props.institutions === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.institutions.length === 0) {
            return this.emptyState();
        }

        const rows = this.props.institutions.map(institution => {
            return <InstitutionArchivesRow institution={institution}
                                           key={institution.id}
                                           isActive={this.props.activeInstitutionId === institution.id}
                                           onClick={() => this.props.setActiveInstitution(institution)}/>;
        });

        return (
            <Table striped
                   hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Archive Date</th>
                    <th>Archived By</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
}

class InstitutionArchivesRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;
        const archiveDate = moment(institution.archived_at).format("LLL");

        const className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;

        return (
            <tr className={className}
                onClick={this.props.onClick}>
                <td>{institution.name}</td>
                <td>{institution.country}</td>
                <td>{archiveDate}</td>
                <td>{institution.archiver}</td>
            </tr>
        );
    }
}

export default InstitutionArchives;