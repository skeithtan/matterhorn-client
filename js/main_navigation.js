import React, { Component } from "react";
import {
    Nav,
    Navbar,
    NavItem,
    Button,
} from "reactstrap";
import getTabs from "./tabs/tabs_list";


class MainNavigation extends Component {
    render() {
        const tabs = getTabs();

        const navItems = tabs.map((tab, index) => {
            const isActive = this.props.activeTab.name === tab.name;

            return <TabItem key={ index }
                            name={ tab.name }
                            image={ tab.image }
                            isActive={ isActive }
                            navigationIsExpanded={ this.props.isExpanded }
                            toggleNavigation={ this.props.toggleNavigation }
                            setActiveTab={ () => this.props.setActiveTab(tab) }/>;
        });

        let navbarClassName = "bg-dlsu d-flex flex-column ";

        if (this.props.isExpanded) {
            navbarClassName += " expanded";
        }

        return (
            <Navbar className={ navbarClassName }
                    id="main-navigation">
                <img src="./images/dlsu_white.png"
                     className="dlsu-logo"/>

                <Nav className="d-flex flex-column w-100"
                     id="main-navigation-tabs">
                    { navItems }
                </Nav>
                <SwitchUserButton toggleNavigation={ this.props.toggleNavigation }
                                  signOut={ this.props.signOut }/>
            </Navbar>
        );
    }
}

class TabItem extends Component {
    render() {
        let className = "align-items-center ";
        if (this.props.isActive) {
            className += "active";
        }

        const onNavItemClick = () => {
            if (this.props.navigationIsExpanded) {
                this.props.toggleNavigation();
            }

            this.props.setActiveTab();
        };

        return (
            <NavItem className={ className }
                     onClick={ onNavItemClick }>
                <h6 className="mb-0 text-white sidebar-tab-description">{ this.props.name }</h6>
                <img src={ this.props.image }
                     className="sidebar-image"/>
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
                <div id="switch-user-button"
                     onClick={ this.togglePopover }
                     className="p-3 d-flex align-items-center">
                    <div className="mr-auto text-left">
                        <h6 className="mb-0">Hello,</h6>
                        <h5 className="mb-0">{ localStorage.username }</h5>
                    </div>
                    <Button outline
                            color="light"
                            onClick={ this.props.signOut }
                            size="sm">Sign out</Button>
                </div>


                <button className="expand-button"
                        onClick={ this.props.toggleNavigation }>
                    <img src="./images/hamburger.png"/>
                </button>
            </div>
        );
    }
}

export default MainNavigation;