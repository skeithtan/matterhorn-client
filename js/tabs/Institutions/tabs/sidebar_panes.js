import React, { Component } from "react";
import moment from "moment";
import settings from "../../../settings";
import { Button, } from "reactstrap";

import {
    ArchiveMemorandumModal,
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
import { RestoreMemorandumModal } from "../../Archives/tabs/modals";
import { makeInfoToast } from "../../../dismissable_toast_maker";
import * as $ from "jquery";
import iziToast from "izitoast";
import authorizeXHR from "../../../authorization";


class MemorandumSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMemorandumIsShowing : false,
            memorandum : props.memorandum,
        };

        this.confirmRestore = this.confirmRestore.bind(this);
        this.confirmArchive = this.confirmArchive.bind(this);
        this.onEditMemorandum = this.onEditMemorandum.bind(this);
        this.toggleEditMemorandum = this.toggleEditMemorandum.bind(this);
    }

    confirmArchive() {
        if (!confirm("Are you sure you want to archive this memorandum?")) {
            return;
        }

        const dismissToast = makeInfoToast({
            title : "Archiving",
            message : "Archiving memorandum...",
        });
        $.ajax({
            url : `${settings.serverURL}/memorandums/${this.props.memorandum.id}`,
            method : "DELETE",
            beforeSend : authorizeXHR,
            success : () => {
                dismissToast();
                this.props.removeActiveMemorandum();
                iziToast.success({
                    title : "Success",
                    message : "Memorandum archived",
                    progressBar : false,
                });
            },
            error : response => {
                dismissToast();
                console.log(response);
                iziToast.error({
                    title : "Error",
                    message : "Unable to archive memorandum",
                    progressBar : false,
                });
            },
        });

    }

    confirmRestore() {
        if (!confirm("Are you sure you want to archive this memorandum?")) {
            return;
        }

        const dismissToast = makeInfoToast({
            title : "Restoring",
            message : "Restoring memorandum...",
        });

        $.ajax({
            url : `${settings.serverURL}/archives/memorandums/${this.props.memorandum.id}/restore/`,
            method : "PUT",
            beforeSend : authorizeXHR,
        }).done(() => {
            dismissToast();
            iziToast.success({
                title : "Success",
                message : "Successfully restored memorandum",
            });
            this.props.onRestoreSuccess();
        }).fail(response => {
            dismissToast();
            console.log(response);
            iziToast.error({
                title : "Error",
                message : "Unable to restore memorandum",
            });
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
                    <MemorandumDetails archived={this.props.archived}
                                       memorandum={memorandum}
                                       confirmRestore={this.confirmRestore}
                                       confirmArchive={this.confirmArchive}
                                       toggleEditMemorandum={this.toggleEditMemorandum}/>
                    <MemorandumLinkages linkages={memorandum.linkages}/>

                    {this.state.activeMemorandum !== null &&
                    <MemorandumFormModal edit
                                         isOpen={this.state.editMemorandumIsShowing}
                                         memorandum={memorandum}
                                         toggle={this.toggleEditMemorandum}
                                         onEditSuccess={this.onEditMemorandum}
                                         refresh={this.props.refreshMemorandums}/>}

                    {this.state.activeMemorandum !== null &&
                    <RestoreMemorandumModal memorandum={memorandum}
                                            onRestoreSuccess={this.props.onRestoreSuccess}
                                            isOpen={this.state.restoreMemorandumIsShowing}
                                            toggle={this.toggleRestoreMemorandum}/>
                    }
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
                            <Button outline
                                    color="success"
                                    size="sm"
                                    className="mr-2"
                                    onClick={viewMemorandum}>View</Button>

                            {!this.props.archived &&
                            <Button outline
                                    color="success"
                                    size="sm"
                                    className="mr-auto"
                                    onClick={this.props.toggleEditMemorandum}>Edit</Button>
                            }
                            {!this.props.archived &&
                            < Button outline
                                     color="warning"
                                     size="sm"
                                     onClick={this.props.confirmArchive}>Archive</Button>
                            }

                            {this.props.archived &&
                            <Button outline
                                    color="primary"
                                    size="sm"
                                    className="ml-auto"
                                    onClick={this.props.confirmRestore}>Restore</Button>
                            }
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

class ProgramSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteProgramIsShowing : false,
            editProgramIsShowing : false,
        };

        this.toggleDeleteProgram = this.toggleDeleteProgram.bind(this);
        this.toggleEditProgram = this.toggleEditProgram.bind(this);
    }

    toggleDeleteProgram() {
        this.setState({
            deleteMemorandumIsShowing : !this.state.deleteProgramIsShowing,
        });
    }

    toggleEditProgram() {
        this.setState({
            editProgramIsShowing : !this.state.editProgramIsShowing,
        });
    }

    render() {
        const program = this.props.program;

        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">{program.name}</h5>
                    </div>
                </div>


                <div className="page-body">
                    <ProgramDetails program={program}
                                    toggleDeleteProgram={this.toggleDeleteProgram}
                                    toggleEditProgram={this.toggleEditProgram}/>
                </div>
            </div>
        );
    }
}

class ProgramDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const program = this.props.program;
        const academicYear = `${program.academic_year.academic_year_start} - ${program.academic_year.academic_year_start + 1}`;

        return (
            <Section>
                <SectionTitle>Details</SectionTitle>
                <SectionTable>
                    <SectionRow>
                        <SectionRowTitle>Program Name</SectionRowTitle>
                        <SectionRowContent>{program.name}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Linkage</SectionRowTitle>
                        <SectionRowContent>{program.linkage.name}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Academic Year</SectionRowTitle>
                        <SectionRowContent>{academicYear}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowContent className="d-flex">
                            <Button outline
                                    color="success"
                                    size="sm"
                                    className="mr-auto">Edit</Button>
                            <Button outline
                                    color="warning"
                                    size="sm">Archive</Button>
                        </SectionRowContent>
                    </SectionRow>
                </SectionTable>
            </Section>
        );
    }
}

export {
    MemorandumSidebarPane,
    ProgramSidebarPane,
};