import React, {Component} from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";
import StudentDetail from "./student_detail";
import {
    AddStudentModal,
} from "./modals";


function fetchStudents(onResponse) {
    graphql({
        query: `
        {
            students {
                id
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
            addStudentIsShowing: false,
        };

        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.toggleAddStudent = this.toggleAddStudent.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        this.onDeleteActiveStudent = this.onDeleteActiveStudent.bind(this);
        this.refreshStudents();
    }

    refreshStudents() {
        fetchStudents(response => {
            this.setState({
                allStudents: response.data.students,
            });
        });
    }

    onDeleteActiveStudent() {
        this.setState({
            activeStudent: null,
        });

        this.refreshStudents();
    }

    toggleAddStudent() {
        this.setState({
            addStudentIsShowing : !this.state.addStudentIsShowing,
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
                             setActiveStudent={this.setActiveStudent}
                             toggleAddStudent={this.toggleAddStudent}/>
                <StudentDetail student={this.state.activeStudent}
                               onDeleteActiveStudent={this.onDeleteActiveStudent}
                               refreshStudents={this.refreshStudents}/>

                <AddStudentModal isOpen={this.state.addStudentIsShowing}
                                 toggle={this.toggleAddStudent}
                                 refresh={this.refreshStudents}/>
            </div>
        );
    }
}

export default Students;