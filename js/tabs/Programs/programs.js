import React, { Component } from "react";
import YearList from "./year_list";
import ProgramList from "./program_list";
import ProgramListTabBar from "./program_list_tabs";
import StudyFieldList from "./study_field_list";
import StudentList from "./student_list";

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
                <div className="d-flex flex-column p-0 h-100">
                    <ProgramList/>
                    <ProgramListTabBar/>
                </div>
                <StudyFieldList/>
                <StudentList/>
            </div>
        );
    }
}

export default Programs;