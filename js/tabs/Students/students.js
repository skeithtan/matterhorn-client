import React, {Component} from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";
import StudentDetail from "./student_detail";

function fetchStudents(onResponse) {
    graphql({
        query: `
        {
            students {
                familyName
                firstName
                middleName
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
                // If I put .students it returns null?
                // I'm assuming there's something wrong with my query or this.
                studentList: response.data,
            });
        });
    }

    setActiveStudent(student) {
        this.setState({
            activeStudent: student,
        });
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <StudentList students={this.state.studentList} setActiveStudent={this.setActiveStudent}/>
                <StudentDetail student={this.state.activeStudent}/>
            </div>
        )
    }
}

export default Students;