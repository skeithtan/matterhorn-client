import React, { Component } from "react";
import {
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
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column">
                <ProgramListHead year={ this.props.activeYear }/>
                <ProgramListTable programList={ this.props.programList }
                                  activeProgram={ this.props.activeProgram }
                                  setActiveProgram={ this.props.setActiveProgram }/>
            </div>
        );
    }
}

class ProgramListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head d-flex flex-column align-items-center">
                <div className="d-flex flex-row w-100 mb-2 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Programs</h5>
                        <h4 className="page-head-title mb-0">{ this.props.year } - { this.props.year + 1 }</h4>
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

        this.getFilteredPrograms = this.getFilteredPrograms.bind(this);
        this.emptyState = this.emptyState.bind(this);
    }

    getFilteredPrograms() {
        if (this.props.programList === null) {
            return [];
        }

        let institutions = [];

        // Makes the list of Institution Names
        this.props.programList.forEach(program => {
            institutions.push(program.memorandum.institution.name);
        });

        // Get uniques only?
        institutions = institutions.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // Arrange alphabetically
        institutions = institutions.sort(function (a, b) {
            return a - b;
        });

        let categorizedByInstitution = [];

        institutions.forEach(institution => {
            let programs = [];
            categorizedByInstitution.push({
                institution : institution,
                programs : programs,
            });

            this.props.programList.forEach(program => {
                const programInstitution = program.memorandum.institution.name;
                if (programInstitution === institution) {
                    programs.push(program);
                }
            });
        });

        return categorizedByInstitution;
    }

    emptyState() {
        return (
            <div>
                This is empty
            </div>
        );
    }

    render() {
        if (this.props.programList === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.programList.length === 0) {
            return this.emptyState();
        }

        const institutionPrograms = this.getFilteredPrograms();

        const sections = institutionPrograms.map((institutionProgram, index) => {
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
            const setActiveProgram = () => this.props.setActiveProgram(program);
            return (
                <SectionRow key={ index } onClick={ setActiveProgram }>
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