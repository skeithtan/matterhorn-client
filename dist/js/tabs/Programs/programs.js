"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _year_list = require("./year_list");

var _year_list2 = _interopRequireDefault(_year_list);

var _program_list = require("./program_list");

var _program_list2 = _interopRequireDefault(_program_list);

var _program_list_tabs = require("./program_list_tabs");

var _program_list_tabs2 = _interopRequireDefault(_program_list_tabs);

var _study_field_list = require("./study_field_list");

var _study_field_list2 = _interopRequireDefault(_study_field_list);

var _student_list = require("./student_list");

var _student_list2 = _interopRequireDefault(_student_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

        _this.state = {
            activeYear: null,
            activeTerm: null,
            activeProgram: null
        };

        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.setActiveTerm = _this.setActiveTerm.bind(_this);
        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        return _this;
    }

    _createClass(Programs, [{
        key: "setActiveYear",
        value: function setActiveYear(year) {
            this.setState({
                activeYear: year
            });
        }
    }, {
        key: "setActiveTerm",
        value: function setActiveTerm(term) {
            this.setState({
                activeTerm: term
            });
        }
    }, {
        key: "setActiveProgram",
        value: function setActiveProgram(program) {
            this.setState({
                activeProgram: program
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "programs-page", className: "container-fluid d-flex flex-row p-0 h-100 page-body" },
                _react2.default.createElement(_year_list2.default, null),
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-column p-0 h-100" },
                    _react2.default.createElement(_program_list2.default, null),
                    _react2.default.createElement(_program_list_tabs2.default, null)
                ),
                _react2.default.createElement(_study_field_list2.default, null),
                _react2.default.createElement(_student_list2.default, null)
            );
        }
    }]);

    return Programs;
}(_react.Component);

exports.default = Programs;
//# sourceMappingURL=programs.js.map