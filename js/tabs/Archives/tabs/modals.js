import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import $ from "jquery";
import authorizeXHR from "../../../authorization";
import {makeInfoToast} from "../../../dismissable_toast_maker";
import settings from "../../../settings";


class RestoreMemorandumModal extends Component {
    constructor(props) {
        super(props);
        this.confirmRestore = this.confirmRestore.bind(this);
    }

    confirmRestore() {
        this.props.toggle();
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

    render() {
        return (
            <RestoreModal confirmRestore={this.confirmRestore}
                          isOpen={this.props.isOpen}
                          toggle={this.props.toggle}>
                <ModalHeader className="text-primary">
                    Would you like to restore this memorandum?
                </ModalHeader>
            </RestoreModal>
        );
    }
}

class RestoreModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                   toggle={this.props.toggle}
                   backdrop={true}>
                {this.props.children}
                <ModalFooter>
                    <Button outline
                            color="primary"
                            onClick={this.props.confirmRestore}>
                        Restore
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export {
    RestoreMemorandumModal,
};