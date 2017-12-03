import React, { Component } from "react";
import LoadingSpinner from "../../../components/loading";
import $ from "jquery";


import {
    ContactDetails as StudentContactDetails,
    StudentDetails,
    UniversityDetails,
    makeStudentOverviewQuery,
} from "../../Students/tabs/overview";

import {
    StudentContact,
    StudentDetailOverview,
    StudentUniversity,
} from "../../Students/student_detail_overview";

import {
    ContactDetails as InstitutionContactDetails,
    InstitutionDetails,
    makeInstitutionOverviewQuery,
} from "../../Institutions/tabs/overview";
import ErrorState from "../../../components/error_state";
import { makeInfoToast } from "../../../dismissable_toast_maker";
import authorizeXHR from "../../../authorization";
import settings from "../../../settings";
import iziToast from "izitoast";


function studentIsFetched(student) {
    return student.home_address !== undefined;
}

function institutionIsFetched(institution) {
    return institution.address !== undefined;
}

class StudentSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : props.student,
        };

        this.fetchStudent = this.fetchStudent.bind(this);
        this.confirmRestore = this.confirmRestore.bind(this);

        if (!studentIsFetched(props.student)) {
            this.fetchStudent(props.student.id);
        }
    }

    confirmRestore() {
        const student = this.props.student;
        const fullName = `${student.first_name} ${student.middle_name} ${student.family_name}`;
        if (!confirm(`Would you like to restore ${fullName}?`)) {
            return;
        }

        const dismissToast = makeInfoToast({
            title : "Restoring",
            message : "Restoring student...",
        });

        $.ajax({
            url : `${settings.serverURL}/archives/students/${this.props.student.id}/restore/`,
            method : "PUT",
            beforeSend : authorizeXHR,
        }).done(() => {
            dismissToast();
            iziToast.success({
                title : "Success",
                message : "Successfully restored student",
            });
            this.props.onRestoreSuccess();
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to restore student",
            });
        });
    }

    fetchStudent(studentId) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeStudentOverviewQuery(studentId)
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

    toggleRestoreStudent() {
        this.setState({
            restoreStudentIsShowing : !this.state.restoreStudentIsShowing,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            student : props.student,
        });

        if (!studentIsFetched(props.student)) {
            this.fetchStudent(props.student.id);
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

        const student = this.state.student;
        const fullName = `${student.first_name} ${student.middle_name} ${student.family_name}`;
        const isFetched = studentIsFetched(student);

        let pageBody;

        if (isFetched) {
            pageBody = (
                <div className="page-body">
                    <StudentDetails sidebar
                                    archived
                                    confirmRestore={this.confirmRestore}
                                    student={student}/>
                    <StudentContactDetails sidebar
                                           student={student}/>
                    <UniversityDetails sidebar
                                       student={student}/>
                </div>
            );
        } else {
            pageBody = <LoadingSpinner/>;
        }

        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">{fullName}</h5>
                    </div>
                </div>

                {pageBody}
            </div>
        );
    }
}

class InstitutionSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution : props.institution,
            error : null,
        };

        this.confirmRestore = this.confirmRestore.bind(this);
        this.fetchInstitution = this.fetchInstitution.bind(this);

        if (!institutionIsFetched(props.institution)) {
            this.fetchInstitution(props.institution.id);
        }
    }

    fetchInstitution(id) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeInstitutionOverviewQuery(id)
            .then(result => {
                //Copy results to existing institution object so we won't have to fetch next time
                Object.assign(this.state.institution, result.institution);
                this.setState({
                    institution : this.state.institution,
                });
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    confirmRestore() {
        if (!confirm(`Would you like to restore ${this.props.institution.name}?`)) {
            return;
        }

        const dismissToast = makeInfoToast({
            title : "Restoring",
            message : "Restoring institution...",
        });

        $.ajax({
            url : `${settings.serverURL}/archives/institutions/${this.props.institution.id}/restore/`,
            method : "PUT",
            beforeSend : authorizeXHR,
        }).done(() => {
            dismissToast();
            iziToast.success({
                title : "Success",
                message : "Successfully restored institution",
            });

            this.props.onRestoreSuccess();
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to restore memorandum",
            });
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            institution : props.institution,
        });

        if (!institutionIsFetched(props.institution)) {
            this.fetchInstitution(props.institution.id);
        }
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchInstitution(this.state.institution.id)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        const institution = this.state.institution;
        const isFetched = institutionIsFetched(institution);

        let pageBody;

        if (isFetched) {
            pageBody = (
                <div className="page-body">
                    <InstitutionDetails sidebar
                                        archived
                                        confirmRestore={this.confirmRestore}
                                        institution={institution}/>
                    <InstitutionContactDetails sidebar
                                               institution={institution}/>
                </div>
            );
        } else {
            pageBody = <LoadingSpinner/>;
        }

        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">{institution.name}</h5>
                    </div>
                </div>

                {pageBody}
            </div>
        );
    }
}

export {
    StudentSidebarPane,
    InstitutionSidebarPane,
};