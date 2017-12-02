import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../components/loading";

import { Button, } from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
} from "../../../components/section";

// TODO: import modals for editing and adding
import { ResidenceSidebarPane } from "./sidebar_panes";
import { ResidenceAddressFormModal } from "../modals";
import ErrorState from "../../../components/error_state";


function makeResidencyQuery(studentId) {
    return graphql.query(`
    {
        student(id:${studentId}) {
            residencies {
                id
                date_effective
                contact_person_name
                contact_person_number
                address
                residence
            }
        }
	}
	`);
}

function studentIsFetched(student) {
    return student.residencies !== undefined;
}

class ResidentAddressHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : props.student,
            activeResidence : null,
            addResidenceIsShowing : false,
            editResidenceIsShowing : false,
            error : null,
        };

        this.fetchHistory = this.fetchHistory.bind(this);
        this.setActiveResidence = this.setActiveResidence.bind(this);
        this.toggleAddResidence = this.toggleAddResidence.bind(this);
        this.toggleEditResidence = this.toggleEditResidence.bind(this);

        this.fetchHistory(props.student.id);
    }

    fetchHistory(studentId) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeResidencyQuery(studentId)
            .then(result => {
                this.state.student.residencies = result.student.residencies;
                this.setState({
                    student : this.state.student,
                });
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    toggleAddResidence() {
        this.setState({
            addResidenceIsShowing : !this.state.addResidenceIsShowing,
        });
    }

    toggleEditResidence() {
        this.setState({
            editResidenceIsShowing : !this.state.editResidenceIsShowing,
        });
    }

    setActiveResidence(residence) {
        if (residence === null) {
            this.props.setSidebarContent(null);
        }

        this.props.setSidebarContent(
            <ResidenceSidebarPane toggleEditResidence={this.toggleEditResidence}
                                  residence={residence}
            />,
        );

        this.setState({
            activeResidence : residence,
        });

    }

    componentWillReceiveProps(props) {
        if (this.state.student !== null &&
            this.state.student.id === props.student.id) {
            return;
        }

        // If new student, clear sidebar
        this.props.setSidebarContent(null);

        this.setState({
            student : props.student,
            activeResidence : null,
        });

        if (!studentIsFetched(props.student)) {
            this.fetchHistory(props.student.id);
        }
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchHistory(this.state.student.id)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (!studentIsFetched(this.state.student)) {
            return <LoadingSpinner/>;
        }

        return (
            <div className="d-flex flex-column p-0 h-100">
                <HistoryHead student={this.state.student}
                             toggleAddResidence={this.toggleAddResidence}/>

                <HistoryBody residences={this.state.student.residencies}
                             activeResidence={this.state.activeResidence}
                             setActiveResidence={this.setActiveResidence}/>

                {
                    //Keep the key because otherwise the ResidenceAddressFormModal
                    // won't change when there's a new activeResidence
                }
                <ResidenceAddressFormModal edit
                                           key={this.state.activeResidence === null ? 0 : this.state.activeResidence.id}
                                           isOpen={this.state.editResidenceIsShowing}
                                           student={this.state.student}
                                           residence={this.state.activeResidence}
                                           refreshResidences={this.refreshResidences}
                                           toggle={this.toggleEditResidence}/>

                <ResidenceAddressFormModal isOpen={this.state.addResidenceIsShowing}
                                           student={this.state.student}
                                           refreshResidences={this.refreshResidences}
                                           toggle={this.toggleAddResidence}/>
            </div>
        );
    }
}

class HistoryHead extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const student = this.props.student;

        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Resident Address History</h5>
                    <h4 className="page-head-title mb-0">
                        {student.first_name} {student.middle_name} {student.family_name}
                        <small className="text-muted ml-2">{this.props.student.id_number}</small>
                    </h4>
                </div>

                <div className="page-head-actions">
                    <Button outline
                            size="sm"
                            color="success"
                            onClick={this.props.toggleAddResidence}>
                        Add a Residence
                    </Button>
                </div>
            </div>
        );
    }
}

class HistoryBody extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There are no residences for this student</h3>
            </div>
        );
    }

    render() {
        if (this.props.residences === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.residences.length === 0) {
            return this.emptyState();
        }

        const sections = this.props.residences.map((residence, index) => {
            const onResidenceRowClick = () => this.props.setActiveResidence(residence);

            let isActive = false;

            if (this.props.activeResidence !== null) {
                isActive = this.props.activeResidence.id === residence.id;
            }

            return <ResidenceRow key={index}
                                 residence={residence}
                                 isActive={isActive}
                                 onClick={onResidenceRowClick}
                                 latest={index === 0}/>;
        });

        return (
            <div className="page-body w-100">
                <div className="d-flex h-100 p-0 flex-row">
                    <div className="w-100">
                        <SectionTable>
                            {sections}
                        </SectionTable>
                    </div>
                </div>
            </div>
        );
    }
}

class ResidenceRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const residence = this.props.residence;

        function formatDate(date) {
            return moment(date).format("LL");
        }

        const dateEffective = formatDate(residence.date_effective);

        return (
            <Section>
                <SectionTitle>{dateEffective}</SectionTitle>
                <SectionRow selectable
                            onClick={this.props.onClick}
                            active={this.props.isActive}>
                    {this.props.latest &&
                    <SectionRowTitle>Latest Residence</SectionRowTitle>
                    }
                    <SectionRowContent large>{residence.address}</SectionRowContent>
                </SectionRow>
            </Section>
        );
    }
}

export default ResidentAddressHistory;