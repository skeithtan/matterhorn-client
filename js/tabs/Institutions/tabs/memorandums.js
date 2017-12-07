import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../components/loading";

import { Button, } from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
} from "../../../components/section";

import { MemorandumFormModal } from "../modals";
import { MemorandumSidebarPane } from "./sidebar_panes";
import ErrorState from "../../../components/error_state";


function makeMemorandumsQuery(id) {
    return graphql.query(`
    {
      institution(id:${id}) {
        id
        name
        moas {
          id
          category
          memorandum_file
          date_effective
          date_expiration
          college_initiator
          linkages
        }
        mous {
          id
          category
          memorandum_file
          date_effective
          date_expiration
          college_initiator
          linkages
        }
        
      }
    }
    `);
}

function institutionIsFetched(institution) {
    return institution.moas !== undefined;
}


class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution : props.institution,
            activeMemorandumId : null,
        };

        this.fetchMemorandums = this.fetchMemorandums.bind(this);
        this.refreshMemorandums = this.refreshMemorandums.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);

        this.fetchMemorandums();
    }

    fetchMemorandums(id) {
        if (id === undefined) {
            id = this.props.institution.id;
        }

        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeMemorandumsQuery(id)
            .then(result => {
                //ID from when query was made must be the same ID now
                if (id !== this.props.institution.id) {
                    return;
                }

                this.state.institution.moas = result.institution.moas;
                this.state.institution.mous = result.institution.mous;

                this.setState({
                    institution : this.state.institution,
                });
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    setActiveMemorandum(memorandum) {
        if (memorandum === null) {
            this.props.setSidebarContent(null);
        }


        const onArchiveMemorandum = () => {
            this.props.setSidebarContent(null);
            this.setState({
                activeMemorandumId : null,
            });
            this.refreshMemorandums();
        };


        this.props.setSidebarContent(
            <MemorandumSidebarPane memorandum={ memorandum }
                                   removeActiveMemorandum={ onArchiveMemorandum }
                                   refreshMemorandums={ this.refreshMemorandums }/>,
        );

        this.setState({
            activeMemorandumId : memorandum.id,
        });
    }

    refreshMemorandums() {
        delete this.state.institution.moas;
        delete this.state.institution.mous;

        this.setState({
            institution : this.state.institution,
        });

        this.fetchMemorandums();
    }

    componentWillReceiveProps(props) {
        if (this.state.institution !== null &&
            this.state.institution.id === props.institution.id) {
            return;
        }

        this.props.setSidebarContent(null);

        this.setState({
            institution : props.institution,
            activeMemorandumId : null //Remove current active memorandum ID
        });

        if (!institutionIsFetched(props.institution)) {
            this.fetchMemorandums(props.institution.id);
        }
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={ () => this.fetchMemorandums(this.state.institution.id) }>
                    { this.state.error.toString() }
                </ErrorState>
            );
        }

        if (!institutionIsFetched(this.state.institution)) {
            return <LoadingSpinner/>;
        }

        const memorandums = {
            agreements : this.state.institution.moas,
            understandings : this.state.institution.mous,
            latestMOU : this.state.institution.latest_mou,
            latestMOA : this.state.institution.latest_moa,
        };

        return (
            <div className="d-flex flex-column p-0 h-100">
                <MemorandumHead institution={ this.state.institution }
                                refreshMemorandums={ this.refreshMemorandums }
                                memorandumToBeAdded={ this.props.memorandumToBeAdded }
                                toggleMemorandumToBeAdded={ this.props.toggleMemorandumToBeAdded }/>
                <MemorandumBody institution={ this.state.institution }
                                memorandums={ memorandums }
                                activeMemorandumId={ this.state.activeMemorandumId }
                                setActiveMemorandum={ this.setActiveMemorandum }
                                refreshMemorandums={ this.refreshMemorandums }
                                setSidebarContent={ this.props.setSidebarContent }/>
            </div>
        );
    }
}

class MemorandumHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addMemorandumIsShowing : this.props.memorandumToBeAdded,
        };

        this.toggleAddMemorandum = this.toggleAddMemorandum.bind(this);
    }

    toggleAddMemorandum() {
        this.setState({
            addMemorandumIsShowing : !this.state.addMemorandumIsShowing,
        });
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Memorandums</h5>
                    <h4 className="page-head-title mb-0">{ this.props.institution.name }</h4>
                </div>

                <div className="page-head-actions">
                    { localStorage.userType !== "program_assistant" && <Button outline
                                                                               size="sm"
                                                                               color="success"
                                                                               onClick={ this.toggleAddMemorandum }>Add
                        a Memorandum</Button> }
                </div>

                <MemorandumFormModal isOpen={ this.state.addMemorandumIsShowing }
                                     institution={ this.props.institution }
                                     toggle={ this.toggleAddMemorandum }
                                     refresh={ this.props.refreshMemorandums }
                                     memorandumToBeAdded={ this.props.memorandumToBeAdded }
                                     toggleMemorandumToBeAdded={ this.props.toggleMemorandumToBeAdded }/>
            </div>
        );
    }
}

class MemorandumBody extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="page-body w-100">
                <div className="d-flex h-100 p-0 flex-row">
                    <div className="w-100">
                        <MemorandumListSection institution={ this.props.institution }
                                               activeMemorandumId={ this.props.activeMemorandumId }
                                               memorandums={ this.props.memorandums.agreements }
                                               latest={ this.props.memorandums.latestMOA }
                                               setActiveMemorandum={ this.props.setActiveMemorandum }
                                               refreshMemorandums={ this.props.refreshMemorandums }>
                            MOA (Memorandums of Agreement)
                        </MemorandumListSection>

                        <MemorandumListSection institution={ this.props.institution }
                                               memorandums={ this.props.memorandums.understandings }
                                               latest={ this.props.memorandums.latestMOU }
                                               activeMemorandumId={ this.props.activeMemorandumId }
                                               setActiveMemorandum={ this.props.setActiveMemorandum }
                                               refreshMemorandums={ this.props.refreshMemorandums }>
                            MOU (Memorandums of Understanding)
                        </MemorandumListSection>
                    </div>
                </div>
            </div>
        );
    }
}

class MemorandumListSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteMemorandumIsShowing : false,
            editMemorandumIsShowing : false,
        };

        this.emptyState = this.emptyState.bind(this);
        this.toggleDeleteMemorandum = this.toggleDeleteMemorandum.bind(this);
        this.toggleEditMemorandum = this.toggleEditMemorandum.bind(this);
    }

    toggleDeleteMemorandum() {
        this.setState({
            deleteMemorandumIsShowing : !this.state.deleteMemorandumIsShowing,
        });
    }

    toggleEditMemorandum() {
        this.setState({
            editMemorandumIsShowing : !this.state.editMemorandumIsShowing,
        });
    }

    emptyState() {
        return (
            <div className="p-5 text-center bg-light">
                <h5 className="text-secondary">There are no { this.props.children } for this institution</h5>
            </div>
        );
    }

    render() {
        if (this.props.memorandums.length === 0) {
            return (
                <Section>
                    <SectionTitle>{ this.props.children }</SectionTitle>
                    { this.emptyState() }
                </Section>
            );
        }

        const rows = this.props.memorandums.map((memorandum, index) => {
            const onMemorandumRowClick = () => this.props.setActiveMemorandum(memorandum);

            let isActive = false;

            if (this.props.activeMemorandumId !== null) {
                isActive = this.props.activeMemorandumId === memorandum.id;
            }

            return <MemorandumRow memorandum={ memorandum }
                                  isActive={ isActive }
                                  onClick={ onMemorandumRowClick }
                                  latest={ index === 0 }
                                  key={ memorandum.id }/>;
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

class MemorandumRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const memorandum = this.props.memorandum;

        function formatDate(date) {
            return moment(date).format("LL");
        }

        const dateEffective = formatDate(memorandum.date_effective);
        return (
            <SectionRow selectable
                        onClick={ this.props.onClick }
                        active={ this.props.isActive }>
                { this.props.latest &&
                <SectionRowTitle>Latest Memorandum</SectionRowTitle>
                }
                <SectionRowContent large>Effective { dateEffective }</SectionRowContent>
            </SectionRow>
        );
    }
}

export default Memorandums;