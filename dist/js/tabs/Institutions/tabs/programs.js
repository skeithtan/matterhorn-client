"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

var _sidebar_panes = require("./sidebar_panes");

var _modals = require("../modals");

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeYearsQuery() {
    return _graphql2.default.query("\n    {\n        academic_years {\n            academic_year_start\n        }\n    }\n    ");
}

function makeProgramsQuery(institutionID, year) {
    return _graphql2.default.query("\n    {\n        outbound_programs(institution:" + institutionID + ", year:" + year + ") {\n            id\n            name\n            linkage {\n                name\n            }\n            academic_year {\n                academic_year_start\n            }\n        }\n    }\n    ");
}

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

        _this.state = {
            yearList: null,
            activeYear: null,
            programList: null,
            activeProgram: null,
            addProgramIsShowing: false,
            error: null
        };

        _this.fetchYears = _this.fetchYears.bind(_this);
        _this.fetchPrograms = _this.fetchPrograms.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        _this.toggleAddProgram = _this.toggleAddProgram.bind(_this);

        _this.fetchYears();
        return _this;
    }

    _createClass(Programs, [{
        key: "fetchYears",
        value: function fetchYears() {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeYearsQuery().then(function (result) {
                var yearList = result.academic_years.map(function (academicYear) {
                    return academicYear.academic_year_start;
                });

                if (yearList.length === 0) {
                    _this2.setState({
                        yearList: []
                    });

                    return;
                }

                var activeYear = yearList[0];

                _this2.setState({
                    yearList: yearList,
                    activeYear: activeYear
                });

                _this2.fetchPrograms(_this2.props.institution.id, activeYear);
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });
        }

        // There might be a need to check for the activeYear

    }, {
        key: "fetchPrograms",
        value: function fetchPrograms(institution, year) {
            var _this3 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeProgramsQuery(institution, year).then(function (result) {
                _this3.setState({
                    programList: result.outbound_programs
                });
            }).catch(function (error) {
                return _this3.setState({
                    error: error
                });
            });
        }
    }, {
        key: "toggleAddProgram",
        value: function toggleAddProgram() {
            this.setState({
                addProgramIsShowing: !this.state.addProgramIsShowing
            });
        }
    }, {
        key: "setActiveYear",
        value: function setActiveYear(year) {
            this.setState({
                activeYear: year,
                activeProgram: null,
                programList: null
            });

            this.fetchPrograms(this.props.institution.id, year);
        }
    }, {
        key: "setActiveProgram",
        value: function setActiveProgram(program) {
            if (program === null) {
                this.props.setSidebarContent(null);
            }

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.ProgramSidebarPane, { program: program }));

            this.setState({
                activeProgram: program
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.institution.id === nextProps.institution.id) {
                return;
            }

            this.props.setSidebarContent(null);

            this.setState({
                programList: null,
                activeProgram: null
            });

            this.fetchPrograms(nextProps.institution.id, this.state.activeYear);
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.state.error) {
                var onRetryButtonClick = this.state.yearList === null ? function () {
                    return _this4.fetchYears();
                } : function () {
                    return _this4.fetchPrograms(_this4.props.institution.id, _this4.state.activeYear);
                };

                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: onRetryButtonClick },
                    this.state.error.toString()
                );
            }

            if (this.state.yearList === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "w-100 h-100 d-flex flex-column" },
                _react2.default.createElement(ProgramsHead, { institution: this.props.institution,
                    years: this.state.yearList,
                    toggleAddProgram: this.toggleAddProgram,
                    setActiveYear: this.setActiveYear }),
                _react2.default.createElement(ProgramsTable, { programs: this.state.programList,
                    currentProgram: this.state.activeProgram,
                    toggleAddProgram: this.toggleAddProgram,
                    setCurrentProgram: this.setActiveProgram }),
                _react2.default.createElement(_modals.ProgramFormModal, { toggle: this.toggleAddProgram,
                    refresh: function refresh() {
                        return _this4.fetchPrograms(_this4.props.institution.id, _this4.state.activeYear);
                    },
                    isOpen: this.state.addProgramIsShowing,
                    institution: this.props.institution.id })
            );
        }
    }]);

    return Programs;
}(_react.Component);

var ProgramsHead = function (_Component2) {
    _inherits(ProgramsHead, _Component2);

    function ProgramsHead(props) {
        _classCallCheck(this, ProgramsHead);

        return _possibleConstructorReturn(this, (ProgramsHead.__proto__ || Object.getPrototypeOf(ProgramsHead)).call(this, props));
    }

    _createClass(ProgramsHead, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            if (this.props.years === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var years = this.props.years.map(function (year, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index,
                        value: year },
                    year,
                    " - ",
                    year + 1
                );
            });

            var onYearChange = function onYearChange(event) {
                _this6.props.setActiveYear(event.target.value);
            };

            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-end" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Programs"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title mb-0" },
                        this.props.institution.name
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions d-flex flex-row align-items-end" },
                    this.props.years.length !== 0 && _react2.default.createElement(
                        "div",
                        { className: "d-flex flex-column mr-2" },
                        _react2.default.createElement(
                            "labl",
                            { className: "mr-3 text-dark mb-1" },
                            "Academic Year"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Input,
                            { type: "select",
                                onChange: onYearChange,
                                className: "mr-3 btn btn-outline-success select-sm" },
                            years
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            size: "sm",
                            onClick: this.props.toggleAddProgram,
                            color: "success" },
                        "Add a Program"
                    )
                )
            );
        }
    }]);

    return ProgramsHead;
}(_react.Component);

var ProgramsTable = function (_Component3) {
    _inherits(ProgramsTable, _Component3);

    function ProgramsTable(props) {
        _classCallCheck(this, ProgramsTable);

        var _this7 = _possibleConstructorReturn(this, (ProgramsTable.__proto__ || Object.getPrototypeOf(ProgramsTable)).call(this, props));

        _this7.emptyState = _this7.emptyState.bind(_this7);
        return _this7;
    }

    _createClass(ProgramsTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There's nothing here."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "When added, Programs will show up here."
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        onClick: this.props.toggleAddProgram,
                        color: "success" },
                    "Add a program"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.programs === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.programs.length === 0) {
                return this.emptyState();
            }

            return _react2.default.createElement(
                "div",
                { className: "w-100 h-100 d-flex flex-column" },
                _react2.default.createElement(ProgramsListSection, { programs: this.props.programs,
                    currentProgram: this.props.currentProgram,
                    setCurrentProgram: this.props.setCurrentProgram })
            );
        }
    }]);

    return ProgramsTable;
}(_react.Component);

var ProgramsListSection = function (_Component4) {
    _inherits(ProgramsListSection, _Component4);

    function ProgramsListSection(props) {
        _classCallCheck(this, ProgramsListSection);

        return _possibleConstructorReturn(this, (ProgramsListSection.__proto__ || Object.getPrototypeOf(ProgramsListSection)).call(this, props));
    }

    _createClass(ProgramsListSection, [{
        key: "render",
        value: function render() {
            var _this9 = this;

            var rows = this.props.programs.map(function (program, index) {
                var isActive = false;

                if (_this9.props.currentProgram !== null) {
                    isActive = _this9.props.currentProgram.id === program.id;
                }

                var setCurrentProgram = function setCurrentProgram() {
                    return _this9.props.setCurrentProgram(program);
                };

                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: index,
                        onClick: setCurrentProgram,
                        active: isActive },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        program.name
                    )
                );
            });

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _section.Section,
                    null,
                    _react2.default.createElement(
                        _section.SectionTitle,
                        null,
                        this.props.children
                    ),
                    _react2.default.createElement(
                        _section.SectionTable,
                        { className: "memorandums-accordion" },
                        rows
                    )
                )
            );
        }
    }]);

    return ProgramsListSection;
}(_react.Component);

exports.default = Programs;
//# sourceMappingURL=programs.js.map