import React, { Component } from "react";
import moment from "moment";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../loading";
import settings from "../../../settings";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Collapse,
} from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionRowContentLarge,
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
        let cardHeaderClass = this.props.isShowing ? "" : "collapsed";
        const memorandum = this.props.memorandum;

        function formatDate(date) {
            return date.format("LL");
        }

        const dateEffective = formatDate(memorandum.dateEffective);
        const dateExpiration = memorandum.dateExpiration === null ? "No expiration" : formatDate(memorandum.dateExpiration);
        const collegeInitiator = memorandum.collegeInitiator === null ? "No college initiator" : memorandum.collegeInitiator;

        const linkages = memorandum.memorandumlinkageSet.reduce((linkageCode, linkagesString, index, array) => {
            const linkage = settings.linkages[linkageCode];

            linkagesString += `${linkage} `;

            if (index + 1 !== array.length) {
                linkagesString += ",";
            }

            return linkagesString;
        }, "No linkages");

        return (
            <Card>
                <CardHeader className={cardHeaderClass} onClick={this.props.toggle}>
                    Effective {dateEffective}
                </CardHeader>

                <Collapse isOpen={this.props.isOpen}>
                    <CardBody className="p-0">
                        <SectionTable>
                            <SectionRow>
                                <SectionRowTitle>Date Expiration</SectionRowTitle>
                                <SectionRowContentLarge>{dateExpiration}</SectionRowContentLarge>
                            </SectionRow>

                            <SectionRow>
                                <SectionRowTitle>College Initiator</SectionRowTitle>
                                <SectionRowContentLarge>{collegeInitiator}</SectionRowContentLarge>
                            </SectionRow>

                            <SectionRow>
                                <SectionRowTitle>Linkages</SectionRowTitle>
                                <SectionRowContentLarge>{linkages}</SectionRowContentLarge>
                            </SectionRow>

                            <SectionRow>
                                <Button outline color="primary">Open Memorandum Copy</Button>
                            </SectionRow>
                        </SectionTable>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}


export default Memorandums;