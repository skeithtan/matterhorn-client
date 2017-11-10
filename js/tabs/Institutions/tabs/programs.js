import React, { Component } from "react";
import graphql from "../../../graphql";
import LoadingSpinner from "../../../loading";

// TODO: Function for fetching the academic year

class Programs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="institution-programs" className="d-flex flex-row p-0 h-100">
                {/* Academic Year List */}
                {/* Term List w/ Academic Year Details */}
                {/* Program List w/ Term Details */}
                {/* Student List w/ Program Details */}
            </div>
        );
    }
}

export default Programs;