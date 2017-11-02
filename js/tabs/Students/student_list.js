import React, { Component } from "react";
import LoadingSpinner from "../../loading";
import {
    Input,
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
            <div className="sidebar h-100" id="student-list">
                <StudentListHead/>
                <StudentListTable students={this.props.students}
                                  activeStudent={this.props.activeStudent}
                                  setActiveStudent={this.props.setActiveStudent}/>
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
        this.getStudentsByFamilyNameInitials = this.getStudentsByFamilyNameInitials.bind(this);
    }

    static emptyState() {
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Students will show up here.</p>
                <Button outline color="success">Add a Student</Button>
            </div>
        );
    }

    getStudentsByFamilyNameInitials() {
        //Get first letter
        let familyNameInitials = this.props.students.map(student => student.familyName[0]);

        //Get uniques only
        familyNameInitials = familyNameInitials.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // Sort alphabetically
        familyNameInitials = familyNameInitials.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        let categorizedByInitial = [];

        // Categorize by family name initial
        familyNameInitials.forEach(initial => {
            let students = [];
            categorizedByInitial.push({
                initial : initial,
                students : students,
            });

            this.props.students.forEach(student => {
                const studentInitial = student.familyName[0];

                if (studentInitial === initial) {
                    students.push(student);
                }
            });

        });

        return categorizedByInitial;
    }

    render() {
        if (this.props.students === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.students.length === 0) {
            return StudentListTable.emptyState();
        }

        const familyNameInitials = this.getStudentsByFamilyNameInitials();

        const sections = familyNameInitials.map((familyNameInitial, index) => {
            return <StudentSection key={index}
                                   title={familyNameInitial.initial}
                                   students={familyNameInitial.students}/>;
        });


        return (
            <div className="page-body">
                {sections}
            </div>
        );
    }
}

class StudentSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.students.map(student => {
            return <StudentRow key={student.idNumber} student={student}/>;
        });

        return (
            <div className="section">
                <small className="section-title">{this.props.title}</small>
                <ListGroup>
                    {rows}
                </ListGroup>
            </div>
        );
    }
}

class StudentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Hardcoded, I can fix this later.
        const first = this.props.student.firstName;
        const middle = this.props.student.middleName;
        const familyName = this.props.student.familyName;
        const idNumber = this.props.student.idNumber;
        return (
            <ListGroupItem>
                <small className="d-block">{idNumber}</small>
                <b>{familyName}</b>, {first} {middle}
            </ListGroupItem>
        );
    }
}

export default StudentList;