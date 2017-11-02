import React, {Component} from "react";
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
        const sex = student.gender === "F" ? "Female" : "Male";
        let civilStatus = this.convertCivilStatus(student.civilStatus);

        return (
            <div>
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

        this.convertCollege = this.convertCollege.bind(this);
    }

    convertCollege(college) {
        switch (college) {
            case "CCS":
                college = "College of Computer Studies";
                break;

            case "RVRCOB":
                college = "Ramon V. Del Rosario College of Business";
                break;

            case "CLA":
                college = "College of Liberal Arts";
                break;

            case "SOE":
                college = "School of Economics";
                break;

            case "GCOE":
                college = "Gokongwei College of Engineering";
                break;

            case "COL":
                college = "College of Law";
                break;

            case "BAGCED":
                college = "Brother Andrew Gonzales College of Education";
                break;
        }
        return college;
    }

    render() {
        const student = this.props.student;
        const college = this.convertCollege(student.college);
        const type = student.category === "OUT" ? "Outbound" : "Inbound";

        return (
            <div>
                <small className="section-title">University Details</small>
                <ListGroup>
                    <StudentDetailRow fieldName="College" fieldValue={college}/>
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