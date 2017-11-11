import React, { Component } from "react";
import tabs from "./tabs/home_tabs_list";
import HomeTabBar from "./tabs/home_tabs";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab : tabs[0],
            sidebarContent : null,
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
        });
    }

    setSidebarContent(content) {
        this.setState({
            sidebarContent : content,
        });
    }

    render() {
        const currentTab = this.state.activeTab.tab;
        return (
            <div id="home" className="container-fluid d-flex flex-row p-0 h-100">
                <div className="d-flex flex-column p-0 h-100 w-100">
                    <div id="tab-content">{currentTab}</div>
                    <HomeTabBar setActiveTab={this.setActiveTab}
                                activeTab={this.state.activeTab}
                                tabs={tabs}/>
                </div>
                {this.state.sidebarContent !== null &&
                <div className="sidebar-right">
                    {this.state.sidebarContent}
                </div>
                }
            </div>
        );
    }
}

export default Home;