"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchStudent = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _modals = require("./modals");

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchStudent(id, onResult) {
    _graphql2.default.query("\n    {\n        student(id:" + id + ") {\n            id\n            category\n            id_number\n            college\n            family_name\n            first_name\n            middle_name\n            nickname\n            nationality\n            home_address\n            phone_number\n            birth_date\n            sex\n            emergency_contact_name\n            emergency_contact_relationship\n            emergency_contact_number\n            email\n            civil_status\n            institution {\n                id\n                name\n            }\n        }\n    }\n    ").then(onResult);
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

            fetchStudent(this.state.studentID, function (result) {
                var student = result.student;
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

            fetchStudent(student.id, function (result) {
                _this3.setState({
                    student: result.student
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

            return _react2.default.createElement("div", { id: "student-detail",
                className: "container-fluid d-flex flex-column p-0" });
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

exports.default = StudentDetail;
exports.fetchStudent = fetchStudent;
//# sourceMappingURL=student_detail.js.map