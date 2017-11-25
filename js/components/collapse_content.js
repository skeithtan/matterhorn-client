import React, { Component } from "react";


class CollapseContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`collapse-content ${this.props.className || ""}`}
                 onClick={this.props.toggle}>
                <img src="./images/expand.png"
                     className="expand-image"/>
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

class CollapseButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src="./images/collapse.png"
                 className="collapse-image"
                 onClick={this.props.toggleCollapse}/>
        );
    }
}

export {
    CollapseContent,
    ExpandContent,
    CollapseButton
};