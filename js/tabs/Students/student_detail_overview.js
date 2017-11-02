import React, {Component} from "react";
import {
    ListGroup,
    ListGroupItem,
} from "reactstrap";

class StudentDetailOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;
        const sex = this.props.student.gender === "F" ? "Female" : "Male";
        // TODO: switch for civil status

        return (
            <div>
                <small className="section-title">Student details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="Nickname" fieldValue={student.nickname}/>
                    <StudentDetailRow fieldName="Sex" fieldValue={sex}/>
                    <StudentDetailRow fieldName="Address" fieldValue={student.homeAddress}/>
                    <StudentDetailRow fieldName="Birth Date" fieldValue={student.birthDate}/>
                    <StudentDetailRow fieldName="Nationality" fieldValue={student.nationality}/>
                    <StudentDetailRow fieldName="Civil Status" fieldValue={student.civilStatus}/>
                </ListGroup>
            </div>
        )
    }
}

class StudentContact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;

        return (
            <div>
                <small className="section-title">Contact details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="Phone Number" fieldValue={student.phoneNumber}/>
                    <StudentDetailRow fieldName="E-mail" fieldValue={student.email}/>

                    <ListGroupItem>
                        <small className="font-weight-bold">Emergency Contact</small>
                        <p className="m-0">
                            {student.emergencyContactName} ({student.emergencyContactRelationship})
                        </p>
                    </ListGroupItem>

                    <StudentDetailRow fieldName="Emergency Contact Number" fieldValue={student.emergencyContactNumber}/>
                </ListGroup>
            </div>
        )
    }
}

class StudentUniversity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;
        // TODO: switch for colleges
        const type = this.props.student.category === "OUT" ? "Outbound" : "Inbound";

        return (
            <div>
                <small className="section-title">University Details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="College" fieldValue={student.college}/>
                    <StudentDetailRow fieldName="Student Type" fieldValue={type}/>
                </ListGroup>
            </div>
        )
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
                <p className="m-0">{this.props.fieldValue}</p>
            </ListGroupItem>
        );
    }
}

export {
    StudentDetailOverview,
    StudentContact,
    StudentUniversity,
};