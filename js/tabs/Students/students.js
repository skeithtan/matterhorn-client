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


function makeInboundQuery() {
    return graphql.query(`
        {
            inbound_student_programs(accepted:true) {
                student {
                    id
                    id_number
                    family_name
                    first_name
                    middle_name
                }
            }
        }
        `);
}

function makeOutboundQuery() {
    return graphql.query(`
    {
        outbound_student_programs(deployed:true) {
            student {
                id
                id_number
                family_name
                first_name
                middle_name
            }
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
            activeTab : tabs[0],
            error : null,
        };

        this.onAddStudent = this.onAddStudent.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.setActiveStudent = this.setActiveStudent.bind(this);
        this.onArchiveActiveStudent = this.onArchiveActiveStudent.bind(this);
        this.extractStudentsFromProgram = this.extractStudentsFromProgram.bind(this);

        this.fetchStudents(this.state.activeTab.name);
    }

    fetchStudents(tabName) {
        const category = tabName === "Inbound" ? "IN" : "OUT";

        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        if (category === "IN") {
            makeInboundQuery()
                .then(result => this.setState({
                    allStudents : result.inbound_student_programs,
                }))
                .catch(error => this.setState({
                    error : error,
                }));
        } else {
            makeOutboundQuery()
                .then(result => this.setState({
                    allStudents : result.outbound_student_programs,
                }))
                .catch(error => this.setState({
                    error : error,
                }));
        }
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

    setActiveStudent(student) {
        this.setState({
            activeStudent : student,
        });
    }

    extractStudentsFromProgram() {
        if (this.state.allStudents === null) {
            return null;
        }

        const students = [];

        this.state.allStudents.forEach(student => {
            students.push(student.student);
        });

        return students;
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={ () => this.fetchStudents(this.state.activeTab.name) }>
                    { this.state.error.toString() }
                </ErrorState>
            );
        }

        const students = this.extractStudentsFromProgram();

        const refresh = () => this.fetchStudents(this.state.activeTab.name);

        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <StudentList students={ students }
                             activeStudent={ this.state.activeStudent }
                             setActiveStudent={ this.setActiveStudent }
                             setActiveTab={ this.setActiveTab }
                             activeTab={ this.state.activeTab }
                             tabs={ tabs }/>
                <StudentDetail student={ this.state.activeStudent }
                               onArchiveActiveStudent={ this.onArchiveActiveStudent }
                               refreshStudents={ refresh }/>
            </div>
        );
    }
}

export default Students;