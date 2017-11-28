import React, { Component } from "react";
import tabs from "./tabs/student_tabs_list";
import TabBar from "../../components/tab_bar";


class StudentDetail extends Component {
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
                <h3>Select a student to see its details</h3>
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
        if (this.props.student === null) {
            return StudentDetail.unselectedState();
        }

        const currentTab = this.state.activeTab.tab(this.props.student, this.props.onArchiveActiveStudent, this.props.refreshStudents, this.setSidebarContent);

        let sidebarClass = "sidebar-right ";
        if (this.state.sidebarContent === null) {
            sidebarClass += "dismissed";
        }

        return (
            <div id="student-detail"
                 className="w-100 d-flex flex-row">
                <div className="container-fluid d-flex flex-column p-0 h-100">
                    <div className="tab-content">{currentTab}</div>
                    <TabBar setActiveTab={this.setActiveTab}
                            activeTab={this.state.activeTab}
                            tabs={tabs}/>
                </div>

                <div className={sidebarClass}>
                    {this.state.sidebarContent}
                </div>
            </div>
        );
    }
}

export default StudentDetail;