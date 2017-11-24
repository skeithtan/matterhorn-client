import React, { Component } from "react";
import moment from "moment";
import settings from "../../../settings";
import { Button, } from "reactstrap";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
    SectionTable,
    SectionTitle,
} from "../../../components/section";
import { MemorandumFormModal } from "../../Institutions/modals";

class MemorandumsSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memorandum : props.memorandum,
            renewModalIsOpen : false,
        };

        this.toggleRenewModal = this.toggleRenewModal.bind(this);
    }

    toggleRenewModal() {
        this.setState({
            renewModalIsOpen : !this.state.renewModalIsOpen,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            memorandum : props.memorandum,
        });
    }

    render() {
        const memorandum = this.state.memorandum;
        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">Memorandum</h5>
                    </div>
                </div>

                <div className="page-body">
                    <MemorandumDetails memorandum={ memorandum }/>
                    <MemorandumLinkages linkages={ memorandum.linkages }/>

                    { /* MODALS */ }
                </div>
            </div>
        );
    }
}

class MemorandumDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const memorandum = this.props.memorandum;

        let collegeInitiator = "None";

        if (memorandum.collegeInitiator !== null) {
            collegeInitiator = settings.colleges[memorandum.collegeInitiator];
        }

        function formatDate(date) {
            return moment(date).format("LL");
        }

        const viewMemorandum = () => {
            const shell = require("electron").shell;
            shell.openExternal(memorandum.file);
        };

        return (
            <Section>
                <SectionTitle>Details</SectionTitle>
                <SectionTable>
                    <SectionRow>
                        <SectionRowTitle>Memorandum Type</SectionRowTitle>
                        <SectionRowContent>{ memorandum.type }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Date Effective</SectionRowTitle>
                        <SectionRowContent>{ formatDate(memorandum.dateEffective) }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Expiration Date</SectionRowTitle>
                        <SectionRowContent>{ formatDate(memorandum.dateExpiration) }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>College Initiator</SectionRowTitle>
                        <SectionRowContent>{ collegeInitiator }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowContent className="d-flex">
                            <Button outline
                                    color="success"
                                    size="sm"
                                    className="mr-2"
                                    onClick={ viewMemorandum }>View</Button>

                            <Button outline
                                    color="success"
                                    size="sm">Renew</Button>
                        </SectionRowContent>
                    </SectionRow>
                </SectionTable>
            </Section>
        );
    }
}

class MemorandumLinkages extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let body = (
            <div className="p-4 pt-5 pb-5 bg-light text-center">
                <h5 className="text-secondary">There are no linkages for this memorandum.</h5>
            </div>
        );


        const rows = this.props.linkages.map((linkage, index) => {
            return (
                <SectionRow key={ index }>{ settings.linkages[linkage] }</SectionRow>
            );
        });

        if (this.props.linkages.length > 0) {
            body = (
                <SectionTable>
                    { rows }
                </SectionTable>
            );
        }

        return (
            <Section>
                <SectionTitle>Linkages</SectionTitle>
                { body }
            </Section>
        );
    }
}

export {
    MemorandumsSidebarPane,
};