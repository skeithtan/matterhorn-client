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

function fetchInstitutions(onResult) {
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
            latest_mou {
                id
                date_effective
                date_expiration
            }
        }
    }
    `).then(onResult);
}

function makeMemorandumInfo(memorandumType, institution, memorandum) {
    return {
        institution : {
            name : institution.name,
            id : institution.id,
        },
        memorandum : {
            id : memorandum.id,
            type : memorandumType,
            dateEffective : moment(memorandum.date_effective),
            dateExpiration : moment(memorandum.date_expiration),
        },
    };
}

function makeMemorandumsFromInstitutions(institutions) {
    let memorandums = [];


    institutions.forEach(institution => {
        if (institution.latest_mou !== null && institution.latest_mou.date_expiration !== null) {
            memorandums.push(makeMemorandumInfo("Understanding", institution, institution.latest_mou));
        }

        if (institution.latest_moa !== null && institution.latest_moa.date_expiration !== null) {
            memorandums.push(makeMemorandumInfo("Agreement", institution, institution.latest_moa));
        }
    });

    memorandums.sort((a, b) => {
        return a.memorandum.dateExpiration.diff(b.memorandum.dateExpiration);
    });

    return memorandums;
}

class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategory : "Agreement",
            institutions : null,
            activeMemorandum : null,
        };

        fetchInstitutions(result => {
            this.setState({
                institutions : result.institutions,
            });
        });

        this.setMemorandums = this.setMemorandums.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);
    }

    setMemorandums(category) {
        let filteredMemorandums = [];

        const institutions = this.state.institutions;

        if (institutions !== null) {
            const memorandums = makeMemorandumsFromInstitutions(institutions);

            memorandums.forEach(memorandum => {
                if (memorandum.memorandum.type === category) {
                    filteredMemorandums.push(memorandum);
                }
            });
        }

        return filteredMemorandums;
    }

    setActiveMemorandum(memorandum) {
        // TODO
    }

    render() {
        const memorandums = this.setMemorandums(this.state.activeCategory);

        return (
            <div className="d-flex flex-column h-100">
                <MemorandumsHead setMemorandums={ this.setMemorandums }/>
                <MemorandumsBody activeCategory={ this.state.activeCategory }
                                 memorandums={ memorandums }/>
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
                        <option value="Agreement">Agreement</option>
                        <option value="Understanding">Understanding</option>
                    </Input>
                </div>
            </div>
        );
    }
}

class MemorandumsBody extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There are no expiring Memorandums of { this.props.activeCategory }</h3>
            </div>
        );
    }

    render() {
        const memorandums = this.props.memorandums;

        return (
            <div>
                
            </div>
        );
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