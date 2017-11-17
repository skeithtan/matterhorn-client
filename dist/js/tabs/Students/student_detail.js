"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _student_tabs_list = require("./tabs/student_tabs_list");

var _student_tabs_list2 = _interopRequireDefault(_student_tabs_list);

var _tab_bar = require("../../components/tab_bar");

var _tab_bar2 = _interopRequireDefault(_tab_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentDetail = function (_Component) {
    _inherits(StudentDetail, _Component);

    function StudentDetail(props) {
        _classCallCheck(this, StudentDetail);

        var _this = _possibleConstructorReturn(this, (StudentDetail.__proto__ || Object.getPrototypeOf(StudentDetail)).call(this, props));

        _this.state = {
            activeTab: _student_tabs_list2.default[0]
        };
        return _this;
    }

    _createClass(StudentDetail, [{
        key: "setActiveTab",
        value: function setActiveTab(tab) {
            this.setState({
                activeTab: tab
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.institution === null) {
                return StudentDetail.unselectedState();
            }

            var currentTab = this.state.activeTab.tab(this.props.institution, this.setSidebarContent, this.props.onDeleteActiveInstitution, this.props.refreshInstitutions);

            return _react2.default.createElement(
                "div",
                { id: "student-detail",
                    className: "w-100 d-flex flex-row" },
                _react2.default.createElement(
                    "div",
                    { className: "container-fluid d-flex flex-column p-0 h-100" },
                    _react2.default.createElement(
                        "div",
                        { className: "tab-content" },
                        currentTab
                    ),
                    _react2.default.createElement(_tab_bar2.default, { setActiveTab: this.setActiveTab,
                        activeTab: this.state.activeTab,
                        tabs: _student_tabs_list2.default })
                )
            );
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
//# sourceMappingURL=student_detail.js.map