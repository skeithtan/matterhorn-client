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

class InstitutionList extends Component {
    constructor(props) {
        super(props);
        setActiveInstitution = props.setActiveInstitution;
    }

    render() {
        activeInstitution = this.props.activeInstitution;

        return (
            <div className="sidebar h-100" id="institution-list">
                <InstitutionListHead/>
                <InstitutionListTable countries={this.props.institutions}
                                      setActiveInstitution={this.props.setActiveInstitution}/>
            </div>
        );
    }
}

class InstitutionListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <Button outline color="success" size="sm" className="ml-auto">Add</Button>
                </div>
                <h4 className="page-head-title">Institutions</h4>
                <Input placeholder="Search" className="search-input mt-2"/>
            </div>
        );
    }
}

class InstitutionListTable extends Component {
    constructor(props) {
        super(props);
    }

    static emptyState() {

    }

    render() {
        if (this.props.countries === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.countries.length === 0) {
            return InstitutionListTable.emptyState();
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