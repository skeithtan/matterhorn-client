import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import {
    FormGroup,
    Input,
    Label,
    Table,
} from "reactstrap";


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
	}`).then(onResult);
}

class MemorandumArchives extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : moment().year(),
        };

        this.setCurrentYear = this.setCurrentYear.bind(this);
    }

    setCurrentYear(year) {
        this.setState({
            activeYear : year,
        });
    }

    render() {
        return (
            <div>
                <MemorandumArchivesHead setCurrentYear={this.setCurrentYear}
                                        activeYear={this.state.activeYear}/>
                <MemorandumArchivesTable/>
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

    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <th>Institution Name</th>
                    <th>Memorandum Type</th>
                    <th>Date Effective</th>
                    <th>Archive Date</th>
                    <th>Archived By</th>
                </tr>
                </thead>
            </Table>
        );
    }
}

export default MemorandumArchives;