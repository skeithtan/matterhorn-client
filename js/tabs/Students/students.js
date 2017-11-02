import React, {Component} from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";
import StudentDetail from "./student_detail";


function fetchStudents(onResponse) {
    graphql({
        query: `
        {
            students {
                idNumber
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
            allStudents: null,
            activeStudent: null,
        };

        this.setActiveStudent = this.setActiveStudent.bind(this);

        fetchStudents(response => {
            this.setState({
                allStudents: response.data.students,
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
                <StudentList students={this.state.allStudents}
                             activeStudent={this.state.activeStudent}
                             setActiveStudent={this.setActiveStudent}/>
                <StudentDetail student={this.state.activeStudent}/>
            </div>
        );
    }
}

export default Students;