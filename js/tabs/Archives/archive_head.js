import React, { Component } from "react";
import moment from "moment";
import { Input } from "reactstrap";


class ArchivesHead extends Component {
    constructor(props) {
        super(props);
        this.onActiveYearChange = this.onActiveYearChange.bind(this);
    }

    onActiveYearChange(event) {
        this.props.setActiveYear(event.target.value);
    }

    render() {
        const years = [];
        const currentYear = moment().year();

        //Create options for years 40 years from current year
        for (let i = 0; i <= 40; i++) {
            const year = currentYear - i;
            years.push(<option value={year}
                               key={i}>{year}</option>);
        }


        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        {this.props.children}
                    </h4>
                </div>

                <div className="page-head-actions">
                    <div className="d-flex flex-column">
                        <label className="mr-3 text-dark mb-1">Archives from year</label>
                        <Input type="select"
                               className="btn-outline-success"
                               defaultValue={this.props.activeYear}
                               onChange={this.onActiveYearChange}>
                            {years}
                        </Input>
                    </div>
                </div>

            </div>
        );
    }
}

export default ArchivesHead;