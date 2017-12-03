import React, { Component } from "react";
import {
    EndOfReportIndicator,
    ReportBar,
    ReportHead,
    ReportTitleContainer,
} from "../components/reports";
import graphql from "../graphql";
import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Input,
    Label,
    Table,
} from "reactstrap";
import ErrorState from "../components/error_state";
import LoadingSpinner from "../components/loading";
import $ from "jquery";
import settings from "../settings";
import authorizeXHR from "../authorization";


function makeYearsQuery() {
    return graphql.query(`
    {
        academic_years {
            academic_year_start
        }
    }
    `);
}

function makeReportQuery(year, term) {
    return $.get({
        url : `${settings.serverURL}/reports/unit-reports/`,
        beforeSend : authorizeXHR,
        data : {
            "academic-year" : year,
            "term" : term,
        },
    });
}

class OutboundAndInboundUnits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            academicYears : null,
            activeYear : null,
            activeTerm : 1,
            error : null,
        };

        this.fetchYears = this.fetchYears.bind(this);
        this.setActiveYear = this.setActiveYear.bind(this);
        this.setActiveTerm = this.setActiveTerm.bind(this);

        this.fetchYears();
    }

    fetchYears() {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeYearsQuery()
            .then(result => {
                if (result.academic_years.length === 0) {
                    this.setState({
                        academicYears : [],
                    });

                    return;
                }

                const academicYears = result.academic_years.map(academicYear =>
                    parseInt(academicYear.academic_year_start),
                );

                const activeYear = academicYears[0];

                this.setState({
                    activeYear : activeYear,
                    academicYears : academicYears,
                });
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    setActiveYear(year) {
        this.setState({
            activeYear : year,
        });
    }

    setActiveTerm(term) {
        this.setState({
            activeTerm : term,
        });
    }

    static noAcademicYears() {
        return (
            <div className="loading-container">
                <h3>There are no academic years found.</h3>
                <p>Reports are grouped by academic year terms. Add academic years to generate reports.</p>
            </div>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={this.fetchYears}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (this.state.academicYears === null) {
            return <LoadingSpinner/>;
        }

        if (this.state.academicYears.length === 0) {
            return OutboundAndInboundUnits.noAcademicYears();
        }

        return (
            <div>
                <UnitsReportBar
                    academicYears={this.state.academicYears}
                    activeYear={this.state.activeYear}
                    activeTerm={this.state.activeTerm}
                    setActiveYear={this.setActiveYear}
                    setActiveTerm={this.setActiveTerm}/>

                <UnitsReport
                    year={this.state.activeYear}
                    term={this.state.activeTerm}/>
            </div>
        );
    }
}

class UnitsReportBar extends Component {
    constructor(props) {
        super(props);

        this.onActiveYearChange = this.onActiveYearChange.bind(this);
    }

    onActiveYearChange(event) {
        this.props.setActiveYear(event.target.value);
    }

    render() {
        const academicYears = this.props.academicYears.map(year =>
            <option value={year}
                    key={year}>{`${year} - ${year + 1}`}</option>,
        );

        return (
            <ReportBar>
                <Form inline>
                    <FormGroup className="mr-4">
                        <Label for="academic-year"
                               className="text-white mr-3">Academic Year</Label>
                        <Input type="select"
                               className="btn-outline-light"
                               defaultValue={this.props.activeYear}
                               onChange={this.onActiveYearChange}>
                            {academicYears}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="term"
                               className="text-white mr-3">Term</Label>
                        <ButtonGroup>
                            <Button outline
                                    color="light"
                                    onClick={() => this.props.setActiveTerm(1)}
                                    active={this.props.activeTerm === 1}>1</Button>
                            <Button outline
                                    color="light"
                                    onClick={() => this.props.setActiveTerm(2)}
                                    active={this.props.activeTerm === 2}>2</Button>
                            <Button outline
                                    color="light"
                                    onClick={() => this.props.setActiveTerm(3)}
                                    active={this.props.activeTerm === 3}>3</Button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>

            </ReportBar>
        );
    }
}

class UnitsReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutions : null,
            error : null,
        };

        this.fetchReport(this.props.year, this.props.term);
    }

    fetchReport(year, term) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeReportQuery(year, term)
            .done(institutions => this.setState({
                institutions : institutions,
            }))
            .fail(error => this.setState({
                error : error,
            }));
    }

    componentWillReceiveProps(props) {
        this.setState({
            institutions : null,
        });

        this.fetchReport(props.year, props.term);
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={() => this.fetchReport(this.props.year, this.props.term)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        if (this.state.institutions === null) {
            return <LoadingSpinner/>;
        }

        const year = parseInt(this.props.year);

        return (
            <div className="report-page">
                <ReportHead/>
                <ReportTitleContainer>
                    <h4>Term End Outbound and Inbound Units Report</h4>
                    <h5>{`Academic Year ${year} - ${year + 1} Term ${this.props.term}`}</h5>
                </ReportTitleContainer>
                <UnitsReportTable institutions={this.state.institutions}/>
                <EndOfReportIndicator/>
            </div>
        );
    }
}

class UnitsReportTable extends Component {
    render() {

        const rows = this.props.institutions.map((institution, index) =>
            <UnitsReportTableRow institution={institution}
                                 key={index}/>,
        );

        let totalOutboundUnits = 0;
        let totalInboundUnits = 0;
        let totalDeficit = 0;

        this.props.institutions.forEach(institution => {
            const outboundUnits = institution.outbound_units_enrolled;
            const inboundUnits = institution.inbound_units_enrolled;
            const difference = outboundUnits - inboundUnits;

            totalOutboundUnits += outboundUnits;
            totalInboundUnits += inboundUnits;
            totalDeficit += difference;
        });

        return (
            <Table>
                <thead>
                <tr className="text-center">
                    <th>Institution</th>
                    <th>Outbound Units</th>
                    <th>Inbound Units</th>
                    <th>Deficit (-) / Surplus (+)</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                <tfoot className="text-right">
                <tr>
                    <th>Total</th>
                    <th className="numeric">{totalOutboundUnits}</th>
                    <th className="numeric">{totalInboundUnits}</th>
                    <th className="numeric">{totalDeficit}</th>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

class UnitsReportTableRow extends Component {
    render() {
        const outboundUnitsEnrolled = this.props.institution.outbound_units_enrolled;
        const inboundUnitsEnrolled = this.props.institution.inbound_units_enrolled;
        const difference = outboundUnitsEnrolled - inboundUnitsEnrolled;

        return (
            <tr>
                <td>{this.props.institution.institution}</td>
                <td className="numeric text-right">{outboundUnitsEnrolled}</td>
                <td className="numeric text-right">{inboundUnitsEnrolled}</td>
                <td className="numeric text-right">{difference}</td>
            </tr>
        );
    }
}

export default OutboundAndInboundUnits;