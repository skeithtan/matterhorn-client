import React, { Component } from "react";

class ProgramListTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const terms = this.props.terms.map((term, index) => {
            return <ProgramListTerm term={ term }
                                    key={ index }
                                    onClick={ () => this.props.setActiveTerm(term.number) }
                                    isActive={ this.props.activeTerm === term.number }/>;
        });

        return (
            <div className="tab-bar">
                <ul className="p-3 justify-content-center mb-0 d-flex flex-row">
                    { terms }
                </ul>
            </div>
        );
    }
}

class ProgramListTerm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let textClass = "ml-4 font-weight-bold mb-0 ";
        textClass += this.props.isActive ? "text-dlsu" : "text-secondary";

        return (
            <li className="d-flex selectable-tab" onClick={ this.props.onClick }>
                <small className={ textClass }>{ this.props.term.name }</small>
            </li>
        );
    }
}

export default ProgramListTabBar;