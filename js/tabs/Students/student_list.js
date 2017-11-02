import React, {Component} from "react";
import {
    Input,
    Button,
    ListGroup,
    ListGroupItem,
} from "reactstrap";

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
        return (
            <div className="sidebar h-100" id="student-list">
                <StudentListHead/>
                <StudentListTable students={this.state.allStudents} setActiveStudent={this.props.setActiveStudent}/>
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
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Students will show up here.</p>
                <Button outline color="success">Add a Student</Button>
            </div>
        )
    }

    render() {
        if (this.props.students === null) {
            return StudentListTable.emptyState();
        }

        const rows = this.props.students.map((student, index) => {
            return <StudentRow student={student} key={index}/>
        });

        return (
            <div className="page-body">
                <div className="section">
                    <ListGroup>
                        {rows}
                    </ListGroup>
                </div>
            </div>
        )
    }
}

// This will be used when filtering comes in
// class StudentSection extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//             <div className="section">
//                 <small className="section-title">A</small>
//                 <ListGroup>
//                     <StudentRow/>
//                 </ListGroup>
//             </div>
//         )
//     }
// }

class StudentRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Hardcoded, I can fix this later.
        const first = this.props.student.firstName;
        const middle = this.props.student.middleName;
        const last = this.props.student.familyName;
        const name = first + " " + middle + " " + last;
        return (
            <ListGroupItem>
                {name}
            </ListGroupItem>
        )
    }
}

export default StudentList;