"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EndOfReportIndicator = exports.YearAndTermReportBar = exports.GenericYearTermReport = exports.ReportTitleContainer = exports.ReportHead = exports.ReportBar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _error_state = require("./error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("./loading");

var _loading2 = _interopRequireDefault(_loading);

var _academic_years_query = require("../reports/academic_years_query");

var _academic_years_query2 = _interopRequireDefault(_academic_years_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportBar = function (_Component) {
    _inherits(ReportBar, _Component);

    function ReportBar(props) {
        _classCallCheck(this, ReportBar);

        return _possibleConstructorReturn(this, (ReportBar.__proto__ || Object.getPrototypeOf(ReportBar)).call(this, props));
    }

    _createClass(ReportBar, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "report-bar bg-dlsu-lighter d-flex flex-row p-3 pt-2 pb-2 align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto d-flex flex-row" },
                    this.props.children
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { color: "light",
                            onClick: function onClick() {
                                return window.print();
                            } },
                        "Print report"
                    )
                )
            );
        }
    }]);

    return ReportBar;
}(_react.Component);

var YearAndTermReportBar = function (_Component2) {
    _inherits(YearAndTermReportBar, _Component2);

    function YearAndTermReportBar(props) {
        _classCallCheck(this, YearAndTermReportBar);

        var _this2 = _possibleConstructorReturn(this, (YearAndTermReportBar.__proto__ || Object.getPrototypeOf(YearAndTermReportBar)).call(this, props));

        _this2.onActiveYearChange = _this2.onActiveYearChange.bind(_this2);
        return _this2;
    }

    _createClass(YearAndTermReportBar, [{
        key: "onActiveYearChange",
        value: function onActiveYearChange(event) {
            this.props.setActiveYear(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var academicYears = this.props.academicYears.map(function (year) {
                return _react2.default.createElement(
                    "option",
                    { value: year,
                        key: year },
                    year + " - " + (year + 1)
                );
            });

            return _react2.default.createElement(
                ReportBar,
                null,
                _react2.default.createElement(
                    _reactstrap.Form,
                    { inline: true },
                    _react2.default.createElement(
                        _reactstrap.FormGroup,
                        { className: "mr-4" },
                        _react2.default.createElement(
                            _reactstrap.Label,
                            { "for": "academic-year",
                                className: "text-white mr-3" },
                            "Academic Year"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Input,
                            { type: "select",
                                className: "btn-outline-light",
                                value: this.props.activeYear,
                                onChange: this.onActiveYearChange },
                            academicYears
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.FormGroup,
                        null,
                        _react2.default.createElement(
                            _reactstrap.Label,
                            { "for": "term",
                                className: "text-white mr-3" },
                            "Term"
                        ),
                        _react2.default.createElement(
                            _reactstrap.ButtonGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "light",
                                    onClick: function onClick() {
                                        return _this3.props.setActiveTerm(1);
                                    },
                                    active: this.props.activeTerm === 1 },
                                "1"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "light",
                                    onClick: function onClick() {
                                        return _this3.props.setActiveTerm(2);
                                    },
                                    active: this.props.activeTerm === 2 },
                                "2"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "light",
                                    onClick: function onClick() {
                                        return _this3.props.setActiveTerm(3);
                                    },
                                    active: this.props.activeTerm === 3 },
                                "3"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return YearAndTermReportBar;
}(_react.Component);

var ReportHead = function (_Component3) {
    _inherits(ReportHead, _Component3);

    function ReportHead() {
        _classCallCheck(this, ReportHead);

        return _possibleConstructorReturn(this, (ReportHead.__proto__ || Object.getPrototypeOf(ReportHead)).apply(this, arguments));
    }

    _createClass(ReportHead, [{
        key: "render",
        value: function render() {
            var dateGenerated = (0, _moment2.default)().format("LLL");

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-row align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row mr-auto align-items-center" },
                    _react2.default.createElement("img", { src: "../../images/dlsu_green.png",
                        className: "report-dlsu-logo mr-2" }),
                    _react2.default.createElement(
                        "div",
                        { className: "d-flex flex-column" },
                        _react2.default.createElement(
                            "div",
                            null,
                            "External Relations and Internationalization Office"
                        ),
                        _react2.default.createElement(
                            "div",
                            null,
                            "De La Salle University Manila"
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-column text-right" },
                    _react2.default.createElement(
                        "div",
                        null,
                        "Report Generated"
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        dateGenerated
                    )
                )
            );
        }
    }]);

    return ReportHead;
}(_react.Component);

var GenericYearTermReport = function (_Component4) {
    _inherits(GenericYearTermReport, _Component4);

    function GenericYearTermReport(props) {
        _classCallCheck(this, GenericYearTermReport);

        var _this5 = _possibleConstructorReturn(this, (GenericYearTermReport.__proto__ || Object.getPrototypeOf(GenericYearTermReport)).call(this, props));

        _this5.state = {
            academicYears: null,
            activeYear: null,
            activeTerm: 1,
            error: null
        };

        _this5.report = _this5.report.bind(_this5);
        _this5.fetchYears = _this5.fetchYears.bind(_this5);
        _this5.setActiveYear = _this5.setActiveYear.bind(_this5);
        _this5.setActiveTerm = _this5.setActiveTerm.bind(_this5);

        _this5.fetchYears();
        return _this5;
    }

    _createClass(GenericYearTermReport, [{
        key: "fetchYears",
        value: function fetchYears() {
            var _this6 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            (0, _academic_years_query2.default)().then(function (result) {
                if (result.academic_years.length === 0) {
                    _this6.setState({
                        academicYears: []
                    });

                    return;
                }

                var academicYears = result.academic_years.map(function (academicYear) {
                    return parseInt(academicYear.academic_year_start);
                });

                var activeYear = academicYears[0];

                _this6.setState({
                    activeYear: activeYear,
                    academicYears: academicYears
                });
            }).catch(function (error) {
                return _this6.setState({
                    error: error
                });
            });
        }
    }, {
        key: "setActiveYear",
        value: function setActiveYear(year) {
            this.setState({
                activeYear: year
            });
        }
    }, {
        key: "setActiveTerm",
        value: function setActiveTerm(term) {
            this.setState({
                activeTerm: term
            });
        }
    }, {
        key: "report",
        value: function report(year, term) {
            return null;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: this.fetchYears },
                    this.state.error.toString()
                );
            }

            if (this.state.academicYears === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.state.academicYears.length === 0) {
                return GenericYearTermReport.noAcademicYears();
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column" },
                _react2.default.createElement(YearAndTermReportBar, {
                    academicYears: this.state.academicYears,
                    activeYear: this.state.activeYear,
                    activeTerm: this.state.activeTerm,
                    setActiveYear: this.setActiveYear,
                    setActiveTerm: this.setActiveTerm }),
                this.report(this.state.activeYear, this.state.activeTerm)
            );
        }
    }], [{
        key: "noAcademicYears",
        value: function noAcademicYears() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There are no academic years found."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Reports are grouped by academic year terms. Add academic years to generate reports."
                )
            );
        }
    }]);

    return GenericYearTermReport;
}(_react.Component);

var ReportTitleContainer = function (_Component5) {
    _inherits(ReportTitleContainer, _Component5);

    function ReportTitleContainer() {
        _classCallCheck(this, ReportTitleContainer);

        return _possibleConstructorReturn(this, (ReportTitleContainer.__proto__ || Object.getPrototypeOf(ReportTitleContainer)).apply(this, arguments));
    }

    _createClass(ReportTitleContainer, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column align-items-center justify-content-center p-5" },
                this.props.children
            );
        }
    }]);

    return ReportTitleContainer;
}(_react.Component);

var EndOfReportIndicator = function (_Component6) {
    _inherits(EndOfReportIndicator, _Component6);

    function EndOfReportIndicator() {
        _classCallCheck(this, EndOfReportIndicator);

        return _possibleConstructorReturn(this, (EndOfReportIndicator.__proto__ || Object.getPrototypeOf(EndOfReportIndicator)).apply(this, arguments));
    }

    _createClass(EndOfReportIndicator, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "w-100 text-center p-5" },
                _react2.default.createElement(
                    "small",
                    { className: "font-weight-bold text-uppercase text-muted" },
                    "End of Report"
                )
            );
        }
    }]);

    return EndOfReportIndicator;
}(_react.Component);

exports.ReportBar = ReportBar;
exports.ReportHead = ReportHead;
exports.ReportTitleContainer = ReportTitleContainer;
exports.GenericYearTermReport = GenericYearTermReport;
exports.YearAndTermReportBar = YearAndTermReportBar;
exports.EndOfReportIndicator = EndOfReportIndicator;
//# sourceMappingURL=reports.js.map