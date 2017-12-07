import React, { Component } from "react";
import {
    Button,
    ButtonGroup,
    Form,
    Input,
} from "reactstrap";
import {
    SectionRow,
    SectionRowContent,
} from "../../components/section";
import LoadingSpinner from "../../components/loading";
import {
    ProgramFormModal,
} from "../Institutions/modals";


class ProgramList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            programFormModalIsShowing : false,
        };

        this.toggleProgramFormModal = this.toggleProgramFormModal.bind(this);
    }

    toggleProgramFormModal() {
        this.setState({
            programFormModalIsShowing : !this.state.programFormModalIsShowing,
        });
    }

    render() {
        return (
            <div className="programs-page-pane d-flex flex-column">
                <ProgramListHead year={ this.props.activeYear }
                                 activeTerm={ this.props.activeTerm }
                                 setActiveTerm={ this.props.setActiveTerm }
                                 toggleProgramFormModal={ this.toggleProgramFormModal }/>
                <ProgramListTable programs={ this.props.programList }
                                  activeTerm={ this.props.activeTerm }
                                  activeProgram={ this.props.activeProgram }
                                  setActiveProgram={ this.props.setActiveProgram }/>
                <div className="tab-bar">
                    <div className="p-3 justify-content-center mb-0 d-flex flex-row">
                        <ButtonGroup>
                            <Button outline
                                    size="sm"
                                    color="success"
                                    active={ this.props.activeTerm === 1 }
                                    onClick={ () => this.props.setActiveTerm(1) }>Term 1</Button>
                            <Button outline
                                    size="sm"
                                    color="success"
                                    active={ this.props.activeTerm === 2 }
                                    onClick={ () => this.props.setActiveTerm(2) }>Term 2</Button>
                            <Button outline
                                    size="sm"
                                    color="success"
                                    active={ this.props.activeTerm === 3 }
                                    onClick={ () => this.props.setActiveTerm(3) }>Term 3</Button>
                        </ButtonGroup>
                    </div>
                </div>

                <ProgramFormModal inbound
                                  toggle={ this.toggleProgramFormModal }
                                  refresh={ this.props.refreshPrograms }
                                  isOpen={ this.state.programFormModalIsShowing }
                                  institution={ null }/>
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
                <div className="page-head-controls w-100">
                    { localStorage.userType !== "administrative_assistant" && <Button outline
                                                                                      color="success"
                                                                                      size="sm"
                                                                                      className="ml-auto"
                                                                                      onClick={ this.props.toggleProgramFormModal }>Add
                        Inbound Program</Button> }
                </div>
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
                <Input type="search"
                       placeholder="Search"
                       className="search-input"/>
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

        const programs = this.props.programs;

        const rows = programs.map((program, index) => {
            let isActive = false;

            if (this.props.activeProgram !== null) {
                isActive = this.props.activeProgram.id === program.id;
            }

            const setActiveProgram = () => this.props.setActiveProgram(program);

            return (
                <SectionRow selectable
                            key={ index }
                            onClick={ setActiveProgram }
                            active={ isActive }>
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