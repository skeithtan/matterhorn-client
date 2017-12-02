"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _archive_head = require("../archive_head");

var _archive_head2 = _interopRequireDefault(_archive_head);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _sidebar_panes = require("./sidebar_panes");

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeStudentsQuery(year) {
    return _graphql2.default.query("\n    {\n      students(archived: true, year_archived: " + year + ") {\n        id\n        category\n        id_number\n        family_name\n        first_name\n        middle_name\n        archived_at\n        archiver\n        institution {\n          name\n        }\n      }\n    }\n    ");
}

var StudentArchives = function (_Component) {
    _inherits(StudentArchives, _Component);

    function StudentArchives(props) {
        _classCallCheck(this, StudentArchives);

        var _this = _possibleConstructorReturn(this, (StudentArchives.__proto__ || Object.getPrototypeOf(StudentArchives)).call(this, props));

        _this.state = {
            activeYear: (0, _moment2.default)().year(),
            students: null,
            activeStudentId: null
        };

        _this.fetchStudents = _this.fetchStudents.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.refreshStudents = _this.refreshStudents.bind(_this);
        _this.setActiveStudent = _this.setActiveStudent.bind(_this);

        _this.fetchStudents(_this.state.activeYear);
        return _this;
    }

    _createClass(StudentArchives, [{
        key: "fetchStudents",
        value: function fetchStudents(year) {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeStudentsQuery(year).then(function (result) {
                return _this2.setState({
                    students: result.students
                });
            }).catch(function (error) {
                _this2.props.setSidebarContent(null);
                _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "setActiveStudent",
        value: function setActiveStudent(student) {
            this.setState({
                activeStudentId: student.id
            });

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.StudentSidebarPane, { student: student,
                onRestoreSuccess: this.refreshStudents }));
        }
    }, {
        key: "refreshStudents",
        value: function refreshStudents() {
            this.setActiveYear(this.state.activeYear);
        }
    }, {
        key: "setActiveYear",
        value: function setActiveYear(year) {
            this.setState({
                activeYear: year,
                activeStudentId: null,
                students: null //loading
            });

            this.props.setSidebarContent(null);
            this.fetchStudents(year);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this3.fetchStudents(_this3.state.activeYear);
                        } },
                    this.state.error.toString()
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column h-100" },
                _react2.default.createElement(
                    _archive_head2.default,
                    { setActiveYear: this.setActiveYear,
                        activeYear: this.state.activeYear },
                    "Student Archives"
                ),
                _react2.default.createElement(StudentArchivesTable, { students: this.state.students,
                    activeYear: this.state.activeYear,
                    setSidebarContent: this.props.setSidebarContent,
                    activeStudentId: this.state.activeStudentId,
                    setActiveStudent: this.setActiveStudent })
            );
        }
    }]);

    return StudentArchives;
}(_react.Component);

var StudentArchivesTable = function (_Component2) {
    _inherits(StudentArchivesTable, _Component2);

    function StudentArchivesTable(props) {
        _classCallCheck(this, StudentArchivesTable);

        var _this4 = _possibleConstructorReturn(this, (StudentArchivesTable.__proto__ || Object.getPrototypeOf(StudentArchivesTable)).call(this, props));

        _this4.emptyState = _this4.emptyState.bind(_this4);
        return _this4;
    }

    _createClass(StudentArchivesTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There were no archived students in ",
                    this.props.activeYear,
                    "."
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            if (this.props.students === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.students.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.students.map(function (student) {
                return _react2.default.createElement(StudentArchivesRow, { student: student,
                    key: student.id,
                    isActive: _this5.props.activeStudentId === student.id,
                    onClick: function onClick() {
                        return _this5.props.setActiveStudent(student);
                    } });
            });

            return _react2.default.createElement(
                _reactstrap.Table,
                { striped: true,
                    hover: true },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            null,
                            "ID Number"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Name"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Category"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Archive Date"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Archived By"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return StudentArchivesTable;
}(_react.Component);

var StudentArchivesRow = function (_Component3) {
    _inherits(StudentArchivesRow, _Component3);

    function StudentArchivesRow(props) {
        _classCallCheck(this, StudentArchivesRow);

        return _possibleConstructorReturn(this, (StudentArchivesRow.__proto__ || Object.getPrototypeOf(StudentArchivesRow)).call(this, props));
    }

    _createClass(StudentArchivesRow, [{
        key: "render",
        value: function render() {
            var student = this.props.student;
            var archiveDate = (0, _moment2.default)(student.archived_at).format("LLL");
            var className = this.props.isActive ? "bg-dlsu-lighter text-white" : "table-light";
            var category = student.category === "IN" ? "Inbound" : "Outbound";

            return _react2.default.createElement(
                "tr",
                { className: className,
                    onClick: this.props.onClick },
                _react2.default.createElement(
                    "td",
                    null,
                    student.id_number
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    _react2.default.createElement(
                        "b",
                        null,
                        student.family_name
                    ),
                    ", ",
                    student.first_name,
                    " ",
                    student.middle_name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    category
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    archiveDate
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    student.archiver
                )
            );
        }
    }]);

    return StudentArchivesRow;
}(_react.Component);

exports.default = StudentArchives;
//# sourceMappingURL=students.js.map