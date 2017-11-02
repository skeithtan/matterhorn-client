import React, { Component } from "react";
import {
    Button,
} from "reactstrap";
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
                gender
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
        };
    }

    static unselectedState() {
        return (
            <div className="loading-container">
                <h3>Select a student to see its details</h3>
            </div>
        );
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
                <StudentDetailHead student={this.state.student}/>
                <StudentDetailBody student={this.state.student}/>
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
                    </h4>
                    <h4 className="text-muted d-inline-block font-weight-normal mb-0">{this.props.student.idNumber}</h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success" className="mr-2">Edit Student</Button>
                    <Button outline size="sm" color="danger">Delete</Button>
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

            </div>
        );
    }
}

export default StudentDetail;