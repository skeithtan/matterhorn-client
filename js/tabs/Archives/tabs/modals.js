import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalFooter,
    ModalHeader,
} from "reactstrap";


class RestoreMemorandumModal extends Component {
    constructor(props) {
        super(props);

        this.confirmRestore = this.confirmRestore.bind(this);
    }

    confirmRestore() {
        alert("Restored!");
        //TODO: Actual restoration
        this.props.toggle();
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

export { RestoreMemorandumModal };