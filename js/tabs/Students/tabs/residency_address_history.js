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

function fetchResidencyAddressHistory(onResult) {
    graphql.query(`
    {
        
	}
	`).then(onResult);
}

class ResidentAddressHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student : null,
            studentId : props.student.id,
            activeResidenceId : null,
        };

        // TODO: fetch the resident address through student

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
        this.setState({
            student : null,
        });

        // TODO: fetch residence
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.studentId === nextProps.student.id) {
            return;
        }

        // TODO: set sidebar content to null

        this.setState({
            studentId : nextProps.student.id,
            student : null,
            activeResidenceId : null,
        });

        // TODO: fetch residences
    }

    render() {
        if (this.state.student === null) {
            return <LoadingSpinner/>;
        }

        const residences = {
            residences : this.state.student.residences,
            latestResidence : this.state.student.latest_residence,
        };

        return (
            <div className="d-flex flex-column p-0 h-100">

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
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Resident Address History</h5>
                    <h4 className="page-head-title mb-0">[Student Name]</h4>
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