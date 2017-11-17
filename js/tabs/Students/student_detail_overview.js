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

                    {student.nickname.length > 0 && //Only show if student nickname exists
                    <SectionRow>
                        <SectionRowTitle>Nickname</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{student.nickname}</SectionRowContent>
                    </SectionRow>
                    }

                    <SectionRow>
                        <SectionRowTitle>Sex</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{sex}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Home Address</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{student.home_address}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Date of Birth</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{birthDate}</SectionRowContent>
                    </SectionRow>

                    {student.nationality.length > 0 &&
                    <SectionRow>
                        <SectionRowTitle>Nationality</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{student.nationality}</SectionRowContent>
                    </SectionRow>
                    }

                    <SectionRow>
                        <SectionRowTitle>Civil Status</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{civilStatus}</SectionRowContent>
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
                        <SectionRowContent large={!this.props.sidebar}>{student.phone_number}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Email</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{student.email}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Emergency Contact</SectionRowTitle>
                        <SectionRowContent
                            large={!this.props.sidebar}>{`${student.emergency_contact_name} (${student.emergency_contact_relationship})`}</SectionRowContent>
                    </SectionRow>

                    <SectionRow>
                        <SectionRowTitle>Emergency Contact Number</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{student.emergency_contact_number}</SectionRowContent>
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
                        <SectionRowTitle>Student Type</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{type}</SectionRowContent>
                    </SectionRow>

                    {student.category === "IN" &&
                    <SectionRow>
                        <SectionRowTitle>Institution</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{student.institution.name}</SectionRowContent>
                    </SectionRow>
                    }

                    <SectionRow>
                        <SectionRowTitle>College</SectionRowTitle>
                        <SectionRowContent large={!this.props.sidebar}>{college}</SectionRowContent>
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