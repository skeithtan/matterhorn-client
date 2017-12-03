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

var _graphql = require("../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _reactstrap = require("reactstrap");

var _error_state = require("../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _settings = require("../settings");

var _settings2 = _interopRequireDefault(_settings);

var _authorization = require("../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

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

function makeYearsQuery() {
    return _graphql2.default.query("\n    {\n        academic_years {\n            academic_year_start\n        }\n    }\n    ");
}

function makeReportQuery(year, term) {
    return _jquery2.default.get({
        url: _settings2.default.serverURL + "/reports/unit-reports/",
        beforeSend: _authorization2.default,
        data: {
            "academic-year": year,
            "term": term
        }
    });
}

var OutboundAndInboundUnits = function (_Component) {
    _inherits(OutboundAndInboundUnits, _Component);

    function OutboundAndInboundUnits(props) {
        _classCallCheck(this, OutboundAndInboundUnits);

        var _this = _possibleConstructorReturn(this, (OutboundAndInboundUnits.__proto__ || Object.getPrototypeOf(OutboundAndInboundUnits)).call(this, props));

        _this.state = {
            academicYears: null,
            activeYear: null,
            activeTerm: 1,
            error: null
        };

        _this.fetchYears = _this.fetchYears.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.setActiveTerm = _this.setActiveTerm.bind(_this);

        _this.fetchYears();
        return _this;
    }

    _createClass(OutboundAndInboundUnits, [{
        key: "fetchYears",
        value: function fetchYears() {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeYearsQuery().then(function (result) {
                if (result.academic_years.length === 0) {
                    _this2.setState({
                        academicYears: []
                    });

                    return;
                }

                var academicYears = result.academic_years.map(function (academicYear) {
                    return parseInt(academicYear.academic_year_start);
                });

                var activeYear = academicYears[0];

                _this2.setState({
                    activeYear: activeYear,
                    academicYears: academicYears
                });
            }).catch(function (error) {
                return _this2.setState({
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
        key: "render",
        value: function render() {
            if (this.state.error) {
                return _react2.default.createElement(_error_state2.default, { onRetryButtonClick: this.fetchYears }, this.state.error.toString());
            }

            if (this.state.academicYears === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.state.academicYears.length === 0) {
                return OutboundAndInboundUnits.noAcademicYears();
            }

            return _react2.default.createElement("div", null, _react2.default.createElement(UnitsReportBar, {
                academicYears: this.state.academicYears,
                activeYear: this.state.activeYear,
                activeTerm: this.state.activeTerm,
                setActiveYear: this.setActiveYear,
                setActiveTerm: this.setActiveTerm }), _react2.default.createElement(UnitsReport, {
                year: this.state.activeYear,
                term: this.state.activeTerm }));
        }
    }], [{
        key: "noAcademicYears",
        value: function noAcademicYears() {
            return _react2.default.createElement("div", { className: "loading-container" }, _react2.default.createElement("h3", null, "There are no academic years found."), _react2.default.createElement("p", null, "Reports are grouped by academic year terms. Add academic years to generate reports."));
        }
    }]);

    return OutboundAndInboundUnits;
}(_react.Component);

var UnitsReportBar = function (_Component2) {
    _inherits(UnitsReportBar, _Component2);

    function UnitsReportBar(props) {
        _classCallCheck(this, UnitsReportBar);

        var _this3 = _possibleConstructorReturn(this, (UnitsReportBar.__proto__ || Object.getPrototypeOf(UnitsReportBar)).call(this, props));

        _this3.onActiveYearChange = _this3.onActiveYearChange.bind(_this3);
        return _this3;
    }

    _createClass(UnitsReportBar, [{
        key: "onActiveYearChange",
        value: function onActiveYearChange(event) {
            this.props.setActiveYear(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var academicYears = this.props.academicYears.map(function (year) {
                return _react2.default.createElement("option", { value: year,
                    key: year }, year + " - " + (year + 1));
            });

            return _react2.default.createElement(_reports.ReportBar, null, _react2.default.createElement(_reactstrap.Form, { inline: true }, _react2.default.createElement(_reactstrap.FormGroup, { className: "mr-4" }, _react2.default.createElement(_reactstrap.Label, { "for": "academic-year",
                className: "text-white mr-3" }, "Academic Year"), _react2.default.createElement(_reactstrap.Input, { type: "select",
                className: "btn-outline-light",
                defaultValue: this.props.activeYear,
                onChange: this.onActiveYearChange }, academicYears)), _react2.default.createElement(_reactstrap.FormGroup, null, _react2.default.createElement(_reactstrap.Label, { "for": "term",
                className: "text-white mr-3" }, "Term"), _react2.default.createElement(_reactstrap.ButtonGroup, null, _react2.default.createElement(_reactstrap.Button, { outline: true,
                color: "light",
                onClick: function onClick() {
                    return _this4.props.setActiveTerm(1);
                },
                active: this.props.activeTerm === 1 }, "1"), _react2.default.createElement(_reactstrap.Button, { outline: true,
                color: "light",
                onClick: function onClick() {
                    return _this4.props.setActiveTerm(2);
                },
                active: this.props.activeTerm === 2 }, "2"), _react2.default.createElement(_reactstrap.Button, { outline: true,
                color: "light",
                onClick: function onClick() {
                    return _this4.props.setActiveTerm(3);
                },
                active: this.props.activeTerm === 3 }, "3")))));
        }
    }]);

    return UnitsReportBar;
}(_react.Component);

var UnitsReport = function (_Component3) {
    _inherits(UnitsReport, _Component3);

    function UnitsReport(props) {
        _classCallCheck(this, UnitsReport);

        var _this5 = _possibleConstructorReturn(this, (UnitsReport.__proto__ || Object.getPrototypeOf(UnitsReport)).call(this, props));

        _this5.state = {
            institutions: null,
            error: null
        };

        _this5.fetchReport(_this5.props.year, _this5.props.term);
        return _this5;
    }

    _createClass(UnitsReport, [{
        key: "fetchReport",
        value: function fetchReport(year, term) {
            var _this6 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeReportQuery(year, term).done(function (institutions) {
                return _this6.setState({
                    institutions: institutions
                });
            }).fail(function (error) {
                return _this6.setState({
                    error: error
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
            var _this7 = this;

            if (this.state.error) {
                return _react2.default.createElement(_error_state2.default, { onRetryButtonClick: function onRetryButtonClick() {
                        return _this7.fetchReport(_this7.props.year, _this7.props.term);
                    } }, this.state.error.toString());
            }

            if (this.state.institutions === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var year = parseInt(this.props.year);

            return _react2.default.createElement("div", { className: "report-page" }, _react2.default.createElement(_reports.ReportHead, null), _react2.default.createElement(_reports.ReportTitleContainer, null, _react2.default.createElement("h4", null, "Term End Outbound and Inbound Units Report"), _react2.default.createElement("h5", null, "Academic Year " + year + " - " + (year + 1) + " Term " + this.props.term)), _react2.default.createElement(UnitsReportTable, { institutions: this.state.institutions }));
        }
    }]);

    return UnitsReport;
}(_react.Component);

var UnitsReportTable = function (_Component4) {
    _inherits(UnitsReportTable, _Component4);

    function UnitsReportTable() {
        _classCallCheck(this, UnitsReportTable);

        return _possibleConstructorReturn(this, (UnitsReportTable.__proto__ || Object.getPrototypeOf(UnitsReportTable)).apply(this, arguments));
    }

    _createClass(UnitsReportTable, [{
        key: "render",
        value: function render() {

            var rows = this.props.institutions.map(function (institution, index) {
                return _react2.default.createElement(UnitsReportTableRow, { institution: institution,
                    key: index });
            });

            var totalOutboundUnits = 0;
            var totalInboundUnits = 0;
            var totalDeficit = 0;

            this.props.institutions.forEach(function (institution) {
                var outboundUnits = institution.outbound_units_enrolled;
                var inboundUnits = institution.inbound_units_enrolled;
                var difference = outboundUnits - inboundUnits;

                totalOutboundUnits += outboundUnits;
                totalInboundUnits += inboundUnits;
                totalDeficit += difference;
            });

            return _react2.default.createElement(_reactstrap.Table, null, _react2.default.createElement("thead", null, _react2.default.createElement("tr", { className: "text-center" }, _react2.default.createElement("th", null, "Institution"), _react2.default.createElement("th", null, "Outbound Units"), _react2.default.createElement("th", null, "Inbound Units"), _react2.default.createElement("th", null, "Deficit (-) / Surplus (+)"))), _react2.default.createElement("tbody", null, rows), _react2.default.createElement("tfoot", { className: "text-right" }, _react2.default.createElement("tr", null, _react2.default.createElement("th", null, "Total"), _react2.default.createElement("th", { className: "numeric" }, totalOutboundUnits), _react2.default.createElement("th", { className: "numeric" }, totalInboundUnits), _react2.default.createElement("th", { className: "numeric" }, totalDeficit))));
        }
    }]);

    return UnitsReportTable;
}(_react.Component);

var UnitsReportTableRow = function (_Component5) {
    _inherits(UnitsReportTableRow, _Component5);

    function UnitsReportTableRow() {
        _classCallCheck(this, UnitsReportTableRow);

        return _possibleConstructorReturn(this, (UnitsReportTableRow.__proto__ || Object.getPrototypeOf(UnitsReportTableRow)).apply(this, arguments));
    }

    _createClass(UnitsReportTableRow, [{
        key: "render",
        value: function render() {
            var outboundUnitsEnrolled = this.props.institution.outbound_units_enrolled;
            var inboundUnitsEnrolled = this.props.institution.inbound_units_enrolled;
            var difference = outboundUnitsEnrolled - inboundUnitsEnrolled;

            return _react2.default.createElement("tr", null, _react2.default.createElement("td", null, this.props.institution.institution), _react2.default.createElement("td", { className: "numeric text-right" }, outboundUnitsEnrolled), _react2.default.createElement("td", { className: "numeric text-right" }, inboundUnitsEnrolled), _react2.default.createElement("td", { className: "numeric text-right" }, difference));
        }
    }]);

    return UnitsReportTableRow;
}(_react.Component);

exports.default = OutboundAndInboundUnits;
//# sourceMappingURL=outbound_and_inbound_units.js.map
//# sourceMappingURL=outbound_and_inbound_units.js.map