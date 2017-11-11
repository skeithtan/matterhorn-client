import React, { Component } from "react";
import moment from "moment";
import settings from "../../../settings";
import { Button, } from "reactstrap";

import {
    DeleteMemorandumModal,
    MemorandumFormModal,
} from "../modals";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
    SectionTable,
    SectionTitle,
} from "../../../components/section";


class MemorandumSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteMemorandumIsShowing : false,
            editMemorandumIsShowing : false,
            memorandum : props.memorandum,
        };

        this.onEditMemorandum = this.onEditMemorandum.bind(this);
        this.toggleDeleteMemorandum = this.toggleDeleteMemorandum.bind(this);
        this.toggleEditMemorandum = this.toggleEditMemorandum.bind(this);
    }

    toggleDeleteMemorandum() {
        this.setState({
            deleteMemorandumIsShowing : !this.state.deleteMemorandumIsShowing,
        });
    }

    toggleEditMemorandum() {
        this.setState({
            editMemorandumIsShowing : !this.state.editMemorandumIsShowing,
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            memorandum : props.memorandum,
        });
    }

    onEditMemorandum(memorandum) {
        this.setState({
            memorandum : memorandum,
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
                    <MemorandumDetails memorandum={memorandum}
                                       toggleDeleteMemorandum={this.toggleDeleteMemorandum}
                                       toggleEditMemorandum={this.toggleEditMemorandum}/>
                    <MemorandumLinkages linkages={memorandum.linkages}/>

                    {this.state.activeMemorandum !== null &&
                    <DeleteMemorandumModal isOpen={this.state.deleteMemorandumIsShowing}
                                           memorandum={memorandum}
                                           toggle={this.toggleDeleteMemorandum}
                                           onDeleteSuccess={this.props.removeActiveMemorandum}
                                           refresh={this.props.refreshMemorandums}/>}

                    {this.state.activeMemorandum !== null &&
                    <MemorandumFormModal edit
                                         isOpen={this.state.editMemorandumIsShowing}
                                         memorandum={memorandum}
                                         toggle={this.toggleEditMemorandum}
                                         onEditSuccess={this.onEditMemorandum}
                                         refresh={this.props.refreshMemorandums}/>}
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
        function formatDate(date) {
            return moment(date).format("LL");
        }

        const dateEffective = formatDate(this.props.memorandum.date_effective);
        const type = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
        const expiryDate = this.props.memorandum.date_expiration === null ? "None" : formatDate(this.props.memorandum.date_expiration);
        const college = this.props.memorandum.college_initiator === null ? "None" : this.props.memorandum.college_initiator;
        const viewMemorandum = () => {
            const shell = require("electron").shell;
            shell.openExternal(this.props.memorandum.memorandum_file);
        };

        return (
            <Section>
                <SectionTitle>Details</SectionTitle>
                <SectionTable>
                    <SectionRow>
                        <SectionRowTitle>Memorandum Type</SectionRowTitle>
                        <SectionRowContent>{type}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Date Effective</SectionRowTitle>
                        <SectionRowContent>{dateEffective}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Expiration Date</SectionRowTitle>
                        <SectionRowContent>{expiryDate}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>College Initiator</SectionRowTitle>
                        <SectionRowContent>{college}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowContent className="d-flex">
                            <Button outline color="success" size="sm" className="mr-2"
                                    onClick={viewMemorandum}>View</Button>
                            <Button outline color="success" size="sm" className="mr-auto"
                                    onClick={this.props.toggleEditMemorandum}>Edit</Button>
                            <Button outline color="danger" size="sm"
                                    onClick={this.props.toggleDeleteMemorandum}>Delete</Button>
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
                <SectionRow key={index}>{settings.linkages[linkage]}</SectionRow>
            );
        });

        if (this.props.linkages.length > 0) {
            body = (
                <SectionTable>
                    {rows}
                </SectionTable>
            );
        }

        return (
            <Section>
                <SectionTitle>Linkages</SectionTitle>
                {body}
            </Section>
        );
    }
}


export { MemorandumSidebarPane };