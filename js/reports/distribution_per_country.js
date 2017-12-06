import React, { Component } from "react";
import {
    EndOfReportIndicator,
    GenericYearTermReport,
    ReportHead,
    ReportTitleContainer,
} from "../components/reports";
import authorizeXHR from "../authorization";
import $ from "jquery";
import ErrorState from "../components/error_state";
import LoadingSpinner from "../components/loading";
import { Table } from "reactstrap";
import settings from "../settings";


function makeReportQuery(year, term) {
    return $.get({
        url : `${settings.serverURL}/reports/general-statistics-reports`,
        beforeSend : authorizeXHR,
        data : {
            "filter" : "country",
            "academic-year" : year,
            "term" : term,
        },
    });
}

class DistributionPerCountry extends GenericYearTermReport {
    report(year, term) {
        return <StudentDistributionReport year={year}
                                          term={term}/>;
    }
}

class StudentDistributionReport extends Component {
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
                    <h4>Term End Distribution Report By Country</h4>
                    <h5>{`Academic Year ${year} - ${year + 1} Term ${this.props.term}`}</h5>
                </ReportTitleContainer>
                <StudentDistributionTable countries={this.state.countries}/>
                <EndOfReportIndicator/>
            </div>
        );
    }
}

class StudentDistributionTable extends Component {
    render() {
        const rows = this.props.countries.map((country, index) =>
            <StudentDistributionRow country={country}
                                    key={index}/>,
        );

        let totalInboundUndergrad = 0;
        let totalInboundGrad = 0;
        let totalOutboundUndergrad = 0;
        let totalOutboundGrad = 0;

        this.props.countries.forEach(country => {
            const inboundUndergrad = country.inbound_undergrad_students;
            const inboundGrad = country.inbound_graduate_students;
            const outboundUndergrad = country.outbound_undergrad_students;
            const outboundGrad = country.outbound_graduate_students;


            totalInboundUndergrad += inboundUndergrad;
            totalInboundGrad += inboundGrad;
            totalOutboundUndergrad += outboundUndergrad;
            totalOutboundGrad += outboundGrad;
        });

        return (
            <Table>
                <thead>
                <tr className="text-center">
                    <th>Institution</th>
                    <th>Inbound Undergraduate</th>
                    <th>Inbound Graduate</th>
                    <th>Outbound Undergraduate</th>
                    <th>Outbound Graduate</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                <tfoot className="text-right">
                <tr>
                    <th>Total</th>
                    <th className="numeric">{totalInboundUndergrad}</th>
                    <th className="numeric">{totalInboundGrad}</th>
                    <th className="numeric">{totalOutboundUndergrad}</th>
                    <th className="numeric">{totalOutboundGrad}</th>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

class StudentDistributionRow extends Component {
    render() {
        const country = this.props.country;

        const inboundUndergrad = country.inbound_undergrad_students;
        const inboundGrad = country.inbound_graduate_students;
        const outboundUndergrad = country.outbound_undergrad_students;
        const outboundGrad = country.outbound_graduate_students;

        return (
            <tr>
                <td>{this.props.country.country}</td>
                <td className="numeric text-right">{inboundUndergrad}</td>
                <td className="numeric text-right">{inboundGrad}</td>
                <td className="numeric text-right">{outboundUndergrad}</td>
                <td className="numeric text-right">{outboundGrad}</td>
            </tr>
        );
    }
}

export default DistributionPerCountry;