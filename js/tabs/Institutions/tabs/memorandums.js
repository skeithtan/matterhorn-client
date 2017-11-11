import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../loading";

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


function fetchInstitution(id, onResponse) {
    graphql({
        query : `
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
       `,
        onResponse : onResponse,
    });
}


class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution : null,
            institutionID : props.institution.id,
            activeMemorandumId : null,
        };

        this.refreshMemorandums = this.refreshMemorandums.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);

        //Fetch active institution details
        fetchInstitution(props.institution.id, response => {
            this.setState({
                institution : response.data.institution,
            });
        });
    }

    setActiveMemorandum(memorandum) {
        if (memorandum === null) {
            this.props.setSidebarContent(null);
        }


        const refreshMemorandums = () => {
            this.refreshMemorandums();
        };

        const onDeleteMemorandum = () => {
            this.setState({
                activeMemorandumId : null,
            });
            this.refreshMemorandums();
            this.setActiveMemorandum(null);
        };


        this.props.setSidebarContent(
            <MemorandumSidebarPane memorandum={memorandum}
                                   removeActiveMemorandum={onDeleteMemorandum}
                                   refreshMemorandums={refreshMemorandums}/>,
        );

        this.setState({
            activeMemorandumId : memorandum.id,
        });
    }


    refreshMemorandums() {
        this.setState({
            institution : null,
        });

        fetchInstitution(this.props.institution.id, response => {
            this.setState({
                institution : response.data.institution,
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
            institution : null,
        });

        fetchInstitution(nextProps.institution.id, response => {
            this.setState({
                institution : response.data.institution,
            });
        });
    }

    render() {
        if (this.state.institution === null) {
            return <LoadingSpinner/>;
        }

        const memorandums = {
            agreements : this.state.institution.mous,
            understandings : this.state.institution.moas,
            latestMOU : this.state.institution.latest_mou,
            latestMOA : this.state.institution.latest_moa,
        };

        return (
            <div className="d-flex flex-column p-0 h-100">
                <MemorandumHead institution={this.state.institution} refreshMemorandums={this.refreshMemorandums}/>
                <MemorandumBody institution={this.state.institution}
                                memorandums={memorandums}
                                activeMemorandumId={this.state.activeMemorandumId}
                                setActiveMemorandum={this.setActiveMemorandum}
                                refreshMemorandums={this.refreshMemorandums}
                                setSidebarContent={this.props.setSidebarContent}/>
            </div>
        );
    }
}

class MemorandumHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addMemorandumIsShowing : false,
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
                    <h4 className="page-head-title mb-0">{this.props.institution.name}</h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success" onClick={this.toggleAddMemorandum}>Add a
                        Memorandum</Button>
                </div>

                <MemorandumFormModal isOpen={this.state.addMemorandumIsShowing}
                                     institution={this.props.institution}
                                     toggle={this.toggleAddMemorandum}
                                     refresh={this.props.refreshMemorandums}/>
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
                        <MemorandumListSection institution={this.props.institution}
                                               activeMemorandumId={this.props.activeMemorandumId}
                                               memorandums={this.props.memorandums.agreements}
                                               latest={this.props.memorandums.latestMOA}
                                               setActiveMemorandum={this.props.setActiveMemorandum}
                                               refreshMemorandums={this.props.refreshMemorandums}>
                            MOA (Memorandums of Agreement)
                        </MemorandumListSection>

                        <MemorandumListSection institution={this.props.institution}
                                               memorandums={this.props.memorandums.understandings}
                                               latest={this.props.memorandums.latestMOU}
                                               activeMemorandumId={this.props.activeMemorandumId}
                                               setActiveMemorandum={this.props.setActiveMemorandum}
                                               refreshMemorandums={this.props.refreshMemorandums}>
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
                <h5 className="text-secondary">There are no {this.props.children} for this institution</h5>
            </div>
        );
    }

    render() {
        if (this.props.memorandums.length === 0) {
            return (
                <Section>
                    <SectionTitle>{this.props.children}</SectionTitle>
                    {this.emptyState()}
                </Section>
            );
        }

        const rows = this.props.memorandums.map((memorandum, index) => {
            const onMemorandumRowClick = () => this.props.setActiveMemorandum(memorandum);

            let isActive = false;

            if (this.props.activeMemorandumId !== null) {
                isActive = this.props.activeMemorandumId === memorandum.id;
            }

            return <MemorandumRow memorandum={memorandum}
                                  isActive={isActive}
                                  onClick={onMemorandumRowClick}
                                  latest={index === 0}
                                  key={memorandum.id}/>;
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
                        onClick={this.props.onClick}
                        active={this.props.isActive}>
                {this.props.latest &&
                <SectionRowTitle>Latest Memorandum</SectionRowTitle>
                }
                <SectionRowContent large>Effective {dateEffective}</SectionRowContent>
            </SectionRow>
        );
    }
}

export default Memorandums;