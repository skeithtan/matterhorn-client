import React, { Component } from "react";
import LoadingSpinner from "../../../components/loading";
import graphql from "../../../graphql";
import { Button } from "reactstrap";
import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionRowContent,
} from "../../../components/section";
import {
    ArchiveStudentModal,
    StudentFormModal,

} from "../modals";
import moment from "moment";
import settings from "../../../settings";
import ErrorState from "../../../components/error_state";


function makeStudentOverviewQuery(id) {
    return graphql.query(`
    {
        student(id:${id}) {
            category
            college
            nickname
            nationality
            home_address
            phone_number
            birth_date
            sex
            emergency_contact_name
            emergency_contact_relationship
            emergency_contact_number
            email
            civil_status
            institution {
                name
            }
        }
    }    
    `);
}

function studentIsFetched(student) {
    return student.nickname !== undefined;
}

class StudentOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : props.student,
            error : null,
        };

        this.fetchStudent = this.fetchStudent.bind(this);

        this.fetchStudent(props.student.id);
    }

    fetchStudent(id) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeStudentOverviewQuery(id)
            .then(result => {
                Object.assign(this.state.student, result.student);

                this.setState({
                    student : this.state.student,
                });
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.student !== null &&
            this.state.student.id === nextProps.student.id) {
            return;
        }

        this.setState({
            student : nextProps.student,
        });

        if (!studentIsFetched(nextProps.student)) {
            this.fetchStudent(nextProps.student.id);
        }
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchStudent(this.state.student.id)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (!studentIsFetched(this.state.student)) {
            return <LoadingSpinner/>;
        }

        return (
            <div className="d-flex flex-column p-0 h-100">
                <OverviewHead student={this.state.student}
                              onArchiveStudent={this.props.onArchiveActiveStudent}
                              onEditStudent={() =>  this.fetchStudent(this.state.student.id)}/>
                <OverviewBody student={this.state.student}/>
            </div>
        );
    }
}

class OverviewHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            archiveStudentIsShowing : false,
            editStudentIsShowing : false,
        };

        this.toggleEditStudent = this.toggleEditStudent.bind(this);
        this.toggleArchiveStudent = this.toggleArchiveStudent.bind(this);
    }

    toggleEditStudent() {
        this.setState({
            editStudentIsShowing : !this.state.editStudentIsShowing,
        });
    }

    toggleArchiveStudent() {
        this.setState({
            archiveStudentIsShowing : !this.state.archiveStudentIsShowing,
        });
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Overview</h5>
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        {this.props.student.first_name} {this.props.student.middle_name} {this.props.student.family_name}
                        <small className="text-muted ml-2">{this.props.student.id_number}</small>
                    </h4>
                </div>

                <div className="page-head-actions">
                    <Button outline
                            size="sm"
                            color="success"
                            className="mr-2"
                            onClick={this.toggleEditStudent}>
                        Edit Student
                    </Button>

                    <Button outline
                            size="sm"
                            color="warning"
                            onClick={this.toggleArchiveStudent}>Archive</Button>
                </div>

                <ArchiveStudentModal isOpen={this.state.archiveStudentIsShowing}
                                     student={this.props.student}
                                     toggle={this.toggleArchiveStudent}
                                     refresh={this.props.onArchiveStudent}/>

                <StudentFormModal edit
                                  isOpen={this.state.editStudentIsShowing}
                                  student={this.props.student}
                                  refresh={this.props.onEditStudent}
                                  toggle={this.toggleEditStudent}/>
            </div>
        );
    }
}

class OverviewBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <StudentDetails student={this.props.student}/>
                <ContactDetails student={this.props.student}/>
                <UniversityDetails student={this.props.student}/>
            </div>
        );
    }
}

class StudentDetails extends Component {
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

                    {this.props.archived &&
                    <SectionRow>
                        <SectionRowContent className="d-flex">
                            <Button outline
                                    color="primary"
                                    size="sm"
                                    className="ml-auto"
                                    onClick={this.props.toggleRestoreStudent}>Restore</Button>
                        </SectionRowContent>
                    </SectionRow>
                    }

                </SectionTable>
            </Section>
        );
    }
}

class ContactDetails extends Component {
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
                        <SectionRowContent
                            large={!this.props.sidebar}>{student.emergency_contact_number}</SectionRowContent>
                    </SectionRow>

                </SectionTable>
            </Section>
        );
    }
}

class UniversityDetails extends Component {
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
                        <SectionRowContent
                            large={!this.props.sidebar}>{student.institution.name}</SectionRowContent>
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
    StudentOverview as default,
    StudentDetails,
    ContactDetails,
    UniversityDetails,
    makeStudentOverviewQuery
};