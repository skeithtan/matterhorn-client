"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _student_list = require("./student_list");

var _student_list2 = _interopRequireDefault(_student_list);

var _student_detail = require("./student_detail");

var _student_detail2 = _interopRequireDefault(_student_detail);

var _modals = require("./modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchStudents(onResult) {
    _graphql2.default.query("\n    {\n        students {\n            id\n            id_number\n            family_name\n            first_name\n            middle_name\n        }\n    }\n    ").then(onResult);
}

var Students = function (_Component) {
    _inherits(Students, _Component);

    function Students(props) {
        _classCallCheck(this, Students);

        var _this = _possibleConstructorReturn(this, (Students.__proto__ || Object.getPrototypeOf(Students)).call(this, props));

        _this.state = {
            allStudents: null,
            activeStudent: null,
            addStudentIsShowing: false
        };

        _this.setActiveStudent = _this.setActiveStudent.bind(_this);
        _this.toggleAddStudent = _this.toggleAddStudent.bind(_this);
        _this.refreshStudents = _this.refreshStudents.bind(_this);
        _this.onDeleteActiveStudent = _this.onDeleteActiveStudent.bind(_this);
        _this.refreshStudents();
        return _this;
    }

    _createClass(Students, [{
        key: "refreshStudents",
        value: function refreshStudents() {
            var _this2 = this;

            fetchStudents(function (result) {
                _this2.setState({
                    allStudents: result.students
                });
            });
        }
    }, {
        key: "onDeleteActiveStudent",
        value: function onDeleteActiveStudent() {
            this.setState({
                activeStudent: null
            });

            this.refreshStudents();
        }
    }, {
        key: "toggleAddStudent",
        value: function toggleAddStudent() {
            this.setState({
                addStudentIsShowing: !this.state.addStudentIsShowing
            });
        }
    }, {
        key: "setActiveStudent",
        value: function setActiveStudent(student) {
            this.setState({
                activeStudent: student
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "container-fluid d-flex flex-row p-0 h-100" },
                _react2.default.createElement(_student_list2.default, { students: this.state.allStudents,
                    activeStudent: this.state.activeStudent,
                    setActiveStudent: this.setActiveStudent,
                    toggleAddStudent: this.toggleAddStudent }),
                _react2.default.createElement(_student_detail2.default, { student: this.state.activeStudent,
                    onDeleteActiveStudent: this.onDeleteActiveStudent,
                    refreshStudents: this.refreshStudents }),
                _react2.default.createElement(_modals.StudentFormModal, { isOpen: this.state.addStudentIsShowing,
                    toggle: this.toggleAddStudent,
                    refresh: this.refreshStudents })
            );
        }
    }]);

    return Students;
}(_react.Component);

exports.default = Students;
//# sourceMappingURL=students.js.map