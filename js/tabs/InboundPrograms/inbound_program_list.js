import React, { Component } from "react";
import {
    Input,
} from "reactstrap";
import {
    SectionRow,
    SectionRowContent,
} from "../../components/section";
import LoadingSpinner from "../../components/loading";

class ProgramList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="programs-page-pane d-flex flex-column">
                <ProgramListHead year={ this.props.activeYear }/>
                <ProgramListTable programs={ this.props.programList }
                    // activeTerm={ this.props.activeTerm }
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
                <h5>There are no programs for this academic year</h5>
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

        const programs = this.props.programs;

        const rows = programs.map((program, index) => {
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
            <div className="page-body">
                { rows }
            </div>
        );
    }
}

export default ProgramList;