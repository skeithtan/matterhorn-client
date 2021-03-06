"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../components/section");

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramList = function (_Component) {
    _inherits(ProgramList, _Component);

    function ProgramList(props) {
        _classCallCheck(this, ProgramList);

        var _this = _possibleConstructorReturn(this, (ProgramList.__proto__ || Object.getPrototypeOf(ProgramList)).call(this, props));

        _this.getFilteredPrograms = _this.getFilteredPrograms.bind(_this);
        return _this;
    }

    _createClass(ProgramList, [{
        key: "getFilteredPrograms",
        value: function getFilteredPrograms() {
            var _this2 = this;

            if (this.props.programList === null) {
                return [];
            }

            var institutions = this.props.programList.map(function (program) {
                return program.institution.name;
            });

            // Get uniques only
            institutions = institutions.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });

            // Arrange alphabetically
            institutions = institutions.sort();

            var categorizedByInstitution = [];

            institutions.forEach(function (institution) {
                var programs = [];
                categorizedByInstitution.push({
                    institution: institution,
                    programs: programs
                });

                _this2.props.programList.forEach(function (program) {
                    var programInstitution = program.institution.name;
                    if (programInstitution === institution) {
                        programs.push(program);
                    }
                });
            });

            return categorizedByInstitution;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var filteredPrograms = this.getFilteredPrograms();

            return _react2.default.createElement(
                "div",
                { className: "programs-page-pane d-flex flex-column" },
                _react2.default.createElement(ProgramListHead, { year: this.props.activeYear,
                    activeTerm: this.props.activeTerm,
                    setActiveTerm: this.props.setActiveTerm }),
                _react2.default.createElement(ProgramListTable, { programs: filteredPrograms,
                    activeTerm: this.props.activeTerm,
                    activeProgram: this.props.activeProgram,
                    setActiveProgram: this.props.setActiveProgram }),
                _react2.default.createElement(
                    "div",
                    { className: "tab-bar" },
                    _react2.default.createElement(
                        "div",
                        { className: "p-3 justify-content-center mb-0 d-flex flex-row" },
                        _react2.default.createElement(
                            _reactstrap.ButtonGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    size: "sm",
                                    color: "success",
                                    active: this.props.activeTerm === 1,
                                    onClick: function onClick() {
                                        return _this3.props.setActiveTerm(1);
                                    } },
                                "Term 1"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    size: "sm",
                                    color: "success",
                                    active: this.props.activeTerm === 2,
                                    onClick: function onClick() {
                                        return _this3.props.setActiveTerm(2);
                                    } },
                                "Term 2"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    size: "sm",
                                    color: "success",
                                    active: this.props.activeTerm === 3,
                                    onClick: function onClick() {
                                        return _this3.props.setActiveTerm(3);
                                    } },
                                "Term 3"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ProgramList;
}(_react.Component);

var ProgramListHead = function (_Component2) {
    _inherits(ProgramListHead, _Component2);

    function ProgramListHead(props) {
        _classCallCheck(this, ProgramListHead);

        var _this4 = _possibleConstructorReturn(this, (ProgramListHead.__proto__ || Object.getPrototypeOf(ProgramListHead)).call(this, props));

        _this4.onTermChange = _this4.onTermChange.bind(_this4);
        return _this4;
    }

    _createClass(ProgramListHead, [{
        key: "onTermChange",
        value: function onTermChange(event) {
            this.props.setActiveTerm(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row w-100 mb-2 pt-3 align-items-center" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0 text-secondary" },
                            "Programs"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "d-flex flex-row" },
                            _react2.default.createElement(
                                "h4",
                                { className: "page-head-title mb-0" },
                                this.props.year,
                                " - ",
                                this.props.year + 1
                            )
                        )
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" })
            );
        }
    }]);

    return ProgramListHead;
}(_react.Component);

var ProgramListTable = function (_Component3) {
    _inherits(ProgramListTable, _Component3);

    function ProgramListTable(props) {
        _classCallCheck(this, ProgramListTable);

        var _this5 = _possibleConstructorReturn(this, (ProgramListTable.__proto__ || Object.getPrototypeOf(ProgramListTable)).call(this, props));

        _this5.emptyState = _this5.emptyState.bind(_this5);
        return _this5;
    }

    _createClass(ProgramListTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h5",
                    null,
                    "There are no programs for Term ",
                    this.props.activeTerm
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            if (this.props.programs === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.programs.length === 0) {
                return this.emptyState();
            }

            var sections = this.props.programs.map(function (institutionProgram, index) {
                return _react2.default.createElement(ProgramSection, { key: index,
                    title: institutionProgram.institution,
                    activeProgram: _this6.props.activeProgram,
                    programs: institutionProgram.programs,
                    setActiveProgram: _this6.props.setActiveProgram });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                sections
            );
        }
    }]);

    return ProgramListTable;
}(_react.Component);

var ProgramSection = function (_Component4) {
    _inherits(ProgramSection, _Component4);

    function ProgramSection(props) {
        _classCallCheck(this, ProgramSection);

        return _possibleConstructorReturn(this, (ProgramSection.__proto__ || Object.getPrototypeOf(ProgramSection)).call(this, props));
    }

    _createClass(ProgramSection, [{
        key: "render",
        value: function render() {
            var _this8 = this;

            var rows = this.props.programs.map(function (program, index) {
                var isActive = false;

                if (_this8.props.activeProgram !== null) {
                    isActive = _this8.props.activeProgram.id === program.id;
                }

                var setActiveProgram = function setActiveProgram() {
                    return _this8.props.setActiveProgram(program);
                };

                return _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true, key: index, onClick: setActiveProgram, active: isActive },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        null,
                        program.name
                    )
                );
            });

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    this.props.title
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    rows
                )
            );
        }
    }]);

    return ProgramSection;
}(_react.Component);

exports.default = ProgramList;
//# sourceMappingURL=outbound_program_list.js.map