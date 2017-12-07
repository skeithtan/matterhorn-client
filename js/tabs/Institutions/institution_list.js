import React, { Component } from "react";
import LoadingSpinner from "../../components/loading";

import {
    Input,
    Button,
} from "reactstrap";

import {
    CollapseButton,
    CollapseContent,
    ExpandContent,
} from "../../components/collapse_content";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
    SectionRowContent,
} from "../../components/section";


class InstitutionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword : null,
            collapsed : false,
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.setSearchKeyword = this.setSearchKeyword.bind(this);
        this.getFilteredInstitutions = this.getFilteredInstitutions.bind(this);
    }

    setSearchKeyword(searchString) {
        //If the string is empty, that means the user isn't searching at all
        const searchKeyword = searchString === "" ? null : searchString;
        this.setState({
            searchKeyword : searchKeyword,
        });
    }

    getFilteredInstitutions() {
        if (this.props.institutions === null || this.state.searchKeyword === null) {
            return null;
        }

        let filtered = [];
        const searchKeyword = this.state.searchKeyword.toLowerCase();

        this.props.institutions.forEach(country => {
            // Array of institutions from this country that conforms to search
            country.institutions.forEach(institution => {
                const institutionName = institution.name.toLowerCase();
                if (institutionName.includes(searchKeyword)) {
                    filtered.push(institution.id);
                }
            });
        });

        return filtered;
    }

    toggleCollapse() {
        this.setState({
            collapsed : !this.state.collapsed,
        });
    };

    render() {
        const isSearching = this.state.searchKeyword !== null;
        //Show all institutions or, if it has a filter, show the filtered?
        // const showingInstitutions = isSearching ? this.getFilteredInstitutions() : this.props.institutions;

        let className = "sidebar h-100 collapsible ";
        if (this.state.collapsed) {
            className += "collapsed";
        }

        return (
            <div className={ className }
                 id="institution-list">
                <ExpandContent className="d-flex flex-column h-100">
                    <InstitutionListHead setSearchKeyword={ this.setSearchKeyword }
                                         toggleAddInstitution={ this.props.toggleAddInstitution }
                                         toggleCollapse={ this.toggleCollapse }/>
                    <InstitutionListTable countries={ this.props.institutions }
                                          filtered={ this.getFilteredInstitutions() }
                                          isSearching={ isSearching }
                                          toggleAddInstitution={ this.props.toggleAddInstitution }
                                          activeInstitution={ this.props.activeInstitution }
                                          setActiveInstitution={ this.props.setActiveInstitution }/>
                </ExpandContent>

                <CollapseContent title="Institutions"
                                 toggle={ this.toggleCollapse }/>
            </div>
        );
    }
}

class InstitutionListHead extends Component {
    constructor(props) {
        super(props);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
    }

    onSearchInputChange(event) {
        const searchInput = event.target.value;
        this.props.setSearchKeyword(searchInput);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <CollapseButton toggleCollapse={ this.props.toggleCollapse }/>

                    { localStorage.userType !== "program_assistant" && <Button outline
                                                                               color="success"
                                                                               size="sm"
                                                                               className="ml-auto"
                                                                               onClick={ this.props.toggleAddInstitution }>Add</Button> }
                </div>
                <h4 className="page-head-title">Institutions</h4>
                <Input type="search"
                       placeholder="Search"
                       className="search-input"
                       onChange={ this.onSearchInputChange }/>
            </div>
        );
    }
}

class InstitutionListTable extends Component {
    constructor(props) {
        super(props);
        this.emptyState = this.emptyState.bind(this);
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Institutions will show up here.</p>
                <Button outline
                        color="success"
                        onClick={ this.props.toggleAddInstitution }>Add an Institution</Button>
            </div>
        );
    }

    static noResultsState() {
        return (
            <div className="loading-container">
                <h3>No results found</h3>
            </div>
        );
    }

    render() {
        if (this.props.countries === null) {
            return <LoadingSpinner/>;
        }

        const filtered = this.props.filtered;

        if (this.props.isSearching && filtered.length === 0) {
            return InstitutionListTable.noResultsState();
        }

        //If we're searching, that means there are simply no results if length == 0
        //If we're not searching, we really just don't have any data
        if (this.props.countries.length === 0) {
            return this.emptyState();
        }


        const sections = this.props.countries.map((country, index) => {

            let collapsed = false;

            if (this.props.isSearching) {
                collapsed = true;

                country.institutions.forEach(institution => {
                    if (filtered.includes(institution.id)) {
                        collapsed = false;
                    }
                });
            }

            return <InstitutionSection title={ country.name }
                                       institutions={ country.institutions }
                                       key={ index }
                                       collapsed={ collapsed }
                                       filtered={ this.props.filtered }
                                       activeInstitution={ this.props.activeInstitution }
                                       setActiveInstitution={ this.props.setActiveInstitution }/>;
        });

        return (
            <div className="page-body">
                { sections }
            </div>
        );
    }
}

class InstitutionSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.institutions.map(institution => {
            let isActive = false;

            if (this.props.activeInstitution !== null) {
                const activeInstitutionId = this.props.activeInstitution.id.toString();
                isActive = activeInstitutionId === institution.id;
            }

            const setActiveInstitution = () => this.props.setActiveInstitution(institution);


            let collapsed = false;
            if (this.props.filtered !== null) {
                collapsed = !this.props.filtered.includes(institution.id);
            }

            return (
                <SectionRow selectable
                            onClick={ setActiveInstitution }
                            active={ isActive }
                            collapsed={ collapsed }
                            key={ institution.id }>
                    <SectionRowContent>{ institution.name }</SectionRowContent>
                </SectionRow>
            );
        });

        return (
            <Section collapsed={ this.props.collapsed }>
                <SectionTitle>{ this.props.title }</SectionTitle>
                <SectionTable>
                    { rows }
                </SectionTable>
            </Section>
        );
    }
}

export default InstitutionList;