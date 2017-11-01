import React, {Component} from "react";
import {
    Button,
} from "reactstrap";

function fetchStudent(id, onResponse) {
    // Query goes here
}

class StudentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: null,
            studentID: null,
        }
    }

    render() {
        return(
            <div id="student-detail" className="container-fluid d-flex flex-column p-0">
                <StudentDetailHead/>
            </div>
        )
    }
}

class StudentDetailHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">Student Name</h4>
                    <h4 className="text-muted d-inline-block font-weight-normal mb-0">Student ID Number</h4>
                </div>

                <div id="student-actions">
                    <Button outline size="sm" color="success" className="mr-2">Edit Student</Button>
                    <Button outline size="sm" color="danger">Delete</Button>
                </div>
            </div>
        );
    }
}

export default StudentDetail;