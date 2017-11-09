import React, { Component } from "react";
import {
    Input,
} from "reactstrap";
import {
    SectionTable,
    SectionRow,
} from "../../components/section";
import graphql from "../../graphql";

class LinkageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100" id="linkage-list">
                <LinkageListHead/>
                <LinkageListTable/>
            </div>
        );
    }
}

class LinkageListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head pt-5 d-flex flex-column align-items-center">
                <div className="d-flex flex-row w-100 mb-2 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Linkages</h5>
                        <h4 className="page-head-title mb-0">Institution name</h4>
                    </div>
                </div>
                <Input type="search" placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class LinkageListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <SectionTable>
                    <LinkageListRow/>
                    <LinkageListRow/>
                    <LinkageListRow/>
                    <LinkageListRow/>
                </SectionTable>
            </div>
        );
    }
}

class LinkageListRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionRow>Linkage Name</SectionRow>
        );
    }
}

export default LinkageList;