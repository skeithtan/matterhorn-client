import React, { Component } from "react";


class CollapseContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`collapse-content ${this.props.className || ""}`} onClick={this.props.expand}>
                <img src="./images/expand.png" className="expand-image"/>
                <h4>{this.props.title}</h4>
            </div>
        );
    }
}

class ExpandContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`expand-content ${this.props.className || ""}`}>
                {this.props.children}
            </div>
        );
    }
}

export {
    CollapseContent,
    ExpandContent,
};