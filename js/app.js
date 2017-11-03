import React, { Component } from "react";
import MainNavigation from "./main_navigation";
import tabs from "./tabs/tabs_list";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : tabs[1],
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(newTab) {
        this.setState({
            activeTab : newTab,
        });
    }


    render() {
        return (
            <div className="h-100 d-flex">
                <MainNavigation activeTab={this.state.activeTab} setActiveTab={this.setActiveTab}/>
                {this.state.activeTab.tab}
            </div>
        );
    }
}

export default App;
