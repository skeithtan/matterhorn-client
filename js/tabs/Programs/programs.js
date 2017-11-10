import React, { Component } from "react";
import YearList from "./year_list";
import ProgramBody from "./program_body";

class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeYear : null,
            activeTerm : null,
            activeProgram : null,
        };

        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveTerm = this.setActiveTerm.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
        });
    }

    setActiveTerm(term) {
        this.setState({
            activeTerm : term,
        });
    }

    setActiveProgram(program) {
        this.setState({
            activeProgram : program,
        });
    }

    render() {
        return (
            <div id="programs-page" className="container-fluid d-flex flex-row p-0 h-100 page-body">
                <YearList/>
                <ProgramBody/>
            </div>
        );
    }
}

export default Programs;