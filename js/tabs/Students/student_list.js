import React, { Component } from "react";
import {
    Input,
    Button,
} from "reactstrap";

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allStudents : props.students
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            allStudents: nextProps.students,
        });
    }

    render() {
        return(
            <div className="sidebar h-100" id="student-list">
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
            <div className="page-head">
                <div className="page-head-controls">
                    <Button outline color="success" size="sm" className="ml-auto">Add</Button>
                </div>
                <h4 className="page-head-title">Students</h4>
                <Input placeholder="Search" className="search-input mt-2"/>
            </div>
        );
    }
}

class StudentListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="page-body">
                Something else
            </div>
        )
    }
}

export default StudentList;