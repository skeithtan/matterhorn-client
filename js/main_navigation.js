import React, { Component } from "react";
import tabs from "./tabs/tabs_list";
import {
    Nav,
    Navbar,
    NavItem,
    Button,
} from "reactstrap";


class MainNavigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navItems = tabs.map((tab, index) => {
            const isActive = this.props.activeTab === tab;
            return <TabItem key={index}
                            name={tab.name}
                            image={tab.image}
                            isActive={isActive}
                            navigationIsExpanded={this.props.isExpanded}
                            toggleNavigation={this.props.toggleNavigation}
                            setActiveTab={() => this.props.setActiveTab(tab)}/>;
        });

        let navbarClassName = "bg-dlsu d-flex flex-column justify-content-center";

        if (this.props.isExpanded) {
            navbarClassName += " expanded";
        }

        return (
            <Navbar className={navbarClassName} id="main-navigation">
                <img src="./images/dlsu_white.png" className="dlsu-logo"/>

                <Nav className="d-flex flex-column w-100" id="main-navigation-tabs">
                    {navItems}
                </Nav>
                <SwitchUserButton toggleNavigation={this.props.toggleNavigation} signOut={this.props.signOut}/>
            </Navbar>
        );
    }
}

class TabItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const className = this.props.isActive ? "active" : "";
        const onNavItemClick = () => {

            if (this.props.navigationIsExpanded) {
                this.props.toggleNavigation();
            }

            this.props.setActiveTab();
        };

        return (
            <NavItem className={className} onClick={onNavItemClick}>
                <div className="d-flex flex-row align-items-center tab-set">
                    <h5 className="mb-0 text-white sidebar-tab-description">{this.props.name}</h5>
                    <img src={this.props.image} className="sidebar-image"/>
                </div>
            </NavItem>
        );
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
            <div className="w-100 p-3 d-flex justify-content-center align-content-center">
                <div id="switch-user-button" onClick={this.togglePopover} className="p-3 d-flex align-items-center">
                    <div className="mr-auto text-left">
                        <h6 className="mb-0">Hello,</h6>
                        <h5 className="mb-0">{localStorage.username}</h5>
                    </div>
                    <Button outline color="light" onClick={this.props.signOut} size="sm">Sign out</Button>
                </div>


                <button className="expand-button" onClick={this.props.toggleNavigation}>
                    <img src="./images/hamburger.png"/>
                </button>
            </div>
        );
    }
}

export default MainNavigation;