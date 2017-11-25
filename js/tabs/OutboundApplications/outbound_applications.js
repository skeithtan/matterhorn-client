import React, { Component } from "react";
import graphql from "../../graphql";
import {
    Button,
    Input,
} from "reactstrap";


function fetchOutboundApplication(onResult) {
    graphql.query(`
    {
        outbound_student_programs {
            id
            student {
                id
                id_number
                first_name
                middle_name
                family_name
            }
        }
    }
    `).then(onResult);
}


class OutboundApplications extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <OutboundApplicationsList/>
            </div>
        );
    }
}

class OutboundApplicationsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100">
                <OutboundApplicationsListHead/>
                <OutboundApplicationsListTable/>
            </div>
        );
    }
}

class OutboundApplicationsListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <div className="btn-group" role="group">
                        <Button outline color="success" size="sm">Incomplete</Button>
                        <Button outline color="success" size="sm">Complete</Button>
                    </div>
                    <Button outline
                            color="success"
                            className="ml-auto"
                            size="sm">Add Applicant</Button>
                </div>
                <h4 className="page-head-title">Applications</h4>
                <Input type="search"
                       placeholder="search"
                       className="search-input"/>
            </div>
        );
    }
}

class OutboundApplicationsListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return null; //TODO
    }
}

export default OutboundApplications;