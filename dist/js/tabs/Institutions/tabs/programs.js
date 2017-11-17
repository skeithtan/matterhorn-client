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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchYears(institutionID, onResult) {
    _graphql2.default.query("\n    {\n        programs(institution:" + institutionID + ") {\n            academic_year {\n                academic_year_start\n            }\n        }\n    }\n    ").then(onResult);
}

function fetchPrograms(institutionID, year, onResult) {
    _graphql2.default.query("\n    {\n        programs(institution:" + institutionID + ", year:" + year + ") {\n            id\n            name\n            linkage {\n                name\n            }\n            academic_year {\n                academic_year_start\n            }\n            studyfield_set {\n                name\n            }\n        }\n    }\n    ").then(onResult);
}

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

        _this.state = {
            institutionID: props.institution.id,
            yearList: null,
            activeYear: null,
            programList: null,
            activeProgram: null
        };

        _this.getOrderedYears = _this.getOrderedYears.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        _this.refreshPrograms = _this.refreshPrograms.bind(_this);

        fetchYears(_this.state.institutionID, function (result) {
            _this.setState({
                yearList: _this.getOrderedYears(result.programs)
            });
            if (_this.state.yearList !== null) {
                _this.setState({
                    activeYear: _this.state.yearList[0]
                });
            }
            if (_this.state.activeYear !== undefined) {
                fetchPrograms(props.institution.id, _this.state.activeYear, function (result) {
                    _this.setState({
                        programList: result.programs
                    });
                });
            }
        });
        return _this;
    }

    _createClass(Programs, [{
        key: "setActiveYear",
        value: function setActiveYear(year) {
            this.setState({
                activeYear: year,
                activeProgram: null
            });
        }
    }, {
        key: "setActiveProgram",
        value: function setActiveProgram(program) {
            var _this2 = this;

            if (program === null) {
                this.props.setSidebarContent(null);
            }

            var refreshProgram = function refreshProgram() {
                _this2.refreshPrograms();
            };

            var onDeleteProgram = function onDeleteProgram() {
                _this2.setState({
                    activeProgram: null
                });
                _this2.refreshPrograms();
                _this2.setActiveProgram(null);
            };

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.ProgramSidebarPane, { program: program }));

            this.setState({
                activeProgram: program
            });
        }
    }, {
        key: "getOrderedYears",
        value: function getOrderedYears(programs) {
            if (programs.length === 0) {
                return [];
            }

            var years = [];

            programs.forEach(function (year) {
                years.push(year.academic_year.academic_year_start);
            });

            // Get uniques only
            years = years.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });

            // Arrange in ascending order
            years = years.sort(function (a, b) {
                return a - b;
            });

            return years;
        }

        // There might be a need to check for the activeYear

    }, {
        key: "refreshPrograms",
        value: function refreshPrograms() {
            var _this3 = this;

            fetchPrograms(this.state.institutionID, this.state.activeYear, function (result) {
                _this3.setState({
                    programList: result.programs
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this4 = this;

            if (this.state.institutionID === nextProps.institution.id) {
                return;
            }

            this.props.setSidebarContent(null);

            this.setState({
                institutionID: nextProps.institution.id,
                yearList: null,
                programList: null,
                activeYear: null
            });

            fetchYears(nextProps.institution.id, function (result) {
                _this4.setState({
                    yearList: _this4.getOrderedYears(result.programs)
                });
                if (_this4.state.yearList !== null) {
                    _this4.setState({
                        activeYear: _this4.state.yearList[0]
                    });
                }
                if (_this4.state.activeYear !== undefined) {
                    fetchPrograms(nextProps.institution.id, _this4.state.activeYear, function (result) {
                        _this4.setState({
                            programList: result.programs
                        });
                    });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "w-100 h-100 d-flex flex-column" },
                _react2.default.createElement(ProgramsHead, { institution: this.props.institution,
                    years: this.state.yearList,
                    setCurrentYear: this.setActiveYear }),
                _react2.default.createElement(ProgramsTable, { programs: this.state.programList,
                    currentProgram: this.state.activeProgram,
                    setCurrentProgram: this.setActiveProgram })
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
            if (this.props.years === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var years = this.props.years.map(function (year, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index },
                    year,
                    " - ",
                    year + 1
                );
            });

            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-end" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "OutboundPrograms"
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
                            { type: "select", className: "mr-3 btn btn-outline-success select-sm" },
                            years
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            size: "sm",
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

        var _this6 = _possibleConstructorReturn(this, (ProgramsTable.__proto__ || Object.getPrototypeOf(ProgramsTable)).call(this, props));

        _this6.emptyState = _this6.emptyState.bind(_this6);
        return _this6;
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
                    "When added, OutboundPrograms will show up here."
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        color: "success" },
                    "Add a program"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.programs === null || this.props.programs.length === 0) {
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
            var _this8 = this;

            var rows = this.props.programs.map(function (program, index) {
                var isActive = false;

                if (_this8.props.currentProgram !== null) {
                    isActive = _this8.props.currentProgram.id === program.id;
                }

                var setCurrentProgram = function setCurrentProgram() {
                    return _this8.props.setCurrentProgram(program);
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