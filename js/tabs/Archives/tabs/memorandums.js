import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";


function fetchMemorandums(year, onResult) {
    graphql.query(`
    {
        memorandums(archived:true, year:${year}) {
		id
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
            currentYear : moment().year(),
        };

        this.setCurrentYear = this.setCurrentYear.bind(this);
    }

    setCurrentYear(year) {
        this.setState({
            currentYear : year,
        });
    }

    render() {
        return (
            <MemorandumArchivesHead/>
        );
    }
}

class MemorandumArchivesHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        Memorandum Archives
                    </h4>
                </div>

                <div className="page-head-actions">


                </div>

            </div>
        );
    }
}

export default MemorandumArchives;