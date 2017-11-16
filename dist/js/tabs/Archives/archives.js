"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _archives_tabs_list = require("./tabs/archives_tabs_list");

var _archives_tabs_list2 = _interopRequireDefault(_archives_tabs_list);

var _tab_bar = require("../../components/tab_bar");

var _tab_bar2 = _interopRequireDefault(_tab_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Archives = function (_Component) {
    _inherits(Archives, _Component);

    function Archives(props) {
        _classCallCheck(this, Archives);

        var _this = _possibleConstructorReturn(this, (Archives.__proto__ || Object.getPrototypeOf(Archives)).call(this, props));

        _this.state = {
            activeTab: _archives_tabs_list2.default[0],
            sidebarContent: null
        };

        _this.setActiveTab = _this.setActiveTab.bind(_this);
        _this.setSidebarContent = _this.setSidebarContent.bind(_this);
        return _this;
    }

    _createClass(Archives, [{
        key: "setActiveTab",
        value: function setActiveTab(tab) {
            this.setState({
                activeTab: tab
            });
        }
    }, {
        key: "setSidebarContent",
        value: function setSidebarContent(content) {
            this.setState({
                sidebarContent: content
            });
        }
    }, {
        key: "render",
        value: function render() {
            var sidebarClass = "sidebar-right ";
            if (this.state.sidebarContent === null) {
                sidebarClass += "dismissed";
            }

            var tab = this.state.activeTab.tab(this.setSidebarContent);

            return _react2.default.createElement(
                "div",
                { id: "archives",
                    className: "d-flex flex-row h-100 w-100" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-column p-0 h-100 w-100" },
                    _react2.default.createElement(
                        "div",
                        { className: "tab-content" },
                        tab
                    ),
                    _react2.default.createElement(_tab_bar2.default, { setActiveTab: this.setActiveTab,
                        activeTab: this.state.activeTab,
                        tabs: _archives_tabs_list2.default })
                ),
                _react2.default.createElement(
                    "div",
                    { className: sidebarClass },
                    this.state.sidebarContent
                )
            );
        }
    }]);

    return Archives;
}(_react.Component);

exports.default = Archives;
//# sourceMappingURL=archives.js.map