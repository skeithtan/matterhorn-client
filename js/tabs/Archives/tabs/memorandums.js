import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import {
    Input,
    Table,
} from "reactstrap";
import LoadingSpinner from "../../../components/loading";
import { MemorandumSidebarPane } from "../../Institutions/tabs/sidebar_panes";
import ArchivesHead from "../archive_head";


function fetchMemorandums(year, onResult) {
    graphql.query(`
    {
        memorandums(archived:true, year_archived:${year}) {
		id
		category
		archived_at
		archiver
		memorandum_file
        date_expiration
        college_initiator
        linkages
		date_effective
            institution {
                name
            }
		}
	}
	`).then(onResult);
}

class MemorandumArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
            memorandums : null,
            activeMemorandumId : null,
        };

        this.setActiveYear = this.setActiveYear.bind(this);
        this.refreshMemorandums = this.refreshMemorandums.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);

        fetchMemorandums(this.state.activeYear, result => {
            this.setState({
                memorandums : result.memorandums,
            });
        });
    }

    setActiveMemorandum(memorandum) {
        this.setState({
            activeMemorandumId : memorandum.id,
        });

        this.props.setSidebarContent(<MemorandumSidebarPane archived
                                                            onRestoreSuccess={this.refreshMemorandums}
                                                            memorandum={memorandum}/>);
    }


    setActiveYear(year) {
        this.setState({
            activeYear : year,
            activeMemorandumId : null,
            memorandums : null, //Loading
        });

        this.props.setSidebarContent(null);

        fetchMemorandums(year, result => {
            this.setState({
                memorandums : result.memorandums,
            });
        });
    }

    refreshMemorandums() {
        this.setActiveYear(this.state.activeYear);
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <ArchivesHead setActiveYear={this.setActiveYear}
                              activeYear={this.state.activeYear}>Memorandum Archives</ArchivesHead>
                <MemorandumArchivesTable memorandums={this.state.memorandums}
                                         setSidebarContent={this.props.setSidebarContent}
                                         activeMemorandumId={this.state.activeMemorandumId}
                                         setActiveMemorandum={this.setActiveMemorandum}/>
            </div>
        );
    }
}

class MemorandumArchivesTable extends Component {
    constructor(props) {
        super(props);
    }

    static emptyState() {
        return (
            <div className="loading-container">
                <h3>There are no archived memorandums for this year</h3>
            </div>
        );
    }

    render() {
        if (this.props.memorandums === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.memorandums.length === 0) {
            return MemorandumArchivesTable.emptyState();
        }

        const rows = this.props.memorandums.map((memorandum, index) => {
            return <MemorandumArchivesRow memorandum={memorandum}
                                          key={index}
                                          isActive={this.props.activeMemorandumId === memorandum.id}
                                          onClick={() => this.props.setActiveMemorandum(memorandum)}/>;
        });


        return (
            <Table striped
                   hover>
                <thead>
                <tr>
                    <th>Institution Name</th>
                    <th>Memorandum Type</th>
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

class MemorandumArchivesRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const memorandumType = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
        const archiveDate = moment(this.props.memorandum.archived_at).format("LLL");

        const className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;

        return (
            <tr className={className}
                onClick={this.props.onClick}>
                <td>{this.props.memorandum.institution.name}</td>
                <td>{memorandumType}</td>
                <td>{archiveDate}</td>
                <td>{this.props.memorandum.archiver}</td>
            </tr>
        );
    }
}

export default MemorandumArchives;