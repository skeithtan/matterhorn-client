import React, { Component } from "react";
import settings from "../../settings";
import moment from "moment";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionRowContent,
} from "../../components/section";



class StudentDetailOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const student = this.props.student;
        const sex = student.sex === "F" ? "Female" : "Male";
        const civilStatus = settings.civilStatuses[student.civil_status];
        const birthDate = moment(student.birth_date).format("LL");

        return (

            <Section>
                <SectionTitle>Student Details</SectionTitle>
                <SectionTable>

                    <SectionRow>
                        <SectionRowTitle>Nickname</SectionRowTitle>
                        <SectionRowContent large>{student.nickname}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Sex</SectionRowTitle>
                        <SectionRowContent large>{sex}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Home Address</SectionRowTitle>
                        <SectionRowContent large>{student.home_address}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Date of Birth</SectionRowTitle>
                        <SectionRowContent large>{birthDate}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Nationality</SectionRowTitle>
                        <SectionRowContent large>{student.nationality}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Civil Status</SectionRowTitle>
                        <SectionRowContent large>{civilStatus}</SectionRowContent>
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
                        <SectionRowContent large>{student.phone_number}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Email</SectionRowTitle>
                        <SectionRowContent large>{student.email}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Emergency Contact</SectionRowTitle>
                        <SectionRowContent large>{`${student.emergency_contact_name} (${student.emergency_contact_relationship})`}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Emergency Contact Number</SectionRowTitle>
                        <SectionRowContent large>{student.emergency_contact_number}</SectionRowContent>
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
                        <SectionRowContent large>{college}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Student Type</SectionRowTitle>
                        <SectionRowContent large>{type}</SectionRowContent>
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