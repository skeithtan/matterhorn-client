import React, { Component } from "react";
import tabs from "./tabs/archives_tabs_list";
import TabBar from "../../components/tab_bar";


class Archives extends Component {
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
            <div id="archives"
                 className="container-fluid d-flex flex-column p-0 h-100 w-100">
                <div className="tab-content">{this.state.activeTab.tab}</div>
                <TabBar setActiveTab={this.setActiveTab}
                        activeTab={this.state.activeTab}
                        tabs={tabs}/>
            </div>
        );
    }
}

export default Archives;