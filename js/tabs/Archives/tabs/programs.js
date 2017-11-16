import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import {
    Input,
    Table,
} from "reactstrap";
import LoadingSpinner from "../../../components/loading";
import { ProgramSidebarPane } from "../../Institutions/tabs/sidebar_panes";
import ArchivesHead from "../archive_head";

function fetchPrograms(year, onResult) {
    graphql.query(`
    {
        programs(archived:true, year_archived:${year}) {
            id
            name
            linkage {
                name
            }
            studyfield_set {
                name
            }
            memorandum {
                institution {
                    name
                }
            }
            archiver
            archived_at
        }
	}
	`).then(onResult);
}

class ProgramArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
            programs : null,
            activeProgramId : null,
        };

        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);

        fetchPrograms(this.state.activeYear, result => {
            this.setState({
                programs : result.programs,
            });
        });
    }

    setActiveProgram(program) {
        this.setState({
            activeProgramId : program.id,
        });

        this.props.setSidebarContent(<ProgramSidebarPane archived
                                                         onRestoreSuccess={ this.refreshPrograms }
                                                         program={ program }/>);
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
            activeProgramId : null,
            programs : null,
        });

        this.props.setSidebarContent(null);

        fetchPrograms(year, result => {
            this.setState({
                programs : result.programs,
            });
        });
    }

    refreshPrograms() {
        this.setActiveYear(this.state.activeYear);
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <ArchivesHead setActiveYear={ this.setActiveYear } activeYear={ this.state.activeYear }>Program
                    Archives</ArchivesHead>
                <ProgramArchivesTable programs={ this.state.programs }
                                      activeYear={ this.state.activeYear }
                                      setSidebarContent={ this.props.setSidebarContent }
                                      activeProgramId={ this.state.activeProgramId }
                                      setActiveProgram={ this.setActiveProgram }/>
            </div>
        );
    }
}

class ProgramArchivesTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There were no archived programs in { this.props.activeYear }.</h3>
            </div>
        );
    }

    render() {
        if (this.props.programs === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.programs.length === 0) {
            return this.emptyState();
        }

        const rows = this.props.programs.map((program, index) => {
            return <ProgramArchivesRow program={ program } key={ index }
                                       isActive={ this.props.activeProgramId === program.id }
                                       onClick={ () => this.props.setActiveProgram(program) }/>;
        });

        return (
            <Table striped
                   hover>
                <thead>
                <tr>
                    <th>Institution Name</th>
                    <th>Program Name</th>
                    <th>Linkage</th>
                    <th>Archive Date</th>
                    <th>Archived By</th>
                </tr>
                </thead>
                <tbody>
                { rows }
                </tbody>
            </Table>
        );
    }
}

class ProgramArchivesRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const program = this.props.program;
        const archiveDate = moment(program.archived_at).format("LLL");
        const className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;

        return (
            <tr className={ className }
                onClick={ this.props.onClick }>
                <td>{ program.memorandum.institution.name }</td>
                <td>{ program.name }</td>
                <td>{ program.linkage.name }</td>
                <td>{ archiveDate }</td>
                <td>{ program.archiver }</td>
            </tr>
        );
    }
}

export default ProgramArchives;