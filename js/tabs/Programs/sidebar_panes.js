import React, { Component } from "react";
import graphql from "../../graphql";
import LoadingSpinner from "../../components/loading";
import {
    Section,
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
    SectionTable,
    SectionTitle,
} from "../../components/section";
import moment from "moment";
import { Button } from "reactstrap";


function fetchAcademicYear(id, onResult) {
    console.log(id);
    graphql.query(`
    {
        terms(year:${id}) {
            id
            number
            start_date
            end_date
        }
    }
    `).then(onResult);
}

function termsIsFetched(year) {
    return year.terms !== undefined;
}

class AcademicYearSidebarPane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editAcademicYearIsShowing : false,
            deleteAcademicYearIsShowing : false,
            academicYear : props.academicYear,
        };

        if (!termsIsFetched(props.academicYear)) {
            fetchAcademicYear(props.academicYear.academic_year_start, result => {
                props.academicYear.terms = result.terms;

                this.setState({
                    academicYear : props.academicYear,
                });
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            academicYear : props.academicYear,
        });

        if (!termsIsFetched(props.academicYear)) {
            fetchAcademicYear(props.academicYear.academic_year_start, result => {
                props.academicYear.terms = result.terms;

                this.setState({
                    academicYear : props.academicYear,
                });
            });
        }
    }

    render() {
        const academicYear = this.state.academicYear;

        if (!termsIsFetched(academicYear)) {
            return <LoadingSpinner/>;
        }

        const academicYearFull = `${academicYear.academic_year_start} - ${parseInt(academicYear.academic_year_start) + 1}`;

        const terms = academicYear.terms.map(term => {
            return <TermSection term={term}
                                key={term.id}/>;
        });

        return (
            <div className="p-0 h-100 d-flex flex-column">
                <div className="page-head pt-5 d-flex flex-row align-items-end">
                    <div className="mr-auto">
                        <h5 className="mb-0">Academic Year {academicYearFull}</h5>
                    </div>
                </div>

                <div className="page-body">
                    <Section>
                        <SectionTitle>Details</SectionTitle>
                        <SectionTable>
                            <SectionRow>
                                <SectionRowTitle>Academic Year</SectionRowTitle>
                                <SectionRowContent>{academicYearFull}</SectionRowContent>
                            </SectionRow>
                            <SectionRow className="d-flex flex-row justify-content-between">
                                <Button outline
                                        color="success"
                                        size="sm">Edit Academic Year</Button>
                                <Button outline
                                        color="danger"
                                        size="sm">Delete</Button>
                            </SectionRow>
                        </SectionTable>
                    </Section>

                    {terms}
                </div>
            </div>
        );

    }
}

class TermSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const startDate = moment(this.props.term.start_date).format("LL");
        const endDate = moment(this.props.term.end_date).format("LL");


        return (
            <Section>
                <SectionTitle>Term {this.props.term.number}</SectionTitle>
                <SectionTable>
                    <SectionRow>
                        <SectionRowTitle>Start Date</SectionRowTitle>
                        <SectionRowContent>{startDate}</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>End Date</SectionRowTitle>
                        <SectionRowContent>{endDate}</SectionRowContent>
                    </SectionRow>
                </SectionTable>
            </Section>
        );
    }
}

export { AcademicYearSidebarPane };