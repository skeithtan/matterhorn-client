"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

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
            allStudents: props.students
        };
        return _this;
    }

    _createClass(StudentList, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                allStudents: nextProps.students
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "student-list" },
                _react2.default.createElement(StudentListHead, null),
                _react2.default.createElement(StudentListTable, { students: this.state.allStudents })
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
                { className: "page-head" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls" },
                    _react2.default.createElement(
                        "div",
                        { className: "btn-group ml-auto" },
                        _react2.default.createElement(
                            _reactstrap.Button,
                            { outline: true, color: "success", size: "sm", className: "active" },
                            "Active"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Button,
                            { outline: true, color: "success", size: "sm", className: "" },
                            "Historical"
                        )
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "ml-4" },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    "Students"
                ),
                _react2.default.createElement(_reactstrap.Input, { placeholder: "Search", className: "search-input mt-2" })
            );
        }
    }]);

    return StudentListHead;
}(_react.Component);

var StudentListTable = function (_Component3) {
    _inherits(StudentListTable, _Component3);

    function StudentListTable(props) {
        _classCallCheck(this, StudentListTable);

        return _possibleConstructorReturn(this, (StudentListTable.__proto__ || Object.getPrototypeOf(StudentListTable)).call(this, props));
    }

    _createClass(StudentListTable, [{
        key: "render",
        value: function render() {
            if (this.props.students === null) {
                return StudentListTable.emptyState();
            }

            var rows = this.props.students.map(function (student, index) {
                return _react2.default.createElement(StudentRow, { student: student, key: index });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(
                    "div",
                    { className: "section" },
                    _react2.default.createElement(
                        _reactstrap.ListGroup,
                        null,
                        rows
                    )
                )
            );
        }
    }], [{
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
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true, color: "success" },
                    "Add a Student"
                )
            );
        }
    }]);

    return StudentListTable;
}(_react.Component);

// This will be used when filtering comes in
// class StudentSection extends Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//             <div className="section">
//                 <small className="section-title">A</small>
//                 <ListGroup>
//                     <StudentRow/>
//                 </ListGroup>
//             </div>
//         )
//     }
// }

var StudentRow = function (_Component4) {
    _inherits(StudentRow, _Component4);

    function StudentRow(props) {
        _classCallCheck(this, StudentRow);

        return _possibleConstructorReturn(this, (StudentRow.__proto__ || Object.getPrototypeOf(StudentRow)).call(this, props));
    }

    _createClass(StudentRow, [{
        key: "render",
        value: function render() {
            // Hardcoded, I can fix this later.
            var first = this.props.student.firstName;
            var middle = this.props.student.middleName;
            var last = this.props.student.familyName;
            var name = first + " " + middle + " " + last;
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                null,
                name
            );
        }
    }]);

    return StudentRow;
}(_react.Component);

exports.default = StudentList;
//# sourceMappingURL=student_list.js.map