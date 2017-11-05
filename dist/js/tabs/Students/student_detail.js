"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _student_detail_overview = require("./student_detail_overview");

var _modals = require("./modals");

var _loading = require("../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchStudent(id, onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            student(id:" + id + ") {\n                id\n                category\n                id_number\n                college\n                family_name\n                first_name\n                middle_name\n                nickname\n                nationality\n                home_address\n                phone_number\n                birth_date\n                sex\n                emergency_contact_name\n                emergency_contact_relationship\n                emergency_contact_number\n                email\n                civil_status\n                institution {\n                    id\n                    name\n                }\n            }\n        }\n       ",
        onResponse: onResponse
    });
}

var StudentDetail = function (_Component) {
    _inherits(StudentDetail, _Component);

    function StudentDetail(props) {
        _classCallCheck(this, StudentDetail);

        var _this = _possibleConstructorReturn(this, (StudentDetail.__proto__ || Object.getPrototypeOf(StudentDetail)).call(this, props));

        _this.state = {
            student: null,
            studentID: null
        };

        _this.onEditStudent = _this.onEditStudent.bind(_this);
        return _this;
    }

    _createClass(StudentDetail, [{
        key: "onEditStudent",
        value: function onEditStudent() {
            var _this2 = this;

            this.setState({
                student: null
            });

            fetchStudent(this.state.studentID, function (response) {
                var student = response.data.student;
                _this2.setState({
                    student: student
                });
                _this2.props.refreshStudents();
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            var student = nextProps.student;

            if (student === null) {
                this.setState({
                    student: null,
                    studentID: null
                });

                return;
            }

            this.setState({
                studentID: student.id,
                student: null
            });

            fetchStudent(student.id, function (response) {
                _this3.setState({
                    student: response.data.student
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.studentID === null) {
                return StudentDetail.unselectedState();
            }

            if (this.state.student === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { id: "student-detail", className: "container-fluid d-flex flex-column p-0" },
                _react2.default.createElement(StudentDetailHead, { student: this.state.student,
                    onEditStudent: this.onEditStudent,
                    onDeleteStudent: this.props.onDeleteActiveStudent }),
                _react2.default.createElement(StudentDetailBody, { student: this.state.student })
            );
        }
    }], [{
        key: "unselectedState",
        value: function unselectedState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "Select a student to see its details"
                )
            );
        }
    }]);

    return StudentDetail;
}(_react.Component);

var StudentDetailHead = function (_Component2) {
    _inherits(StudentDetailHead, _Component2);

    function StudentDetailHead(props) {
        _classCallCheck(this, StudentDetailHead);

        var _this4 = _possibleConstructorReturn(this, (StudentDetailHead.__proto__ || Object.getPrototypeOf(StudentDetailHead)).call(this, props));

        _this4.state = {
            deleteStudentIsShowing: false,
            editStudentIsShowing: false
        };

        _this4.toggleDeleteStudent = _this4.toggleDeleteStudent.bind(_this4);
        _this4.toggleEditStudent = _this4.toggleEditStudent.bind(_this4);
        return _this4;
    }

    _createClass(StudentDetailHead, [{
        key: "toggleDeleteStudent",
        value: function toggleDeleteStudent() {
            this.setState({
                deleteStudentIsShowing: !this.state.deleteStudentIsShowing
            });
        }
    }, {
        key: "toggleEditStudent",
        value: function toggleEditStudent() {
            this.setState({
                editStudentIsShowing: !this.state.editStudentIsShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" },
                        this.props.student.first_name,
                        " ",
                        this.props.student.middle_name,
                        " ",
                        this.props.student.family_name,
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted ml-2" },
                            this.props.student.id_number
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm",
                            color: "success",
                            className: "mr-2", onClick: this.toggleEditStudent },
                        "Edit Student"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "danger", onClick: this.toggleDeleteStudent },
                        "Delete"
                    )
                ),
                _react2.default.createElement(_modals.DeleteStudentModal, { isOpen: this.state.deleteStudentIsShowing,
                    student: this.props.student,
                    toggle: this.toggleDeleteStudent,
                    refresh: this.props.onDeleteStudent }),
                _react2.default.createElement(_modals.StudentFormModal, { edit: true,
                    isOpen: this.state.editStudentIsShowing,
                    student: this.props.student,
                    refresh: this.props.onEditStudent,
                    toggle: this.toggleEditStudent })
            );
        }
    }]);

    return StudentDetailHead;
}(_react.Component);

var StudentDetailBody = function (_Component3) {
    _inherits(StudentDetailBody, _Component3);

    function StudentDetailBody(props) {
        _classCallCheck(this, StudentDetailBody);

        return _possibleConstructorReturn(this, (StudentDetailBody.__proto__ || Object.getPrototypeOf(StudentDetailBody)).call(this, props));
    }

    _createClass(StudentDetailBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(_student_detail_overview.StudentDetailOverview, { student: this.props.student }),
                _react2.default.createElement(_student_detail_overview.StudentContact, { student: this.props.student }),
                _react2.default.createElement(_student_detail_overview.StudentUniversity, { student: this.props.student })
            );
        }
    }]);

    return StudentDetailBody;
}(_react.Component);

exports.default = StudentDetail;
//# sourceMappingURL=student_detail.js.map