"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UniversityDetails = exports.ContactDetails = exports.StudentDetails = exports.fetchStudent = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

var _modals = require("../modals");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchStudent(id, onResult) {
    _graphql2.default.query("\n    {\n        student(id:" + id + ") {\n            id\n            category\n            id_number\n            college\n            family_name\n            first_name\n            middle_name\n            nickname\n            nationality\n            home_address\n            phone_number\n            birth_date\n            sex\n            emergency_contact_name\n            emergency_contact_relationship\n            emergency_contact_number\n            email\n            civil_status\n            institution {\n                name\n            }\n        }\n    }    \n    ").then(onResult);
}

var StudentOverview = function (_Component) {
    _inherits(StudentOverview, _Component);

    function StudentOverview(props) {
        _classCallCheck(this, StudentOverview);

        var _this = _possibleConstructorReturn(this, (StudentOverview.__proto__ || Object.getPrototypeOf(StudentOverview)).call(this, props));

        _this.state = {
            student: null,
            studentId: props.student.id
        };

        _this.onEditStudent = _this.onEditStudent.bind(_this);

        fetchStudent(props.student.id, function (result) {
            var student = result.student;

            _this.setState({
                student: student
            });
        });
        return _this;
    }

    _createClass(StudentOverview, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            this.setState({
                studentId: nextProps.student.id,
                student: null
            });

            fetchStudent(nextProps.student.id, function (result) {
                var student = result.student;
                _this2.setState({
                    student: student
                });
            });
        }
    }, {
        key: "onEditStudent",
        value: function onEditStudent() {
            var _this3 = this;

            this.setState({
                student: null
            });

            fetchStudent(this.state.studentId, function (result) {
                var student = result.student;
                _this3.setState({
                    student: student
                });

                _this3.props.refreshStudents();
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.student === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(OverviewHead, { student: this.state.student,
                    onDeleteStudent: this.props.onDeleteActiveStudent,
                    onEditStudent: this.onEditStudent }),
                _react2.default.createElement(OverviewBody, { student: this.state.student })
            );
        }
    }]);

    return StudentOverview;
}(_react.Component);

var OverviewHead = function (_Component2) {
    _inherits(OverviewHead, _Component2);

    function OverviewHead(props) {
        _classCallCheck(this, OverviewHead);

        var _this4 = _possibleConstructorReturn(this, (OverviewHead.__proto__ || Object.getPrototypeOf(OverviewHead)).call(this, props));

        _this4.state = {
            deleteStudentIsShowing: false,
            editStudentIsShowing: false
        };

        _this4.toggleEditStudent = _this4.toggleEditStudent.bind(_this4);
        _this4.toggleDeleteStudent = _this4.toggleDeleteStudent.bind(_this4);
        return _this4;
    }

    _createClass(OverviewHead, [{
        key: "toggleEditStudent",
        value: function toggleEditStudent() {
            this.setState({
                editStudentIsShowing: !this.state.editStudentIsShowing
            });
        }
    }, {
        key: "toggleDeleteStudent",
        value: function toggleDeleteStudent() {
            this.setState({
                deleteStudentIsShowing: !this.state.deleteStudentIsShowing
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
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Overview"
                    ),
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
                        { outline: true,
                            size: "sm",
                            color: "success",
                            className: "mr-2",
                            onClick: this.toggleEditStudent },
                        "Edit Student"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            size: "sm",
                            color: "warning",
                            onClick: this.toggleDeleteStudent },
                        "Archive"
                    )
                ),
                _react2.default.createElement(_modals.ArchiveStudentModal, { isOpen: this.state.deleteStudentIsShowing,
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

    return OverviewHead;
}(_react.Component);

var OverviewBody = function (_Component3) {
    _inherits(OverviewBody, _Component3);

    function OverviewBody(props) {
        _classCallCheck(this, OverviewBody);

        return _possibleConstructorReturn(this, (OverviewBody.__proto__ || Object.getPrototypeOf(OverviewBody)).call(this, props));
    }

    _createClass(OverviewBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(StudentDetails, { student: this.props.student }),
                _react2.default.createElement(ContactDetails, { student: this.props.student }),
                _react2.default.createElement(UniversityDetails, { student: this.props.student })
            );
        }
    }]);

    return OverviewBody;
}(_react.Component);

var StudentDetails = function (_Component4) {
    _inherits(StudentDetails, _Component4);

    function StudentDetails(props) {
        _classCallCheck(this, StudentDetails);

        return _possibleConstructorReturn(this, (StudentDetails.__proto__ || Object.getPrototypeOf(StudentDetails)).call(this, props));
    }

    _createClass(StudentDetails, [{
        key: "render",
        value: function render() {
            var student = this.props.student;
            var sex = student.sex === "F" ? "Female" : "Male";
            var civilStatus = _settings2.default.civilStatuses[student.civil_status];
            var birthDate = (0, _moment2.default)(student.birth_date).format("LL");

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Student Details"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    student.nickname.length > 0 && //Only show if student nickname exists
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Nickname"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            student.nickname
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Sex"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            sex
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Home Address"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            student.home_address
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Date of Birth"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            birthDate
                        )
                    ),
                    student.nationality.length > 0 && _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Nationality"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            student.nationality
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Civil Status"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            civilStatus
                        )
                    ),
                    this.props.archived && _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { className: "d-flex" },
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "primary",
                                    size: "sm",
                                    className: "ml-auto",
                                    onClick: this.props.toggleRestoreStudent },
                                "Restore"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return StudentDetails;
}(_react.Component);

var ContactDetails = function (_Component5) {
    _inherits(ContactDetails, _Component5);

    function ContactDetails(props) {
        _classCallCheck(this, ContactDetails);

        return _possibleConstructorReturn(this, (ContactDetails.__proto__ || Object.getPrototypeOf(ContactDetails)).call(this, props));
    }

    _createClass(ContactDetails, [{
        key: "render",
        value: function render() {
            var student = this.props.student;

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Contact Details"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Phone Number"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            student.phone_number
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Email"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            student.email
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Emergency Contact"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            {
                                large: !this.props.sidebar },
                            student.emergency_contact_name + " (" + student.emergency_contact_relationship + ")"
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Emergency Contact Number"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            {
                                large: !this.props.sidebar },
                            student.emergency_contact_number
                        )
                    )
                )
            );
        }
    }]);

    return ContactDetails;
}(_react.Component);

var UniversityDetails = function (_Component6) {
    _inherits(UniversityDetails, _Component6);

    function UniversityDetails(props) {
        _classCallCheck(this, UniversityDetails);

        return _possibleConstructorReturn(this, (UniversityDetails.__proto__ || Object.getPrototypeOf(UniversityDetails)).call(this, props));
    }

    _createClass(UniversityDetails, [{
        key: "render",
        value: function render() {
            var student = this.props.student;
            var college = _settings2.default.colleges[student.college];
            var type = student.category === "OUT" ? "Outbound" : "Inbound";

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "University Details"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Student Type"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            type
                        )
                    ),
                    student.category === "IN" && _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Institution"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            {
                                large: !this.props.sidebar },
                            student.institution.name
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "College"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: !this.props.sidebar },
                            college
                        )
                    )
                )
            );
        }
    }]);

    return UniversityDetails;
}(_react.Component);

exports.default = StudentOverview;
exports.fetchStudent = fetchStudent;
exports.StudentDetails = StudentDetails;
exports.ContactDetails = ContactDetails;
exports.UniversityDetails = UniversityDetails;
//# sourceMappingURL=overview.js.map