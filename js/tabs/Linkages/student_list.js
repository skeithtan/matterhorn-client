import React, { Component } from "react";
import {
    Button,
    ListGroup,
    ListGroupItem,
} from "reactstrap";

class StudentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar-right h-100" id="institution-list">
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
            <div className="page-head d-flex flex-row">
                <h4 className="page-head-title">Students</h4>
                <Button outline color="success" size="sm" className="ml-auto">Add</Button>
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