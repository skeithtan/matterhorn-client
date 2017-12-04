"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jquery = require("jquery");

var $ = _interopRequireWildcard(_jquery);

var _settings = require("../settings");

var _settings2 = _interopRequireDefault(_settings);

var _authorization = require("../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _reports = require("../components/reports");

var _error_state = require("../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _recharts = require("recharts");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeReportQuery(year, term) {
    return $.get({
        url: _settings2.default.serverURL + "/reports/inbound-statistics-reports/",
        beforeSend: _authorization2.default,
        data: {
            "filter": "college",
            "academic-year": year,
            "term": term
        }
    });
}

var InternationalStudentStatisticsByCollege = function (_GenericYearTermRepor) {
    _inherits(InternationalStudentStatisticsByCollege, _GenericYearTermRepor);

    function InternationalStudentStatisticsByCollege() {
        _classCallCheck(this, InternationalStudentStatisticsByCollege);

        return _possibleConstructorReturn(this, (InternationalStudentStatisticsByCollege.__proto__ || Object.getPrototypeOf(InternationalStudentStatisticsByCollege)).apply(this, arguments));
    }

    _createClass(InternationalStudentStatisticsByCollege, [{
        key: "report",
        value: function report(year, term) {
            return _react2.default.createElement(CollegeStudentStatisticsReport, { year: year,
                term: term });
        }
    }]);

    return InternationalStudentStatisticsByCollege;
}(_reports.GenericYearTermReport);

var CollegeStudentStatisticsReport = function (_Component) {
    _inherits(CollegeStudentStatisticsReport, _Component);

    function CollegeStudentStatisticsReport(props) {
        _classCallCheck(this, CollegeStudentStatisticsReport);

        var _this2 = _possibleConstructorReturn(this, (CollegeStudentStatisticsReport.__proto__ || Object.getPrototypeOf(CollegeStudentStatisticsReport)).call(this, props));

        _this2.state = {
            colleges: null,
            error: null
        };

        _this2.fetchReport = _this2.fetchReport.bind(_this2);
        _this2.fetchReport(_this2.props.year, _this2.props.term);
        return _this2;
    }

    _createClass(CollegeStudentStatisticsReport, [{
        key: "fetchReport",
        value: function fetchReport(year, term) {
            var _this3 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeReportQuery(year, term).done(function (colleges) {
                return _this3.setState({
                    colleges: colleges
                });
            }).fail(function () {
                return _this3.setState({
                    error: "AJAX Error at fetchReport()"
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                colleges: null
            });

            this.fetchReport(props.year, props.term);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this4.fetchReport(_this4.props.year, _this4.props.term);
                        } },
                    this.state.error.toString()
                );
            }

            if (this.state.colleges === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var year = parseInt(this.props.year);

            return _react2.default.createElement(
                "div",
                { className: "report-page" },
                _react2.default.createElement(_reports.ReportHead, null),
                _react2.default.createElement(
                    _reports.ReportTitleContainer,
                    null,
                    _react2.default.createElement(
                        "h4",
                        null,
                        "Distribution of International Students (IS) by College"
                    ),
                    _react2.default.createElement(
                        "h5",
                        null,
                        "Academic Year " + year + " - " + (year + 1) + " Term " + this.props.term
                    )
                ),
                _react2.default.createElement(CollegeStudentStatisticsTable, { colleges: this.state.colleges }),
                _react2.default.createElement(CollegeStudentStatisticsChart, { colleges: this.state.colleges }),
                _react2.default.createElement(_reports.EndOfReportIndicator, null)
            );
        }
    }]);

    return CollegeStudentStatisticsReport;
}(_react.Component);

var CollegeStudentStatisticsTable = function (_Component2) {
    _inherits(CollegeStudentStatisticsTable, _Component2);

    function CollegeStudentStatisticsTable() {
        _classCallCheck(this, CollegeStudentStatisticsTable);

        return _possibleConstructorReturn(this, (CollegeStudentStatisticsTable.__proto__ || Object.getPrototypeOf(CollegeStudentStatisticsTable)).apply(this, arguments));
    }

    _createClass(CollegeStudentStatisticsTable, [{
        key: "render",
        value: function render() {
            var totalGradSchool = 0;
            var totalUnderGradSchool = 0;
            var grandTotal = 0;

            this.props.colleges.forEach(function (college) {
                var gradSchool = college.graduate_students;
                var underGradSchool = college.undergrad_students;
                var collegeTotal = gradSchool + underGradSchool;

                totalGradSchool += gradSchool;
                totalUnderGradSchool += underGradSchool;
                grandTotal += collegeTotal;
            });

            var rows = this.props.colleges.map(function (college, index) {
                return _react2.default.createElement(CollegeStudentStatisticsRow, { key: index,
                    college: college,
                    grandTotal: grandTotal });
            });

            return _react2.default.createElement(
                _reactstrap.Table,
                null,
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        { className: "text-center" },
                        _react2.default.createElement(
                            "th",
                            null,
                            "College"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Graduate Students"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Undergraduate Students"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Total Students"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Percentage to Total IS"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    rows
                ),
                _react2.default.createElement(
                    "tfoot",
                    { className: "text-right" },
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            null,
                            "Total"
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            totalGradSchool
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            totalUnderGradSchool
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            grandTotal
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            "100%"
                        )
                    )
                )
            );
        }
    }]);

    return CollegeStudentStatisticsTable;
}(_react.Component);

var CollegeStudentStatisticsRow = function (_Component3) {
    _inherits(CollegeStudentStatisticsRow, _Component3);

    function CollegeStudentStatisticsRow() {
        _classCallCheck(this, CollegeStudentStatisticsRow);

        return _possibleConstructorReturn(this, (CollegeStudentStatisticsRow.__proto__ || Object.getPrototypeOf(CollegeStudentStatisticsRow)).apply(this, arguments));
    }

    _createClass(CollegeStudentStatisticsRow, [{
        key: "render",
        value: function render() {
            var gradSchool = this.props.college.graduate_students;
            var underGradSchool = this.props.college.undergrad_students;
            var collegeTotal = gradSchool + underGradSchool;

            var percentage = 0;

            if (this.props.grandTotal !== 0) {
                percentage = (collegeTotal * 100 / this.props.grandTotal).toFixed(1);
            }

            return _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                    "td",
                    null,
                    this.props.college.college
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    gradSchool
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    underGradSchool
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    collegeTotal
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    percentage,
                    "%"
                )
            );
        }
    }]);

    return CollegeStudentStatisticsRow;
}(_react.Component);

var CollegeStudentStatisticsChart = function (_Component4) {
    _inherits(CollegeStudentStatisticsChart, _Component4);

    function CollegeStudentStatisticsChart() {
        _classCallCheck(this, CollegeStudentStatisticsChart);

        return _possibleConstructorReturn(this, (CollegeStudentStatisticsChart.__proto__ || Object.getPrototypeOf(CollegeStudentStatisticsChart)).apply(this, arguments));
    }

    _createClass(CollegeStudentStatisticsChart, [{
        key: "render",
        value: function render() {
            var data = this.props.colleges.map(function (college) {
                return {
                    name: college.abbreviation,
                    Graduate: college.graduate_students,
                    Undergraduate: college.undergrad_students
                };
            });

            return _react2.default.createElement(
                "div",
                { className: "mt-5 d-flex justify-content-center" },
                _react2.default.createElement(
                    _recharts.BarChart,
                    { width: 560, height: 240, data: data },
                    _react2.default.createElement(_recharts.XAxis, { dataKey: "name" }),
                    _react2.default.createElement(_recharts.YAxis, null),
                    _react2.default.createElement(_recharts.Legend, null),
                    _react2.default.createElement(_recharts.Bar, { dataKey: "Graduate", stackId: "a", fill: "#343a40" }),
                    _react2.default.createElement(_recharts.Bar, { dataKey: "Undergraduate", stackId: "a", fill: "#00a357" })
                )
            );
        }
    }]);

    return CollegeStudentStatisticsChart;
}(_react.Component);

exports.default = InternationalStudentStatisticsByCollege;
//# sourceMappingURL=student_statistics_college.js.map