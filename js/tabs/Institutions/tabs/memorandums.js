import React, {Component} from "react";
import moment from "moment";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../loading";
import settings from "../../../settings";

import {
    Button,
    Card,
    CardBody,
    Collapse,
} from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionRowContent,
    SectionFooter,
} from "../../../components/section";

import {
    AddMemorandumModal,
    DeleteMemorandumModal,
    EditMemorandumModal,
} from "../modals";

function fetchInstitution(id, onResponse) {
    graphql({
        query: `
        {
            institution(id: ${id}) {
                id
                name
                memorandumSet {
                    id
                    category
                    memorandumFile
                    dateEffective
                    dateExpiration
                    collegeInitiator
                    memorandumlinkageSet {
                        linkage
                    }
                }
            }
        }
       `,
        onResponse: onResponse,
    });
}


class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution: null,
            institutionID: props.institution.id,
        };

        this.refreshMemorandums = this.refreshMemorandums.bind(this);

        //Fetch active institution details
        fetchInstitution(props.institution.id, response => {
            this.setState({
                institution: response.data.institution,
            });
        });
    }

    refreshMemorandums() {
        this.setState({
            institution: null,
        });

        fetchInstitution(this.props.institution.id, response => {
            this.setState({
                institution: response.data.institution,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            institutionID: nextProps.institution.id,
            institution: null,
        });

        fetchInstitution(nextProps.institution.id, response => {
            this.setState({
                institution: response.data.institution,
            });
        });
    }

    render() {
        if (this.state.institution === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div id="institution-memorandums" className="d-flex flex-column p-0 h-100">
                <MemorandumHead institution={this.state.institution} refreshMemorandums={this.refreshMemorandums}/>
                <MemorandumBody institution={this.state.institution}
                                memorandums={this.state.institution.memorandumSet}
                                refreshMemorandums={this.refreshMemorandums}/>
            </div>
        );
    }
}

class MemorandumHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addMemorandumIsShowing: false,
        };

        this.toggleAddMemorandum = this.toggleAddMemorandum.bind(this);
    }

    toggleAddMemorandum() {
        this.setState({
            addMemorandumIsShowing: !this.state.addMemorandumIsShowing,
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

                <AddMemorandumModal isOpen={this.state.addMemorandumIsShowing}
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

        //Parse dates
        props.memorandums.forEach(memorandum => {
            memorandum.versionDate = moment(memorandum.versionDate);
            memorandum.dateEffective = moment(memorandum.dateEffective);
            memorandum.dateExpiration = moment(memorandum.dateExpiration);
        });

        //Sort by most recent
        props.memorandums.sort((a, b) => {
            const aTime = a.dateEffective;
            const bTime = b.dateEffective;

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
            showing: null,
            agreements: agreements,
            understandings: understandings,
        };

    }

    render() {
        return (
            <div className="page-body">
                <MemorandumListSection institution={this.props.institution}
                                       memorandums={this.state.agreements}
                                       refreshMemorandums={this.props.refreshMemorandums}>
                    Memorandums of Agreement
                </MemorandumListSection>

                <MemorandumListSection institution={this.props.institution}
                                       memorandums={this.state.understandings}
                                       refreshMemorandums={this.props.refreshMemorandums}>
                    Memorandums of Understanding
                </MemorandumListSection>
            </div>
        );
    }
}

class MemorandumListSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMemorandum: null,
        };

        this.emptyState = this.emptyState.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);
        this.toggleDeleteMemorandum = this.toggleDeleteMemorandum.bind(this);
    }

    setActiveMemorandum(memorandum) {
        console.log(memorandum);
        if (this.state.activeMemorandum === null) {
            this.setState({
                activeMemorandum: memorandum,
                deleteMemorandumIsShowing: false,
            });

            return;
        }

        this.setState({
            // Collapse if clicked memorandum is already the active memorandum
            activeMemorandum: this.state.activeMemorandum.id === memorandum.id ? null : memorandum,
        });
    }

    toggleDeleteMemorandum() {
        this.setState({
            deleteMemorandumIsShowing: !this.state.deleteMemorandumIsShowing,
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

        const rows = this.props.memorandums.map(memorandum => {
            let isShowing = false;

            if (this.state.activeMemorandum !== null) {
                isShowing = this.state.activeMemorandum.id === memorandum.id;
            }

            const onMemorandumRowClick = () => this.setActiveMemorandum(memorandum);
            return <MemorandumRow isShowing={isShowing}
                                  memorandum={memorandum}
                                  onClick={onMemorandumRowClick}
                                  toggleDeleteMemorandum={this.toggleDeleteMemorandum}
                                  key={memorandum.id}/>;
        });

        return (
            <div>
                <Section>
                    <SectionTitle>{this.props.children}</SectionTitle>
                    <SectionTable className="memorandums-accordion">
                        {rows}
                    </SectionTable>
                    <SectionFooter>Select a memorandum to see its details</SectionFooter>
                </Section>

                <DeleteMemorandumModal isOpen={this.state.deleteMemorandumIsShowing}
                                       institution={this.props.institution}
                                       memorandum={this.state.activeMemorandum}
                                       toggle={this.toggleDeleteMemorandum}
                                       refresh={this.props.refreshMemorandums}/>
            </div>
        );
    }

}


class MemorandumRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteMemorandumIsShowing: false,
        };
    }

    render() {
        const memorandum = this.props.memorandum;

        function formatDate(date) {
            return date.format("LL");
        }

        const dateEffective = formatDate(memorandum.dateEffective);
        const dateExpiration = memorandum.dateExpiration === null ? "No expiration" : formatDate(memorandum.dateExpiration);
        const collegeInitiator = memorandum.collegeInitiator === null ? "No college initiator" : memorandum.collegeInitiator;
        const linkages = memorandum.memorandumlinkageSet;

        let linkagesText = "No linkages";

        if (linkages.length > 0) {
            linkagesText = "";

            linkages.forEach((linkageCode, index) => {
                linkagesText += settings.linkages[linkageCode.linkage];

                if (index + 1 !== linkages.length) {
                    linkagesText += ", ";
                }
            });

        }

        return (
            <div>
                <Card>
                    <SectionRow selectable active={this.props.isShowing} onClick={this.props.onClick}>
                        <SectionRowContent large>Effective {dateEffective}</SectionRowContent>
                    </SectionRow>

                    <Collapse isOpen={this.props.isShowing}>
                        <CardBody className="p-0">
                            <SectionTable>
                                <SectionRow className="bg-light">
                                    <SectionRowTitle>Date Expiration</SectionRowTitle>
                                    <SectionRowContent large>{dateExpiration}</SectionRowContent>
                                </SectionRow>

                                <SectionRow className="bg-light">
                                    <SectionRowTitle>College Initiator</SectionRowTitle>
                                    <SectionRowContent large>{collegeInitiator}</SectionRowContent>
                                </SectionRow>

                                <SectionRow className="bg-light">
                                    <SectionRowTitle>Linkages</SectionRowTitle>
                                    <SectionRowContent large>{linkagesText}</SectionRowContent>
                                </SectionRow>

                                <SectionRow className="bg-light d-flex flex-row">
                                    <div className="mr-auto">
                                        <Button outline size="sm" color="success" className="mr-2">View
                                            Memorandum</Button>
                                        <Button outline size="sm" color="success">Edit Details</Button>
                                    </div>
                                    <Button outline size="sm" color="danger"
                                            onClick={this.props.toggleDeleteMemorandum}>Delete Memorandum</Button>
                                </SectionRow>
                            </SectionTable>
                        </CardBody>
                    </Collapse>
                </Card>
            </div>
        );
    }
}


export default Memorandums;