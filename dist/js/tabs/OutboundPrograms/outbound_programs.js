"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchYears = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _year_list = require("./year_list");

var _year_list2 = _interopRequireDefault(_year_list);

var _outbound_program_list = require("./outbound_program_list");

var _outbound_program_list2 = _interopRequireDefault(_outbound_program_list);

var _student_list = require("./student_list");

var _student_list2 = _interopRequireDefault(_student_list);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _sidebar_panes = require("./sidebar_panes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchYears(onResult) {
    _graphql2.default.query("\n    {\n        academic_years {\n            academic_year_start\n        }\n    }\n    ").then(onResult);
}

function fetchPrograms(year, term, onResult) {
    _graphql2.default.query("\n    {\n        outbound_programs(year:" + year + ", term:" + term + ") {\n            id\n            name\n            institution {\n               name\n            }\n            terms_available {\n                number\n            }\n        }\n    }\n    ").then(onResult);
}

function fetchStudents(id, onResult) {
    _graphql2.default.query("\n    {\n        outbound_program(id:" + id + ") {\n            outboundstudentprogram_set {\n                student {\n                    id_number\n                    first_name\n                    middle_name\n                }\n            }\n        }\n    }\n    ").then(onResult);
}

var OutboundPrograms = function (_Component) {
    _inherits(OutboundPrograms, _Component);

    function OutboundPrograms(props) {
        _classCallCheck(this, OutboundPrograms);

        var _this = _possibleConstructorReturn(this, (OutboundPrograms.__proto__ || Object.getPrototypeOf(OutboundPrograms)).call(this, props));

        _this.state = {
            yearList: null,
            programList: null,
            studyFieldList: null,
            activeYear: null,
            activeTerm: 1,
            activeProgram: null,
            activeStudyField: null,
            sidebarContent: null
        };

        _this.refreshYears = _this.refreshYears.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.setActiveTerm = _this.setActiveTerm.bind(_this);
        _this.programsList = _this.programsList.bind(_this);
        _this.studentList = _this.studentList.bind(_this);
        _this.refreshStudents = _this.refreshStudents.bind(_this);
        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        _this.setSidebarContent = _this.setSidebarContent.bind(_this);
        _this.refreshYears();
        return _this;
    }

    _createClass(OutboundPrograms, [{
        key: "setSidebarContent",
        value: function setSidebarContent(sidebarContent) {
            this.setState({
                sidebarContent: sidebarContent
            });
        }
    }, {
        key: "refreshYears",
        value: function refreshYears() {
            var _this2 = this;

            fetchYears(function (result) {
                _this2.setState({
                    yearList: result.academic_years
                });
            });
        }
    }, {
        key: "setActiveYear",
        value: function setActiveYear(year) {
            var _this3 = this;

            this.setState({
                activeYear: year.academic_year_start,
                activeProgram: null,
                studyFieldList: null
            });

            fetchPrograms(year.academic_year_start, this.state.activeTerm, function (result) {
                _this3.setState({
                    programList: result.outbound_programs
                });
            });

            this.setSidebarContent(_react2.default.createElement(_sidebar_panes.AcademicYearSidebarPane, { academicYear: year }));
        }
    }, {
        key: "setActiveTerm",
        value: function setActiveTerm(term) {
            var _this4 = this;

            this.setState({
                activeTerm: term,
                activeProgram: null
            });

            fetchPrograms(this.state.activeYear, term, function (result) {
                _this4.setState({
                    programList: result.outbound_programs
                });
            });
        }
    }, {
        key: "setActiveProgram",
        value: function setActiveProgram(program) {
            var _this5 = this;

            this.setState({
                activeProgram: program,
                studyFieldList: null
            });

            fetchStudents(program.id, function (result) {
                _this5.setState({
                    studyFieldList: result.outbound_program.outboundstudentprogram_set
                });
            });

            this.setSidebarContent(_react2.default.createElement(_sidebar_panes.ProgramsSidebarPane, { program: program }));
        }
    }, {
        key: "refreshStudents",
        value: function refreshStudents() {
            var _this6 = this;

            fetchStudents(this.state.activeProgram.id, function (result) {
                _this6.setState({
                    studyFieldList: result.outbound_program.outboundstudentprogram_set
                });
            });
        }
    }, {
        key: "programsList",
        value: function programsList() {
            if (this.state.activeYear === null) {
                return _react2.default.createElement(
                    "div",
                    { className: "programs-page-pane" },
                    _react2.default.createElement(
                        "div",
                        { className: "loading-container" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            "Select an academic year to see its programs"
                        )
                    )
                );
            }

            return _react2.default.createElement(_outbound_program_list2.default, { programList: this.state.programList,
                activeYear: this.state.activeYear,
                activeTerm: this.state.activeTerm,
                activeProgram: this.state.activeProgram,
                setActiveTerm: this.setActiveTerm,
                setActiveProgram: this.setActiveProgram });
        }
    }, {
        key: "studentList",
        value: function studentList() {
            if (this.state.activeProgram === null) {
                return _react2.default.createElement(
                    "div",
                    { className: "programs-page-pane" },
                    _react2.default.createElement(
                        "div",
                        { className: "loading-container" },
                        _react2.default.createElement(
                            "h4",
                            null,
                            "Select a program to see its students"
                        )
                    )
                );
            }

            return _react2.default.createElement(_student_list2.default, { studyFieldList: this.state.studyFieldList,
                activeProgram: this.state.activeProgram,
                refreshStudents: this.refreshStudents });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "programs-page",
                    className: "d-flex flex-row p-0 h-100" },
                _react2.default.createElement(_year_list2.default, { yearList: this.state.yearList,
                    setActiveYear: this.setActiveYear,
                    activeYear: this.state.activeYear }),
                this.programsList(),
                this.studentList(),
                _react2.default.createElement(
                    "div",
                    { className: "programs-page-pane" },
                    this.state.sidebarContent
                )
            );
        }
    }]);

    return OutboundPrograms;
}(_react.Component);

exports.default = OutboundPrograms;
exports.fetchYears = fetchYears;
//# sourceMappingURL=outbound_programs.js.map