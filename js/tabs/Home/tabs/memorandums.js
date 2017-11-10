import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardSubtitle,
} from "reactstrap";
import {
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
} from "../../../components/section";

// TODO: Queries

class Memorandums extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center page-body">
                <Card className="home-card mt-4">
                    <CardBody className="p-0">
                        <div className="d-flex flex-row p-3 justify-content-between align-items-center">
                            <div>
                                <small className="text-uppercase text-secondary">Institution name</small>
                                <h6 className="mb-0">Institution Name</h6>
                            </div>
                            <div>
                                <small className="text-uppercase text-secondary">Memorandum type</small>
                                <h6 className="mb-0">Understanding</h6>
                            </div>
                            <CardSubtitle className="text-danger">Expiring in 6 months</CardSubtitle>
                        </div>
                        <div className="d-flex flex-column p-0">
                            <SectionRow>
                                <SectionRowTitle>Date Effective</SectionRowTitle>
                                <SectionRowContent>June 18, 1998</SectionRowContent>
                            </SectionRow>
                            <SectionRow>
                                <SectionRowTitle>Date of Expiration</SectionRowTitle>
                                <SectionRowContent>June 18, 2017</SectionRowContent>
                            </SectionRow>
                            <SectionRow>
                                <SectionRowTitle>College Initiator</SectionRowTitle>
                                <SectionRowContent>RVRCOB</SectionRowContent>
                            </SectionRow>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Memorandums;