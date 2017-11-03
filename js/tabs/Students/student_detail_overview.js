import React, { Component } from "react";
import settings from "../../settings";
import {
    ListGroup,
    ListGroupItem,
} from "reactstrap";


class StudentDetailOverview extends Component {
    constructor(props) {
        super(props);

        this.convertCivilStatus = this.convertCivilStatus.bind(this);
    }

    convertCivilStatus(civilStatus) {
        switch (civilStatus) {
            case "S":
                civilStatus = "Single";
                break;

            case "M":
                civilStatus = "Married";
                break;

            case "D":
                civilStatus = "Divorced";
                break;

            case "W":
                civilStatus = "Widowed";
                break;
        }
        return civilStatus;
    }

    render() {
        const student = this.props.student;
        const sex = student.sex === "F" ? "Female" : "Male";
        let civilStatus = this.convertCivilStatus(student.civilStatus);

        return (
            <div className="section">
                <small className="section-title">Student details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="Nickname" fieldValue={student.nickname}/>
                    <StudentDetailRow fieldName="Sex" fieldValue={sex}/>
                    <StudentDetailRow fieldName="Address" fieldValue={student.homeAddress}/>
                    <StudentDetailRow fieldName="Birth Date" fieldValue={student.birthDate}/>
                    <StudentDetailRow fieldName="Nationality" fieldValue={student.nationality}/>
                    <StudentDetailRow fieldName="Civil Status" fieldValue={civilStatus}/>
                </ListGroup>
            </div>
        );
    }
}

class StudentContact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;

        return (
            <div className="section">
                <small className="section-title">Contact details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="Phone Number" fieldValue={student.phoneNumber}/>
                    <StudentDetailRow fieldName="E-mail" fieldValue={student.email}/>
                    <StudentDetailRow fieldName="Emergency Contact"
                                      fieldValue={`${student.emergencyContactName} (${student.emergencyContactRelationship})`}/>
                    <StudentDetailRow fieldName="Emergency Contact Number" fieldValue={student.emergencyContactNumber}/>
                </ListGroup>
            </div>
        );
    }
}

class StudentUniversity extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const student = this.props.student;
        const college = settings.colleges[student.college];
        const type = student.category === "OUT" ? "Outbound" : "Inbound";

        return (
            <div className="section">
                <small className="section-title">University Details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="College" fieldValue={college}/>
                    <StudentDetailRow fieldName="Student Type" fieldValue={type}/>
                </ListGroup>
            </div>
        );
    }
}

class StudentDetailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <small className="font-weight-bold">{this.props.fieldName}</small>
                <p className="lead m-0">{this.props.fieldValue}</p>
            </ListGroupItem>
        );
    }
}

export {
    StudentDetailOverview,
    StudentContact,
    StudentUniversity,
};