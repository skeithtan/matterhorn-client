import React, { Component } from "react";
import YearList from "./year_list";
import ProgramList from "./program_list";
import ProgramListTabBar from "./program_list_tabs";
import StudyFieldList from "./study_field_list";
import StudentList from "./student_list";
import graphql from "../../graphql";

function fetchYears(onResponse) {
    graphql({
        query : `
        {
            academic_years {
                academic_year_start
            }
        }
       `,
        onResponse : onResponse,
    });
}

class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yearList : null,
            activeYear : null,
            activeTerm : null,
            activeProgram : null,
            activeStudyField : null,
        };

        this.refreshYears = this.refreshYears.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveTerm = this.setActiveTerm.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.setActiveStudyField = this.setActiveStudyField.bind(this);

        this.refreshYears();
    }

    refreshYears() {
        fetchYears(response => {
            this.setState({
                yearList : response.data.academic_years,
            });
        });
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

    setActiveStudyField(studyField) {
        this.setState({
            activeStudyField : studyField,
        });
    }

    render() {
        return (
            <div id="programs-page" className="container-fluid d-flex flex-row p-0 h-100 page-body">
                <YearList yearList={ this.state.yearList }
                          setActiveYear={ this.setActiveYear }/>
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