import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import settings from "../../../settings";
import LoadingSpinner from "../../../components/loading";
import {
    SectionRow,
    SectionRowContent,
} from "../../../components/section";
import {
    Input,
} from "reactstrap";
import { MemorandumFormModal } from "../../Institutions/modals";

function fetchInstitutionAgreements(onResult) {
    graphql.query(`
    {
        institutions {
            id
            name
            latest_moa {
                id
                date_effective
                date_expiration
            }
        }
    }
    `).then(onResult);
}

function fetchInstitutionUnderstandings(onResult) {
    graphql.query(`
    {
        institutions {
            id
            name
            latest_mou {
                id
                date_effective
                date_expiration
            }
        }
    }
    `).then(onResult);
}

class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memorandums : null,
            activeMemorandum : null,
        };

        fetchInstitutionAgreements(result => {
            this.setState({
                memorandums : result.institutions,
            });
        });

        this.setMemorandums = this.setMemorandums.bind(this);
    }

    setMemorandums(category) {
        this.setState({
            memorandums : null, // loading
        });

        if (category === "MOA") {
            fetchInstitutionAgreements(result => {
                this.setState({
                    memorandums : result.institutions,
                });
            });
        }

        else {
            fetchInstitutionUnderstandings(result => {
                this.setState({
                    memorandums : result.institutions,
                });
            });
        }
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <MemorandumsHead setMemorandums={ this.setMemorandums }/>
                { /* MemorandumsBody */ }
            </div>
        );
    }
}

class MemorandumsHead extends Component {
    constructor(props) {
        super(props);

        this.onCategoryChange = this.onCategoryChange.bind(this);
    }

    onCategoryChange(event) {
        this.props.setMemorandums(event.target.value);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        Memorandum Reminders
                    </h4>
                </div>
                <div className="page-head-actions">
                    <Input type="select"
                           className="btn-outline-success"
                           defaultValue="MOA"
                           onChange={ this.onCategoryChange }>
                        <option value="MOA">Agreement</option>
                        <option value="MOU">Understanding</option>
                    </Input>
                </div>
            </div>
        );
    }
}

class MemorandumsBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

class MemorandumRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export default Memorandums;