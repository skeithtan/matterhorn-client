import React, { Component } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Collapse,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import moment from "moment";


class Memorandums extends Component {
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
            const aTime = a.versionDate;
            const bTime = b.versionDate;

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

        this.onAgreementClick = this.onAgreementClick.bind(this);
        this.onUnderstandingClick = this.onUnderstandingClick.bind(this);
    }

    onUnderstandingClick() {
        const newShowing = this.state.showing === "MOU" ? null : "MOU";

        this.setState({
            showing : newShowing,
        });
    }

    onAgreementClick() {
        const newShowing = this.state.showing === "MOA" ? null : "MOA";

        this.setState({
            showing : newShowing,
        });
    }

    render() {
        return (
            <div className="mb-4">
                <small className="section-title">Memorandums</small>
                <div id="memorandums-accordion">
                    <MemorandumsOfUnderstanding showing={this.state.showing === "MOU"}
                                                memorandums={this.state.understandings}
                                                toggle={this.onUnderstandingClick}/>
                    <MemorandumsOfAgreement showing={this.state.showing === "MOA"}
                                            memorandums={this.state.agreements}
                                            toggle={this.onAgreementClick}/>
                </div>
                <small className="section-footer">Select a memorandum type to reveal details.</small>
            </div>
        );
    }
}

class MemorandumsOfUnderstanding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestMemorandum : null,
            previousMemorandums : [],
            showingMemorandumId : null,
        };

        if (props.memorandums.length > 0) {
            // This is sorted by date so latest version is the one on top
            this.state.latestMemorandum = props.memorandums[0];
            this.state.previousMemorandums = props.memorandums.splice(1); //Everything else
        }

        this.emptyState = this.emptyState.bind(this);
        this.getCollapseContent = this.getCollapseContent.bind(this);
        this.memorandumIsShowing = this.memorandumIsShowing.bind(this);
        this.makeMemorandumShowing = this.makeMemorandumShowing.bind(this);
    }

    emptyState() {
        return (
            <div className="p-5 text-center text-muted">
                <h5 className="mb-0">There are no Memorandums of Understanding for this institution.</h5>
            </div>
        );
    }

    makeMemorandumShowing(memorandum) {
        // If there are no showing memorandums or if the memorandum showing is not the one clicked
        if (this.state.showingMemorandumId === null || this.state.showingMemorandumId !== memorandum.id) {
            this.setState({
                showingMemorandumId : memorandum.id,
            });
        } else {
            // If the showing memorandum is clicked, collapse it
            this.setState({
                showingMemorandumId : null,
            });
        }
    }

    memorandumIsShowing(memorandum) {
        if (this.state.showingMemorandumId === null) {
            return false;
        }

        return this.state.showingMemorandumId === memorandum.id;
    }

    getCollapseContent() {
        if (this.state.latestMemorandum === null) {
            return this.emptyState();
        }

        const previousMemorandums = this.state.previousMemorandums.map(memorandum => {
            return <MemorandumRow memorandum={memorandum} isOpen={this.memorandumIsShowing(memorandum)}
                                  toggle={() => this.makeMemorandumShowing(memorandum)}/>;
        });

        const hasPreviousMemorandums = previousMemorandums.length !== 0;

        return (
            <CardBody className="pt-0">
                <small className="section-title">Latest Memorandum</small>
                <MemorandumRow memorandum={this.state.latestMemorandum}
                               isOpen={this.memorandumIsShowing(this.state.latestMemorandum)}
                               toggle={() => this.makeMemorandumShowing(this.state.latestMemorandum)}/>

                {hasPreviousMemorandums && <small className="section-title">Previous Memorandums</small>}
                {previousMemorandums}
            </CardBody>
        );
    }

    render() {
        let cardHeaderClass = "d-flex flex-row align-items-center ";

        if (!this.props.showing) {
            cardHeaderClass += "collapsed";
        }

        return (
            <Card>
                <CardHeader className={cardHeaderClass} onClick={this.props.toggle}>
                    <h5 className="mr-auto mb-0">Memorandums of Understanding</h5>
                    <Button outline size="sm" color="success" className="add-memorandum-btn">Add a new version</Button>
                </CardHeader>

                <Collapse isOpen={this.props.showing}>
                    {this.getCollapseContent()}
                </Collapse>
            </Card>
        );
    }
}

class MemorandumsOfAgreement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestMemorandum : null,
            previousMemorandums : [],
            showingMemorandumId : null,
        };

        if (props.memorandums.length > 0) {
            // This is sorted by date so latest version is the one on top
            this.state.latestMemorandum = props.memorandums[0];
            this.state.previousMemorandums = props.memorandums.splice(1); //Everything else
        }

        this.emptyState = this.emptyState.bind(this);
        this.getCollapseContent = this.getCollapseContent.bind(this);
        this.memorandumIsShowing = this.memorandumIsShowing.bind(this);
        this.makeMemorandumShowing = this.makeMemorandumShowing.bind(this);
    }

    emptyState() {
        return (
            <div className="p-5 text-center text-muted">
                <h5 className="mb-0">There are no Memorandums of Agreement for this institution.</h5>
            </div>
        );
    }

    makeMemorandumShowing(memorandum) {
        // If there are no showing memorandums or if the memorandum showing is not the one clicked
        if (this.state.showingMemorandumId === null || this.state.showingMemorandumId !== memorandum.id) {
            this.setState({
                showingMemorandumId : memorandum.id,
            });
        } else {
            // If the showing memorandum is clicked, collapse it
            this.setState({
                showingMemorandumId : null,
            });
        }
    }

    memorandumIsShowing(memorandum) {
        if (this.state.showingMemorandumId === null) {
            return false;
        }

        return this.state.showingMemorandumId === memorandum.id;
    }

    getCollapseContent() {
        if (this.state.latestMemorandum === null) {
            return this.emptyState();
        }

        const previousMemorandums = this.state.previousMemorandums.map(memorandum => {
            return <MemorandumRow memorandum={memorandum} isOpen={this.memorandumIsShowing(memorandum)}
                                  toggle={() => this.makeMemorandumShowing(memorandum)}/>;
        });

        const hasPreviousMemorandums = previousMemorandums.length !== 0;

        return (
            <CardBody className="pt-0">
                <small className="section-title">Latest Memorandum</small>
                <MemorandumRow memorandum={this.state.latestMemorandum}
                               isOpen={this.memorandumIsShowing(this.state.latestMemorandum)}
                               toggle={() => this.makeMemorandumShowing(this.state.latestMemorandum)}/>

                {hasPreviousMemorandums && <small className="section-title">Previous Memorandums</small>}
                {previousMemorandums}
            </CardBody>
        );
    }

    render() {
        let cardHeaderClass = "d-flex flex-row align-items-center ";

        if (!this.props.showing) {
            cardHeaderClass += "collapsed";
        }

        this.getCollapseContent();

        return (
            <Card>
                <CardHeader className={cardHeaderClass} onClick={this.props.toggle}>
                    <h5 className="mr-auto mb-0">Memorandums of Agreement</h5>
                    <Button outline size="sm" color="success" className="add-memorandum-btn">Add a new version</Button>
                </CardHeader>

                <Collapse isOpen={this.props.showing}>
                    {this.getCollapseContent()}
                </Collapse>
            </Card>
        );
    }
}

class MemorandumRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        let cardHeaderClass = this.props.showing ? "" : "collapsed";
        const memorandum = this.props.memorandum;

        function formatDate(date) {
            return date.format("LL");
        }

        const versionDate = formatDate(memorandum.versionDate);
        const dateEffective = formatDate(memorandum.dateEffective);
        const dateExpiration = memorandum.dateExpiration === null ? "No expiration" : formatDate(memorandum.dateExpiration);
        const collegeInitiator = memorandum.collegeInitiator === null ? "No college initiator" : memorandum.collegeInitiator;

        return (
            <Card>
                <CardHeader className={cardHeaderClass} onClick={this.props.toggle}>
                    Version {versionDate}
                </CardHeader>

                <Collapse isOpen={this.props.isOpen}>
                    <CardBody className="p-0">
                        <ListGroup>
                            <MemorandumDetailRow fieldName="Date Effective"
                                                 fieldValue={dateEffective}/>
                            <MemorandumDetailRow fieldName="Date Expiration"
                                                 fieldValue={dateExpiration}/>
                            <MemorandumDetailRow fieldName="College Initiator"
                                                 fieldValue={collegeInitiator}/>
                            <ListGroupItem>
                                <Button outline color="primary">Open Memorandum Copy</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}

class MemorandumDetailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <small className="font-weight-bold">{this.props.fieldName}</small>
                <p className="mb-0">{this.props.fieldValue}</p>
            </ListGroupItem>
        );
    }
}

export default Memorandums;