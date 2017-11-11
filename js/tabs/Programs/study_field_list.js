import React, { Component } from "react";
import {
    SectionRow,
    SectionRowContent,
    SectionTable,
} from "../../components/section";
import {
    Button,
} from "reactstrap";

class StudyFieldList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column">
                <StudyFieldListHead/>
                <StudyFieldListTable/>
            </div>
        );
    }
}

class StudyFieldListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head d-flex flex-column align-items-center">
                <div className="page-head-controls ml-auto">
                    <Button outline color="success" size="sm" className="ml-auto">Add</Button>
                </div>
                <div className="w-100">
                    <h5 className="mb-0 text-secondary">Study Fields</h5>
                    <h4 className="page-head-title mb-0">Program Name</h4>
                </div>
            </div>
        );
    }
}

class StudyFieldListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <SectionTable>
                    <StudyFieldRow/>
                    <StudyFieldRow/>
                    <StudyFieldRow/>
                </SectionTable>
            </div>
        );
    }
}

class StudyFieldRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionRow>
                <SectionRowContent>Study Field Name</SectionRowContent>
            </SectionRow>
        );
    }
}

export default StudyFieldList;