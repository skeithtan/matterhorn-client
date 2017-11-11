"use strict";

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var StudentList = function (_Component) {
    _inherits(StudentList, _Component);

    function StudentList(props) {
        _classCallCheck(this, StudentList);

        return _possibleConstructorReturn(this, (StudentList.__proto__ || Object.getPrototypeOf(StudentList)).call(this, props));
    }

    _createClass(StudentList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "h-100 d-flex flex-column" }, _react2.default.createElement(StudentListHead, null), _react2.default.createElement(StudentListTable, null));
        }
    }]);

    return StudentList;
}(_react.Component);

// This looks broken. Please fix this.


var StudentListHead = function (_Component2) {
    _inherits(StudentListHead, _Component2);

    function StudentListHead(props) {
        _classCallCheck(this, StudentListHead);

        return _possibleConstructorReturn(this, (StudentListHead.__proto__ || Object.getPrototypeOf(StudentListHead)).call(this, props));
    }

    _createClass(StudentListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "page-head pt-5 d-flex flex-column align-items-center" }, _react2.default.createElement("div", { className: "d-flex flex-row w-100 mb-2 align-items-center" }, _react2.default.createElement("div", { className: "mr-auto" }, _react2.default.createElement("h5", { className: "mb-0 text-secondary" }, "Students"), _react2.default.createElement("h4", { className: "page-head-title mb-0" }, "Program name")), _react2.default.createElement("div", null, _react2.default.createElement("button", { className: "ml-auto btn btn-outline-success btn-sm" }, "Add"))), _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" }));
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
            return _react2.default.createElement("div", { className: "page-body" }, _react2.default.createElement(_reactstrap.ListGroup, null, _react2.default.createElement(StudentListRow, null), _react2.default.createElement(StudentListRow, null), _react2.default.createElement(StudentListRow, null)));
        }
    }]);

    return StudentListTable;
}(_react.Component);

var StudentListRow = function (_Component4) {
    _inherits(StudentListRow, _Component4);

    function StudentListRow(props) {
        _classCallCheck(this, StudentListRow);

        return _possibleConstructorReturn(this, (StudentListRow.__proto__ || Object.getPrototypeOf(StudentListRow)).call(this, props));
    }

    _createClass(StudentListRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(_reactstrap.ListGroupItem, null, "Student Name");
        }
    }]);

    return StudentListRow;
}(_react.Component);

exports.default = StudentList;
//# sourceMappingURL=student_list.js.map
//# sourceMappingURL=student_list.js.map
//# sourceMappingURL=student_list.js.map
//# sourceMappingURL=student_list.js.map