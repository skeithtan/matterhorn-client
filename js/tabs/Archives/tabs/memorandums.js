import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import {
    Input,
    Table,
} from "reactstrap";
import LoadingSpinner from "../../../components/loading";


function fetchMemorandums(year, onResult) {
    graphql.query(`
    {
        memorandums(archived:true, year_archived:${year}) {
		id
		category
		archived_at
		archiver
		date_effective
            institution {
                name
            }
		}
	}
	`).then(onResult);
}

class MemorandumArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
            memorandums : null,
        };

        this.setCurrentYear = this.setCurrentYear.bind(this);

        fetchMemorandums(this.state.activeYear, result => {
            this.setState({
                memorandums : result.memorandums,
            });
        });
    }

    setCurrentYear(year) {
        this.setState({
            activeYear : year,
            memorandums : null, //Loading
        });

        fetchMemorandums(year, result => {
            this.setState({
                memorandums : result.memorandums,
            });
        });
    }

    render() {
        return (
            <div className="d-flex flex-column h-100">
                <MemorandumArchivesHead setCurrentYear={this.setCurrentYear}
                                        activeYear={this.state.activeYear}/>
                <MemorandumArchivesTable memorandums={this.state.memorandums}/>
            </div>
        );
    }
}

class MemorandumArchivesHead extends Component {
    constructor(props) {
        super(props);
        this.onCurrentYearChange = this.onCurrentYearChange.bind(this);
    }

    onCurrentYearChange(event) {
        this.props.setCurrentYear(event.target.value);
    }

    render() {
        const years = [];
        const currentYear = moment().year();

        //Create options for years 100 years from current year
        for (let i = 0; i <= 100; i++) {
            const year = currentYear - i;
            years.push(<option value={year}
                               key={i}>{year}</option>);
        }


        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        Memorandum Archives
                    </h4>
                </div>

                <div className="page-head-actions">
                    <div className="d-flex flex-row align-items-center">
                        <b className="mr-3">Year</b>
                        <Input type="select"
                               className="btn-outline-success"
                               defaultValue={this.props.activeYear}
                               onChange={this.onCurrentYearChange}>
                            {years}
                        </Input>
                    </div>
                </div>

            </div>
        );
    }
}

class MemorandumArchivesTable extends Component {
    constructor(props) {
        super(props);
    }

    static emptyState() {
        return (
            <div className="loading-container">
                <h3>There's nothing here</h3>
            </div>
        );
    }

    render() {
        if (this.props.memorandums === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.memorandums.length === 0) {
            return MemorandumArchivesTable.emptyState();
        }

        const rows = this.props.memorandums.map((memorandum, index) => {
            return <MemorandumArchivesRow memorandum={memorandum} key={index}/>;
        });


        return (
            <Table striped>
                <thead>
                <tr>
                    <th>Institution Name</th>
                    <th>Memorandum Type</th>
                    <th>Date Effective</th>
                    <th>Archive Date</th>
                    <th>Archived By</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
}

class MemorandumArchivesRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const memorandumType = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
        const dateEffective = moment(this.props.memorandum.date_effective).format("LL");
        const archiveDate = moment(this.props.memorandum.archived_at).format("LLL");

        return (
            <tr>
                <td>{this.props.memorandum.institution.name}</td>
                <td>{memorandumType}</td>
                <td>{dateEffective}</td>
                <td>{archiveDate}</td>
                <td>{this.props.memorandum.archiver}</td>
            </tr>
        );
    }
}

export default MemorandumArchives;