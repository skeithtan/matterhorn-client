import React, { Component } from "react";
import settings from "../../settings";
import moment from "moment";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionRowContentLarge,
} from "../../components/section";



class StudentDetailOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;
        const sex = student.sex === "F" ? "Female" : "Male";
        const civilStatus = settings.civilStatuses[student.civilStatus];
        const birthDate = moment(student.birthDate).format("LL");

        return (

            <Section>
                <SectionTitle>Student Details</SectionTitle>
                <SectionTable>

                    <SectionRow>
                        <SectionRowTitle>Nickname</SectionRowTitle>
                        <SectionRowContentLarge>{student.nickname}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Sex</SectionRowTitle>
                        <SectionRowContentLarge>{sex}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Home Address</SectionRowTitle>
                        <SectionRowContentLarge>{student.homeAddress}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Date of Birth</SectionRowTitle>
                        <SectionRowContentLarge>{birthDate}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Nationality</SectionRowTitle>
                        <SectionRowContentLarge>{student.nationality}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Civil Status</SectionRowTitle>
                        <SectionRowContentLarge>{civilStatus}</SectionRowContentLarge>
                    </SectionRow>

                </SectionTable>
            </Section>
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
            <Section>
                <SectionTitle>Contact Details</SectionTitle>
                <SectionTable>

                    <SectionRow>
                        <SectionRowTitle>Phone Number</SectionRowTitle>
                        <SectionRowContentLarge>{student.phoneNumber}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Email</SectionRowTitle>
                        <SectionRowContentLarge>{student.email}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Emergency Contact</SectionRowTitle>
                        <SectionRowContentLarge>{`${student.emergencyContactName} (${student.emergencyContactRelationship})`}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Emergency Contact Number</SectionRowTitle>
                        <SectionRowContentLarge>{student.emergencyContactNumber}</SectionRowContentLarge>
                    </SectionRow>

                </SectionTable>
            </Section>
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
            <Section>
                <SectionTitle>University Details</SectionTitle>
                <SectionTable>

                    <SectionRow>
                        <SectionRowTitle>College</SectionRowTitle>
                        <SectionRowContentLarge>{college}</SectionRowContentLarge>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Student Type</SectionRowTitle>
                        <SectionRowContentLarge>{type}</SectionRowContentLarge>
                    </SectionRow>

                </SectionTable>
            </Section>
        );
    }
}

export {
    StudentDetailOverview,
    StudentContact,
    StudentUniversity,
};