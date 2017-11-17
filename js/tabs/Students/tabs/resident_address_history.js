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
// TODO: import sidebarpane for residency details

function fetchHistory(id, onResult) {
    graphql.query(`
    {
        student(id:${id}) {
            id
            id_number
            first_name
            middle_name
            family_name
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
	`).then(onResult);
}

class ResidentAddressHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : props.student,
            studentId : props.student.id,
            residenceList : null,
            activeResidenceId : null,
        };

        fetchHistory(this.state.studentId, result => {
            this.setState({
                residenceList : result.student.residencies,
            });
        });

        this.setActiveResidence = this.setActiveResidence.bind(this);
        this.refreshResidences = this.refreshResidences.bind(this);
    }

    setActiveResidence(residence) {
        // TODO: set sidebar content to null if residence is null

        // TODO: set sidebar content with props

        this.setState({
            activeResidenceId : residence.id,
        });
    }

    refreshResidences() {
        fetchHistory(this.state.studentId, result => {
            this.setState({
                residenceList : result.student.residencies,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.studentId === nextProps.student.id) {
            return;
        }

        // TODO: set sidebar content to null

        this.setState({
            studentId : nextProps.student.id,
            student : nextProps.student,
            activeResidenceId : null,
        });

        fetchHistory(this.state.studentId, result => {
            this.setState({
                residenceList : result.student.residencies,
            });
        });
    }

    render() {
        if (this.state.student === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div className="d-flex flex-column p-0 h-100">
                <HistoryHead student={ this.state.student }/>
                <HistoryBody residences={ this.state.residenceList }
                             activeResidenceId={ this.state.activeResidenceId }
                             setActiveResidence={ this.setActiveResidence }/>
            </div>
        );
    }
}

class HistoryHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addResidenceIsShowing : false,
        };

        this.toggleAddResidence = this.toggleAddResidence.bind(this);
    }

    toggleAddResidence() {
        this.setState({
            addResidenceIsShowing : !this.state.addResidenceIsShowing,
        });
    }

    render() {
        const student = this.props.student;

        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Resident Address History</h5>
                    <h4 className="page-head-title mb-0">
                        { student.first_name } { student.middle_name } { student.family_name }
                        <small className="text-muted ml-2">{ this.props.student.id_number }</small>
                    </h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success" onClick={ this.toggleAddResidence }>Add a
                        Residence</Button>
                </div>

                { /* Residence Form Modal */ }
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

        const rows = this.props.residences.map((residence, index) => {
            const onResidenceRowClick = () => this.props.setActiveResidence(residence);

            let isActive = false;

            if (this.props.activeResidenceId !== null) {
                isActive = this.props.activeResidenceId === residence.id;
            }

            return <ResidenceRow key={ index }
                                 residence={ residence }
                                 isActive={ isActive }
                                 onClick={ onResidenceRowClick }
                                 latest={ index === 0 }/>;
        });

        return (
            <div className="page-body w-100">
                <div className="d-flex h-100 p-0 flex-row">
                    <div className="w-100">
                        <SectionTitle>Residences</SectionTitle>
                        <SectionTable>
                            { rows }
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
            <SectionRow selectable
                        onClick={ this.props.onClick }
                        active={ this.props.isActive }>
                { this.props.latest &&
                <SectionRowTitle>Latest Residence</SectionRowTitle>
                }
                <SectionRowContent large>Effective { dateEffective }</SectionRowContent>
            </SectionRow>
        );
    }
}

export default ResidentAddressHistory;