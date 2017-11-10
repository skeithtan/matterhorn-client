import React, { Component } from "react";

class ProgramListTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="institution-navigation">
                <ul className="p-3 justify-content-center mb-0 d-flex flex-row">
                    <li className="d-flex">
                        <small className="ml-4 font-weight-bold mb-0 ">Term 1</small>
                    </li>
                    <li className="d-flex">
                        <small className="ml-4 font-weight-bold mb-0 ">Term 2</small>
                    </li>
                    <li className="d-flex">
                        <small className="ml-4 font-weight-bold mb-0 ">Term 3</small>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ProgramListTabBar;