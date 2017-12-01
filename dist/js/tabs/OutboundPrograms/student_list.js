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

var _modals = require("./modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentList = function (_Component) {
    _inherits(StudentList, _Component);

    function StudentList(props) {
        _classCallCheck(this, StudentList);

        var _this = _possibleConstructorReturn(this, (StudentList.__proto__ || Object.getPrototypeOf(StudentList)).call(this, props));

        _this.state = {
            addStudentsIsShowing: false
        };

        _this.toggleAddStudents = _this.toggleAddStudents.bind(_this);
        return _this;
    }

    _createClass(StudentList, [{
        key: "toggleAddStudents",
        value: function toggleAddStudents() {
            this.setState({
                addStudentsIsShowing: !this.state.addStudentsIsShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "programs-page-pane d-flex flex-column" },
                _react2.default.createElement(StudentListHead, { activeProgram: this.props.activeProgram,
                    toggleAddStudents: this.toggleAddStudents }),
                _react2.default.createElement(StudentListTable, { students: this.props.studentList })
            );
        }
    }]);

    return StudentList;
}(_react.Component);

var StudentListHead = function (_Component2) {
    _inherits(StudentListHead, _Component2);

    function StudentListHead(props) {
        _classCallCheck(this, StudentListHead);

        return _possibleConstructorReturn(this, (StudentListHead.__proto__ || Object.getPrototypeOf(StudentListHead)).call(this, props));
    }

    _createClass(StudentListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls ml-auto" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "ml-auto",
                            onClick: this.props.toggleAddStudents },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "w-100 mb-2" },
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Students"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title mb-0" },
                        this.props.activeProgram.name
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" })
            );
        }
    }]);

    return StudentListHead;
}(_react.Component);

var StudentListTable = function (_Component3) {
    _inherits(StudentListTable, _Component3);

    function StudentListTable(props) {
        _classCallCheck(this, StudentListTable);

        var _this3 = _possibleConstructorReturn(this, (StudentListTable.__proto__ || Object.getPrototypeOf(StudentListTable)).call(this, props));

        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(StudentListTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h4",
                    null,
                    "There's nothing here."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "When added, Students will show up here."
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.students === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.students.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.students.map(function (student, index) {
                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: index },
                    _react2.default.createElement(
                        "small",
                        { className: "d-block" },
                        student.student.id_number
                    ),
                    _react2.default.createElement(
                        "b",
                        null,
                        student.student.family_name
                    ),
                    ", ",
                    student.student.first_name,
                    " ",
                    student.student.middle_name
                );
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                rows
            );
        }
    }]);

    return StudentListTable;
}(_react.Component);

exports.default = StudentList;
//# sourceMappingURL=student_list.js.map