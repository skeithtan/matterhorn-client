"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _main_navigation = require("./main_navigation");

var _main_navigation2 = _interopRequireDefault(_main_navigation);

var _tabs_list = require("./tabs/tabs_list");

var _tabs_list2 = _interopRequireDefault(_tabs_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        var tabs = (0, _tabs_list2.default)();

        _this.state = {
            activeTab: tabs[0], // Default tab is reminders
            navigationIsExpanded: false
        };

        _this.setActiveTab = _this.setActiveTab.bind(_this);
        _this.toggleNavigation = _this.toggleNavigation.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: "toggleNavigation",
        value: function toggleNavigation() {
            this.setState({
                navigationIsExpanded: !this.state.navigationIsExpanded
            });
        }
    }, {
        key: "setActiveTab",
        value: function setActiveTab(newTab) {
            this.setState({
                activeTab: newTab
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "h-100 d-flex" },
                _react2.default.createElement(_main_navigation2.default, { activeTab: this.state.activeTab, setActiveTab: this.setActiveTab,
                    toggleNavigation: this.toggleNavigation, isExpanded: this.state.navigationIsExpanded,
                    signOut: this.props.signOut }),
                _react2.default.createElement(
                    "div",
                    { id: "content", className: "w-100 page-body" },
                    _react2.default.createElement("div", { id: "black-covering", onClick: this.toggleNavigation,
                        className: this.state.navigationIsExpanded && "showing" }),
                    this.state.activeTab.tab
                )
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;
//# sourceMappingURL=app.js.map