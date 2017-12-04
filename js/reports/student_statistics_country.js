import React, { Component } from "react";
import {
    EndOfReportIndicator,
    GenericYearTermReport,
    ReportHead,
    ReportTitleContainer,
} from "../components/reports";
import * as $ from "jquery";
import settings from "../settings";
import authorizeXHR from "../authorization";
import ErrorState from "../components/error_state";
import LoadingSpinner from "../components/loading";
import { Table } from "reactstrap";


function makeReportQuery(year, term) {
    return $.get({
        url : `${settings.serverURL}/reports/inbound-statistics-reports/`,
        beforeSend : authorizeXHR,
        data : {
            "filter" : "country",
            "academic-year" : year,
            "term" : term,
        },
    });
}

class InternationalStudentStatisticsByCountry extends GenericYearTermReport {
    report(year, term) {
        return <CountryStudentStatisticsReport year={year}
                                               term={term}/>;
    }
}

class CountryStudentStatisticsReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries : null,
            error : null,
        };

        this.fetchReport = this.fetchReport.bind(this);
        this.fetchReport(this.props.year, this.props.term);
    }

    fetchReport(year, term) {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeReportQuery(year, term)
            .done(countries => this.setState({
                countries : countries,
            }))
            .fail(() => this.setState({
                error : "AJAX Error at fetchReport()",
            }));
    }

    componentWillReceiveProps(props) {
        this.setState({
            countries : null,
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

        if (this.state.countries === null) {
            return <LoadingSpinner/>;
        }

        const year = parseInt(this.props.year);

        return (
            <div className="report-page">
                <ReportHead/>
                <ReportTitleContainer>
                    <h4>Distribution of International Students (IS) by Country</h4>
                    <h5>{`Academic Year ${year} - ${year + 1} Term ${this.props.term}`}</h5>
                </ReportTitleContainer>
                <CountryStudentStatisticsTable countries={this.state.countries}/>
                <EndOfReportIndicator/>
            </div>
        );
    }
}

class CountryStudentStatisticsTable extends Component {
    render() {
        let totalGradSchool = 0;
        let totalUnderGradSchool = 0;
        let grandTotal = 0;

        this.props.countries.forEach(country => {
            const gradSchool = country.graduate_students;
            const underGradSchool = country.undergrad_students;
            const countryTotal = gradSchool + underGradSchool;

            totalGradSchool += gradSchool;
            totalUnderGradSchool += underGradSchool;
            grandTotal += countryTotal;
        });

        const rows = this.props.countries.map((country, index) =>
            <CountryStudentStatisticsRow country={country}
                                         grandTotal={grandTotal}/>,
        );

        return (
            <Table>
                <thead>
                <tr className="text-center">
                    <th>Country</th>
                    <th>Graduate Students</th>
                    <th>Undergraduate Students</th>
                    <th>Total Students</th>
                    <th>Percentage to Total IS</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                <tfoot className="text-right">
                <tr>
                    <th>Total</th>
                    <th className="numeric">{totalGradSchool}</th>
                    <th className="numeric">{totalUnderGradSchool}</th>
                    <th className="numeric">{grandTotal}</th>
                    <th className="numeric">100%</th>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

class CountryStudentStatisticsRow extends Component {
    render() {
        const gradSchool = this.props.country.graduate_students;
        const underGradSchool = this.props.country.undergrad_students;
        const countryTotal = gradSchool + underGradSchool;

        let percentage = 0;

        if (this.props.grandTotal !== 0) {
            percentage = (countryTotal * 100 / this.props.grandTotal).toFixed(1);
        }

        return (
            <tr>
                <td>{this.props.country.country}</td>
                <td className="numeric text-right">{gradSchool}</td>
                <td className="numeric text-right">{underGradSchool}</td>
                <td className="numeric text-right">{countryTotal}</td>
                <td className="numeric text-right">{percentage}%</td>
            </tr>
        );
    }
}

export default InternationalStudentStatisticsByCountry;