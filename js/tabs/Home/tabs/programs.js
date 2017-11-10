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

class Programs extends Component {
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
                                <small className="text-uppercase text-secondary">Program name</small>
                                <h6 className="mb-0">Summer Program 2018</h6>
                            </div>
                            <div>
                                <small className="text-uppercase text-secondary">Term</small>
                                <h6 className="mb-0">2016 - 2017, Term 1</h6>
                            </div>
                            <CardSubtitle className="text-danger">Ending in 2 months</CardSubtitle>
                        </div>
                        <div className="d-flex flex-column p-0">
                            <SectionRow>
                                <SectionRowTitle>Institution</SectionRowTitle>
                                <SectionRowContent>University of Tokyo</SectionRowContent>
                            </SectionRow>
                            <SectionRow>
                                <SectionRowTitle>Start Date</SectionRowTitle>
                                <SectionRowContent>June 18, 1998</SectionRowContent>
                            </SectionRow>
                            <SectionRow>
                                <SectionRowTitle>End Date</SectionRowTitle>
                                <SectionRowContent>June 18, 1998</SectionRowContent>
                            </SectionRow>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Programs;