import React, { Component } from "react";
import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import moment from "moment";
import ErrorState from "./error_state";
import LoadingSpinner from "./loading";
import makeYearsQuery from "../reports/academic_years_query";


class ReportBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="report-bar bg-dlsu-lighter d-flex flex-row p-3 pt-2 pb-2 align-items-center">
                <div className="mr-auto d-flex flex-row">
                    {this.props.children}
                </div>
                <div>
                    <Button color="light"
                            onClick={() => window.print()}>Print report</Button>
                </div>
            </div>
        );
    }
}

class YearAndTermReportBar extends Component {
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
                               value={this.props.activeYear}
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

class ReportHead extends Component {
    render() {
        const dateGenerated = moment().format("LLL");

        return (
            <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-row mr-auto align-items-center">
                    <img src="../images/dlsu_green.png"
                         className="report-dlsu-logo mr-2"/>
                    <div className="d-flex flex-column">
                        <div>External Relations and Internationalization Office</div>
                        <div>De La Salle University Manila</div>
                    </div>
                </div>

                <div className="d-flex flex-column text-right">
                    <div>Report Generated</div>
                    <div>{dateGenerated}</div>
                </div>
            </div>
        );
    }
}

class GenericYearTermReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            academicYears : null,
            activeYear : null,
            activeTerm : 1,
            error : null,
        };

        this.report = this.report.bind(this);
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

    report(year, term) {
        return null;
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
            return GenericYearTermReport.noAcademicYears();
        }

        return (
            <div>
                <YearAndTermReportBar
                    academicYears={this.state.academicYears}
                    activeYear={this.state.activeYear}
                    activeTerm={this.state.activeTerm}
                    setActiveYear={this.setActiveYear}
                    setActiveTerm={this.setActiveTerm}/>

                {this.report(this.state.activeYear, this.state.activeTerm)}
            </div>
        );
    }
}

class ReportTitleContainer extends Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                {this.props.children}
            </div>
        );
    }
}

class EndOfReportIndicator extends Component {
    render() {
        return (
            <div className="w-100 text-center p-5">
                <small className="font-weight-bold text-uppercase text-muted">End of Report</small>
            </div>
        );
    }
}

export {
    ReportBar,
    ReportHead,
    ReportTitleContainer,
    GenericYearTermReport,
    YearAndTermReportBar,
    EndOfReportIndicator,
};