import React, { Component } from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";
import StudentDetail from "./student_detail";
import { StudentFormModal, } from "./modals";
import ErrorState from "../../components/error_state";


const tabs = [
    {
        name : "Inbound",
        image : "./images/inboundgrey.png",
        activeImage : "./images/inboundgreen.png",
    },
    {
        name : "Outbound",
        image : "./images/airplanegrey.png",
        activeImage : "./images/airplanegreen.png",
    },
];


function makeStudentsQuery(category) {
    return graphql.query(`
    {
        students(category:"${category}") {
            id
            id_number
            family_name
            first_name
            middle_name
        }
    }
    `);
}

class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allStudents : null,
            activeStudent : null,
            addStudentIsShowing : false,
            activeTab : tabs[0],
            error : null,
        };

        this.onAddStudent = this.onAddStudent.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.toggleAddStudent = this.toggleAddStudent.bind(this);
        this.onArchiveActiveStudent = this.onArchiveActiveStudent.bind(this);

        this.fetchStudents(this.state.activeTab.name);
    }

    fetchStudents(tabName) {
        const category = tabName === "Inbound" ? "IN" : "OUT";

        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeStudentsQuery(category)
            .then(result => this.setState({
                allStudents : result.students,
            }))
            .catch(error => this.setState({
                error : error,
            }));
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
            activeStudent : null, //Student is no longer in the same category
            allStudents : null,
        });

        this.fetchStudents(tab.name);
    }

    onAddStudent(student) {
        // Only set new student as active if user is currently looking at inbounds
        // Only inbound because the only type of student you can add here is inbound
        if (this.state.tab.name === "Inbound") {
            this.setState({
                activeStudent : student,
            });
        }
    }

    onArchiveActiveStudent() {
        this.setState({
            activeStudent : null,
        });

        // Refresh students
        this.fetchStudents(this.state.activeTab.name);
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
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchStudents(this.state.activeTab.name)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        const addButtonIsShowing = this.state.activeTab.name === "Inbound";
        const refresh = () => this.fetchStudents(this.state.activeTab.name);

        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <StudentList students={this.state.allStudents}
                             activeStudent={this.state.activeStudent}
                             setActiveStudent={this.setActiveStudent}
                             toggleAddStudent={this.toggleAddStudent}
                             setActiveTab={this.setActiveTab}
                             activeTab={this.state.activeTab}
                             addButtonIsShowing={addButtonIsShowing}
                             tabs={tabs}/>
                <StudentDetail student={this.state.activeStudent}
                               onArchiveActiveStudent={this.onArchiveActiveStudent}
                               refreshStudents={refresh}/>
                <StudentFormModal isOpen={this.state.addStudentIsShowing}
                                  toggle={this.toggleAddStudent}
                                  onAddStudent={this.onAddStudent}
                                  refresh={refresh}/>
            </div>
        );
    }
}

export default Students;