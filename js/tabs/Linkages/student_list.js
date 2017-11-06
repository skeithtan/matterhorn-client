import React, { Component } from "react";
import {
    Button,
    Input,
    ListGroup,
    ListGroupItem,
} from "reactstrap";


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

// This looks broken. Please fix this.
class StudentListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-column align-items-center">
                <div className="d-flex flex-row w-100 mb-2 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Students</h5>
                        <h4 className="page-head-title mb-0">Program name</h4>
                    </div>
                    <div>
                        <button className="ml-auto btn btn-outline-success btn-sm">Add</button>
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
                <ListGroup>
                    <StudentListRow/>
                    <StudentListRow/>
                    <StudentListRow/>
                </ListGroup>
            </div>
        );
    }
}

class StudentListRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>Student Name</ListGroupItem>
        );
    }
}

export default StudentList;