import React, { Component } from "react";
import {
    ListGroup,
    ListGroupItem,
} from "reactstrap";


class Section extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="section">
                {this.props.children}
            </div>
        );
    }
}

class SectionTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <small className="section-title">{this.props.children}</small>;
    }
}

class SectionFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <small className="section-footer">{this.props.children}</small>;
    }
}

class SectionTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ListGroup className={this.props.className}>{this.props.children}</ListGroup>;
    }
}

class SectionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem onClick={this.props.onClick} className={`section-row ${this.props.className || ""}`}>
                {this.props.children}
            </ListGroupItem>
        );
    }
}

class SectionRowTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <small className="font-weight-bold">{this.props.children}</small>;
    }
}

class SectionRowContentLarge extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className={`lead m-0 ${this.props.className || ""}`}
                  onClick={this.props.onClick}>{this.props.children}</p>;
    }
}

class SectionRowContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className={`m-0 ${this.props.className || ""}`}
                  onClick={this.props.onClick}>{this.props.children}</p>;
    }
}

class SectionRowSelectable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isActive) {
            return <ListGroupItem className="section-row active">{this.props.children}</ListGroupItem>;
        } else {
            return <ListGroupItem className="section-row"
                                  onClick={this.props.onClick}>{this.props.children}</ListGroupItem>;
        }
    }
}

export {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionFooter,
    SectionRowContentLarge,
    SectionRowContent,
    SectionRowSelectable,
};