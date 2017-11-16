import React, { Component } from "react";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../components/loading";
import { Button } from "reactstrap";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionTable,
    SectionTitle,
} from "../../../components/section";
import { ProgramSidebarPane } from "./sidebar_panes";

function fetchYears(institutionID, onResult) {
    graphql.query(`
    {
        programs(institution:${institutionID}) {
            academic_year {
                academic_year_start
            }
        }
    }
    `).then(onResult);
}

function fetchPrograms(institutionID, year, onResult) {
    graphql.query(`
    {
        programs(institution:${institutionID}, year:${year}) {
            id
            name
            linkage {
                name
            }
            studyfield_set {
                name
            }
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

        this.getOrderedYears = this.getOrderedYears.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.refreshPrograms = this.refreshPrograms.bind(this);

        fetchYears(this.state.institutionID, result => {
            this.setState({
                yearList : this.getOrderedYears(result.programs),
            });
            if (this.state.yearList !== null) {
                this.setState({
                    activeYear : this.state.yearList[0],
                });
            }
            if (this.state.activeYear !== undefined) {
                fetchPrograms(props.institution.id, this.state.activeYear, result => {
                    this.setState({
                        programList : result.programs,
                    });
                });
            }
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

        const refreshProgram = () => {
            this.refreshPrograms();
        };

        const onDeleteProgram = () => {
            this.setState({
                activeProgram : null,
            });
            this.refreshPrograms();
            this.setActiveProgram(null);
        };

        this.props.setSidebarContent(
            <ProgramSidebarPane program={ program }/>,
        );

        this.setState({
            activeProgram : program,
        });
    }

    getOrderedYears(programs) {
        if (programs.length === 0) {
            return [];
        }

        let years = [];

        programs.forEach(year => {
            years.push(year.academic_year.academic_year_start);
        });

        // Get uniques only
        years = years.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // Arrange in ascending order
        years = years.sort(function (a, b) {
            return a - b;
        });

        return years;
    }

    // There might be a need to check for the activeYear
    refreshPrograms() {
        fetchPrograms(this.state.institutionID, this.state.activeYear, result => {
            this.setState({
                programList : result.programs,
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
            yearList : null,
            programList : null,
            activeYear : null,
        });

        fetchYears(nextProps.institution.id, result => {
            this.setState({
                yearList : this.getOrderedYears(result.programs),
            });
            if (this.state.yearList !== null) {
                this.setState({
                    activeYear : this.state.yearList[0],
                });
            }
            if (this.state.activeYear !== undefined) {
                fetchPrograms(nextProps.institution.id, this.state.activeYear, result => {
                    this.setState({
                        programList : result.programs,
                    });
                });
            }
        });
    }

    render() {
        return (
            <div className="w-100">
                <ProgramsHead institution={ this.props.institution }
                              years={ this.state.yearList }
                              setCurrentYear={ this.setActiveYear }/>
                <ProgramsTable programs={ this.state.programList }
                               currentProgram={ this.state.activeProgram }
                               setCurrentProgram={ this.setActiveProgram }/>
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
            return <option key={ index }>{ year } - { year + 1 }</option>;
        });

        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Programs</h5>
                    <h4 className="page-head-title mb-0">{ this.props.institution.name }</h4>
                </div>

                <div className="page-head-actions">
                    { this.props.years.length !== 0 &&
                    <select className="form-control mr-3 btn btn-outline-success">
                        { years }
                    </select>
                    }
                    <Button outline size="sm" color="success">
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
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Students will show up here.</p>
            </div>
        );
    }

    render() {
        if (this.props.programs === null || this.props.programs.length === 0) {
            return this.emptyState();
        }

        return (
            <div className="w-100 h-100 d-flex flex-column">
                <ProgramsListSection programs={ this.props.programs }
                                     currentProgram={ this.props.currentProgram }
                                     setCurrentProgram={ this.props.setCurrentProgram }/>
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
                <SectionRow key={ index } onClick={ setCurrentProgram } active={ isActive }>
                    <SectionRowContent large>{ program.name }</SectionRowContent>
                </SectionRow>
            );
        });

        return (
            <div>
                <Section>
                    <SectionTitle>{ this.props.children }</SectionTitle>
                    <SectionTable className="memorandums-accordion">
                        { rows }
                    </SectionTable>
                </Section>
            </div>
        );
    }
}

export default Programs;