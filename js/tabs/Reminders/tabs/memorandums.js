import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import LoadingSpinner from "../../../components/loading";
import { Table } from "reactstrap";
import {
    Input,
} from "reactstrap";
import { MemorandumsSidebarPane } from "./sidebar_panes";
import ErrorState from "../../../components/error_state";


function makeMemorandumsQuery() {
    return graphql.query(`
    {
        institutions {
            id
            name
            latest_moa {
                id
                category
                memorandum_file
                college_initiator
                linkages
                date_effective
                date_expiration
            }
            latest_mou {
                id
                category
                memorandum_file
                college_initiator
                linkages
                date_effective
                date_expiration
            }
        }
    }
    `);
}

function makeMemorandumInfo(memorandumType, institution, memorandum) {
    return {
        institution : {
            name : institution.name,
            id : institution.id,
        },
        memorandum : {
            id : memorandum.id,
            category : memorandumType,
            memorandum_file : memorandum.memorandum_file,
            college_initiator : memorandum.college_initiator,
            linkages : memorandum.linkages,
            date_effective : moment(memorandum.date_effective),
            date_expiration : moment(memorandum.date_expiration),
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
        return a.memorandum.date_expiration.diff(b.memorandum.date_expiration);
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
            error : null,
        };


        this.getMemorandumsFromCategory = this.getMemorandumsFromCategory.bind(this);
        this.setActiveCategory = this.setActiveCategory.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);
        this.refreshMemorandums = this.refreshMemorandums.bind(this);
        this.fetchMemorandums = this.fetchMemorandums.bind(this);

        this.fetchMemorandums();
    }


    fetchMemorandums() {
        if (this.state.error !== null) {
            this.setState({
                error : null,
            });
        }

        makeMemorandumsQuery()
            .then(result => this.setState({
                institutions : result.institutions,
            }))
            .catch(error => {
                this.props.setSidebarContent(null);
                this.setState({
                    error : error,
                });
            });
    }

    setActiveCategory(category) {
        this.setState({
            activeCategory : category,
            activeMemorandum : null,
        });

        this.props.setSidebarContent(null);
    }

    getMemorandumsFromCategory(category) {
        const institutions = this.state.institutions;

        if (institutions === null) {
            return null;
        }

        let filteredMemorandums = [];

        const memorandums = makeMemorandumsFromInstitutions(institutions);

        memorandums.forEach(memorandum => {
            if (memorandum.memorandum.category === category) {
                filteredMemorandums.push(memorandum);
            }
        });
        return filteredMemorandums;
    }

    setActiveMemorandum(memorandum) {
        this.setState({
            activeMemorandum : memorandum,
        });

        this.props.setSidebarContent(<MemorandumsSidebarPane institution={memorandum.institution}
                                                             memorandum={memorandum.memorandum}
                                                             refresh={this.refreshMemorandums}/>);
    }

    refreshMemorandums() {
        this.props.setSidebarContent(null);

        makeMemorandumsQuery()
            .then(result => this.setState({
                activeMemorandum : null,
                institutions : result.institutions,
            }))
            .catch(onQueryError);

        this.getMemorandumsFromCategory(this.state.activeCategory);
    }

    render() {
        if (this.state.error) {
            return <ErrorState onRetryButtonClick={this.fetchMemorandums}>{this.state.error.toString()}</ErrorState>;
        }

        const memorandums = this.getMemorandumsFromCategory(this.state.activeCategory);

        return (
            <div className="d-flex flex-column h-100">
                <MemorandumsHead setMemorandums={this.getMemorandumsFromCategory}
                                 setActiveCategory={this.setActiveCategory}/>
                <MemorandumsTable activeCategory={this.state.activeCategory}
                                  memorandums={memorandums}
                                  activeMemorandum={this.state.activeMemorandum}
                                  setActiveMemorandum={this.setActiveMemorandum}/>
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
        this.props.setActiveCategory(event.target.value);
        this.props.getMemorandumsFromCategory(event.target.value);
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
                           onChange={this.onCategoryChange}>
                        <option value="Agreement">Agreement</option>
                        <option value="Understanding">Understanding</option>
                    </Input>
                </div>
            </div>
        );
    }
}

class MemorandumsTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There are no expiring Memorandums of {this.props.activeCategory}</h3>
            </div>
        );
    }

    render() {
        const memorandums = this.props.memorandums;

        if (memorandums === null) {
            return <LoadingSpinner/>;
        }

        if (memorandums.length === 0) {
            return this.emptyState();
        }

        const rows = memorandums.map((memorandum, index) => {
            let isActive = false;

            if (this.props.activeMemorandum !== null) {
                isActive = this.props.activeMemorandum.memorandum.id === memorandum.memorandum.id;
            }

            const onMemorandumRowClick = () => this.props.setActiveMemorandum(memorandum);

            return <MemorandumRow key={index}
                                  memorandum={memorandum}
                                  isActive={isActive}
                                  onClick={onMemorandumRowClick}/>;
        });

        return (
            <Table hover>
                <thead>
                <tr>
                    <th>Institution Name</th>
                    <th>Date Effective</th>
                    <th>Date of Expiration</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
}

class MemorandumRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const memorandum = this.props.memorandum;

        const expirationToNow = memorandum.memorandum.date_expiration.fromNow();

        const now = moment();

        const dateExpirationMoment = memorandum.memorandum.date_expiration;
        const monthsBeforeExpiration = dateExpirationMoment.diff(now, "months");
        const hasExpired = dateExpirationMoment.diff(now, "days") <= 0;

        const urgent = monthsBeforeExpiration <= 6;

        let expirationClass = "";

        if (this.props.isActive) {
            expirationClass += "text-white ";
        }

        if (urgent) {
            expirationClass += this.props.isActive ? "bg-danger" : "table-danger";
        } else {
            expirationClass += this.props.isActive ? "bg-dlsu-lighter" : "table-light";
        }

        return (
            <tr className={expirationClass}
                onClick={this.props.onClick}>
                <td>{memorandum.institution.name}</td>
                <td>{memorandum.memorandum.date_effective.format("LL")}</td>
                <td>{hasExpired ? "Expired" : "Expires"} {expirationToNow}</td>
            </tr>
        );
    }
}

export default Memorandums;