"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProgramsSidebarPane = exports.AcademicYearSidebarPane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _section = require("../../components/section");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchAcademicYear(id, onResult) {
    _graphql2.default.query("\n    {\n        terms(year:" + id + ") {\n            id\n            number\n            start_date\n            end_date\n        }\n    }\n    ").then(onResult);
}

function termsIsFetched(year) {
    return year.terms !== undefined;
}

var AcademicYearSidebarPane = function (_Component) {
    _inherits(AcademicYearSidebarPane, _Component);

    function AcademicYearSidebarPane(props) {
        _classCallCheck(this, AcademicYearSidebarPane);

        var _this = _possibleConstructorReturn(this, (AcademicYearSidebarPane.__proto__ || Object.getPrototypeOf(AcademicYearSidebarPane)).call(this, props));

        _this.state = {
            editAcademicYearIsShowing: false,
            deleteAcademicYearIsShowing: false,
            academicYear: props.academicYear
        };

        if (!termsIsFetched(props.academicYear)) {
            fetchAcademicYear(props.academicYear.academic_year_start, function (result) {
                props.academicYear.terms = result.terms;

                _this.setState({
                    academicYear: props.academicYear
                });
            });
        }
        return _this;
    }

    _createClass(AcademicYearSidebarPane, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var _this2 = this;

            this.setState({
                academicYear: props.academicYear
            });

            if (!termsIsFetched(props.academicYear)) {
                fetchAcademicYear(props.academicYear.academic_year_start, function (result) {
                    props.academicYear.terms = result.terms;

                    _this2.setState({
                        academicYear: props.academicYear
                    });
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var academicYear = this.state.academicYear;

            if (!termsIsFetched(academicYear)) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var academicYearFull = academicYear.academic_year_start + " - " + (parseInt(academicYear.academic_year_start) + 1);

            var terms = academicYear.terms.map(function (term) {
                return _react2.default.createElement(TermSection, { term: term,
                    key: term.id });
            });

            return _react2.default.createElement(
                "div",
                { className: "p-0 h-100 d-flex flex-column" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head pt-5 d-flex flex-row align-items-end" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0" },
                            "Academic Year ",
                            academicYearFull
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(
                        _section.Section,
                        null,
                        _react2.default.createElement(
                            _section.SectionTitle,
                            null,
                            "Details"
                        ),
                        _react2.default.createElement(
                            _section.SectionTable,
                            null,
                            _react2.default.createElement(
                                _section.SectionRow,
                                null,
                                _react2.default.createElement(
                                    _section.SectionRowTitle,
                                    null,
                                    "Academic Year"
                                ),
                                _react2.default.createElement(
                                    _section.SectionRowContent,
                                    null,
                                    academicYearFull
                                )
                            ),
                            _react2.default.createElement(
                                _section.SectionRow,
                                { className: "d-flex flex-row justify-content-between" },
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true,
                                        color: "success",
                                        size: "sm" },
                                    "Edit Academic Year"
                                ),
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true,
                                        color: "danger",
                                        size: "sm" },
                                    "Delete"
                                )
                            )
                        )
                    ),
                    terms
                )
            );
        }
    }]);

    return AcademicYearSidebarPane;
}(_react.Component);

var TermSection = function (_Component2) {
    _inherits(TermSection, _Component2);

    function TermSection(props) {
        _classCallCheck(this, TermSection);

        return _possibleConstructorReturn(this, (TermSection.__proto__ || Object.getPrototypeOf(TermSection)).call(this, props));
    }

    _createClass(TermSection, [{
        key: "render",
        value: function render() {
            var startDate = (0, _moment2.default)(this.props.term.start_date).format("LL");
            var endDate = (0, _moment2.default)(this.props.term.end_date).format("LL");

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Term ",
                    this.props.term.number
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Start Date"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            startDate
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "End Date"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            endDate
                        )
                    )
                )
            );
        }
    }]);

    return TermSection;
}(_react.Component);

var ProgramsSidebarPane = function (_Component3) {
    _inherits(ProgramsSidebarPane, _Component3);

    function ProgramsSidebarPane(props) {
        _classCallCheck(this, ProgramsSidebarPane);

        return _possibleConstructorReturn(this, (ProgramsSidebarPane.__proto__ || Object.getPrototypeOf(ProgramsSidebarPane)).call(this, props));
    }

    _createClass(ProgramsSidebarPane, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "p-0 h-100 d-flex flex-column" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head pt-5 d-flex flex-row align-items-end" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0" },
                            this.props.program.name
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(
                        _section.Section,
                        null,
                        _react2.default.createElement(
                            _section.SectionTitle,
                            null,
                            "Details"
                        ),
                        _react2.default.createElement(
                            _section.SectionTable,
                            null,
                            _react2.default.createElement(
                                _section.SectionRow,
                                null,
                                _react2.default.createElement(
                                    _section.SectionRowTitle,
                                    null,
                                    "Name"
                                ),
                                _react2.default.createElement(
                                    _section.SectionRowContent,
                                    null,
                                    this.props.program.name
                                )
                            ),
                            _react2.default.createElement(
                                _section.SectionRow,
                                null,
                                _react2.default.createElement(
                                    _section.SectionRowTitle,
                                    null,
                                    "Institution Name"
                                ),
                                _react2.default.createElement(
                                    _section.SectionRowContent,
                                    null,
                                    this.props.program.memorandum.institution.name
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ProgramsSidebarPane;
}(_react.Component);

exports.AcademicYearSidebarPane = AcademicYearSidebarPane;
exports.ProgramsSidebarPane = ProgramsSidebarPane;
//# sourceMappingURL=sidebar_panes.js.map