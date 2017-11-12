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

function fetchPrograms(institutionID, onResult) {
    graphql.query(`
    {
        programs(institution:${institutionID}) {
            name
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
            institutionID : props.institution.id,
            currentYear : null,
            currentProgram : null,
        };

        this.setCurrentYear = this.setCurrentYear.bind(this);
        this.setCurrentProgram = this.setCurrentProgram.bind(this);

        fetchYears(props.institution.id, result => {
            this.setState({
                yearList : result.programs,
            });
        });

        fetchPrograms(props.institution.id, result => {
            this.setState({
                programList : result.programs,
            });
        });
    }

    setCurrentYear(year) {
        console.log(year);
        this.setState({
            currentYear : year,
        });
    }

    setCurrentProgram(program) {
        this.setState({
            currentProgram : program,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.institutionID === nextProps.institution.id) {
            return;
        }

        this.setState({
            institutionID : nextProps.institution.id,
            yearList : null,
            programList : null,
        });

        fetchYears(nextProps.institution.id, result => {
            this.setState({
                yearList : result.programs,
            });
        });

        fetchPrograms(nextProps.institution.id, result => {
            this.setState({
                programList : result.programs,
            });
        });
    }

    render() {
        return (
            <div className="h-100 w-100">
                <ProgramsHead institution={ this.props.institution }
                              years={ this.state.yearList }
                              setCurrentYear={ this.setCurrentYear }/>
                <ProgramsTable programs={ this.state.programList }
                               setCurrentProgram={ this.setCurrentProgram }/>
            </div>
        );
    }
}

class ProgramsHead extends Component {
    constructor(props) {
        super(props);
    }

    getOrderedYears() {
        if (this.props.years === null) {
            return [];
        }

        let years = this.props.years.map(year => Number(year.academic_year.academic_year_start));
        years = years.sort(function (a, b) {
            return a - b;
        });

        return years;
    }

    toggleAddPrograms() {
        //TODO
    }

    render() {
        const years = this.getOrderedYears().map((year, index) => {
            return <option key={ index } value={ year }>{ year } - { year + 1 }</option>;
        });

        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Programs</h5>
                    <h4 className="page-head-title mb-0">{ this.props.institution.name }</h4>
                </div>

                <div className="page-head-actions">
                    { years.length !== 0 &&
                    <select className="form-control mr-3"
                            onChange={ () => this.props.setCurrentYear }
                            defaultValue={ this.getOrderedYears()[0] }>
                        { years }
                    </select> }
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

    render() {
        return (
            <div className="w-100">
                <ProgramsListSection programs={ this.props.programs }
                                     setCurrentProgram={ this.props.setCurrentProgram }/>
            </div>
        );
    }
}

class ProgramsListSection extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        // TODO
        return (
            <div>
                This is empty
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

        let rows = this.props.programs.map((program, index) => {
            //TODO: onClick
            return (
                <SectionRow key={ index } onClick={ () => this.props.setCurrentProgram(program) }>
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