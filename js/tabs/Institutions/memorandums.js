import React, { Component } from "react";
import {
    Button,
    Card,
    CardHeader,
    Collapse,
} from "reactstrap";
import graphql from "../../graphql";


class Memorandums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing : "MOU",
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
                                                toggle={this.onUnderstandingClick}/>
                    <MemorandumsOfAgreement showing={this.state.showing === "MOA"} toggle={this.onAgreementClick}/>
                </div>
                <small className="section-footer">Select a memorandum type to reveal details.</small>
            </div>
        );
    }
}

class MemorandumsOfUnderstanding extends Component {
    constructor(props) {
        super(props);
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
                    BODY!
                </Collapse>
            </Card>
        );
    }
}

class MemorandumsOfAgreement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cardHeaderClass = "d-flex flex-row align-items-center ";

        if (!this.props.showing) {
            cardHeaderClass += "collapsed";
        }

        return (
            <Card>
                <CardHeader className={cardHeaderClass} onClick={this.props.toggle}>
                    <h5 className="mr-auto mb-0">Memorandums of Agreement</h5>
                    <Button outline size="sm" color="success" className="add-memorandum-btn">Add a new version</Button>
                </CardHeader>

                <Collapse isOpen={this.props.showing}>
                    BODY!
                </Collapse>
            </Card>
        );
    }
}

class MemorandumVersionRow extends Component {
    //TODO
}

export default Memorandums;