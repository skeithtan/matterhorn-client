import React, { Component } from "react";
import {
    SectionRow,
    SectionTable,
} from "../../components/section";
import {
    Button,
} from "reactstrap";

class YearList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100" id="term-list">
                <YearListHead/>
                <YearListTable/>
            </div>
        );
    }
}

class YearListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <Button outline color="success" size="sm" className="ml-auto">Add</Button>
                </div>
                <h4 className="page-head-title mb-0">Academic Years</h4>
            </div>
        );
    }
}

class YearListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <SectionTable>
                    <YearRow/>
                    <YearRow/>
                    <YearRow/>
                </SectionTable>
            </div>
        );
    }
}

class YearRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionRow>2016 - 2017</SectionRow>
        );
    }
}

export default YearList;