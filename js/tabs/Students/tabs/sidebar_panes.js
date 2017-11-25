import React, { Component } from "react";
import moment from "moment";
import { Button, } from "reactstrap";

// TODO: import modals

import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
    SectionTable,
    SectionTitle,
} from "../../../components/section";

class ResidenceSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            residence : props.residence,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            residence : nextProps.residence,
        });
    }

    render() {
        const residence = this.state.residence;

        function formatDate(date) {
            return moment(date).format("LL");
        }

        const dateEffective = formatDate(residence.date_effective);
        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">Effective { dateEffective }</h5>
                    </div>
                </div>


                <div className="page-body">
                    <ResidenceDetails residence={ residence }/>

                    { /* Delete and Edit Modals */ }
                </div>
            </div>
        );
    }
}

class ResidenceDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const residence = this.props.residence;

        return (
            <Section>
                <SectionTitle>Details</SectionTitle>
                <SectionTable>
                    <SectionRow>
                        <SectionRowTitle>Contact Person</SectionRowTitle>
                        <SectionRowContent>{ residence.contact_person_name }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Contact Number</SectionRowTitle>
                        <SectionRowContent>{ residence.contact_person_number }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Residence Type</SectionRowTitle>
                        <SectionRowContent>{ residence.residence }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Address</SectionRowTitle>
                        <SectionRowContent>{ residence.address }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowContent className="d-flex">
                            <Button outline
                                    color="success"
                                    size="sm"
                                    className="mr-auto">Edit</Button>
                        </SectionRowContent>
                    </SectionRow>
                </SectionTable>
            </Section>
        );
    }
}

export { ResidenceSidebarPane };