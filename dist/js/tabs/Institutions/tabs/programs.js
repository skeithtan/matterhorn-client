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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchYears(institutionID, onResult) {
    _graphql2.default.query("\n    {\n        programs(institution:" + institutionID + ") {\n            academic_year {\n                academic_year_start\n            }\n        }\n    }\n    ").then(onResult);
}

function fetchPrograms(institutionID, onResult) {
    _graphql2.default.query("\n    {\n        programs(institution:" + institutionID + ") {\n            name\n        }\n    }\n    ").then(onResult);
}

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

        _this.state = {
            yearList: null,
            programList: null,
            institutionID: props.institution.id,
            currentYear: null,
            currentProgram: null
        };

        _this.setCurrentYear = _this.setCurrentYear.bind(_this);
        _this.setCurrentProgram = _this.setCurrentProgram.bind(_this);

        fetchYears(props.institution.id, function (result) {
            _this.setState({
                yearList: result.programs
            });
        });

        fetchPrograms(props.institution.id, function (result) {
            _this.setState({
                programList: result.programs
            });
        });
        return _this;
    }

    _createClass(Programs, [{
        key: "setCurrentYear",
        value: function setCurrentYear(year) {
            console.log(year);
            this.setState({
                currentYear: year
            });
        }
    }, {
        key: "setCurrentProgram",
        value: function setCurrentProgram(program) {
            this.setState({
                currentProgram: program
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (this.state.institutionID === nextProps.institution.id) {
                return;
            }

            this.setState({
                institutionID: nextProps.institution.id,
                yearList: null,
                programList: null
            });

            fetchYears(nextProps.institution.id, function (result) {
                _this2.setState({
                    yearList: result.programs
                });
            });

            fetchPrograms(nextProps.institution.id, function (result) {
                _this2.setState({
                    programList: result.programs
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "h-100 w-100" },
                _react2.default.createElement(ProgramsHead, { institution: this.props.institution,
                    years: this.state.yearList,
                    setCurrentYear: this.setCurrentYear }),
                _react2.default.createElement(ProgramsTable, { programs: this.state.programList,
                    setCurrentProgram: this.setCurrentProgram })
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
        key: "getOrderedYears",
        value: function getOrderedYears() {
            if (this.props.years === null) {
                return [];
            }

            var years = this.props.years.map(function (year) {
                return Number(year.academic_year.academic_year_start);
            });
            years = years.sort(function (a, b) {
                return a - b;
            });

            return years;
        }
    }, {
        key: "toggleAddPrograms",
        value: function toggleAddPrograms() {
            //TODO
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var years = this.getOrderedYears().map(function (year, index) {
                return _react2.default.createElement(
                    "option",
                    { key: index, value: year },
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
                    { className: "page-head-actions" },
                    years.length !== 0 && _react2.default.createElement(
                        "select",
                        { className: "form-control mr-3",
                            onChange: function onChange() {
                                return _this4.props.setCurrentYear;
                            },
                            defaultValue: this.getOrderedYears()[0] },
                        years
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success" },
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

        return _possibleConstructorReturn(this, (ProgramsTable.__proto__ || Object.getPrototypeOf(ProgramsTable)).call(this, props));
    }

    _createClass(ProgramsTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "w-100" },
                _react2.default.createElement(ProgramsListSection, { programs: this.props.programs,
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

        var _this6 = _possibleConstructorReturn(this, (ProgramsListSection.__proto__ || Object.getPrototypeOf(ProgramsListSection)).call(this, props));

        _this6.emptyState = _this6.emptyState.bind(_this6);
        return _this6;
    }

    _createClass(ProgramsListSection, [{
        key: "emptyState",
        value: function emptyState() {
            // TODO
            return _react2.default.createElement(
                "div",
                null,
                "This is empty"
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            if (this.props.programs === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.programs.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.programs.map(function (program, index) {
                //TODO: onClick
                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: index, onClick: function onClick() {
                            return _this7.props.setCurrentProgram(program);
                        } },
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