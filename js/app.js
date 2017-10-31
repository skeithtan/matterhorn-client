import React, { Component } from "react";
import MainNavigation from "./main_navigation";
import tabs from "./tabs/tabs_list";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab : tabs[1],
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(newTab) {
        this.setState({
            currentTab : newTab,
        });
    }


    render() {
        return (
            <div className="h-100 d-flex">
                <MainNavigation activeTab={this.state.currentTab} setActiveTab={this.setActiveTab}/>
                {this.state.currentTab.tab}
            </div>
        );
    }
}

export default App;
