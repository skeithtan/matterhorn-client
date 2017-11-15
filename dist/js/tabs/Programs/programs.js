"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _year_list = require("./year_list");

var _year_list2 = _interopRequireDefault(_year_list);

var _program_list = require("./program_list");

var _program_list2 = _interopRequireDefault(_program_list);

var _student_list = require("./student_list");

var _student_list2 = _interopRequireDefault(_student_list);

var _terms_list = require("./terms_list");

var _terms_list2 = _interopRequireDefault(_terms_list);

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
    _graphql2.default.query("\n    {\n        programs(year:" + year + ", term:" + term + ") {\n            id\n            name\n            memorandum {\n                institution {\n                    name\n                }\n            }\n            terms {\n                number\n            }\n        }\n    }\n    ").then(onResult);
}

function fetchStudents(id, onResult) {
    _graphql2.default.query("\n    {\n        program(id:" + id + ") {\n            id\n            studyfield_set {\n                id\n                name\n                studentprogram_set {\n                    study_field {\n                        name\n                    }\n                    student {\n                        id\n                        id_number\n                        first_name\n                        middle_name\n                        family_name\n                    }\n                }\n            }\n        }\n    }\n    ").then(onResult);
}

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

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
        _this.refreshStudents = _this.refreshStudents.bind(_this);
        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        _this.setSidebarContent = _this.setSidebarContent.bind(_this);
        _this.refreshYears();
        return _this;
    }

    _createClass(Programs, [{
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
                    programList: result.programs
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
                    programList: result.programs
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
                    studyFieldList: result.program.studyfield_set
                });
            });
        }
    }, {
        key: "refreshStudents",
        value: function refreshStudents() {
            var _this6 = this;

            fetchStudents(this.state.activeProgram.id, function (result) {
                _this6.setState({
                    studyFieldList: result.program.studyfield_set
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var sidebarClass = "sidebar-right ";
            if (this.state.sidebarContent === null) {
                sidebarClass += "dismissed";
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-row h-100" },
                _react2.default.createElement(
                    "div",
                    { id: "programs-page",
                        className: "container-fluid d-flex flex-row p-0 h-100 page-body" },
                    _react2.default.createElement(_year_list2.default, { yearList: this.state.yearList,
                        setActiveYear: this.setActiveYear,
                        activeYear: this.state.activeYear }),
                    this.state.activeYear !== null && _react2.default.createElement(_program_list2.default, { programList: this.state.programList,
                        activeYear: this.state.activeYear,
                        activeTerm: this.state.activeTerm,
                        activeProgram: this.state.activeProgram,
                        setActiveTerm: this.setActiveTerm,
                        setActiveProgram: this.setActiveProgram }),
                    this.state.activeProgram !== null && _react2.default.createElement(_student_list2.default, { studyFieldList: this.state.studyFieldList,
                        activeProgram: this.state.activeProgram,
                        refreshStudents: this.refreshStudents })
                ),
                _react2.default.createElement(
                    "div",
                    { className: sidebarClass },
                    this.state.sidebarContent
                )
            );
        }
    }]);

    return Programs;
}(_react.Component);

exports.default = Programs;
//# sourceMappingURL=programs.js.map