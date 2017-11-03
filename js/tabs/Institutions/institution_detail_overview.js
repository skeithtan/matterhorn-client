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
        const agreementType = this.props.institution.agreement === "B" ? "Bilateral" : "Multilateral";
        const website = `http://${institution.website}`;

        function openWebsite() {
            const { shell } = require("electron");
            shell.openExternal(website);
        }

        return (
            <div>
                <small className="section-title">Institution details</small>
                <ListGroup>
                    <InstitutionDetailRow fieldName="Email" fieldValue={institution.email}/>
                    <InstitutionDetailRow fieldName="Address" fieldValue={institution.address}/>

                    <ListGroupItem>
                        <small className="font-weight-bold">Website</small>
                        <p className="lead m-0 text-primary" onClick={openWebsite}>{website}</p>
                    </ListGroupItem>

                    <InstitutionDetailRow fieldName="Agreement Type" fieldValue={agreementType}/>
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
                <small className="section-title">Contact details</small>
                <ListGroup>
                    <InstitutionDetailRow fieldName="Contact Person" fieldValue={institution.contactPersonName}/>
                    <InstitutionDetailRow fieldName="Contact Phone Number"
                                          fieldValue={institution.contactPersonNumber}/>
                </ListGroup>
            </div>
        );
    }
}

class InstitutionDetailRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem onClick={this.props.onClick}>
                <small className="font-weight-bold">{this.props.fieldName}</small>
                <p className="lead m-0">{this.props.fieldValue}</p>
            </ListGroupItem>
        );
    }
}

export {
    InstitutionDetailOverview,
    InstitutionContact,
};