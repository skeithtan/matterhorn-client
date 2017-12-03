import React, { Component } from "react";
import YearList from "./year_list";
import ProgramList from "./outbound_program_list";
import StudentList from "./student_list";
import graphql from "../../graphql";
import {
    AcademicYearSidebarPane,
    ProgramsSidebarPane,
} from "./sidebar_panes";


function fetchYears(onResult) {
    graphql.query(`
    {
        academic_years {
            academic_year_start
        }
    }
    `).then(onResult);
}

function fetchPrograms(year, term, onResult) {
    graphql.query(`
    {
        outbound_programs(year:${year}, term:${term}) {
            id
            name
            institution {
               name
            }
        }
    }
    `).then(onResult);
}

function fetchStudents(id, onResult) {
    graphql.query(`
    {
        outbound_program(id:${id}) {
            outboundstudentprogram_set {
                student {
                    id_number
                    first_name
                    middle_name
                    family_name
                }
            }
        }
    }
    `).then(onResult);
}

class OutboundPrograms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yearList : null,
            programList : null,
            studentList : null,
            activeYear : null,
            activeTerm : 1,
            activeProgram : null,
            activeStudyField : null,
            sidebarContent : null,
        };

        this.refreshYears = this.refreshYears.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveTerm = this.setActiveTerm.bind(this);
        this.programsList = this.programsList.bind(this);
        this.studentList = this.studentList.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.setSidebarContent = this.setSidebarContent.bind(this);
        this.refreshYears();
    }

    setSidebarContent(sidebarContent) {
        this.setState({
            sidebarContent : sidebarContent,
        });
    }

    refreshYears() {
        fetchYears(result => {
            this.setState({
                yearList : result.academic_years,
            });
        });
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year.academic_year_start,
            activeProgram : null,
            studentList : null,
        });

        fetchPrograms(year.academic_year_start, this.state.activeTerm, result => {
            this.setState({
                programList : result.outbound_programs,
            });
        });

        this.setSidebarContent(<AcademicYearSidebarPane academicYear={ year }/>);
    }

    setActiveTerm(term) {
        this.setState({
            activeTerm : term,
            activeProgram : null,
        });

        fetchPrograms(this.state.activeYear, term, result => {
            this.setState({
                programList : result.outbound_programs,
            });
        });
    }

    setActiveProgram(program) {
        this.setState({
            activeProgram : program,
            studentList : null,
        });

        fetchStudents(program.id, result => {
            this.setState({
                studentList : result.outbound_program.outboundstudentprogram_set,
            });
        });

        this.setSidebarContent(<ProgramsSidebarPane program={ program }/>);
    }

    refreshStudents() {
        fetchStudents(this.state.activeProgram.id, result => {
            this.setState({
                studentList : result.outbound_program.outboundstudentprogram_set,
            });
        });
    }

    programsList() {
        if (this.state.activeYear === null) {
            return (
                <div className="programs-page-pane">
                    <div className="loading-container">
                        <h4>Select an academic year to see its programs</h4>
                    </div>
                </div>
            );
        }

        return (
            <ProgramList programList={ this.state.programList }
                         activeYear={ this.state.activeYear }
                         activeTerm={ this.state.activeTerm }
                         activeProgram={ this.state.activeProgram }
                         setActiveTerm={ this.setActiveTerm }
                         setActiveProgram={ this.setActiveProgram }/>
        );
    }

    studentList() {
        if (this.state.activeProgram === null) {
            return (
                <div className="programs-page-pane">
                    <div className="loading-container">
                        <h4>Select a program to see its students</h4>
                    </div>
                </div>
            );
        }

        return (
            <StudentList studentList={ this.state.studentList }
                         activeProgram={ this.state.activeProgram }
                         refreshStudents={ this.refreshStudents }/>
        );
    }

    render() {
        return (

            <div id="programs-page"
                 className="d-flex flex-row p-0 h-100">
                <YearList yearList={ this.state.yearList }
                          setActiveYear={ this.setActiveYear }
                          activeYear={ this.state.activeYear }/>

                { this.programsList() }
                { this.studentList() }

                <div className="programs-page-pane">
                    { this.state.sidebarContent }
                </div>

            </div>

        );
    }
}

export {
    OutboundPrograms as default,
    fetchYears,
};