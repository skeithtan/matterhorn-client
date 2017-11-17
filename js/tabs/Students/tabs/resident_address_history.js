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
                student {
                    id
                    id_number
                    first_name
                    middle_name
                    family_name
                }
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
                residenceList : result.residencies,
            });
        });

        this.setActiveResidence = this.setActiveResidence.bind(this);
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
                residenceList : result.residencies,
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
            residenceList : null,
            activeResidenceId : null,
        });

        fetchHistory(this.state.studentId, result => {
            this.setState({
                residenceList : result.residencies,
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
                    <h4 className="page-head-title mb-0">{ student.first_name } { student.middle_name } { student.family_name }
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
    }

    render() {

    }
}

class HistorySection extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

class HistoryRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export default ResidentAddressHistory;