import React, { Component } from "react";
import MainNavigation from "./main_navigation";
import tabs from "./tabs/tabs_list";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab : tabs[1],
            navigationIsExpanded : false,
        };

        this.setActiveTab = this.setActiveTab.bind(this);
        this.toggleNavigation = this.toggleNavigation.bind(this);
    }

    toggleNavigation() {
        this.setState({
            navigationIsExpanded : !this.state.navigationIsExpanded,
        });
    }

    setActiveTab(newTab) {
        this.setState({
            activeTab : newTab,
        });
    }


    render() {
        return (
            <div className="h-100 d-flex">
                <MainNavigation activeTab={this.state.activeTab} setActiveTab={this.setActiveTab}
                                toggleNavigation={this.toggleNavigation} isExpanded={this.state.navigationIsExpanded}/>
                <div id="content" className="w-100">
                    <div id="black-covering" onClick={this.toggleNavigation}
                         className={this.state.navigationIsExpanded && "showing"}>

                    </div>
                    {this.state.activeTab.tab}
                </div>
            </div>
        );
    }
}

export default App;
