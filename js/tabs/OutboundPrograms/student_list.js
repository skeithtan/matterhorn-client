import React, { Component } from "react";
import {
    Input,
    Button,
} from "reactstrap";
import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
} from "../../components/section";
import LoadingSpinner from "../../components/loading";
import { StudentFormModal } from "./modals";

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addStudentsIsShowing : false,
        };

        this.toggleAddStudents = this.toggleAddStudents.bind(this);
        this.getSortedStudyFields = this.getSortedStudyFields.bind(this);
    }

    toggleAddStudents() {
        this.setState({
            addStudentsIsShowing : !this.state.addStudentsIsShowing,
        });
    }

    getSortedStudyFields() {
        if (this.props.studyFieldList === null) {
            return [];
        }

        let studyFields = this.props.studyFieldList;

        // Get uniques only
        studyFields = studyFields.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // A different approach
        let categorizedByStudyField = [];
        studyFields.forEach(studyField => {
            let students = [];
            studyField.studentprogram_set.forEach(studentProgram => {
                if (studentProgram.study_field.name === studyField.name) {
                    students.push(studentProgram.student);
                }
            });
            categorizedByStudyField.push({
                studyField : studyField.name,
                students : students,
            });
        });

        return categorizedByStudyField;
    }

    render() {
        const studyFields = this.getSortedStudyFields();

        return (
            <div className="programs-page-pane d-flex flex-column">
                <StudentListHead activeProgram={ this.props.activeProgram }
                                 toggleAddStudents={ this.toggleAddStudents }/>
                <StudentListTable studyFields={ studyFields }/>
                <StudentFormModal activeProgram={ this.props.activeProgram }
                                  studyFields={ studyFields }
                                  refreshStudents={ this.props.refreshStudents }
                                  toggle={ this.toggleAddStudents }
                                  isOpen={ this.state.addStudentsIsShowing }/>
            </div>
        );
    }
}

class StudentListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head d-flex flex-column align-items-center">
                <div className="page-head-controls ml-auto">
                    <Button outline color="success" size="sm" className="ml-auto"
                            onClick={ this.props.toggleAddStudents }>Add</Button>
                </div>
                <div className="w-100 mb-2">
                    <h5 className="mb-0 text-secondary">Students</h5>
                    <h4 className="page-head-title mb-0">{ this.props.activeProgram.name }</h4>
                </div>
                <Input type="search" placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class StudentListTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Students will show up here.</p>
            </div>
        );
    }

    render() {
        if (this.props.studyFields === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.studyFields.length === 0) {
            return this.emptyState();
        }

        const sections = this.props.studyFields.map((studyField, index) => {
            return <StudentSection key={ index }
                                   title={ studyField.studyField }
                                   students={ studyField.students }/>;
        });

        return (
            <div className="page-body">
                { sections }
            </div>
        );
    }
}

class StudentSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let body = (
            <div className="p-4 pt-5 pb-5 bg-light text-center">
                <h5 className="text-secondary">There are no students for this study field.</h5>
            </div>
        );

        const rows = this.props.students.map((student, index) => {
            return (
                <SectionRow key={ index }>
                    <small className="d-block">{ student.id_number }</small>
                    <b>{ student.family_name }</b>, { student.first_name } { student.middle_name }
                </SectionRow>
            );
        });

        if (this.props.students.length > 0) {
            body = (
                <SectionTable>
                    { rows }
                </SectionTable>
            );
        }

        return (
            <Section>
                <SectionTitle>{ this.props.title }</SectionTitle>
                { body }
            </Section>
        );
    }
}

export default StudentList;