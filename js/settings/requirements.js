import React, { Component } from "react";
import TabBar from "../components/tab_bar";
import graphql from "../graphql";
import ErrorState from "../components/error_state";
import LoadingSpinner from "../components/loading";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionTable,
} from "../components/section";
import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import validateForm from "../form_validator";
import settings from "../settings";
import authorizeXHR from "../authorization";
import { makeInfoToast } from "../dismissable_toast_maker";
import iziToast from "izitoast";
import $ from "jquery";


const tabs = [
    {
        name : "Inbound",
        image : "../../images/inboundgrey.png",
        activeImage : "../../images/inboundgreen.png",
    },
    {
        name : "Outbound",
        image : "../../images/airplanegrey.png",
        activeImage : "../../images/airplanegreen.png",
    },
];

function makeRequirementsQuery(isInbound) {
    return graphql.query(`
    {
        ${isInbound ? "inbound_requirements" : "outbound_requirements"} {
            id
            name
        }
    }
    `);
}

class Requirements extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab : tabs[0],
            addRequirementIsShowing : false,
            requirements : null,
        };

        this.fetchRequirements = this.fetchRequirements.bind(this);
        this.refreshRequirements = this.refreshRequirements.bind(this);
        this.toggleAddRequirement = this.toggleAddRequirement.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);

        this.fetchRequirements();
    }

    refreshRequirements() {
        this.setState({
            requirements : null,
        });

        this.fetchRequirements();
    }

    fetchRequirements(isInbound) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        if (isInbound === undefined) {
            isInbound = this.state.activeTab.name === "Inbound";
        }

        makeRequirementsQuery(isInbound)
            .then(requirements => this.setState({
                requirements : isInbound ? requirements.inbound_requirements : requirements.outbound_requirements,
            }))
            .catch(error => this.setState({
                error : error,
            }));
    }

    toggleAddRequirement() {
        this.setState({
            addRequirementIsShowing : !this.state.addRequirementIsShowing,
        });
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
            requirements : null,
        });

        this.fetchRequirements(tab.name === "Inbound");
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchRequirements(this.props.inbound)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (this.state.requirements === null) {
            return <LoadingSpinner/>;
        }

        return (
            <div className="container-fluid d-flex flex-column p-0 h-100">
                <RequirementsHead inbound={this.state.activeTab.name === "Inbound"}
                                  toggleAddRequirement={this.toggleAddRequirement}/>
                <RequirementsBody requirements={this.state.requirements}
                                  inbound={this.state.activeTab.name === "Inbound"}/>
                <RequirementFormModal onSuccess={this.refreshRequirements}
                                      inbound={this.state.activeTab.name === "Inbound"}
                                      isOpen={this.state.addRequirementIsShowing}
                                      toggle={this.toggleAddRequirement}/>
                <TabBar setActiveTab={this.setActiveTab}
                        activeTab={this.state.activeTab}
                        tabs={tabs}/>
            </div>
        );
    }
}

class RequirementsHead extends Component {
    render() {
        return (
            <div className="page-head pt-5 d-flex flex-row align-items-end">
                <div className="mr-auto">
                    <h4 className="page-head-title mb-0">{this.props.inbound ? "Inbound" : "Outbound"} Application
                        Requirements</h4>
                </div>

                <div>
                    <Button outline
                            color="success"
                            onClick={this.props.toggleAddRequirement}
                            size="sm">Add</Button>
                </div>
            </div>
        );
    }
}

class RequirementFormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form : {
                name : "",
            },
        };

        this.submitRequirement = this.submitRequirement.bind(this);
    }

    submitRequirement() {
        let url = `${settings.serverURL}/programs`;
        url += this.props.inbound ? "/inbound/requirements/" : "/outbound/requirements/";

        const dismissToast = makeInfoToast({
            title : "Submitting...",
            message : "Adding requirement...",
        });

        $.post({
             url : url,
             beforeSend : authorizeXHR,
             data : this.state.form,
         })
         .done(() => {
             dismissToast();
             iziToast.success({
                 title : "Success",
                 message : "Successfully added requirement",
             });
             this.props.onSuccess();
         })
         .fail(response => {
             dismissToast();
             iziToast.error({
                 title : "Error",
                 message : "Unable to add requirement",
             });
             //TODO: iziToast
             console.log(response);
         });

        this.props.toggle();
    }

    render() {
        const { formHasErrors, fieldErrors } = validateForm([
            {
                name : "Requirement",
                characterLimit : 64,
                value : this.state.form.name,
            },
        ]);

        return (
            <Modal isOpen={this.props.isOpen}
                   toggle={this.props.toggle}
                   size="sm">
                <ModalHeader toggle={this.props.toggle}>
                    <small className="mb-0">Add a requirement</small>
                </ModalHeader>
                <ModalBody className="form">
                    <Form>
                        <FormGroup>
                            <Input placeholder="Requirement"
                                   valid={!formHasErrors}
                                   value={this.state.form.name}
                                   onChange={event => this.setState({
                                       form : {
                                           name : event.target.value,
                                       },
                                   })}>
                            </Input>
                            <FormFeedback>{fieldErrors["Requirement"][0]}</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button outline
                            color="success"
                            onClick={this.submitRequirement}
                            disabled={formHasErrors}>
                        Add
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class RequirementsBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error : null,
        };

        this.deleteRequirement = this.deleteRequirement.bind(this);
    }

    deleteRequirement(requirementId) {
        //TODO: This

        // $.delete({
        //      url : `${settings.serverURL}/programs/inbound/requirements/`,
        //  })
        //  .done()
        //  .fail(error => {
        //
        //  });
        //

        this.props.refreshRequirements();
    }

    render() {
        const rows = this.props.requirements.map(requirement => {

            const onDeleteButtonClick = () => {
                if (!confirm(`Are you sure you want to remove the requirement "${requirement.name}"?`)) {
                    return;
                }

                this.deleteRequirement(requirement.id);
            };

            return <RequirementRow key={requirement.id}
                                   requirement={requirement}
                                   onDeleteButtonClick={onDeleteButtonClick}/>;
        });

        return (
            <div className="page-body">
                <Section>
                    <SectionTable>
                        {rows}
                    </SectionTable>
                </Section>
            </div>
        );
    }
}

class RequirementRow extends Component {
    render() {
        return (
            <SectionRow className="d-flex flex-row">
                <SectionRowContent large
                                   className="mr-auto">{this.props.requirement.name}</SectionRowContent>
                <Button outline
                        size="sm"
                        onClick={this.props.onDeleteButtonClick}
                        color="danger">-</Button>
            </SectionRow>
        );
    }
}

export {
    Requirements as default,
};