import React, { Component } from "react";
import graphql from "../../../graphql";
import ErrorState from "../../../components/error_state";
import LoadingSpinner from "../../../components/loading";
import {
    SectionRow,
    SectionTable,
} from "../../../components/section";
import { Button } from "reactstrap";
import settings from "../../../settings";
import authorizeXHR from "../../../authorization";
import {
    AcceptApplicantModal,
    DeployApplicantModal,
} from "./modals";


function makeRequirementsQuery(isInbound) {
    return graphql.query(`
    {
        ${isInbound ? "inbound_requirements" : "outbound_requirements"} {
            id
            name
        }
    }
    `);
}

function makeInboundApplicationQuery(id) {
    return graphql.query(`
    {
      student(id:${id}) {
                inboundstudentprogram {
                    id
                    is_requirements_complete
                    application_requirements {
                        id
                    }
                }
        }
    }
    `);
}

function makeOutboundApplicationQuery(id) {
    return graphql.query(`
    {
      student(id:${id}) {
                outboundstudentprogram {
                    id
                    is_requirements_complete
                    application_requirements {
                        id
                    }
                }
        }
    }
    `);
}

class ApplicationRequirements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applicantRequirements : null,
            requirements : null,
            isRequirementsComplete : false,
            studentProgramId : null,
            errors : null,
            deployApplicantIsShowing : false,
            acceptApplicantIsShowing : false,
        };

        this.fetchRequirements = this.fetchRequirements.bind(this);
        this.refreshRequirements = this.refreshRequirements.bind(this);
        this.toggleDeployApplicant = this.toggleDeployApplicant.bind(this);
        this.toggleAcceptApplicant = this.toggleAcceptApplicant.bind(this);

        this.fetchRequirements(props.inbound, props.student.id);
    }

    fetchRequirements(inbound, studentId) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeRequirementsQuery(inbound)
            .then(result => this.setState({
                requirements : inbound ? result.inbound_requirements : result.outbound_requirements,
            }))
            .catch(error => this.setState({
                error : error,
            }));

        if (inbound) {
            makeInboundApplicationQuery(studentId)
                .then(result => this.setState({
                    applicantRequirements : result.student.inboundstudentprogram.application_requirements.map(requirement => requirement.id),
                    isRequirementsComplete : result.student.inboundstudentprogram.is_requirements_complete,
                    studentProgramId : result.student.inboundstudentprogram.id,
                }))
                .catch(error => this.setState({
                    error : error,
                }));
        } else {
            makeOutboundApplicationQuery(studentId)
                .then(result => this.setState({
                    applicantRequirements : result.student.outboundstudentprogram.application_requirements.map(requirement => requirement.id),
                    isRequirementsComplete : result.student.outboundstudentprogram.is_requirements_complete,
                    studentProgramId : result.student.outboundstudentprogram.id,
                }))
                .catch(error => this.setState({
                    error : error,
                }));
        }
    }

    refreshRequirements() {
        // console.log(this.props);
        // this.fetchRequirements(this.props.inbound, this.props.student.id);
        //
        this.setState({
            requirements : null,
            applicantRequirements : null,
        });
    }

    toggleDeployApplicant() {
        this.setState({
            deployApplicantIsShowing : !this.state.deployApplicantIsShowing,
        });
    }

    toggleAcceptApplicant() {
        this.setState({
            acceptApplicantIsShowing : !this.state.acceptApplicantIsShowing,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            applicantRequirements : null,
        });

        this.fetchRequirements(props.inbound, props.student.id);
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchRequirements(this.props.inbound, this.props.student.id)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (this.state.applicantRequirements === null || this.state.requirements === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div className="d-flex flex-column p-0 h-100">
                <ApplicationHead student={this.props.student}
                                 inbound={this.props.inbound}
                                 toggleModal={this.props.inbound ? this.toggleAcceptApplicant : this.toggleDeployApplicant}
                                 isRequirementsComplete={this.state.isRequirementsComplete}/>
                <RequirementsBody requirements={this.state.requirements}
                                  student={this.props.student}
                                  inbound={this.props.inbound}
                                  refreshRequirements={() => this.fetchRequirements(this.props.inbound, this.props.student.id)}
                                  studentProgramId={this.state.studentProgramId}
                                  applicantRequirements={this.state.applicantRequirements}/>

                {!this.props.inbound && this.state.isRequirementsComplete &&
                <DeployApplicantModal isOpen={this.state.deployApplicantIsShowing}
                                      student={this.props.student}
                                      refreshStudents={this.props.refreshStudents}
                                      toggle={this.toggleDeployApplicant}/>
                }

                {this.props.inbound && this.state.isRequirementsComplete &&
                <AcceptApplicantModal isOpen={this.state.acceptApplicantIsShowing}
                                      student={this.props.student}
                                      refreshStudents={this.props.refreshStudents}
                                      toggle={this.toggleAcceptApplicant}/>
                }

            </div>
        );
    }
}

class ApplicationHead extends Component {
    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Application Requirements</h5>
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        {this.props.student.first_name} {this.props.student.middle_name} {this.props.student.family_name}
                        <small className="text-muted ml-2">{this.props.student.id_number}</small>
                    </h4>
                </div>

                {this.props.isRequirementsComplete &&
                <Button outline
                        size="sm"
                        className="mr-2"
                        onClick={this.props.toggleModal}
                        color="success">
                    {this.props.inbound ? "Accept " : "Deploy "} Student
                </Button>
                }

                <Button outline
                        size="sm"
                        color="danger">Cancel Application</Button>

            </div>
        );
    }
}

class RequirementsBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.requirements.map(requirement =>
            <RequirementRow key={requirement.id}
                            applicantRequirements={this.props.applicantRequirements}
                            student={this.props.student}
                            inbound={this.props.inbound}
                            refreshRequirements={this.props.refreshRequirements}
                            studentProgramId={this.props.studentProgramId}
                            done={this.props.applicantRequirements.includes(requirement.id)}
                            requirement={requirement}/>,
        );

        return (
            <SectionTable>
                {rows}
            </SectionTable>
        );
    }
}

class RequirementRow extends Component {
    constructor(props) {
        super(props);

        this.markAsDone = this.markAsDone.bind(this);
        this.markAsUndone = this.markAsUndone.bind(this);
    }


    markAsDone() {
        const requirements = this.props.applicantRequirements.concat([this.props.requirement.id]);

        $.ajax({
             method : "PUT",
             url : `${settings.serverURL}/programs/${this.props.inbound ? "inbound" : "outbound"}/students/${this.props.studentProgramId}/`,
             beforeSend : authorizeXHR,
             data : JSON.stringify({
                 application_requirements : requirements,
             }),
             contentType : "application/json",
         })
         .done(() => {
             this.props.refreshRequirements();
         });
    }

    markAsUndone() {
        $.ajax({
             method : "PUT",
             url : `${settings.serverURL}/programs/${this.props.inbound ? "inbound" : "outbound"}/students/${this.props.studentProgramId}/`,
             beforeSend : authorizeXHR,
             data : JSON.stringify({
                 application_requirements : this.props.applicantRequirements.filter(requirement => requirement !== this.props.requirement.id),
             }),
             contentType : "application/json",
         })
         .done(() => {
             this.props.refreshRequirements();
         });
    }


    render() {
        return (
            <SectionRow large
                        className="d-flex flex-row align-items-center">

                {this.props.done &&
                <b className="text-success mr-3">✓</b>
                }

                <p className="lead mr-auto mb-0">{this.props.requirement.name}</p>

                {this.props.done &&
                <Button outline
                        size="sm"
                        onClick={this.markAsUndone}
                        color="warning">Mark as undone</Button>
                }

                {!this.props.done &&
                <Button outline
                        size="sm"
                        onClick={this.markAsDone}
                        color="success">Mark as done</Button>
                }
            </SectionRow>
        );
    }
}

export default ApplicationRequirements;