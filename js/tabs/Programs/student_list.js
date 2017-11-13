import React, { Component } from "react";
import {
    Input,
    Button,
} from "reactstrap";
import {
    SectionRow,
    SectionRowContent,
} from "../../components/section";

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.getFilteredStudents = this.getFilteredStudents.bind(this);
    }

    getFilteredStudents() {
        if (this.props.studentList === null) {
            return [];
        }

        let students = [];

        // TODO
    }

    render() {
        const students = this.getFilteredStudents();

        return (
            <div className="h-100 d-flex flex-column">
                <StudentListHead activeProgram={ this.props.activeProgram }/>
                <StudentListTable/>
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
    }

    render() {
        return (
            <div className="page-body">
                <StudentRow/>
                <StudentRow/>
                <StudentRow/>
            </div>
        );
    }
}

class StudentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionRow>
                <SectionRowContent>Student Name</SectionRowContent>
            </SectionRow>
        );
    }
}

export default StudentList;