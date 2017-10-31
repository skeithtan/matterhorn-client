import React, { Component } from "react";
import {
    Input,
    Button,
    ListGroup,
    ListGroupItem,
} from "reactstrap";


class InstitutionList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100" id="institution-list">
                <InstitutionListHead/>
                <InstitutionListTable countries={this.props.institutions}/>
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
                <Input placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class InstitutionListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sections = this.props.countries.map((country, index) => {
            return <InstitutionSection title={country.name} institutions={country.institutions} key={index}/>;
        });

        return (
            <div className="page-body">
                {sections}
            </div>
        )
    }
}

class InstitutionSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.institutions.map(institution => <InstitutionRow name={institution.name}
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
        //TODO: OnClick
        return <ListGroupItem>{this.props.name}</ListGroupItem>;
    }
}

export default InstitutionList;