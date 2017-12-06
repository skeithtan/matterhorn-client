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

var _authorization = require("../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _error_state = require("../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _settings = require("../settings");

var _settings2 = _interopRequireDefault(_settings);

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
    return _jquery2.default.get({
        url: _settings2.default.serverURL + "/reports/general-statistics-reports",
        beforeSend: _authorization2.default,
        data: {
            "filter": "country",
            "academic-year": year,
            "term": term
        }
    });
}

var DistributionPerCountry = function (_GenericYearTermRepor) {
    _inherits(DistributionPerCountry, _GenericYearTermRepor);

    function DistributionPerCountry() {
        _classCallCheck(this, DistributionPerCountry);

        return _possibleConstructorReturn(this, (DistributionPerCountry.__proto__ || Object.getPrototypeOf(DistributionPerCountry)).apply(this, arguments));
    }

    _createClass(DistributionPerCountry, [{
        key: "report",
        value: function report(year, term) {
            return _react2.default.createElement(StudentDistributionReport, { year: year,
                term: term });
        }
    }]);

    return DistributionPerCountry;
}(_reports.GenericYearTermReport);

var StudentDistributionReport = function (_Component) {
    _inherits(StudentDistributionReport, _Component);

    function StudentDistributionReport(props) {
        _classCallCheck(this, StudentDistributionReport);

        var _this2 = _possibleConstructorReturn(this, (StudentDistributionReport.__proto__ || Object.getPrototypeOf(StudentDistributionReport)).call(this, props));

        _this2.state = {
            countries: null,
            error: null
        };

        _this2.fetchReport = _this2.fetchReport.bind(_this2);

        _this2.fetchReport(_this2.props.year, _this2.props.term);
        return _this2;
    }

    _createClass(StudentDistributionReport, [{
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

            return _react2.default.createElement("div", { className: "report-page" }, _react2.default.createElement(_reports.ReportHead, null), _react2.default.createElement(_reports.ReportTitleContainer, null, _react2.default.createElement("h4", null, "Term End Distribution Report By Country"), _react2.default.createElement("h5", null, "Academic Year " + year + " - " + (year + 1) + " Term " + this.props.term)), _react2.default.createElement(StudentDistributionTable, { countries: this.state.countries }), _react2.default.createElement(_reports.EndOfReportIndicator, null));
        }
    }]);

    return StudentDistributionReport;
}(_react.Component);

var StudentDistributionTable = function (_Component2) {
    _inherits(StudentDistributionTable, _Component2);

    function StudentDistributionTable() {
        _classCallCheck(this, StudentDistributionTable);

        return _possibleConstructorReturn(this, (StudentDistributionTable.__proto__ || Object.getPrototypeOf(StudentDistributionTable)).apply(this, arguments));
    }

    _createClass(StudentDistributionTable, [{
        key: "render",
        value: function render() {
            var rows = this.props.countries.map(function (country, index) {
                return _react2.default.createElement(StudentDistributionRow, { country: country,
                    key: index });
            });

            var totalInboundUndergrad = 0;
            var totalInboundGrad = 0;
            var totalOutboundUndergrad = 0;
            var totalOutboundGrad = 0;

            this.props.countries.forEach(function (country) {
                var inboundUndergrad = country.inbound_undergrad_students;
                var inboundGrad = country.inbound_graduate_students;
                var outboundUndergrad = country.outbound_undergrad_students;
                var outboundGrad = country.outbound_graduate_students;

                totalInboundUndergrad += inboundUndergrad;
                totalInboundGrad += inboundGrad;
                totalOutboundUndergrad += outboundUndergrad;
                totalOutboundGrad += outboundGrad;
            });

            return _react2.default.createElement(_reactstrap.Table, null, _react2.default.createElement("thead", null, _react2.default.createElement("tr", { className: "text-center" }, _react2.default.createElement("th", null, "Institution"), _react2.default.createElement("th", null, "Inbound Undergraduate"), _react2.default.createElement("th", null, "Inbound Graduate"), _react2.default.createElement("th", null, "Outbound Undergraduate"), _react2.default.createElement("th", null, "Outbound Graduate"))), _react2.default.createElement("tbody", null, rows), _react2.default.createElement("tfoot", { className: "text-right" }, _react2.default.createElement("tr", null, _react2.default.createElement("th", null, "Total"), _react2.default.createElement("th", { className: "numeric" }, totalInboundUndergrad), _react2.default.createElement("th", { className: "numeric" }, totalInboundGrad), _react2.default.createElement("th", { className: "numeric" }, totalOutboundUndergrad), _react2.default.createElement("th", { className: "numeric" }, totalOutboundGrad))));
        }
    }]);

    return StudentDistributionTable;
}(_react.Component);

var StudentDistributionRow = function (_Component3) {
    _inherits(StudentDistributionRow, _Component3);

    function StudentDistributionRow() {
        _classCallCheck(this, StudentDistributionRow);

        return _possibleConstructorReturn(this, (StudentDistributionRow.__proto__ || Object.getPrototypeOf(StudentDistributionRow)).apply(this, arguments));
    }

    _createClass(StudentDistributionRow, [{
        key: "render",
        value: function render() {
            var country = this.props.country;

            var inboundUndergrad = country.inbound_undergrad_students;
            var inboundGrad = country.inbound_graduate_students;
            var outboundUndergrad = country.outbound_undergrad_students;
            var outboundGrad = country.outbound_graduate_students;

            return _react2.default.createElement("tr", null, _react2.default.createElement("td", null, this.props.country.country), _react2.default.createElement("td", { className: "numeric text-right" }, inboundUndergrad), _react2.default.createElement("td", { className: "numeric text-right" }, inboundGrad), _react2.default.createElement("td", { className: "numeric text-right" }, outboundUndergrad), _react2.default.createElement("td", { className: "numeric text-right" }, outboundGrad));
        }
    }]);

    return StudentDistributionRow;
}(_react.Component);

exports.default = DistributionPerCountry;
//# sourceMappingURL=distribution_per_country.js.map
//# sourceMappingURL=distribution_per_country.js.map