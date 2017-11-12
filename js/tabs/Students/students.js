import React, { Component } from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";
import StudentDetail from "./student_detail";
import { StudentFormModal, } from "./modals";


function fetchStudents(onResult) {
    graphql.query(`
    {
        students {
            id
            id_number
            family_name
            first_name
            middle_name
        }
    }
    `).then(onResult);
}

class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allStudents : null,
            activeStudent : null,
            addStudentIsShowing : false,
        };

        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.toggleAddStudent = this.toggleAddStudent.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        this.onDeleteActiveStudent = this.onDeleteActiveStudent.bind(this);
        this.refreshStudents();
    }

    refreshStudents() {
        fetchStudents(result => {
            this.setState({
                allStudents : result.students,
            });
        });
    }

    onDeleteActiveStudent() {
        this.setState({
            activeStudent : null,
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
            activeStudent : student,
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

                <StudentFormModal isOpen={this.state.addStudentIsShowing}
                                  toggle={this.toggleAddStudent}
                                  refresh={this.refreshStudents}/>
            </div>
        );
    }
}

export default Students;