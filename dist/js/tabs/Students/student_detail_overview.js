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

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentDetailOverview = function (_Component) {
    _inherits(StudentDetailOverview, _Component);

    function StudentDetailOverview(props) {
        _classCallCheck(this, StudentDetailOverview);

        var _this = _possibleConstructorReturn(this, (StudentDetailOverview.__proto__ || Object.getPrototypeOf(StudentDetailOverview)).call(this, props));

        _this.convertCivilStatus = _this.convertCivilStatus.bind(_this);
        return _this;
    }

    _createClass(StudentDetailOverview, [{
        key: "convertCivilStatus",
        value: function convertCivilStatus(civilStatus) {
            switch (civilStatus) {
                case "S":
                    civilStatus = "Single";
                    break;

                case "M":
                    civilStatus = "Married";
                    break;

                case "D":
                    civilStatus = "Divorced";
                    break;

                case "W":
                    civilStatus = "Widowed";
                    break;
            }
            return civilStatus;
        }
    }, {
        key: "render",
        value: function render() {
            var student = this.props.student;
            var sex = student.sex === "F" ? "Female" : "Male";
            var civilStatus = this.convertCivilStatus(student.civilStatus);

            return _react2.default.createElement(
                "div",
                { className: "section" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Student details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Nickname", fieldValue: student.nickname }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Sex", fieldValue: sex }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Address", fieldValue: student.homeAddress }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Birth Date", fieldValue: student.birthDate }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Nationality", fieldValue: student.nationality }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Civil Status", fieldValue: civilStatus })
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
                "div",
                { className: "section" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Contact details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Phone Number", fieldValue: student.phoneNumber }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "E-mail", fieldValue: student.email }),
                    _react2.default.createElement(
                        _reactstrap.ListGroupItem,
                        null,
                        _react2.default.createElement(
                            "small",
                            { className: "font-weight-bold" },
                            "Emergency Contact"
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "m-0" },
                            student.emergencyContactName,
                            " (",
                            student.emergencyContactRelationship,
                            ")"
                        )
                    ),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Emergency Contact Number", fieldValue: student.emergencyContactNumber })
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
                "div",
                { className: "section" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "University Details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(StudentDetailRow, { fieldName: "College", fieldValue: college }),
                    _react2.default.createElement(StudentDetailRow, { fieldName: "Student Type", fieldValue: type })
                )
            );
        }
    }]);

    return StudentUniversity;
}(_react.Component);

var StudentDetailRow = function (_Component4) {
    _inherits(StudentDetailRow, _Component4);

    function StudentDetailRow(props) {
        _classCallCheck(this, StudentDetailRow);

        return _possibleConstructorReturn(this, (StudentDetailRow.__proto__ || Object.getPrototypeOf(StudentDetailRow)).call(this, props));
    }

    _createClass(StudentDetailRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                null,
                _react2.default.createElement(
                    "small",
                    { className: "font-weight-bold" },
                    this.props.fieldName
                ),
                _react2.default.createElement(
                    "p",
                    { className: "m-0" },
                    this.props.fieldValue
                )
            );
        }
    }]);

    return StudentDetailRow;
}(_react.Component);

exports.StudentDetailOverview = StudentDetailOverview;
exports.StudentContact = StudentContact;
exports.StudentUniversity = StudentUniversity;
//# sourceMappingURL=student_detail_overview.js.map