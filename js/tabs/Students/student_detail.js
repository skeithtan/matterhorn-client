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
    EditStudentModal,

} from "./modals";
import LoadingSpinner from "../../loading";
import graphql from "../../graphql";


function fetchStudent(id, onResponse) {
    graphql({
        query : `
        {
            student(id:${id}) {
                category
                idNumber
                college
                familyName
                firstName
                middleName
                nickname
                nationality
                homeAddress
                phoneNumber
                birthDate
                sex
                emergencyContactName
                emergencyContactRelationship
                emergencyContactNumber
                email
                civilStatus
            }
        }
       `,
        onResponse : onResponse,
    });
}

class StudentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : null,
            studentID : null,
            deleteStudentIsShowing: false,
            editStudentIsShowing: false,
        };

        this.toggleDeleteStudent = this.toggleDeleteStudent.bind(this);
        this.toggleEditStudent = this.toggleEditStudent.bind(this);
        this.onEditStudent = this.onEditStudent.bind(this);
    }

    toggleDeleteStudent() {
        this.setState({
            deleteStudentIsShowing: !this.state.deleteStudentIsShowing,
        });
    }

    toggleEditStudent() {
        this.setState({
            editStudentIsShowing: !this.state.editStudentIsShowing,
        });
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
            student: null,
        });

        fetchStudent(this.state.studentID, response => {
            const student = response.data.student;
            this.setState({
                student: student,
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
            studentID : student.idNumber,
            student : null,
        });

        fetchStudent(student.idNumber, response => {
            this.setState({
                student : response.data.student,
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
                                   toggleDeleteStudent={this.toggleDeleteStudent}
                                   toggleEditStudent={this.toggleEditStudent}/>
                <StudentDetailBody student={this.state.student}/>

                {this.state.student !== null && //If activeStudent is not null
                <DeleteStudentModal isOpen={this.state.deleteStudentIsShowing}
                                    student={this.state.student}
                                    toggle={this.toggleDeleteStudent}
                                    refresh={this.props.onDeleteActiveStudent}/>}

                {this.state.student !== null &&
                <EditStudentModal isOpen={this.state.editStudentIsShowing}
                                  student={this.state.student}
                                  refresh={this.onEditStudent}
                                  toggle={this.toggleEditStudent}/>}
            </div>
        );
    }
}

class StudentDetailHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        {this.props.student.firstName} {this.props.student.middleName} {this.props.student.familyName}
                        <small className="text-muted ml-2">{this.props.student.idNumber}</small>
                    </h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success" className="mr-2" onClick={this.props.toggleEditStudent}>Edit Student</Button>
                    <Button outline size="sm" color="danger" onClick={this.props.toggleDeleteStudent}>Delete</Button>
                </div>
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