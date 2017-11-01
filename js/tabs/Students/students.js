import React, {Component} from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";

function fetchStudents(onResponse) {
    graphql({
        query: `
        {
            students {
                kind
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
                emergencyContactNumber
                email
                civilStatus
            }
        }
        `,
        onResponse: onResponse,
    });
}

class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList: null,
            activeStudent: null,
        };

        fetchStudents(response => {
            this.setState({
                studentList: response.data,
            });
        });
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <StudentList students={this.state.studentList}/>
            </div>
        )
    }
}

export default Students;