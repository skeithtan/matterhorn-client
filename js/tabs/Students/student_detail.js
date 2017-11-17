import React, { Component } from "react";
import {
    Button,
} from "reactstrap";
import {
    ArchiveStudentModal,
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
            <div id="student-detail"
                 className="container-fluid d-flex flex-column p-0">
                
            </div>
        );
    }
}

export {
    StudentDetail as default,
    fetchStudent,
};