import React, { Component } from "react";
import {
    ListGroup,
    ListGroupItem,
} from "reactstrap";


class InstitutionDetailOverview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;

        return (
            <div>
                <small className="section-title">Institution details</small>
                <ListGroup>
                    <InstitutionDetailRow fieldName="Email" fieldValue={institution.email}/>
                    <InstitutionDetailRow fieldName="Address" fieldValue={institution.address}/>
                    <InstitutionDetailRow fieldName="Website" fieldValue={institution.website}/>
                </ListGroup>
            </div>
        );
    }
}

class InstitutionContact extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const institution = this.props.institution;

        return (
            <div>
                <small className="section-title">Contact</small>
                <ListGroup>
                    <InstitutionDetailRow fieldName="Contact Person" fieldValue={institution.contactPersonName}/>
                    <InstitutionDetailRow fieldName="Contact Phone Number"
                                          fieldValue={institution.contactPersonNumber}/>
                </ListGroup>
            </div>
        )
    }
}

class InstitutionDetailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>
                <small className="font-weight-bold">{this.props.fieldName}</small>
                <p className="m-0">{this.props.fieldValue}</p>
            </ListGroupItem>
        );
    }
}

export {InstitutionDetailOverview, InstitutionContact};