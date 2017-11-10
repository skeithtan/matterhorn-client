import React, { Component } from "react";


class HomeTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="tab-bar">
                <ul className="p-3 justify-content-center mb-0 d-flex flex-row">
                    {tabs}
                </ul>
            </div>
        );

    }
}

class HomeTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export default HomeTabBar;