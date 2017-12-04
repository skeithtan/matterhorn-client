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
        url : `${settings.serverURL}/reports/student-distribution-reports/`,
        beforeSend : authorizeXHR,
        data : {
            "academic-year" : year,
            "term" : term,
        },
    });
}

class DistributionOfStudents extends GenericYearTermReport {
    report(year, term) {
        return <StudentDistributionReport year={year}
                                          term={term}/>;
    }
}

class StudentDistributionReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutions : null,
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
            .done(institutions => this.setState({
                institutions : institutions,
            }))
            .fail(() => this.setState({
                error : "AJAX Error at fetchReport()",
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
                    <h4>Term End Outbound and Inbound Students Distribution Report</h4>
                    <h5>{`Academic Year ${year} - ${year + 1} Term ${this.props.term}`}</h5>
                </ReportTitleContainer>
                <StudentDistributionTable institutions={this.state.institutions}/>
                <EndOfReportIndicator/>
            </div>
        );
    }
}

class StudentDistributionTable extends Component {
    render() {
        const rows = this.props.institutions.map((institution, index) =>
            <StudentDistributionRow institution={institution}
                                    key={index}/>,
        );

        let totalOutboundStudents = 0;
        let totalInboundStudents = 0;
        let totalDeficit = 0;

        this.props.institutions.forEach(institution => {
            const outboundCount = institution.outbound_students_count;
            const inboundCount = institution.inbound_students_count;
            const deficit = outboundCount - inboundCount;

            totalOutboundStudents += outboundCount;
            totalInboundStudents += inboundCount;
            totalDeficit += deficit;
        });

        return (
            <Table>
                <thead>
                <tr className="text-center">
                    <th>Institution</th>
                    <th>Outbound</th>
                    <th>Inbound</th>
                    <th>Deficit (-) / Surplus (+)</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                <tfoot className="text-right">
                <tr>
                    <th>Total</th>
                    <th className="numeric">{totalOutboundStudents}</th>
                    <th className="numeric">{totalInboundStudents}</th>
                    <th className="numeric">{totalDeficit}</th>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

class StudentDistributionRow extends Component {
    render() {
        const outboundStudentsCount = this.props.institution.outbound_students_count;
        const inboundStudentsCount = this.props.institution.inbound_students_count;
        const deficit = outboundStudentsCount - inboundStudentsCount;

        return (
            <tr>
                <td>{this.props.institution.institution}</td>
                <td className="numeric text-right">{outboundStudentsCount}</td>
                <td className="numeric text-right">{inboundStudentsCount}</td>
                <td className="numeric text-right">{deficit}</td>
            </tr>
        );
    }
}

export default DistributionOfStudents;