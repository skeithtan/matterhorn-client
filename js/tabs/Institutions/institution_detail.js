import React, { Component } from "react";
import tabs from "./tabs/institution_tabs_list";
import InstitutionDetailTabBar from "./tabs/institution_detail_tabs";


class InstitutionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab : tabs[0],
            sidebarContent : null,
        };

        this.setSidebarContent = this.setSidebarContent.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
    }

    static unselectedState() {
        return (
            <div className="loading-container">
                <h3>Select an institution to see its details</h3>
            </div>
        );
    }

    setSidebarContent(sidebarContent) {
        this.setState({
            sidebarContent : sidebarContent,
        });
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
            sidebarContent : null,
        });
    }

    render() {
        if (this.props.institution === null) {
            return InstitutionDetail.unselectedState();
        }

        const currentTab = this.state.activeTab.tab(this.props.institution, this.setSidebarContent, this.props.onDeleteActiveInstitution, this.props.refreshInstitutions);

        return (
            <div id="institution-detail" className="w-100 d-flex flex-row">
                <div className="container-fluid d-flex flex-column p-0 h-100">
                    <div id="tab-content">{currentTab}</div>
                    <InstitutionDetailTabBar setActiveTab={this.setActiveTab} activeTab={this.state.activeTab}
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

export default InstitutionDetail;