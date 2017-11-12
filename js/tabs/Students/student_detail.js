import React, { Component } from "react";
import {
    Button,
} from "reactstrap";
import {
    StudentDetailOverview,
    StudentContact,
    StudentUniversity,

} from "./student_detail_overview";
import {
    DeleteStudentModal,
    StudentFormModal,

} from "./modals";
import LoadingSpinner from "../../components/loading";
import graphql from "../../graphql";


function fetchStudent(id, onResult) {
    graphql.query(`
    {
        student(id:${id}) {
            id
            category
            id_number
            college
            family_name
            first_name
            middle_name
            nickname
            nationality
            home_address
            phone_number
            birth_date
            sex
            emergency_contact_name
            emergency_contact_relationship
            emergency_contact_number
            email
            civil_status
            institution {
                id
                name
            }
        }
    }
    `).then(onResult);
}

class StudentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : null,
            studentID : null,
        };

        this.onEditStudent = this.onEditStudent.bind(this);
    }

    static unselectedState() {
        return (
            <div className="loading-container">
                <h3>Select a student to see its details</h3>
            </div>
        );
    }

    onEditStudent() {
        this.setState({
            student : null,
        });

        fetchStudent(this.state.studentID, result => {
            const student = result.student;
            this.setState({
                student : student,
            });
            this.props.refreshStudents();
        });
    }

    componentWillReceiveProps(nextProps) {
        const student = nextProps.student;

        if (student === null) {
            this.setState({
                student : null,
                studentID : null,
            });

            return;
        }

        this.setState({
            studentID : student.id,
            student : null,
        });

        fetchStudent(student.id, result => {
            this.setState({
                student : result.student,
            });
        });
    }

    render() {
        if (this.state.studentID === null) {
            return StudentDetail.unselectedState();
        }

        if (this.state.student === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div id="student-detail" className="container-fluid d-flex flex-column p-0">
                <StudentDetailHead student={this.state.student}
                                   onEditStudent={this.onEditStudent}
                                   onDeleteStudent={this.props.onDeleteActiveStudent}/>
                <StudentDetailBody student={this.state.student}/>
            </div>
        );
    }
}

class StudentDetailHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteStudentIsShowing : false,
            editStudentIsShowing : false,
        };

        this.toggleDeleteStudent = this.toggleDeleteStudent.bind(this);
        this.toggleEditStudent = this.toggleEditStudent.bind(this);
    }

    toggleDeleteStudent() {
        this.setState({
            deleteStudentIsShowing : !this.state.deleteStudentIsShowing,
        });
    }

    toggleEditStudent() {
        this.setState({
            editStudentIsShowing : !this.state.editStudentIsShowing,
        });
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        {this.props.student.first_name} {this.props.student.middle_name} {this.props.student.family_name}
                        <small className="text-muted ml-2">{this.props.student.id_number}</small>
                    </h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm"
                            color="success"
                            className="mr-2" onClick={this.toggleEditStudent}>
                        Edit Student
                    </Button>

                    <Button outline size="sm" color="danger" onClick={this.toggleDeleteStudent}>Delete</Button>
                </div>

                <DeleteStudentModal isOpen={this.state.deleteStudentIsShowing}
                                    student={this.props.student}
                                    toggle={this.toggleDeleteStudent}
                                    refresh={this.props.onDeleteStudent}/>

                <StudentFormModal edit
                                  isOpen={this.state.editStudentIsShowing}
                                  student={this.props.student}
                                  refresh={this.props.onEditStudent}
                                  toggle={this.toggleEditStudent}/>
            </div>
        );
    }
}

class StudentDetailBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <StudentDetailOverview student={this.props.student}/>
                <StudentContact student={this.props.student}/>
                <StudentUniversity student={this.props.student}/>
            </div>
        );
    }
}

export default StudentDetail;