import React, { Component } from "react";
import { Button } from "reactstrap";
import LoadingSpinner from "../../loading";
import InstitutionDetailOverview from "./institution_detail_overview";
import Memorandums from "./memorandums";
import graphql from "../../graphql";


function fetchInstitution(id, onResponse) {
    graphql({
        query : `
        {
            institution(id:${id}) {
                id
                name
                email
                address
                website
                contactPersonName
                contactPersonNumber
                country {
                    name
                }
            }
        }
       `,
        onResponse : onResponse,
    });
}

class InstitutionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution : null,
            institutionID : null,
        };
    }

    static unselectedState() {
        return (
            <div className="loading-container">
                <h3>Select an institution to see its details</h3>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const institution = nextProps.institution;
        if (institution !== null) {
            fetchInstitution(nextProps.institution.id, response => {
                this.setState({
                    institution : response.data.institution,
                    institutionID : response.data.institutionID,
                });
            });
        }
    }


    render() {
        console.log(this.state);
        if (this.state.institutionID === null) {
            return InstitutionDetail.unselectedState();
        }

        if (this.state.institution === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div id="institution-detail" className="container-fluid d-flex flex-column p-0">
                <InstitutionDetailHead institution={this.state.institution}/>
                <InstitutionDetailBody institution={this.state.institution}/>
            </div>
        );
    }
}

class InstitutionDetailHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-center">
                <div className="mr-auto">
                    <h4 className="page-head-title justify-content-left d-inline-block mb-0 mr-2">{this.props.institution.name}</h4>
                    <h4 className="text-muted d-inline-block font-weight-normal mb-0">{this.props.institution.country.name}</h4>
                </div>

                <div>
                    <Button outline size="sm" color="success" className="mr-2">Edit Institution</Button>
                    <Button outline size="sm" color="danger">Delete</Button>
                </div>
            </div>
        );
    }
}

class InstitutionDetailBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <InstitutionDetailOverview institution={this.props.institution}/>
                <Memorandums/>
            </div>
        );
    }
}


export default InstitutionDetail;