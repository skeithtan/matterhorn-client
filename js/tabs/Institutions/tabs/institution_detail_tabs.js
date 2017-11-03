import React, {Component} from "react";

class InstitutionDetailTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tabs = this.props.tabs.map((tab, index) => {
            return <InstitutionDetailTab
                tab={tab}
                key={index}
                onClick={() => this.props.setActiveTab(tab)}
                isActive={this.props.activeTab === tab}
            />;
        });

        return (
            <div id="institution-navigation">
                <ul className="p-3 justify-content-center mb-0 d-flex flex-row">
                    {tabs}
                </ul>
            </div>
        )
    }
}


class InstitutionDetailTab extends Component {
    constructor(props) {
        super(props);

        this.activeTab = this.activeTab.bind(this);
        this.inactiveTab = this.inactiveTab.bind(this);
    }

    activeTab() {
        return (
            <li className="col-lg-2 d-flex flex-row justify-content-center align-items-center"
                onClick={this.props.onClick}>
                <img className="nav-image" src={this.props.tab.activeImage}/>
                <small className="ml-2 font-weight-bold mb-0 text-dlsu">{this.props.tab.name}</small>
            </li>
        );
    }

    inactiveTab() {
        return (
            <li className="col-lg-2 d-flex flex-row justify-content-center align-items-center"
                onClick={this.props.onClick}>
                <img className="nav-image" src={this.props.tab.image}/>
                <small className="ml-2 font-weight-bold mb-0 text-secondary">{this.props.tab.name}</small>
            </li>
        );
    }

    render() {
        return this.props.isActive ? this.activeTab() : this.inactiveTab();
    }
}

export default InstitutionDetailTabBar;