import React, { Component } from "react";
import graphql from "../../graphql";
import YearList from "../OutboundPrograms/year_list";

function fetchYears(onResult) {
    graphql.query(`
    {
        academic_years {
            academic_year_start
        }
    }
    `).then(onResult);
}

function fetchPrograms(onResult) {

}

function fetchStudents(onResult) {

}

class InboundPrograms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yearList : null,
            programList : null,
            activeYear : null,
            activeTerm : 1,
            activeProgram : null,
            sidebarContent : null,
        };

        this.refreshYears = this.refreshYears.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.refreshYears();
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year.academic_year_start,
            activeProgram : null,
        });
    }

    refreshYears() {
        fetchYears(result => {
            this.setState({
                yearList : result.academic_years,
            });
        });
    }

    render() {
        return (
            <div id="programs-page"
                 className="d-flex flex-row p-0 h-100">
                <YearList yearList={ this.state.yearList }
                          setActiveYear={ this.setActiveYear }
                          activeYear={ this.state.activeYear }/>

                { /*{ this.programsList() }*/ }
                { /*{ this.studentList() }*/ }

                { /*<div className="programs-page-pane">*/ }
                { /*{ this.state.sidebarContent }*/ }
                { /*</div>*/ }
            </div>
        );
    }
}

export default InboundPrograms;