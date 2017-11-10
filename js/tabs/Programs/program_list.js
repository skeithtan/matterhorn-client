import React, { Component } from "react";
import {
    Input,
} from "reactstrap";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionTable,
    SectionTitle,
} from "../../components/section";

class ProgramList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column">
                <ProgramListHead/>
                <ProgramListTable/>
            </div>
        );
    }
}

class ProgramListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head d-flex flex-column align-items-center">
                <div className="d-flex flex-row w-100 mb-2 align-items-center">
                    <div className="mr-auto">
                        <h5 className="mb-0 text-secondary">Programs</h5>
                        <h4 className="page-head-title mb-0">2017-2018</h4>
                    </div>
                </div>
                <Input type="search" placeholder="Search" className="search-input"/>
            </div>
        );
    }
}

class ProgramListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-body">
                <ProgramListSection/>
                <ProgramListSection/>
            </div>
        );
    }
}

class ProgramListSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Section>
                <SectionTitle>Institution Name</SectionTitle>
                <SectionTable>
                    <ProgramRow/>
                    <ProgramRow/>
                    <ProgramRow/>
                </SectionTable>
            </Section>
        );
    }
}

class ProgramRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionRow>
                <SectionRowContent>Program Name</SectionRowContent>
            </SectionRow>
        );
    }
}

export default ProgramList;