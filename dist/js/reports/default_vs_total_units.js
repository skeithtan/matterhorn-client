"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeReportQuery(year, term) {
    return $.get({
        url: _settings2.default.serverURL + "/reports/outbound-units-reports/",
        beforeSend: _authorization2.default,
        data: {
            "academic-year": year,
            "term": term
        }
    });
}

var OutboundDefaultVsTotalUnits = function (_GenericYearTermRepor) {
    _inherits(OutboundDefaultVsTotalUnits, _GenericYearTermRepor);

    function OutboundDefaultVsTotalUnits() {
        _classCallCheck(this, OutboundDefaultVsTotalUnits);

        return _possibleConstructorReturn(this, (OutboundDefaultVsTotalUnits.__proto__ || Object.getPrototypeOf(OutboundDefaultVsTotalUnits)).apply(this, arguments));
    }

    _createClass(OutboundDefaultVsTotalUnits, [{
        key: "report",
        value: function report(year, term) {
            return _react2.default.createElement(DefaultUnitsReport, { year: year,
                term: term });
        }
    }]);

    return OutboundDefaultVsTotalUnits;
}(_reports.GenericYearTermReport);

var DefaultUnitsReport = function (_Component) {
    _inherits(DefaultUnitsReport, _Component);

    function DefaultUnitsReport(props) {
        _classCallCheck(this, DefaultUnitsReport);

        var _this2 = _possibleConstructorReturn(this, (DefaultUnitsReport.__proto__ || Object.getPrototypeOf(DefaultUnitsReport)).call(this, props));

        _this2.state = {
            institutions: null,
            error: null
        };

        _this2.fetchReport = _this2.fetchReport.bind(_this2);
        _this2.fetchReport(props.year, props.term);
        return _this2;
    }

    _createClass(DefaultUnitsReport, [{
        key: "fetchReport",
        value: function fetchReport(year, term) {
            var _this3 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeReportQuery(year, term).done(function (institutions) {
                return _this3.setState({
                    institutions: institutions
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
                institutions: null
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

            if (this.state.institutions === null) {
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
                        "Term End Outbound and Inbound Students Distribution Report"
                    ),
                    _react2.default.createElement(
                        "h5",
                        null,
                        "Academic Year " + year + " - " + (year + 1) + " Term " + this.props.term
                    )
                ),
                _react2.default.createElement(DefaultUnitsTable, { institutions: this.state.institutions }),
                _react2.default.createElement(_reports.EndOfReportIndicator, null)
            );
        }
    }]);

    return DefaultUnitsReport;
}(_react.Component);

var DefaultUnitsTable = function (_Component2) {
    _inherits(DefaultUnitsTable, _Component2);

    function DefaultUnitsTable() {
        _classCallCheck(this, DefaultUnitsTable);

        return _possibleConstructorReturn(this, (DefaultUnitsTable.__proto__ || Object.getPrototypeOf(DefaultUnitsTable)).apply(this, arguments));
    }

    _createClass(DefaultUnitsTable, [{
        key: "render",
        value: function render() {
            var rows = this.props.institutions.map(function (institution, index) {
                return _react2.default.createElement(DefaultUnitsRow, { institution: institution,
                    key: index });
            });

            var totalStudents = 0;
            var totalDefault = 0;
            var grandTotalUnits = 0;
            var totalDeficit = 0;

            this.props.institutions.forEach(function (institution) {
                var students = institution.students;
                var defaultUnits = institution.default_units;
                var totalUnits = institution.total_units;
                var deficit = defaultUnits - totalUnits;

                totalStudents += students;
                totalDefault += defaultUnits;
                grandTotalUnits += totalUnits;
                totalDeficit += deficit;
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
                            "Institution"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Number of Students"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Default Units"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Total Units"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Deficit (-) / Surplus (+)"
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
                            totalStudents
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            totalDefault
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            grandTotalUnits
                        ),
                        _react2.default.createElement(
                            "th",
                            { className: "numeric" },
                            totalDeficit
                        )
                    )
                )
            );
        }
    }]);

    return DefaultUnitsTable;
}(_react.Component);

var DefaultUnitsRow = function (_Component3) {
    _inherits(DefaultUnitsRow, _Component3);

    function DefaultUnitsRow() {
        _classCallCheck(this, DefaultUnitsRow);

        return _possibleConstructorReturn(this, (DefaultUnitsRow.__proto__ || Object.getPrototypeOf(DefaultUnitsRow)).apply(this, arguments));
    }

    _createClass(DefaultUnitsRow, [{
        key: "render",
        value: function render() {
            var students = this.props.institution.students;
            var defaultUnits = this.props.institution.default_units;
            var totalUnits = this.props.institution.total_units;
            var deficit = defaultUnits - totalUnits;

            return _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                    "td",
                    null,
                    this.props.institution.institution
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    students
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    defaultUnits
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    totalUnits
                ),
                _react2.default.createElement(
                    "td",
                    { className: "numeric text-right" },
                    deficit
                )
            );
        }
    }]);

    return DefaultUnitsRow;
}(_react.Component);

exports.default = OutboundDefaultVsTotalUnits;
//# sourceMappingURL=default_vs_total_units.js.map