import React, { Component } from "react";
import tabs from "./tabs/institution_tabs_list";
import InstitutionDetailTabBar from "./tabs/institution_detail_tabs";


class InstitutionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab : tabs[0],
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    static unselectedState() {
        return (
            <div className="loading-container">
                <h3>Select an institution to see its details</h3>
            </div>
        );
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
        });
    }

    render() {
        if (this.props.institution === null) {
            return InstitutionDetail.unselectedState();
        }

        const currentTab = this.state.activeTab.tab(this.props.institution, this.props.onDeleteActiveInstitution, this.props.refreshInstitutions);

        return (
            <div id="institution-detail" className="container-fluid d-flex flex-column p-0 h-100">
                <div id="tab-content">{currentTab}</div>
                <InstitutionDetailTabBar setActiveTab={this.setActiveTab} activeTab={this.state.activeTab} tabs={tabs}/>
            </div>

        );
    }
}

export default InstitutionDetail;