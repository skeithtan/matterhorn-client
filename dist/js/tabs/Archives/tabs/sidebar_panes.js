"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InstitutionSidebarPane = exports.StudentSidebarPane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _modals = require("./modals");

var _overview = require("../../Students/tabs/overview");

var _student_detail_overview = require("../../Students/student_detail_overview");

var _overview2 = require("../../Institutions/tabs/overview");

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function studentIsFetched(student) {
    return student.home_address !== undefined;
}

function institutionIsFetched(institution) {
    return institution.address !== undefined;
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

        _this.fetchStudent = _this.fetchStudent.bind(_this);
        _this.toggleRestoreStudent = _this.toggleRestoreStudent.bind(_this);

        if (!studentIsFetched(props.student)) {
            _this.fetchStudent(props.student.id);
        }
        return _this;
    }

    _createClass(StudentSidebarPane, [{
        key: "fetchStudent",
        value: function fetchStudent(studentId) {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            (0, _overview.makeStudentOverviewQuery)(studentId).then(function (result) {
                Object.assign(_this2.state.student, result.student);
                _this2.setState({
                    student: _this2.state.student
                });
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "toggleRestoreStudent",
        value: function toggleRestoreStudent() {
            this.setState({
                restoreStudentIsShowing: !this.state.restoreStudentIsShowing
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                student: props.student
            });

            if (!studentIsFetched(props.student)) {
                this.fetchStudent(props.student.id);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this3.fetchStudent(_this3.state.student.id);
                        } },
                    this.state.error.toString()
                );
            }

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

var InstitutionSidebarPane = function (_Component2) {
    _inherits(InstitutionSidebarPane, _Component2);

    function InstitutionSidebarPane(props) {
        _classCallCheck(this, InstitutionSidebarPane);

        var _this4 = _possibleConstructorReturn(this, (InstitutionSidebarPane.__proto__ || Object.getPrototypeOf(InstitutionSidebarPane)).call(this, props));

        _this4.state = {
            restoreInstitutionIsShowing: false,
            institution: props.institution,
            error: null
        };

        _this4.fetchInstitution = _this4.fetchInstitution.bind(_this4);
        _this4.toggleRestoreInstitution = _this4.toggleRestoreInstitution.bind(_this4);

        if (!institutionIsFetched(props.institution)) {
            _this4.fetchInstitution(props.institution.id);
        }
        return _this4;
    }

    _createClass(InstitutionSidebarPane, [{
        key: "fetchInstitution",
        value: function fetchInstitution(id) {
            var _this5 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            (0, _overview2.makeInstitutionOverviewQuery)(id).then(function (result) {
                //Copy results to existing institution object so we won't have to fetch next time
                Object.assign(_this5.state.institution, result.institution);
                _this5.setState({
                    institution: _this5.state.institution
                });
            }).catch(function (error) {
                return _this5.setState({
                    error: error
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                institution: props.institution
            });

            if (!institutionIsFetched(props.institution)) {
                this.fetchInstitution(props.institution.id);
            }
        }
    }, {
        key: "toggleRestoreInstitution",
        value: function toggleRestoreInstitution() {
            this.setState({
                restoreInstitutionIsShowing: !this.state.restoreInstitutionIsShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this6.fetchInstitution(_this6.state.institution.id);
                        } },
                    this.state.error.toString()
                );
            }

            var institution = this.state.institution;
            var isFetched = institutionIsFetched(institution);

            var pageBody = void 0;

            if (isFetched) {
                pageBody = _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(_overview2.InstitutionDetails, { sidebar: true,
                        archived: true,
                        toggleRestoreInstitution: this.toggleRestoreInstitution,
                        institution: institution }),
                    _react2.default.createElement(_overview2.ContactDetails, { sidebar: true,
                        institution: institution }),
                    _react2.default.createElement(_modals.RestoreInstitutionModal, { institution: institution,
                        toggle: this.toggleRestoreInstitution,
                        onRestoreSuccess: this.props.onRestoreSuccess,
                        isOpen: this.state.restoreInstitutionIsShowing })
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
                            institution.name
                        )
                    )
                ),
                pageBody
            );
        }
    }]);

    return InstitutionSidebarPane;
}(_react.Component);

exports.StudentSidebarPane = StudentSidebarPane;
exports.InstitutionSidebarPane = InstitutionSidebarPane;
//# sourceMappingURL=sidebar_panes.js.map