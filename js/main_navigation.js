import React, { Component } from "react";
import $ from "jquery";
import tabs from "./tabs/tabs_list";
import signOut from "./index";
import {
    Nav,
    Navbar,
    NavItem,
    Popover,
    PopoverBody,
    Button,
} from "reactstrap";


class MainNavigation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $("[data-toggle=\"tooltip\"]").tooltip();
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
                <SwitchUserButton/>
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

class SwitchUserButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverIsOpen : false,
        };

        this.togglePopover = this.togglePopover.bind(this);
    }

    togglePopover() {
        this.setState({
            popoverIsOpen : !this.state.popoverIsOpen,
        });
    }


    render() {
        return (
            <div className="w-100">
                <div id="switch-user-button" onClick={this.togglePopover}>
                    <h6>{localStorage.username}</h6>
                </div>
                <Popover placement="right" isOpen={this.state.popoverIsOpen} target="switch-user-button"
                         toggle={this.togglePopover}>
                    <PopoverBody>
                        <Button className={"bg-dlsu"} onClick={signOut}>Sign out</Button>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default MainNavigation;