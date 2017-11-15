import React, { Component } from "react";
import tabs from "./tabs/home_tabs_list";
import TabBar from "../../components/tab_bar";


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

    render() {
        return (
            <div id="home"
                 className="d-flex flex-column p-0 h-100 w-100">
                <div id="tab-content">{this.state.activeTab.tab}</div>
                <TabBar setActiveTab={this.setActiveTab}
                        activeTab={this.state.activeTab}
                        tabs={tabs}/>
            </div>
        );
    }
}

export default Home;