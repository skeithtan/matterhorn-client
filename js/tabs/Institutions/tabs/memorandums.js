import React, { Component } from "react";
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


function fetchInstitution(id, onResponse) {
    graphql({
        query : `
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
        onResponse : onResponse,
    });
}


class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution : null,
            institutionID : props.institution.id,
        };

        //Fetch active institution details
        fetchInstitution(props.institution.id, response => {
            console.log(response);

            this.setState({
                institution : response.data.institution,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
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
            <div id="institution-memorandums" className="d-flex flex-column p-0 h-100">
                <MemorandumHead institution={this.state.institution}/>
                <MemorandumBody memorandums={this.state.institution.memorandumSet}/>
            </div>
        );
    }
}

class MemorandumHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h5 className="mb-0 text-secondary">Memorandums</h5>
                    <h4 className="page-head-title mb-0">{this.props.institution.name}</h4>
                </div>

                <div className="page-head-actions">
                    <Button outline size="sm" color="success">Add a Memorandum</Button>
                </div>
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
            showing : null,
            agreements : agreements,
            understandings : understandings,
        };
    }

    render() {
        return (
            <div className="page-body">
                <MemorandumListSection memorandums={this.state.agreements}>
                    Memorandums of Agreement
                </MemorandumListSection>

                <MemorandumListSection memorandums={this.state.understandings}>
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
            activeMemorandum : null,
        };

        this.emptyState = this.emptyState.bind(this);
        this.setActiveMemorandum = this.setActiveMemorandum.bind(this);
    }

    setActiveMemorandum(memorandum) {
        console.log(memorandum);
        if (this.state.activeMemorandum === null) {
            this.setState({
                activeMemorandum : memorandum,
            });

            return;
        }

        this.setState({
            // Collapse if clicked memorandum is already the active memorandum
            activeMemorandum : this.state.activeMemorandum.id === memorandum.id ? null : memorandum,
        });
    }

    emptyState() {
        return (
            <div className="p-5 text-center bg-light">
                <h5 className="text-secondary">There are no {this.props.children}s for this institution</h5>
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
            return <MemorandumRow isShowing={isShowing} memorandum={memorandum} onClick={onMemorandumRowClick}
                                  key={memorandum.id}/>;
        });

        return (
            <Section>
                <SectionTitle>{this.props.children}</SectionTitle>
                <SectionTable className="memorandums-accordion">
                    {rows}
                </SectionTable>
                <SectionFooter>Select a memorandum to see its details</SectionFooter>
            </Section>
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

                if(index + 1 !== linkages.length) {
                    linkagesText += ", ";
                }
            });

        }

        return (
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

                            <SectionRow className="bg-light">
                                <Button outline color="success">Open Memorandum Copy</Button>
                            </SectionRow>
                        </SectionTable>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}


export default Memorandums;