import React, { Component } from "react";
import {
    Input,
    ListGroup,
    ListGroupItem,
} from "reactstrap";


class InstitutionList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column">
                <InstitutionListHead/>
                <InstitutionListTable/>
                <InstitutionTabBar/>
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
                <Input type="select" id="linkages" className="mb-3 btn-outline-success">
                    <option value="S">Scholarship</option>
                    <option value="OI">OJT / Internship</option>
                    <option value="FE">Faculty Exchange</option>
                    <option value="SE">Student Exchange</option>
                    <option value="RE">Researcher / Expert Exchange</option>
                    <option value="SP">Support for Projects Exchange</option>
                    <option value="RP">Research and Publication</option>
                    <option value="AP">Academic Program</option>
                    <option value="PF">Project Funding</option>
                    <option value="EMPI">Exchange of Materials, Publications and Information</option>
                    <option value="CE">Cultural Exchange</option>
                    <option value="SAMC">Seminars and Academic Meetings / Conferences</option>
                    <option value="TAP">Technical or Administrative Programs</option>
                    <option value="O">Established Office</option>
                    <option value="ASE">Administrative and Staff Exchange</option>
                    <option value="EM">Executive Meetings</option>
                </Input>
                <h4 className="page-head-title">Linkages</h4>
                <Input type="search" placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class InstitutionListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <ListGroup>
                    <InstitutionListRow/>
                    <InstitutionListRow/>
                    <InstitutionListRow/>
                </ListGroup>
            </div>
        );
    }
}

class InstitutionTabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="institution-navigation">
                <ul className="p-3 justify-content-center mb-0 d-flex flex-row">
                    <li className="col-lg-2 d-flex flex-row justify-content-center align-items-center">
                        <img className="nav-image"/>
                        <small className="ml-2 font-weight-bold mb-0 text-secondary">Belonging</small>
                    </li>
                    <li className="col-lg-2 d-flex flex-row justify-content-center align-items-center">
                        <img className="nav-image"/>
                        <small className="ml-2 font-weight-bold mb-0 text-secondary">All</small>
                    </li>
                </ul>
            </div>
        )
    }
}

class InstitutionListRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem>University Name</ListGroupItem>
        );
    }
}

export default InstitutionList;