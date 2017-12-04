"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reports = require("../components/reports");

var _jquery = require("jquery");

var $ = _interopRequireWildcard(_jquery);

var _settings = require("../settings");

var _settings2 = _interopRequireDefault(_settings);

var _authorization = require("../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _error_state = require("../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function makeReportQuery(year, term) {
    return $.get({
        url: _settings2.default.serverURL + "/reports/inbound-statistics-reports/",
        beforeSend: _authorization2.default,
        data: {
            "filter": "country",
            "academic-year": year,
            "term": term
        }
    });
}

var InternationalStudentStatisticsByCountry = function (_GenericYearTermRepor) {
    _inherits(InternationalStudentStatisticsByCountry, _GenericYearTermRepor);

    function InternationalStudentStatisticsByCountry() {
        _classCallCheck(this, InternationalStudentStatisticsByCountry);

        return _possibleConstructorReturn(this, (InternationalStudentStatisticsByCountry.__proto__ || Object.getPrototypeOf(InternationalStudentStatisticsByCountry)).apply(this, arguments));
    }

    _createClass(InternationalStudentStatisticsByCountry, [{
        key: "report",
        value: function report(year, term) {
            return _react2.default.createElement(CountryStudentStatisticsReport, { year: year,
                term: term });
        }
    }]);

    return InternationalStudentStatisticsByCountry;
}(_reports.GenericYearTermReport);

var CountryStudentStatisticsReport = function (_Component) {
    _inherits(CountryStudentStatisticsReport, _Component);

    function CountryStudentStatisticsReport(props) {
        _classCallCheck(this, CountryStudentStatisticsReport);

        var _this2 = _possibleConstructorReturn(this, (CountryStudentStatisticsReport.__proto__ || Object.getPrototypeOf(CountryStudentStatisticsReport)).call(this, props));

        _this2.state = {
            countries: null,
            error: null
        };

        _this2.fetchReport = _this2.fetchReport.bind(_this2);
        _this2.fetchReport(_this2.props.year, _this2.props.term);
        return _this2;
    }

    _createClass(CountryStudentStatisticsReport, [{
        key: "fetchReport",
        value: function fetchReport(year, term) {
            var _this3 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeReportQuery(year, term).done(function (countries) {
                return _this3.setState({
                    countries: countries
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
                countries: null
            });

            this.fetchReport(props.year, props.term);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.state.error) {
                return _react2.default.createElement(_error_state2.default, { onRetryButtonClick: function onRetryButtonClick() {
                        return _this4.fetchReport(_this4.props.year, _this4.props.term);
                    } }, this.state.error.toString());
            }

            if (this.state.countries === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var year = parseInt(this.props.year);

            return _react2.default.createElement("div", { className: "report-page" }, _react2.default.createElement(_reports.ReportHead, null), _react2.default.createElement(_reports.ReportTitleContainer, null, _react2.default.createElement("h4", null, "Distribution of International Students (IS) by Country"), _react2.default.createElement("h5", null, "Academic Year " + year + " - " + (year + 1) + " Term " + this.props.term)), _react2.default.createElement(CountryStudentStatisticsTable, { countries: this.state.countries }), _react2.default.createElement(_reports.EndOfReportIndicator, null));
        }
    }]);

    return CountryStudentStatisticsReport;
}(_react.Component);

var CountryStudentStatisticsTable = function (_Component2) {
    _inherits(CountryStudentStatisticsTable, _Component2);

    function CountryStudentStatisticsTable() {
        _classCallCheck(this, CountryStudentStatisticsTable);

        return _possibleConstructorReturn(this, (CountryStudentStatisticsTable.__proto__ || Object.getPrototypeOf(CountryStudentStatisticsTable)).apply(this, arguments));
    }

    _createClass(CountryStudentStatisticsTable, [{
        key: "render",
        value: function render() {
            var totalGradSchool = 0;
            var totalUnderGradSchool = 0;
            var grandTotal = 0;

            this.props.countries.forEach(function (country) {
                var gradSchool = country.graduate_students;
                var underGradSchool = country.undergrad_students;
                var countryTotal = gradSchool + underGradSchool;

                totalGradSchool += gradSchool;
                totalUnderGradSchool += underGradSchool;
                grandTotal += countryTotal;
            });

            var rows = this.props.countries.map(function (country, index) {
                return _react2.default.createElement(CountryStudentStatisticsRow, { country: country,
                    grandTotal: grandTotal });
            });

            return _react2.default.createElement(_reactstrap.Table, null, _react2.default.createElement("thead", null, _react2.default.createElement("tr", { className: "text-center" }, _react2.default.createElement("th", null, "Country"), _react2.default.createElement("th", null, "Graduate Students"), _react2.default.createElement("th", null, "Undergraduate Students"), _react2.default.createElement("th", null, "Total Students"), _react2.default.createElement("th", null, "Percentage to Total IS"))), _react2.default.createElement("tbody", null, rows), _react2.default.createElement("tfoot", { className: "text-right" }, _react2.default.createElement("tr", null, _react2.default.createElement("th", null, "Total"), _react2.default.createElement("th", { className: "numeric" }, totalGradSchool), _react2.default.createElement("th", { className: "numeric" }, totalUnderGradSchool), _react2.default.createElement("th", { className: "numeric" }, grandTotal), _react2.default.createElement("th", { className: "numeric" }, "100%"))));
        }
    }]);

    return CountryStudentStatisticsTable;
}(_react.Component);

var CountryStudentStatisticsRow = function (_Component3) {
    _inherits(CountryStudentStatisticsRow, _Component3);

    function CountryStudentStatisticsRow() {
        _classCallCheck(this, CountryStudentStatisticsRow);

        return _possibleConstructorReturn(this, (CountryStudentStatisticsRow.__proto__ || Object.getPrototypeOf(CountryStudentStatisticsRow)).apply(this, arguments));
    }

    _createClass(CountryStudentStatisticsRow, [{
        key: "render",
        value: function render() {
            var gradSchool = this.props.country.graduate_students;
            var underGradSchool = this.props.country.undergrad_students;
            var countryTotal = gradSchool + underGradSchool;

            var percentage = 0;

            if (this.props.grandTotal !== 0) {
                percentage = (countryTotal * 100 / this.props.grandTotal).toFixed(1);
            }

            return _react2.default.createElement("tr", null, _react2.default.createElement("td", null, this.props.country.country), _react2.default.createElement("td", { className: "numeric text-right" }, gradSchool), _react2.default.createElement("td", { className: "numeric text-right" }, underGradSchool), _react2.default.createElement("td", { className: "numeric text-right" }, countryTotal), _react2.default.createElement("td", { className: "numeric text-right" }, percentage, "%"));
        }
    }]);

    return CountryStudentStatisticsRow;
}(_react.Component);

exports.default = InternationalStudentStatisticsByCountry;
//# sourceMappingURL=student_statistics_country.js.map
//# sourceMappingURL=student_statistics_country.js.map