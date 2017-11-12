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
                <ProgramListHead year={this.props.activeYear}
                                 term={this.props.activeTerm}/>
                <ProgramListTable programList={this.props.programList}
                                  activeProgram={this.props.activeProgram}
                                  setActiveProgram={this.props.setActiveProgram}/>
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
                        <h5 className="mb-0 text-secondary mt-3">Programs</h5>
                        <div className="d-flex flex-row">
                            <h4 className="page-head-title mb-0">
                                {this.props.year} - {this.props.year + 1}
                                <span className="text-secondary font-weight-normal"> Term {this.props.term}</span>
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
        institutions = institutions.sort();

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
            return <ProgramSection key={index}
                                   title={institutionProgram.institution}
                                   activeProgram={this.props.activeProgram}
                                   programs={institutionProgram.programs}
                                   setActiveProgram={this.props.setActiveProgram}/>;
        });

        return (
            <div className="page-body">
                {sections}
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
                isActive = this.props.activeProgram.name === program.name;
            }

            const setActiveProgram = () => this.props.setActiveProgram(program);

            return (
                <SectionRow selectable key={index} onClick={setActiveProgram} active={isActive}>
                    <SectionRowContent>{program.name}</SectionRowContent>
                </SectionRow>
            );
        });

        return (
            <Section>
                <SectionTitle>{this.props.title}</SectionTitle>
                <SectionTable>
                    {rows}
                </SectionTable>
            </Section>
        );
    }
}

export default ProgramList;