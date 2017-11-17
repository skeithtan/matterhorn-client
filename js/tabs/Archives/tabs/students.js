import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import ArchivesHead from "../archive_head";
import LoadingSpinner from "../../../components/loading";
import { Table } from "reactstrap";
import { StudentSidebarPane } from "./sidebar_panes";


function fetchStudents(year, onResult) {
    graphql.query(`
    {
      students(archived: true, year_archived: ${year}) {
        id
        category
        id_number
        college
        family_name
        first_name
        middle_name
        nickname
        nationality
        birth_date
        sex
        archived_at
        archiver
        institution {
          name
        }
      }
    }
    `).then(onResult);
}

class StudentArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
            students : null,
            activeStudentId : null,
        };

        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);

        fetchStudents(this.state.activeYear, result => {
            this.setState({
                students : result.students,
            });
        });
    }

    setActiveStudent(student) {
        this.setState({
            activeStudentId : student.id,
        });


        this.props.setSidebarContent(<StudentSidebarPane student={student}/>);
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
            activeStudentId : null,
            students : null //loading
        });

        this.props.setSidebarContent(null);

        fetchStudents(year, result => {
            this.setState({
                students : result.students,
            });
        });
    }

    render() {
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
        const className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;


        return (
            <tr className={className}
                onClick={this.props.onClick}>
                <td>{student.id_number}</td>
                <td>
                    <b>{student.family_name}</b>, {student.first_name} {student.middle_name}
                </td>
                <td>{archiveDate}</td>
                <td>{student.archiver}</td>
            </tr>
        );
    }
}

export default StudentArchives;