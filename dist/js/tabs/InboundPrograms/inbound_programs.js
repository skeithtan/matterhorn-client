"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _year_list = require("../OutboundPrograms/year_list");

var _year_list2 = _interopRequireDefault(_year_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchYears(onResult) {
    _graphql2.default.query("\n    {\n        academic_years {\n            academic_year_start\n        }\n    }\n    ").then(onResult);
}

function fetchPrograms(onResult) {}

function fetchStudents(onResult) {}

var InboundPrograms = function (_Component) {
    _inherits(InboundPrograms, _Component);

    function InboundPrograms(props) {
        _classCallCheck(this, InboundPrograms);

        var _this = _possibleConstructorReturn(this, (InboundPrograms.__proto__ || Object.getPrototypeOf(InboundPrograms)).call(this, props));

        _this.state = {
            yearList: null,
            programList: null,
            activeYear: null,
            activeTerm: 1,
            activeProgram: null,
            sidebarContent: null
        };

        _this.refreshYears = _this.refreshYears.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.refreshYears();
        return _this;
    }

    _createClass(InboundPrograms, [{
        key: "setActiveYear",
        value: function setActiveYear(year) {
            this.setState({
                activeYear: year.academic_year_start,
                activeProgram: null
            });
        }
    }, {
        key: "refreshYears",
        value: function refreshYears() {
            var _this2 = this;

            fetchYears(function (result) {
                _this2.setState({
                    yearList: result.academic_years
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "programs-page",
                    className: "d-flex flex-row p-0 h-100" },
                _react2.default.createElement(_year_list2.default, { yearList: this.state.yearList,
                    setActiveYear: this.setActiveYear,
                    activeYear: this.state.activeYear })
            );
        }
    }]);

    return InboundPrograms;
}(_react.Component);

exports.default = InboundPrograms;
//# sourceMappingURL=inbound_programs.js.map