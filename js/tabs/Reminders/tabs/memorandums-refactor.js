import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import LoadingSpinner from "../../../components/loading";
import { Table } from "reactstrap";
import {
    Input,
} from "reactstrap";
import { MemorandumsSidebarPane } from "./sidebar_panes";

function fetchInstitutions(onResult) {
    graphql.query(`
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
            file : memorandum.memorandum_file,
            collegeInitiator : memorandum.college_initiator,
            linkages : memorandum.linkages,
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
        this.setActiveCategory = this.setActiveCategory.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);
        this.refreshMemorandums = this.refreshMemorandums.bind(this);
    }

    setActiveCategory(category) {
        this.setState({
            activeCategory : category,
            activeMemorandum : null,
        });

        this.props.setSidebarContent(null);
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
        console.log(memorandum.memorandum);
        this.setState({
            activeMemorandum : memorandum,
        });

        this.props.setSidebarContent(<MemorandumsSidebarPane memorandum={ memorandum.memorandum }
                                                             refresh={ this.refreshMemorandums }/>);
    }

    refreshMemorandums() {
        fetchInstitutions(result => {
            this.setState({
                institutions : result.institutions,
            });
        });

        this.setMemorandums(this.state.activeCategory);
    }

    render() {
        const memorandums = this.setMemorandums(this.state.activeCategory);

        return (
            <div className="d-flex flex-column h-100">
                <MemorandumsHead setMemorandums={ this.setMemorandums }
                                 setActiveCategory={ this.setActiveCategory }/>
                <MemorandumsTable activeCategory={ this.state.activeCategory }
                                  memorandums={ memorandums }
                                  activeMemorandum={ this.state.activeMemorandum }
                                  setActiveMemorandum={ this.setActiveMemorandum }/>
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

class MemorandumsTable extends Component {
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

            return <MemorandumRow key={ index }
                                  memorandum={ memorandum }
                                  isActive={ isActive }
                                  onClick={ onMemorandumRowClick }/>;
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
                { rows }
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

        const expirationToNow = memorandum.memorandum.dateExpiration.fromNow();

        const now = moment();

        const dateExpirationMoment = memorandum.memorandum.dateExpiration;
        const monthsBeforeExpiration = dateExpirationMoment.diff(now, "months");
        const hasExpired = dateExpirationMoment.diff(now, "days") <= 0;

        const urgent = monthsBeforeExpiration <= 6;

        let expirationClass = "";
        if (urgent && !this.props.isActive) {
            expirationClass += "table-danger";
        } else if (!urgent && !this.props.isActive) {
            expirationClass += "table-success";
        } else if (urgent && this.props.isActive) {
            expirationClass += "text-white bg-danger";
        } else {
            expirationClass += "text-white bg-success";
        }

        return (
            <tr className={ expirationClass }
                onClick={ this.props.onClick }>
                <td>{ memorandum.institution.name }</td>
                <td>{ memorandum.memorandum.dateEffective.format("LL") }</td>
                <td>{ hasExpired ? "Expired" : "Expires" } { expirationToNow }</td>
            </tr>
        );
    }
}

export default Memorandums;