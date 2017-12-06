import React, { Component } from "react";
import * as $ from "jquery";
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
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
} from "recharts";


function makeReportQuery(year, term) {
    return $.get({
        url : `${settings.serverURL}/reports/general-statistics-reports`,
        beforeSend : authorizeXHR,
        data : {
            "filter" : "college",
            "academic-year" : year,
            "term" : term,
        },
    });
}

class InternationalStudentStatisticsByCollege extends GenericYearTermReport {
    report(year, term) {
        return <CollegeStudentStatisticsReport year={ year }
                                               term={ term }/>;
    }
}

class CollegeStudentStatisticsReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colleges : null,
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
            .done(colleges => this.setState({
                colleges : colleges,
            }))
            .fail(() => this.setState({
                error : "AJAX Error at fetchReport()",
            }));
    }

    componentWillReceiveProps(props) {
        this.setState({
            colleges : null,
        });

        this.fetchReport(props.year, props.term);
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRetryButtonClick={ () => this.fetchReport(this.props.year, this.props.term) }>
                    { this.state.error.toString() }
                </ErrorState>
            );
        }

        if (this.state.colleges === null) {
            return <LoadingSpinner/>;
        }

        const year = parseInt(this.props.year);

        return (
            <div className="report-page">
                <ReportHead/>
                <ReportTitleContainer>
                    <h4>Distribution of International Students (IS) by College</h4>
                    <h5>{ `Academic Year ${year} - ${year + 1} Term ${this.props.term}` }</h5>
                </ReportTitleContainer>
                <CollegeStudentStatisticsTable colleges={ this.state.colleges }/>
                <CollegeStudentStatisticsChart colleges={ this.state.colleges }/>
                <EndOfReportIndicator/>
            </div>
        );
    }
}

class CollegeStudentStatisticsTable extends Component {
    render() {
        let totalGradSchool = 0;
        let totalUnderGradSchool = 0;
        let grandTotal = 0;

        this.props.colleges.forEach(college => {
            const gradSchool = college.inbound_graduate_students;
            const underGradSchool = college.inbound_undergrad_students;
            const collegeTotal = gradSchool + underGradSchool;

            totalGradSchool += gradSchool;
            totalUnderGradSchool += underGradSchool;
            grandTotal += collegeTotal;
        });

        const rows = this.props.colleges.map((college, index) =>
            <CollegeStudentStatisticsRow key={ index }
                                         college={ college }
                                         grandTotal={ grandTotal }/>,
        );

        return (
            <Table>
                <thead>
                <tr className="text-center">
                    <th>College</th>
                    <th>Graduate Students</th>
                    <th>Undergraduate Students</th>
                    <th>Total Students</th>
                    <th>Percentage to Total IS</th>
                </tr>
                </thead>
                <tbody>
                { rows }
                </tbody>
                <tfoot className="text-right">
                <tr>
                    <th>Total</th>
                    <th className="numeric">{ totalGradSchool }</th>
                    <th className="numeric">{ totalUnderGradSchool }</th>
                    <th className="numeric">{ grandTotal }</th>
                    <th className="numeric">100%</th>
                </tr>
                </tfoot>
            </Table>
        );
    }
}

class CollegeStudentStatisticsRow extends Component {
    render() {
        const gradSchool = this.props.college.inbound_graduate_students;
        const underGradSchool = this.props.college.inbound_undergrad_students;
        const collegeTotal = gradSchool + underGradSchool;

        let percentage = 0;

        if (this.props.grandTotal !== 0) {
            percentage = (collegeTotal * 100 / this.props.grandTotal).toFixed(1);
        }

        return (
            <tr>
                <td>{ this.props.college.college }</td>
                <td className="numeric text-right">{ gradSchool }</td>
                <td className="numeric text-right">{ underGradSchool }</td>
                <td className="numeric text-right">{ collegeTotal }</td>
                <td className="numeric text-right">{ percentage }%</td>
            </tr>
        );
    }
}

class CollegeStudentStatisticsChart extends Component {
    render() {
        const data = this.props.colleges.map(college => {
            return {
                name : college.abbreviation,
                Graduate : college.inbound_graduate_students,
                Undergraduate: college.inbound_undergrad_students
            };
        });

        return (
            <div className="mt-5 d-flex justify-content-center">
                <BarChart width={ 560 } height={ 240 } data={ data }>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Legend/>
                    <Bar dataKey="Graduate" stackId="a" fill="#343a40"/>
                    <Bar dataKey="Undergraduate" stackId="a" fill="#00a357"/>
                </BarChart>
            </div>
        );
    }
}

export default InternationalStudentStatisticsByCollege;