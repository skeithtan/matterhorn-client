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
            <div className={`section ${this.props.collapsed && "collapsed"}`}>
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
            <ListGroupItem onClick={this.props.onClick}
                           className={`section-row ${this.props.className || ""} ${this.props.collapsed && "collapsed"}`}
                           active={this.props.active}
                           action={this.props.selectable}>
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

class SectionRowContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className={`m-0 ${this.props.className || ""} ${this.props.large ? "lead" : ""}`}
                  onClick={this.props.onClick}>{this.props.children}</p>;
    }
}


export {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowTitle,
    SectionFooter,
    SectionRowContent,
};