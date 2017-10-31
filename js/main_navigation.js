import React, { Component } from "react";
import $ from "jquery";
import tabs from "./tabs/tabs_list";
import {
    Nav,
    Navbar,
    NavItem,
} from "reactstrap";



class MainNavigation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        const navItems = tabs.map((tab, index) => {
            const isActive = this.props.activeTab === tab;
            return <TabItem name={tab.name} image={tab.image} key={index} isActive={isActive}
                            setActiveTab={() => this.props.setActiveTab(tab)}/>;
        });

        return (
            <Navbar className="bg-dlsu d-flex flex-column justify-content-center" id="main-navigation">
                <Nav className="d-flex flex-column w-100">
                    {navItems}
                </Nav>
            </Navbar>
        );
    }
}

class TabItem extends Component {
    constructor(props) {
        super(props);
    }

    activeTab() {
        return (
            <NavItem className="active" data-toggle="tooltip" data-placement="right" title={this.props.name}>
                <img src={this.props.image} className="sidebar-image"/>
            </NavItem>
        );
    }

    inactiveTab() {
        return (
            <NavItem data-toggle="tooltip" data-placement="right" title={this.props.name}>
                <img src={this.props.image} className="sidebar-image" onClick={this.props.setActiveTab}/>
            </NavItem>
        );
    }

    render() {
        return this.props.isActive ? this.activeTab() : this.inactiveTab();
    }
}

export default MainNavigation;