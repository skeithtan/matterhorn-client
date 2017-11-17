import React, { Component } from "react";
import LoadingSpinner from "../../../components/loading";

import {
    ContactDetails,
    fetchStudent,
    StudentDetails,
    UniversityDetails,
} from "../../Students/tabs/overview";

import {
    StudentContact,
    StudentDetailOverview,
    StudentUniversity,
} from "../../Students/student_detail_overview";
import { RestoreStudentModal } from "./modals";


function studentIsFetched(student) {
    return student.home_address !== undefined;
}

class StudentSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restoreStudentIsShowing : false,
            student : props.student,
        };

        if (!studentIsFetched(props.student)) {
            fetchStudent(props.student.id, result => {
                this.setState({
                    student : result.student,
                });
            });
        }

        this.toggleRestoreStudent = this.toggleRestoreStudent.bind(this);
    }

    toggleRestoreStudent() {
        this.setState({
            restoreStudentIsShowing : !this.state.restoreStudentIsShowing,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            student : props.student,
        });

        if (!studentIsFetched(props.student)) {
            fetchStudent(props.student.id, result => {
                this.setState({
                    student : result.student,
                });
            });
        }
    }

    render() {
        const student = this.state.student;
        const fullName = `${student.first_name} ${student.middle_name} ${student.family_name}`;
        const isFetched = studentIsFetched(student);

        let pageBody;

        if (isFetched) {
            pageBody = (
                <div className="page-body">
                    <StudentDetails sidebar
                                    archived
                                    toggleRestoreStudent={this.toggleRestoreStudent}
                                    student={student}/>
                    <ContactDetails sidebar
                                    student={student}/>
                    <UniversityDetails sidebar
                                       student={student}/>
                    <RestoreStudentModal student={student}
                                         toggle={this.toggleRestoreStudent}
                                         onRestoreSuccess={this.props.onRestoreSuccess}
                                         isOpen={this.state.restoreStudentIsShowing}/>
                </div>
            );
        } else {
            pageBody = <LoadingSpinner/>;
        }

        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">{fullName}</h5>
                    </div>
                </div>

                {pageBody}
            </div>
        );
    }
}


export { StudentSidebarPane };