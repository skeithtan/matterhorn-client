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
import { ProgramFormModal } from "../modals";
import ErrorState from "../../../components/error_state";


function makeYearsQuery() {
    return graphql.query(`
    {
        academic_years {
            academic_year_start
        }
    }
    `);
}

function makeProgramsQuery(institutionID, year) {
    return graphql.query(`
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
        }
    }
    `);
}

class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yearList : null,
            activeYear : null,
            programList : null,
            activeProgram : null,
            addProgramIsShowing : false,
            error : null,
        };

        this.fetchYears = this.fetchYears.bind(this);
        this.fetchPrograms = this.fetchPrograms.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveProgram = this.setActiveProgram.bind(this);
        this.toggleAddProgram = this.toggleAddProgram.bind(this);

        this.fetchYears();
    }

    fetchYears() {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeYearsQuery()
            .then(result => {
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

                this.fetchPrograms(this.props.institution.id, activeYear);
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    // There might be a need to check for the activeYear
    fetchPrograms(institution, year) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeProgramsQuery(institution, year)
            .then(result => {
                this.setState({
                    programList : result.outbound_programs,
                });
            })
            .catch(error => this.setState({
                error : error,
            }))
        ;
    }

    toggleAddProgram() {
        this.setState({
            addProgramIsShowing : !this.state.addProgramIsShowing,
        });
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
            activeProgram : null,
            programList : null,
        });

        this.fetchPrograms(this.props.institution.id, year);
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

    componentWillReceiveProps(nextProps) {
        if (this.props.institution.id === nextProps.institution.id) {
            return;
        }

        this.props.setSidebarContent(null);

        this.setState({
            programList : null,
            activeProgram : null,
        });

        this.fetchPrograms(nextProps.institution.id, this.state.activeYear);
    }

    render() {
        if (this.state.error) {
            const onRetryButtonClick = this.state.yearList === null ?
                () => this.fetchYears() :
                () => this.fetchPrograms(this.props.institution.id, this.state.activeYear);

            return (
                <ErrorState onRetryButtonClick={onRetryButtonClick}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (this.state.yearList === null) {
            return <LoadingSpinner/>;
        }


        return (
            <div className="w-100 h-100 d-flex flex-column">
                <ProgramsHead institution={this.props.institution}
                              years={this.state.yearList}
                              toggleAddProgram={this.toggleAddProgram}
                              setActiveYear={this.setActiveYear}/>
                <ProgramsTable programs={this.state.programList}
                               currentProgram={this.state.activeProgram}
                               toggleAddProgram={this.toggleAddProgram}
                               setCurrentProgram={this.setActiveProgram}/>
                <ProgramFormModal toggle={this.toggleAddProgram}
                                  refresh={() => this.fetchPrograms(this.props.institution.id, this.state.activeYear)}
                                  isOpen={this.state.addProgramIsShowing}
                                  institution={this.props.institution.id}/>
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
            return <option key={index}
                           value={year}>{year} - {year + 1}</option>;
        });

        const onYearChange = event => {
            this.props.setActiveYear(event.target.value);
        };

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
                               onChange={onYearChange}
                               className="mr-3 btn btn-outline-success select-sm">
                            {years}
                        </Input>
                    </div>
                    }
                    <Button outline
                            size="sm"
                            onClick={this.props.toggleAddProgram}
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
                        onClick={this.props.toggleAddProgram}
                        color="success">Add a program</Button>
            </div>
        );
    }

    render() {
        if (this.props.programs === null) {
            return <LoadingSpinner/>;
        }


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