import React, { Component } from "react";
import {
    Input,
} from "reactstrap";
import {
    SectionRow,
    SectionRowContent,
} from "../../components/section";

class StudentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column">
                <StudentListHead/>
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
                <div className="d-flex flex-row w-100 mb-2 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Students</h5>
                        <h4 className="page-head-title mb-0">Study Field Name</h4>
                    </div>
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