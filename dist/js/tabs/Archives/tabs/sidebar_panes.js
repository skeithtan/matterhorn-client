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

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _overview = require("../../Students/tabs/overview");

var _student_detail_overview = require("../../Students/student_detail_overview");

var _overview2 = require("../../Institutions/tabs/overview");

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _dismissable_toast_maker = require("../../../dismissable_toast_maker");

var _authorization = require("../../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

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
            student: props.student
        };

        _this.fetchStudent = _this.fetchStudent.bind(_this);
        _this.confirmRestore = _this.confirmRestore.bind(_this);

        if (!studentIsFetched(props.student)) {
            _this.fetchStudent(props.student.id);
        }
        return _this;
    }

    _createClass(StudentSidebarPane, [{
        key: "confirmRestore",
        value: function confirmRestore() {
            var _this2 = this;

            var student = this.props.student;
            var fullName = student.first_name + " " + student.middle_name + " " + student.family_name;
            if (!confirm("Would you like to restore " + fullName + "?")) {
                return;
            }

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Restoring",
                message: "Restoring student..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/archives/students/" + this.props.student.id + "/restore/",
                method: "PUT",
                beforeSend: _authorization2.default
            }).done(function () {
                dismissToast();
                _izitoast2.default.success({
                    title: "Success",
                    message: "Successfully restored student"
                });
                _this2.props.onRestoreSuccess();
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to restore student"
                });
            });
        }
    }, {
        key: "fetchStudent",
        value: function fetchStudent(studentId) {
            var _this3 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            (0, _overview.makeStudentOverviewQuery)(studentId).then(function (result) {
                Object.assign(_this3.state.student, result.student);
                _this3.setState({
                    student: _this3.state.student
                });
            }).catch(function (error) {
                return _this3.setState({
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
            var _this4 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this4.fetchStudent(_this4.state.student.id);
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
                        confirmRestore: this.confirmRestore,
                        student: student }),
                    _react2.default.createElement(_overview.ContactDetails, { sidebar: true,
                        student: student }),
                    _react2.default.createElement(_overview.UniversityDetails, { sidebar: true,
                        student: student })
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

        var _this5 = _possibleConstructorReturn(this, (InstitutionSidebarPane.__proto__ || Object.getPrototypeOf(InstitutionSidebarPane)).call(this, props));

        _this5.state = {
            institution: props.institution,
            error: null
        };

        _this5.confirmRestore = _this5.confirmRestore.bind(_this5);
        _this5.fetchInstitution = _this5.fetchInstitution.bind(_this5);

        if (!institutionIsFetched(props.institution)) {
            _this5.fetchInstitution(props.institution.id);
        }
        return _this5;
    }

    _createClass(InstitutionSidebarPane, [{
        key: "fetchInstitution",
        value: function fetchInstitution(id) {
            var _this6 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            (0, _overview2.makeInstitutionOverviewQuery)(id).then(function (result) {
                //Copy results to existing institution object so we won't have to fetch next time
                Object.assign(_this6.state.institution, result.institution);
                _this6.setState({
                    institution: _this6.state.institution
                });
            }).catch(function (error) {
                return _this6.setState({
                    error: error
                });
            });
        }
    }, {
        key: "confirmRestore",
        value: function confirmRestore() {
            var _this7 = this;

            if (!confirm("Would you like to restore " + this.props.institution.name + "?")) {
                return;
            }

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Restoring",
                message: "Restoring institution..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/archives/institutions/" + this.props.institution.id + "/restore/",
                method: "PUT",
                beforeSend: _authorization2.default
            }).done(function () {
                dismissToast();
                _izitoast2.default.success({
                    title: "Success",
                    message: "Successfully restored institution"
                });

                _this7.props.onRestoreSuccess();
            }).fail(function (response) {
                dismissToast();
                console.log(response);
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to restore memorandum"
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
        key: "render",
        value: function render() {
            var _this8 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this8.fetchInstitution(_this8.state.institution.id);
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
                        confirmRestore: this.confirmRestore,
                        institution: institution }),
                    _react2.default.createElement(_overview2.ContactDetails, { sidebar: true,
                        institution: institution })
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