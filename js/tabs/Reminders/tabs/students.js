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

class Students extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center page-body">
                <Card className="reminders-card mt-4">
                    <CardBody className="p-0">
                        <div className="d-flex flex-row p-3 justify-content-between align-items-center">
                            <div>
                                <small className="text-uppercase text-secondary">Student name</small>
                                <h6 className="mb-0">Paul McCartney</h6>
                            </div>
                            <div>
                                <small className="text-uppercase text-secondary">ID number</small>
                                <h6 className="mb-0">11540680</h6>
                            </div>
                            <CardSubtitle className="text-danger">Returning in 2 months</CardSubtitle>
                        </div>
                        <div className="d-flex flex-column p-0">
                            <SectionRow>
                                <SectionRowTitle>Program</SectionRowTitle>
                                <SectionRowContent>Summer Program 2018</SectionRowContent>
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

export default Students;