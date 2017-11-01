import React, {Component} from "react";
import {
    Input,
    Button,
    ListGroup,
    ListGroupItem,
} from "reactstrap";

let activeStudent = null;

function sortStudents(students) {
    let sorted = {};
    students.forEach(student => {
        const firstLetter = student.familyName[0];
        if (sorted[firstLetter] === undefined) {
            sorted[firstLetter] = [student];
        } else {
            sorted[firstLetter].push(student);
        }
    });

    return sorted;
}

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allStudents: props.students,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            allStudents: nextProps.students,
        });
    }

    render() {
        activeStudent = this.props.activeStudent;

        return (
            <div className="sidebar h-100" id="student-list">
                <StudentListHead/>
                <StudentListTable students={this.state.allStudents} setActiveStudent={this.props.setActiveInstitution}/>
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
                    <div className="btn-group ml-auto">
                        <Button outline color="success" size="sm" className="active">Active</Button>
                        <Button outline color="success" size="sm" className="">Historical</Button>
                    </div>
                    <Button outline color="success" size="sm" className="ml-4">Add</Button>
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

    static emptyState() {
        return (
            <div>
                <h4>There's nothing here.</h4>
                <p>When added, Students will show up here.</p>
                <Button outline color="success">Add a Student</Button>
            </div>
        )
    }

    render() {
        return (
            <div className="page-body">
                <StudentSection/>
            </div>
        )
    }
}

class StudentSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="section">
                <small className="section-title">A</small>
                <ListGroup>
                    <StudentRow/>
                </ListGroup>
            </div>
        )
    }
}

class StudentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>

            </ListGroupItem>
        )
    }
}

export default StudentList;