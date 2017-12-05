import React, { Component } from "react";
import tabs from "./tabs/application_tabs_list";
import TabBar from "../../components/tab_bar";

class ApplicationDetail extends Component {
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
                <h3>Select a student to see its details</h3>
            </div>
        );
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
        });
    }

    render() {
        if (this.props.student === null) {
            return ApplicationDetail.unselectedState();
        }

        const currentTab = this.state.activeTab.tab(this.props.inbound, this.props.student, this.props.refreshStudents);

        return (
            <div id="application-detail"
                 className="w-100 d-flex flex-row">
                <div className="container-fluid d-flex flex-column p-0 h-100">
                    <div className="tab-content">{ currentTab }</div>
                    <TabBar setActiveTab={ this.setActiveTab }
                            activeTab={ this.state.activeTab }
                            tabs={ tabs }/>
                </div>
            </div>
        );
    }
}

export default ApplicationDetail;