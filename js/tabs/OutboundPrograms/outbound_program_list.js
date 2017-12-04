import React, { Component } from "react";
import {
    Button,
    ButtonGroup,
    Input,
} from "reactstrap";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionTable,
    SectionTitle,
} from "../../components/section";
import LoadingSpinner from "../../components/loading";


class ProgramList extends Component {
    constructor(props) {
        super(props);

        this.getFilteredPrograms = this.getFilteredPrograms.bind(this);
    }

    getFilteredPrograms() {
        if (this.props.programList === null) {
            return [];
        }

        let institutions = this.props.programList.map(program => {
            return program.institution.name;
        });

        // Get uniques only
        institutions = institutions.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // Arrange alphabetically
        institutions = institutions.sort();

        let categorizedByInstitution = [];

        institutions.forEach(institution => {
            let programs = [];
            categorizedByInstitution.push({
                institution : institution,
                programs : programs,
            });

            this.props.programList.forEach(program => {
                const programInstitution = program.institution.name;
                if (programInstitution === institution) {
                    programs.push(program);
                }
            });
        });

        return categorizedByInstitution;
    }

    render() {
        const filteredPrograms = this.getFilteredPrograms();

        return (
            <div className="programs-page-pane d-flex flex-column">
                <ProgramListHead year={ this.props.activeYear }
                                 activeTerm={ this.props.activeTerm }
                                 setActiveTerm={ this.props.setActiveTerm }/>
                <ProgramListTable programs={ filteredPrograms }
                                  activeTerm={ this.props.activeTerm }
                                  activeProgram={ this.props.activeProgram }
                                  setActiveProgram={ this.props.setActiveProgram }/>
                <div className="tab-bar">
                    <div className="p-3 justify-content-center mb-0 d-flex flex-row">
                        <ButtonGroup>
                            <Button outline
                                    size="sm"
                                    color="success"
                                    active={this.props.activeTerm === 1}
                                    onClick={() => this.props.setActiveTerm(1)}>Term 1</Button>
                            <Button outline
                                    size="sm"
                                    color="success"
                                    active={this.props.activeTerm === 2}
                                    onClick={() => this.props.setActiveTerm(2)}>Term 2</Button>
                            <Button outline
                                    size="sm"
                                    color="success"
                                    active={this.props.activeTerm === 3}
                                    onClick={() => this.props.setActiveTerm(3)}>Term 3</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}

class ProgramListHead extends Component {
    constructor(props) {
        super(props);
        this.onTermChange = this.onTermChange.bind(this);
    }

    onTermChange(event) {
        this.props.setActiveTerm(event.target.value);
    }

    render() {
        return (
            <div className="page-head d-flex flex-column align-items-center">
                <div className="d-flex flex-row w-100 mb-2 pt-3 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Programs</h5>
                        <div className="d-flex flex-row">
                            <h4 className="page-head-title mb-0">
                                { this.props.year } - { this.props.year + 1 }
                            </h4>
                        </div>
                    </div>
                </div>
                <Input type="search" placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class ProgramListTable extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h5>There are no programs for Term { this.props.activeTerm }</h5>
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

        const sections = this.props.programs.map((institutionProgram, index) => {
            return <ProgramSection key={ index }
                                   title={ institutionProgram.institution }
                                   activeProgram={ this.props.activeProgram }
                                   programs={ institutionProgram.programs }
                                   setActiveProgram={ this.props.setActiveProgram }/>;
        });

        return (
            <div className="page-body">
                { sections }
            </div>
        );
    }
}

class ProgramSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.programs.map((program, index) => {
            let isActive = false;

            if (this.props.activeProgram !== null) {
                isActive = this.props.activeProgram.id === program.id;
            }

            const setActiveProgram = () => this.props.setActiveProgram(program);

            return (
                <SectionRow selectable key={ index } onClick={ setActiveProgram } active={ isActive }>
                    <SectionRowContent>{ program.name }</SectionRowContent>
                </SectionRow>
            );
        });

        return (
            <Section>
                <SectionTitle>{ this.props.title }</SectionTitle>
                <SectionTable>
                    { rows }
                </SectionTable>
            </Section>
        );
    }
}

export default ProgramList;