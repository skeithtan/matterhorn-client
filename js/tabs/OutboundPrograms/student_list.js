import React, { Component } from "react";
import {
    Input,
    Button,
} from "reactstrap";
import {
    SectionRow,
} from "../../components/section";
import LoadingSpinner from "../../components/loading";

class StudentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="programs-page-pane d-flex flex-column">
                <StudentListHead activeProgram={ this.props.activeProgram }/>
                <StudentListTable students={ this.props.studentList }/>
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
        if (this.props.students === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.students.length === 0) {
            return this.emptyState();
        }

        const rows = this.props.students.map((student, index) => {
            return (
                <SectionRow key={ index }>
                    <small className="d-block">{ student.student.id_number }</small>
                    <b>{ student.student.family_name }</b>, { student.student.first_name } { student.student.middle_name }
                </SectionRow>
            );
        });

        return (
            <div className="page-body">
                { rows }
            </div>
        );
    }
}

export default StudentList;