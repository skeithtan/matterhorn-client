import React, { Component } from "react";
import {
    Button,
} from "reactstrap";

class Programs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // w-100 was something I added. If it breaks, this might be it.
            <div className="d-flex flex-column p-0 h-100 w-100">
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
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">
                        University Name
                        <small className="text-muted ml-2">Country</small>
                    </h4>
                </div>
                <Button outline size="sm" color="success">Add Program</Button>
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