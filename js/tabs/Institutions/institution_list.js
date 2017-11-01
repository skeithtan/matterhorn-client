import React, { Component } from "react";
import LoadingSpinner from "../../loading";
import {
    Input,
    Button,
    ListGroup,
    ListGroupItem,
} from "reactstrap";


let activeInstitution = null;
let setActiveInstitution = institution => {
};
let toggleAddInstitution = () => {};

class InstitutionList extends Component {
    constructor(props) {
        super(props);
        setActiveInstitution = props.setActiveInstitution;
        toggleAddInstitution = props.toggleAddInstitution;

        this.state = {
            allInstitutions : props.institutions,
            filteredInstitutions : null,
        };

        this.filterInstitutions = this.filterInstitutions.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            allInstitutions : nextProps.institutions,
        });
    }

    filterInstitutions(searchString) {
        // Case insensitive search
        const search = searchString.toLowerCase();

        // No search item means they don't want to filter
        if (search.length === 0) {
            this.setState({
                filteredInstitutions : null,
            });

            return;
        }

        let filtered = [];

        this.state.allInstitutions.forEach(country => {
            // Array of institutions from this country that conforms to search
            const countryFiltered = country.institutionSet.filter(institution => {
                const institutionName = institution.name.toLowerCase();
                return institutionName.includes(search);
            });

            // If country has no matching institutions, don't include in search results
            if (countryFiltered.length > 0) {

                // Create new country object so as not to affect actual country object
                filtered.push({
                    name : country.name,
                    institutionSet : countryFiltered,
                });
            }
        });

        this.setState({
            filteredInstitutions : filtered,
        });
    }

    render() {
        activeInstitution = this.props.activeInstitution;
        const hasFilter = this.state.filteredInstitutions !== null;
        const showingInstitutions = hasFilter ? this.state.filteredInstitutions : this.state.allInstitutions;

        return (
            <div className="sidebar h-100" id="institution-list">
                <InstitutionListHead filterInstitutions={this.filterInstitutions}/>
                <InstitutionListTable countries={showingInstitutions}
                                      hasFilter={hasFilter}
                                      setActiveInstitution={this.props.setActiveInstitution}/>
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
        this.props.filterInstitutions(searchInput);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <Button outline color="success" size="sm" className="ml-auto"
                            onClick={toggleAddInstitution}>Add</Button>
                </div>
                <h4 className="page-head-title">Institutions</h4>
                <Input placeholder="Search" className="search-input mt-2" onChange={this.onSearchInputChange}/>
            </div>
        );
    }
}

class InstitutionListTable extends Component {
    constructor(props) {
        super(props);
    }

    static emptyState() {
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Institutions will show up here.</p>
                <Button outline color="success" onClick={toggleAddInstitution}>Add an Institution</Button>
            </div>
        )
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

        if (this.props.countries.length === 0) {
            return this.props.hasFilter ? InstitutionListTable.noResultsState() : InstitutionListTable.emptyState();
        }


        const sections = this.props.countries.map((country, index) => {
            return <InstitutionSection title={country.name} institutions={country.institutionSet} key={index}/>;
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
        const rows = this.props.institutions.map(institution => <InstitutionRow institution={institution}
                                                                                key={institution.id}/>);

        return (
            <div className="section">
                <small className="section-title">{this.props.title}</small>
                <ListGroup>
                    {rows}
                </ListGroup>
            </div>
        );
    }
}

class InstitutionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isActive = activeInstitution !== null ? this.props.institution.id === activeInstitution.id : false;

        if (isActive) {
            return <ListGroupItem className="bg-dlsu text-white">{this.props.institution.name}</ListGroupItem>;
        } else {
            return <ListGroupItem
                onClick={() => setActiveInstitution(this.props.institution)}>{this.props.institution.name}</ListGroupItem>;
        }
    }
}

export default InstitutionList;