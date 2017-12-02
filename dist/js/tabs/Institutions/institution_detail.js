"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _institution_tabs_list = require("./tabs/institution_tabs_list");

var _institution_tabs_list2 = _interopRequireDefault(_institution_tabs_list);

var _tab_bar = require("../../components/tab_bar");

var _tab_bar2 = _interopRequireDefault(_tab_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstitutionDetail = function (_Component) {
    _inherits(InstitutionDetail, _Component);

    function InstitutionDetail(props) {
        _classCallCheck(this, InstitutionDetail);

        var _this = _possibleConstructorReturn(this, (InstitutionDetail.__proto__ || Object.getPrototypeOf(InstitutionDetail)).call(this, props));

        _this.state = {
            activeTab: _institution_tabs_list2.default[0],
            sidebarContent: null
        };

        _this.setSidebarContent = _this.setSidebarContent.bind(_this);
        _this.setActiveTab = _this.setActiveTab.bind(_this);
        return _this;
    }

    _createClass(InstitutionDetail, [{
        key: "setSidebarContent",
        value: function setSidebarContent(sidebarContent) {
            this.setState({
                sidebarContent: sidebarContent
            });
        }
    }, {
        key: "setActiveTab",
        value: function setActiveTab(tab) {
            this.setState({
                activeTab: tab,
                sidebarContent: null
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.memorandumToBeAdded) {
                this.setActiveTab(_institution_tabs_list2.default[1]);
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.institution === null) {
                return InstitutionDetail.unselectedState();
            }

            var currentTab = this.state.activeTab.tab(this.props.institution, this.setSidebarContent, this.props.onDeleteActiveInstitution, this.props.performQuery, this.props.memorandumToBeAdded, this.props.toggleMemorandumToBeAdded);

            var sidebarClass = "sidebar-right ";
            if (this.state.sidebarContent === null) {
                sidebarClass += "dismissed";
            }

            return _react2.default.createElement(
                "div",
                { id: "institution-detail",
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
                        tabs: _institution_tabs_list2.default })
                ),
                _react2.default.createElement(
                    "div",
                    { className: sidebarClass },
                    this.state.sidebarContent
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
                    "Select an institution to see its details"
                )
            );
        }
    }]);

    return InstitutionDetail;
}(_react.Component);

exports.default = InstitutionDetail;
//# sourceMappingURL=institution_detail.js.map