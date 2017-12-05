import React, { Component } from "react";
import {
    EndOfReportIndicator,
    GenericYearTermReport,
    ReportHead,
    ReportTitleContainer,
} from "../components/reports";
import {
    Table,
} from "reactstrap";
import ErrorState from "../components/error_state";
import LoadingSpinner from "../components/loading";
import $ from "jquery";
import settings from "../settings";
import authorizeXHR from "../authorization";


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

class OutboundAndInboundUnits extends GenericYearTermReport {
    report(year, term) {
        return <UnitsReport year={year}
                            term={term}/>;
    }
}

class UnitsReport extends Component {
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
        const deficit = outboundUnitsEnrolled - inboundUnitsEnrolled;

        return (
            <tr>
                <td>{this.props.institution.institution}</td>
                <td className="numeric text-right">{outboundUnitsEnrolled}</td>
                <td className="numeric text-right">{inboundUnitsEnrolled}</td>
                <td className="numeric text-right">{deficit}</td>
            </tr>
        );
    }
}

export default OutboundAndInboundUnits;