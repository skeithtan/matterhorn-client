import React, { Component } from "react";
import {
    Button,
    Input,
} from "reactstrap";

class Programs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column">
                <ProgramsHead/>
                <ProgramsBody/>
            </div>
        );
    }
}

class ProgramsHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-column align-items-center">
                <div className="d-flex flex-row w-100 mb-2 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Programs</h5>
                        <h4 className="page-head-title mb-0">Institution name</h4>
                    </div>
                    <div>
                        <button className="ml-auto btn btn-outline-success btn-sm">Add</button>
                    </div>
                </div>
                <Input type="search" placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class ProgramsBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">

            </div>
        );
    }
}

class Program extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export default Programs;