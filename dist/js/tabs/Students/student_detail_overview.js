"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StudentUniversity = exports.StudentContact = exports.StudentDetailOverview = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _settings = require("../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _section = require("../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentDetailOverview = function (_Component) {
    _inherits(StudentDetailOverview, _Component);

    function StudentDetailOverview(props) {
        _classCallCheck(this, StudentDetailOverview);

        return _possibleConstructorReturn(this, (StudentDetailOverview.__proto__ || Object.getPrototypeOf(StudentDetailOverview)).call(this, props));
    }

    _createClass(StudentDetailOverview, [{
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
                            "Reminders Address"
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
                    )
                )
            );
        }
    }]);

    return StudentDetailOverview;
}(_react.Component);

var StudentContact = function (_Component2) {
    _inherits(StudentContact, _Component2);

    function StudentContact(props) {
        _classCallCheck(this, StudentContact);

        return _possibleConstructorReturn(this, (StudentContact.__proto__ || Object.getPrototypeOf(StudentContact)).call(this, props));
    }

    _createClass(StudentContact, [{
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
                            { large: !this.props.sidebar },
                            student.emergency_contact_number
                        )
                    )
                )
            );
        }
    }]);

    return StudentContact;
}(_react.Component);

var StudentUniversity = function (_Component3) {
    _inherits(StudentUniversity, _Component3);

    function StudentUniversity(props) {
        _classCallCheck(this, StudentUniversity);

        return _possibleConstructorReturn(this, (StudentUniversity.__proto__ || Object.getPrototypeOf(StudentUniversity)).call(this, props));
    }

    _createClass(StudentUniversity, [{
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
                            { large: !this.props.sidebar },
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

    return StudentUniversity;
}(_react.Component);

exports.StudentDetailOverview = StudentDetailOverview;
exports.StudentContact = StudentContact;
exports.StudentUniversity = StudentUniversity;
//# sourceMappingURL=student_detail_overview.js.map