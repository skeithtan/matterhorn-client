import React, { Component } from "react";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../loading";
import { Button } from "reactstrap";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionTable,
    SectionTitle,
} from "../../../components/section";


class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProgram : null,
        };

        this.setCurrentProgram = this.setCurrentProgram.bind(this);
    }

    setCurrentProgram(program) {
        this.setState({
            currentProgram : program,
        });
    }

    render() {
        return (
            <div className="h-100 w-100">
                <ProgramsHead institution={this.props.institution}/>
                <ProgramsTable setCurrentProgram={this.setCurrentProgram}/>
            </div>
        );
    }
}

class ProgramsHead extends Component {
    constructor(props) {
        super(props);
    }

    toggleAddPrograms() {
        //TODO
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Programs</h5>
                    <h4 className="page-head-title mb-0">{this.props.institution.name}</h4>
                </div>

                <div className="page-head-actions">
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
        return <h1>World</h1>;
    }
}

class ProgramsListSection extends Component {
    constructor(props) {
        super(props);

        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        //TODO
    }

    render() {
        if (this.props.programs.length === 0) {
            return this.emptyState();
        }

        let rows = this.props.programs.map(program => {
            //TODO: onClick
            return (
                <SectionRow key={program.id}>
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