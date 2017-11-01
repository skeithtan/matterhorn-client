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

function fetchStudent(id, onResponse) {
    // Query goes here
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
        return _this;
    }

    _createClass(StudentDetail, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "student-detail", className: "container-fluid d-flex flex-column p-0" },
                _react2.default.createElement(StudentDetailHead, null)
            );
        }
    }]);

    return StudentDetail;
}(_react.Component);

var StudentDetailHead = function (_Component2) {
    _inherits(StudentDetailHead, _Component2);

    function StudentDetailHead(props) {
        _classCallCheck(this, StudentDetailHead);

        return _possibleConstructorReturn(this, (StudentDetailHead.__proto__ || Object.getPrototypeOf(StudentDetailHead)).call(this, props));
    }

    _createClass(StudentDetailHead, [{
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
                        "Student Name"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "text-muted d-inline-block font-weight-normal mb-0" },
                        "Student ID Number"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { id: "student-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "mr-2" },
                        "Edit Student"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "danger" },
                        "Delete"
                    )
                )
            );
        }
    }]);

    return StudentDetailHead;
}(_react.Component);

exports.default = StudentDetail;
//# sourceMappingURL=student_detail.js.map