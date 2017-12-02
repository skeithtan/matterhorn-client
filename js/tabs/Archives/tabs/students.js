import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import ArchivesHead from "../archive_head";
import LoadingSpinner from "../../../components/loading";
import { Table } from "reactstrap";
import { StudentSidebarPane } from "./sidebar_panes";
import ErrorState from "../../../components/error_state";


function makeStudentsQuery(year) {
    return graphql.query(`
    {
      students(archived: true, year_archived: ${year}) {
        id
        category
        id_number
        family_name
        first_name
        middle_name
        archived_at
        archiver
        institution {
          name
        }
      }
    }
    `);
}

class StudentArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
            students : null,
            activeStudentId : null,
        };

        this.fetchStudents = this.fetchStudents.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);

        this.fetchStudents(this.state.activeYear);
    }

    fetchStudents(year) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeStudentsQuery(year)
            .then(result => this.setState({
                students : result.students,
            }))
            .catch(error => {
                this.props.setSidebarContent(null);
                this.setState({
                    error : error,
                });
            });
    }

    setActiveStudent(student) {
        this.setState({
            activeStudentId : student.id,
        });


        this.props.setSidebarContent(<StudentSidebarPane student={student}
                                                         onRestoreSuccess={this.refreshStudents}/>);
    }

    refreshStudents() {
        this.setActiveYear(this.state.activeYear);
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
            activeStudentId : null,
            students : null //loading
        });

        this.props.setSidebarContent(null);
        this.fetchStudents(year);
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchStudents(this.state.activeYear)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        return (
            <div className="d-flex flex-column h-100">
                <ArchivesHead setActiveYear={this.setActiveYear}
                              activeYear={this.state.activeYear}>Student Archives</ArchivesHead>
                <StudentArchivesTable students={this.state.students}
                                      activeYear={this.state.activeYear}
                                      setSidebarContent={this.props.setSidebarContent}
                                      activeStudentId={this.state.activeStudentId}
                                      setActiveStudent={this.setActiveStudent}/>
            </div>
        );
    }
}

class StudentArchivesTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There were no archived students in {this.props.activeYear}.</h3>
            </div>
        );
    }

    render() {
        if (this.props.students === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.students.length === 0) {
            return this.emptyState();
        }

        const rows = this.props.students.map(student => {
            return <StudentArchivesRow student={student}
                                       key={student.id}
                                       isActive={this.props.activeStudentId === student.id}
                                       onClick={() => this.props.setActiveStudent(student)}/>;
        });

        return (
            <Table striped
                   hover>
                <thead>
                <tr>
                    <th>ID Number</th>
                    <th>Name</th>
                    <th>Category</th>
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

class StudentArchivesRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;
        const archiveDate = moment(student.archived_at).format("LLL");
        const className = this.props.isActive ? "bg-dlsu-lighter text-white" : "table-light";
        const category = student.category === "IN" ? "Inbound" : "Outbound";


        return (
            <tr className={className}
                onClick={this.props.onClick}>
                <td>{student.id_number}</td>
                <td>
                    <b>{student.family_name}</b>, {student.first_name} {student.middle_name}
                </td>
                <td>{category}</td>
                <td>{archiveDate}</td>
                <td>{student.archiver}</td>
            </tr>
        );
    }
}

export default StudentArchives;