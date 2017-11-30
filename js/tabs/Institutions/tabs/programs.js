import React, { Component } from "react";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../components/loading";
import {
    Button,
    Input,
} from "reactstrap";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionTable,
    SectionTitle,
} from "../../../components/section";
import { ProgramSidebarPane } from "./sidebar_panes";


function fetchYears(onResult) {
    graphql.query(`
    {
        academic_years {
            academic_year_start
        }
    }
    `).then(onResult);
}

function fetchPrograms(institutionID, year, onResult) {
    graphql.query(`
    {
        outbound_programs(institution:${institutionID}, year:${year}) {
            id
            name
            linkage {
                name
            }
            academic_year {
                academic_year_start
            }
            study_fields
        }
    }
    `).then(onResult);
}

class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionID : props.institution.id,
            yearList : null,
            activeYear : null,
            programList : null,
            activeProgram : null,
        };

        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.refreshPrograms = this.refreshPrograms.bind(this);

        fetchYears(result => {
            const yearList = result.academic_years.map(academicYear => academicYear.academic_year_start);

            if (yearList.length === 0) {
                this.setState({
                    yearList : [],
                });

                return;
            }

            const activeYear = yearList[0];

            this.setState({
                yearList : yearList,
                activeYear : activeYear,
            });

            this.refreshPrograms(activeYear);
        });

    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
            activeProgram : null,
        });
    }

    setActiveProgram(program) {
        if (program === null) {
            this.props.setSidebarContent(null);
        }

        this.props.setSidebarContent(
            <ProgramSidebarPane program={program}/>,
        );

        this.setState({
            activeProgram : program,
        });
    }

    // There might be a need to check for the activeYear
    refreshPrograms(year) {
        fetchPrograms(this.state.institutionID, year, result => {
            this.setState({
                programList : result.outbound_programs,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.institutionID === nextProps.institution.id) {
            return;
        }

        this.props.setSidebarContent(null);

        this.setState({
            institutionID : nextProps.institution.id,
            programList : null,
        });

        this.refreshPrograms(this.state.activeYear);
    }

    render() {
        if (this.state.programList === null) {
            return <LoadingSpinner/>;
        }


        return (
            <div className="w-100 h-100 d-flex flex-column">
                <ProgramsHead institution={this.props.institution}
                              years={this.state.yearList}
                              setCurrentYear={this.setActiveYear}/>
                <ProgramsTable programs={this.state.programList}
                               currentProgram={this.state.activeProgram}
                               setCurrentProgram={this.setActiveProgram}/>
            </div>
        );
    }
}

class ProgramsHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.years === null) {
            return <LoadingSpinner/>;
        }

        const years = this.props.years.map((year, index) => {
            return <option key={index}>{year} - {year + 1}</option>;
        });

        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Programs</h5>
                    <h4 className="page-head-title mb-0">{this.props.institution.name}</h4>
                </div>

                <div className="page-head-actions d-flex flex-row align-items-end">
                    {this.props.years.length !== 0 &&
                    <div className="d-flex flex-column mr-2">
                        <labl className="mr-3 text-dark mb-1">Academic Year</labl>
                        <Input type="select"
                               className="mr-3 btn btn-outline-success select-sm">
                            {years}
                        </Input>
                    </div>
                    }
                    <Button outline
                            size="sm"
                            color="success">
                        Add a Program
                    </Button>
                </div>
            </div>
        );
    }
}

class ProgramsTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h3>There's nothing here.</h3>
                <p>When added, Programs will show up here.</p>
                <Button outline
                        color="success">Add a program</Button>
            </div>
        );
    }

    render() {
        if (this.props.programs.length === 0) {
            return this.emptyState();
        }

        return (
            <div className="w-100 h-100 d-flex flex-column">
                <ProgramsListSection programs={this.props.programs}
                                     currentProgram={this.props.currentProgram}
                                     setCurrentProgram={this.props.setCurrentProgram}/>
            </div>
        );
    }
}

class ProgramsListSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let rows = this.props.programs.map((program, index) => {
            let isActive = false;

            if (this.props.currentProgram !== null) {
                isActive = this.props.currentProgram.id === program.id;
            }

            const setCurrentProgram = () => this.props.setCurrentProgram(program);

            return (
                <SectionRow key={index}
                            onClick={setCurrentProgram}
                            active={isActive}>
                    <SectionRowContent large>{program.name}</SectionRowContent>
                </SectionRow>
            );
        });

        return (
            <div>
                <Section>
                    <SectionTitle>{this.props.children}</SectionTitle>
                    <SectionTable className="memorandums-accordion">
                        {rows}
                    </SectionTable>
                </Section>
            </div>
        );
    }
}

export default Programs;