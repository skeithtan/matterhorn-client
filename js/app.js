import React, { Component } from "react";
import MainNavigation from "./main_navigation";
import getTabs from "./tabs/tabs_list";


class App extends Component {
    constructor(props) {
        super(props);
        const tabs = getTabs();


        this.state = {
            activeTab : tabs[0], // Default tab is reminders
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
                                toggleNavigation={this.toggleNavigation} isExpanded={this.state.navigationIsExpanded}
                                signOut={this.props.signOut}/>
                <div id="content" className="w-100 page-body">
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
