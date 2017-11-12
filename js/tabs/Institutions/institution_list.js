import React, { Component } from "react";
import LoadingSpinner from "../../components/loading";

import {
    Input,
    Button,
} from "reactstrap";

import {
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

        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
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
            return [];
        }

        let filtered = [];
        const searchKeyword = this.state.searchKeyword.toLowerCase();

        this.props.institutions.forEach(country => {
            // Array of institutions from this country that conforms to search
            const countryFiltered = country.institution_set.filter(institution => {
                const institutionName = institution.name.toLowerCase();
                return institutionName.includes(searchKeyword);
            });

            // If country has no matching institutions, don't include in search results
            if (countryFiltered.length > 0) {

                // Create new country object so as not to affect actual country object
                filtered.push({
                    name : country.name,
                    institution_set : countryFiltered,
                });
            }
        });

        return filtered;
    }

    collapse() {
        this.setState({
            collapsed : true,
        });
    };

    expand() {
        this.setState({
            collapsed : false,
        });
    }

    render() {
        const isSearching = this.state.searchKeyword !== null;
        //Show all institutions or, if it has a filter, show the filtered?
        const showingInstitutions = isSearching ? this.getFilteredInstitutions() : this.props.institutions;

        let className = "sidebar h-100 collapsible ";
        if (this.state.collapsed) {
            className += "collapsed";
        }

        return (
            <div className={className} id="institution-list">
                <ExpandContent className="d-flex flex-column h-100">
                    <InstitutionListHead setSearchKeyword={this.setSearchKeyword}
                                         toggleAddInstitution={this.props.toggleAddInstitution}
                                         collapse={this.collapse}/>
                    <InstitutionListTable countries={showingInstitutions}
                                          isSearching={isSearching}
                                          toggleAddInstitution={this.props.toggleAddInstitution}
                                          activeInstitution={this.props.activeInstitution}
                                          setActiveInstitution={this.props.setActiveInstitution}/>
                </ExpandContent>

                <CollapseContent title="Institutions" expand={this.expand}/>
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
                    <img src="./images/collapse.png" className="collapse-image" onClick={this.props.collapse}/>

                    <Button outline color="success" size="sm" className="ml-auto"
                            onClick={this.props.toggleAddInstitution}>Add</Button>
                </div>
                <h4 className="page-head-title">Institutions</h4>
                <Input type="search" placeholder="Search" className="search-input" onChange={this.onSearchInputChange}/>
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
                <Button outline color="success" onClick={this.props.toggleAddInstitution}>Add an Institution</Button>
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

        //If we're searching, that means there are simply no results if length == 0
        //If we're not searching, we really just don't have any data
        if (this.props.countries.length === 0) {
            return this.props.isSearching ? InstitutionListTable.noResultsState() : InstitutionListTable.emptyState();
        }


        const sections = this.props.countries.map((country, index) => {
            return <InstitutionSection title={country.name} institutions={country.institution_set} key={index}
                                       activeInstitution={this.props.activeInstitution}
                                       setActiveInstitution={this.props.setActiveInstitution}/>;
        });

        return (
            <div className="page-body">
                {sections}
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
                isActive = this.props.activeInstitution.id === institution.id;
            }

            const setActiveInstitution = () => this.props.setActiveInstitution(institution);

            return (
                <SectionRow selectable onClick={setActiveInstitution} active={isActive} key={institution.id}>
                    <SectionRowContent>{institution.name}</SectionRowContent>
                </SectionRow>
            );
        });

        return (
            <Section>
                <SectionTitle>{this.props.title}</SectionTitle>
                <SectionTable>
                    {rows}
                </SectionTable>
            </Section>
        );
    }
}

export default InstitutionList;