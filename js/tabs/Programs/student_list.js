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

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.getSortedStudyFields = this.getSortedStudyFields.bind(this);
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
            <div className="h-100 d-flex flex-column">
                <StudentListHead activeProgram={ this.props.activeProgram }
                                 refreshStudents={ this.props.refreshStudents }/>
                <StudentListTable studyFields={ studyFields }/>
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
                    <Button outline color="success" size="sm" className="ml-auto">Add</Button>
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
        const rows = this.props.students.map((student, index) => {
            return (
                <SectionRow key={ index }>
                    <small className="d-block">{ student.id_number }</small>
                    <b>{ student.family_name }</b>, { student.first_name } { student.middle_name }
                </SectionRow>
            );
        });

        return (
            <Section>
                <SectionTitle>{ this.props.title }</SectionTitle>
                <SectionTable>
                    { rows }
                </SectionTable>
            </Section>
        );
    }
}

export default StudentList;