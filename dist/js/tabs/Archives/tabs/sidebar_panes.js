"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StudentSidebarPane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _overview = require("../../Students/tabs/overview");

var _student_detail_overview = require("../../Students/student_detail_overview");

var _modals = require("./modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function studentIsFetched(student) {
    return student.home_address !== undefined;
}

var StudentSidebarPane = function (_Component) {
    _inherits(StudentSidebarPane, _Component);

    function StudentSidebarPane(props) {
        _classCallCheck(this, StudentSidebarPane);

        var _this = _possibleConstructorReturn(this, (StudentSidebarPane.__proto__ || Object.getPrototypeOf(StudentSidebarPane)).call(this, props));

        _this.state = {
            restoreStudentIsShowing: false,
            student: props.student
        };

        if (!studentIsFetched(props.student)) {
            (0, _overview.fetchStudent)(props.student.id, function (result) {
                _this.setState({
                    student: result.student
                });
            });
        }

        _this.toggleRestoreStudent = _this.toggleRestoreStudent.bind(_this);
        return _this;
    }

    _createClass(StudentSidebarPane, [{
        key: "toggleRestoreStudent",
        value: function toggleRestoreStudent() {
            this.setState({
                restoreStudentIsShowing: !this.state.restoreStudentIsShowing
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var _this2 = this;

            this.setState({
                student: props.student
            });

            if (!studentIsFetched(props.student)) {
                (0, _overview.fetchStudent)(props.student.id, function (result) {
                    _this2.setState({
                        student: result.student
                    });
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var student = this.state.student;
            var fullName = student.first_name + " " + student.middle_name + " " + student.family_name;
            var isFetched = studentIsFetched(student);

            var pageBody = void 0;

            if (isFetched) {
                pageBody = _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(_overview.StudentDetails, { sidebar: true,
                        archived: true,
                        toggleRestoreStudent: this.toggleRestoreStudent,
                        student: student }),
                    _react2.default.createElement(_overview.ContactDetails, { sidebar: true,
                        student: student }),
                    _react2.default.createElement(_overview.UniversityDetails, { sidebar: true,
                        student: student }),
                    _react2.default.createElement(_modals.RestoreStudentModal, { student: student,
                        toggle: this.toggleRestoreStudent,
                        onRestoreSuccess: this.props.onRestoreSuccess,
                        isOpen: this.state.restoreStudentIsShowing })
                );
            } else {
                pageBody = _react2.default.createElement(_loading2.default, null);
            }

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
                            fullName
                        )
                    )
                ),
                pageBody
            );
        }
    }]);

    return StudentSidebarPane;
}(_react.Component);

exports.StudentSidebarPane = StudentSidebarPane;
//# sourceMappingURL=sidebar_panes.js.map