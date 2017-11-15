import React, { Component } from "react";
import YearList from "./year_list";
import ProgramList from "./program_list";
import StudentList from "./student_list";
import terms from "./terms_list";
import graphql from "../../graphql";
import { AcademicYearSidebarPane } from "./sidebar_panes";


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
        programs(year:${year}, term:${term}) {
            id
            name
            memorandum {
                institution {
                    name
                }
            }
            terms {
                number
            }
        }
    }
    `).then(onResult);
}

function fetchStudents(id, onResult) {
    graphql.query(`
    {
        program(id:${id}) {
            id
            studyfield_set {
                id
                name
                studentprogram_set {
                    study_field {
                        name
                    }
                    student {
                        id
                        id_number
                        first_name
                        middle_name
                        family_name
                    }
                }
            }
        }
    }
    `).then(onResult);
}

class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yearList : null,
            programList : null,
            studyFieldList : null,
            activeYear : null,
            activeTerm : 1,
            activeProgram : null,
            activeStudyField : null,
            sidebarContent : null,
        };

        this.refreshYears = this.refreshYears.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveTerm = this.setActiveTerm.bind(this);
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
            studyFieldList : null,
        });

        fetchPrograms(year.academic_year_start, this.state.activeTerm, result => {
            this.setState({
                programList : result.programs,
            });
        });

        this.setSidebarContent(<AcademicYearSidebarPane academicYear={year}/>);
    }

    setActiveTerm(term) {
        this.setState({
            activeTerm : term,
            activeProgram : null,
        });

        fetchPrograms(this.state.activeYear, term, result => {
            this.setState({
                programList : result.programs,
            });
        });
    }

    setActiveProgram(program) {
        this.setState({
            activeProgram : program,
            studyFieldList : null,
        });

        fetchStudents(program.id, result => {
            this.setState({
                studyFieldList : result.program.studyfield_set,
            });
        });
    }

    refreshStudents() {
        fetchStudents(this.state.activeProgram.id, result => {
            this.setState({
                studyFieldList : result.program.studyfield_set,
            });
        });
    }

    render() {
        let sidebarClass = "sidebar-right ";
        if (this.state.sidebarContent === null) {
            sidebarClass += "dismissed";
        }

        return (
            <div className="d-flex flex-row h-100">
                <div id="programs-page"
                     className="container-fluid d-flex flex-row p-0 h-100 page-body">
                    <YearList yearList={this.state.yearList}
                              setActiveYear={this.setActiveYear}
                              activeYear={this.state.activeYear}/>
                    {this.state.activeYear !== null &&
                    <ProgramList programList={this.state.programList}
                                 activeYear={this.state.activeYear}
                                 activeTerm={this.state.activeTerm}
                                 activeProgram={this.state.activeProgram}
                                 setActiveTerm={this.setActiveTerm}
                                 setActiveProgram={this.setActiveProgram}/>
                    }
                    {this.state.activeProgram !== null &&
                    <StudentList studyFieldList={this.state.studyFieldList}
                                 activeProgram={this.state.activeProgram}
                                 refreshStudents={this.refreshStudents}/>
                    }

                </div>
                <div className={sidebarClass}>
                    {this.state.sidebarContent}
                </div>
            </div>
        );
    }
}

export default Programs;