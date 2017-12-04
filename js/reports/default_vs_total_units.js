import React, { Component } from "react";
import settings from "../settings";
import authorizeXHR from "../authorization";
import {
    EndOfReportIndicator,
    GenericYearTermReport,
    ReportHead,
    ReportTitleContainer,
} from "../components/reports";
import ErrorState from "../components/error_state";
import LoadingSpinner from "../components/loading";
import { Table } from "reactstrap";


function makeReportQuery(year, term) {
    return $.get({
        url : `${settings.serverURL}/reports/outbound-units-reports/`,
        beforeSend : authorizeXHR,
        data : {
            "academic-year" : year,
            "term" : term,
        },
    });
}

class OutboundDefaultVsTotalUnits extends GenericYearTermReport {
    report(year, term) {
        return <DefaultUnitsReport year={year}
                                   term={term}/>;
    }
}

class DefaultUnitsReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutions : null,
            error : null,
        };

        this.fetchReport = this.fetchReport.bind(this);
        this.fetchReport(props.year, props.term);
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
                <DefaultUnitsTable institutions={this.state.institutions}/>
                <EndOfReportIndicator/>
            </div>
        );
    }
}

class DefaultUnitsTable extends Component {
    render() {
        const rows = this.props.institutions.map((institution, index) =>
            <DefaultUnitsRow institution={institution}
                             key={index}/>,
        );

        let totalStudents = 0;
        let totalDefault = 0;
        let grandTotalUnits = 0;
        let totalDeficit = 0;

        this.props.institutions.forEach(institution => {
            const students = institution.students;
            const defaultUnits = institution.default_units;
            const totalUnits = institution.total_units;
            const deficit = defaultUnits - totalUnits;

            totalStudents += students;
            totalDefault += defaultUnits;
            grandTotalUnits += totalUnits;
            totalDeficit += deficit;
        });

        return (
            <Table>
                <thead>
                <tr className="text-center">
                    <th>Institution</th>
                    <th>Number of Students</th>
                    <th>Default Units</th>
                    <th>Total Units</th>
                    <th>Deficit (-) / Surplus (+)</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                <tfoot className="text-right">
                <tr>
                    <th>Total</th>
                    <th className="numeric">{totalStudents}</th>
                    <th className="numeric">{totalDefault}</th>
                    <th className="numeric">{grandTotalUnits}</th>
                    <th className="numeric">{totalDeficit}</th>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

class DefaultUnitsRow extends Component {
    render() {
        const students = this.props.institution.students;
        const defaultUnits = this.props.institution.default_units;
        const totalUnits = this.props.institution.total_units;
        const deficit = defaultUnits - totalUnits;

        return (
            <tr>
                <td>{this.props.institution.institution}</td>
                <td className="numeric text-right">{students}</td>
                <td className="numeric text-right">{defaultUnits}</td>
                <td className="numeric text-right">{totalUnits}</td>
                <td className="numeric text-right">{deficit}</td>
            </tr>
        );
    }
}

export default OutboundDefaultVsTotalUnits;