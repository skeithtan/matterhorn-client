import React, { Component } from "react";
import ProgramList from "./program_list";

class ProgramBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <ProgramList/>
                    { /*Program List Tab Bar*/ }
                </div>
                { /*Student List*/ }
            </div>
        );
    }
}

// TODO
class ProgramListTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

class ProgramListTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

class ProgramDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export default ProgramBody;