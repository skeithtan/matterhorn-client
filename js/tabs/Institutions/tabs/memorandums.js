import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../loading";
import settings from "../../../settings";

import {
    Button,
    ListGroup,
} from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
} from "../../../components/section";

import {
    MemorandumFormModal,
    DeleteMemorandumModal,
} from "../modals";


function fetchInstitution(id, onResponse) {
    graphql({
        query : `
        {
            institution(id: ${id}) {
                id
                name
                memorandum_set {
                    id
                    category
                    memorandum_file
                    date_effective
                    date_expiration
                    college_initiator
                    linkages {
                        code
                    }
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
            <MemorandumDetailPane memorandum={memorandum}
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

        return (
            <div className="d-flex flex-column p-0 h-100">
                <MemorandumHead institution={this.state.institution} refreshMemorandums={this.refreshMemorandums}/>
                <MemorandumBody institution={this.state.institution}
                                memorandums={this.state.institution.memorandum_set}
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

        //Sort by most recent
        props.memorandums.sort((a, b) => {
            const aTime = moment(a.date_effective);
            const bTime = moment(b.date_effective);

            if (aTime.isBefore(bTime)) {
                return 1;
            }

            if (aTime.isAfter(bTime)) {
                return -1;
            }

            return 0;
        });

        let agreements = [];
        let understandings = [];

        //Categorize
        props.memorandums.forEach(memorandum => {
            switch (memorandum.category) {
                case "MOA":
                    agreements.push(memorandum);
                    return;
                case "MOU":
                    understandings.push(memorandum);
                    return;
                default:
                    return;
            }
        });

        this.state = {
            agreements : agreements,
            understandings : understandings,
        };
    }


    render() {
        return (
            <div className="page-body w-100">
                <div className="d-flex h-100 p-0 flex-row">
                    <div className="w-100">
                        <MemorandumListSection institution={this.props.institution}
                                               activeMemorandumId={this.props.activeMemorandumId}
                                               memorandums={this.state.agreements}
                                               setActiveMemorandum={this.props.setActiveMemorandum}
                                               refreshMemorandums={this.props.refreshMemorandums}>
                            MOA (Memorandums of Agreement)
                        </MemorandumListSection>

                        <MemorandumListSection institution={this.props.institution}
                                               memorandums={this.state.understandings}
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
            <SectionRow onClick={this.props.onClick}
                        active={this.props.isActive}>Effective {dateEffective}</SectionRow>
        );
    }
}

class MemorandumDetailPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteMemorandumIsShowing : false,
            editMemorandumIsShowing : false,
            memorandum : props.memorandum,
        };

        this.onEditMemorandum = this.onEditMemorandum.bind(this);
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

    componentWillReceiveProps(props) {
        this.setState({
            memorandum : props.memorandum,
        });
    }

    onEditMemorandum(memorandum) {
        this.setState({
            memorandum : memorandum,
        });
    }

    render() {
        const memorandum = this.state.memorandum;
        return (
            <div id="memorandum-detail" className="p-0 h-100 page-body justify-content-center">
                <MemorandumDetails memorandum={memorandum}
                                   toggleDeleteMemorandum={this.toggleDeleteMemorandum}
                                   toggleEditMemorandum={this.toggleEditMemorandum}/>
                <MemorandumLinkages linkages={memorandum.linkages}/>

                {this.state.activeMemorandum !== null &&
                <DeleteMemorandumModal isOpen={this.state.deleteMemorandumIsShowing}
                                       memorandum={memorandum}
                                       toggle={this.toggleDeleteMemorandum}
                                       onDeleteSuccess={this.props.removeActiveMemorandum}
                                       refresh={this.props.refreshMemorandums}/>}

                {this.state.activeMemorandum !== null &&
                <MemorandumFormModal edit
                                     isOpen={this.state.editMemorandumIsShowing}
                                     memorandum={memorandum}
                                     toggle={this.toggleEditMemorandum}
                                     onEditSuccess={this.onEditMemorandum}
                                     refresh={this.props.refreshMemorandums}/>}
            </div>
        );
    }
}

class MemorandumDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        function formatDate(date) {
            return moment(date).format("LL");
        }

        const dateEffective = formatDate(this.props.memorandum.date_effective);
        const type = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
        const expiryDate = this.props.memorandum.date_expiration === null ? "None" : formatDate(this.props.memorandum.date_expiration);
        const college = this.props.memorandum.college_initiator === null ? "None" : this.props.memorandum.college_initiator;

        return (
            <div>
                <h5 className="text-center mt-5">Effective {dateEffective}</h5>
                <div className="d-flex flex-row justify-content-center mt-3">
                    <div className="text-right d-flex flex-column mr-3">
                        <small className="text-muted">Memorandum Type</small>
                        <small className="text-muted">Expiration Date</small>
                        <small className="text-muted">College Initiator</small>
                    </div>
                    <div className="d-flex flex-column">
                        <small>{type}</small>
                        <small>{expiryDate}</small>
                        <small>{college}</small>
                    </div>
                </div>
                {/* Buttons */}
                <div className="d-flex flex-row justify-content-center mt-3">
                    <Button outline color="success" size="sm" className="mr-2">View</Button>
                    <Button outline color="success" size="sm" className="mr-2"
                            onClick={this.props.toggleEditMemorandum}>Edit</Button>
                    <Button outline color="danger" size="sm"
                            onClick={this.props.toggleDeleteMemorandum}>Delete</Button>
                </div>
            </div>
        );
    }
}

class MemorandumLinkages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.linkages.length === 0) {
            return (
                <div className="p-5 mt-3 text-center">
                    <h5 className="text-secondary">There are no linkages for this institution</h5>
                </div>
            );
        }

        const rows = this.props.linkages.map((linkage, index) => {
            return (
                <SectionRow key={index}>{settings.linkages[linkage.code]}</SectionRow>
            );
        });

        return (
            <div id="memorandum-linkages">
                <SectionTitle>Linkages</SectionTitle>
                <ListGroup>
                    {rows}
                </ListGroup>
            </div>
        );
    }
}

export default Memorandums;