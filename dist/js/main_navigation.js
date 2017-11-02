"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _tabs_list = require("./tabs/tabs_list");

var _tabs_list2 = _interopRequireDefault(_tabs_list);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainNavigation = function (_Component) {
    _inherits(MainNavigation, _Component);

    function MainNavigation(props) {
        _classCallCheck(this, MainNavigation);

        return _possibleConstructorReturn(this, (MainNavigation.__proto__ || Object.getPrototypeOf(MainNavigation)).call(this, props));
    }

    _createClass(MainNavigation, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            (0, _jquery2.default)("[data-toggle=\"tooltip\"]").tooltip();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var navItems = _tabs_list2.default.map(function (tab, index) {
                var isActive = _this2.props.activeTab === tab;
                return _react2.default.createElement(TabItem, { name: tab.name, image: tab.image, key: index, isActive: isActive,
                    setActiveTab: function setActiveTab() {
                        return _this2.props.setActiveTab(tab);
                    } });
            });

            return _react2.default.createElement(
                _reactstrap.Navbar,
                { className: "bg-dlsu d-flex flex-column justify-content-center", id: "main-navigation" },
                _react2.default.createElement(
                    _reactstrap.Nav,
                    { className: "d-flex flex-column w-100 mt-auto mb-auto" },
                    navItems
                ),
                _react2.default.createElement(SwitchUserButton, null)
            );
        }
    }]);

    return MainNavigation;
}(_react.Component);

var TabItem = function (_Component2) {
    _inherits(TabItem, _Component2);

    function TabItem(props) {
        _classCallCheck(this, TabItem);

        return _possibleConstructorReturn(this, (TabItem.__proto__ || Object.getPrototypeOf(TabItem)).call(this, props));
    }

    _createClass(TabItem, [{
        key: "activeTab",
        value: function activeTab() {
            return _react2.default.createElement(
                _reactstrap.NavItem,
                { className: "active", "data-toggle": "tooltip", "data-placement": "right", title: this.props.name },
                _react2.default.createElement("img", { src: this.props.image, className: "sidebar-image" })
            );
        }
    }, {
        key: "inactiveTab",
        value: function inactiveTab() {
            return _react2.default.createElement(
                _reactstrap.NavItem,
                { "data-toggle": "tooltip", "data-placement": "right", title: this.props.name },
                _react2.default.createElement("img", { src: this.props.image, className: "sidebar-image", onClick: this.props.setActiveTab })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return this.props.isActive ? this.activeTab() : this.inactiveTab();
        }
    }]);

    return TabItem;
}(_react.Component);

var SwitchUserButton = function (_Component3) {
    _inherits(SwitchUserButton, _Component3);

    function SwitchUserButton(props) {
        _classCallCheck(this, SwitchUserButton);

        var _this4 = _possibleConstructorReturn(this, (SwitchUserButton.__proto__ || Object.getPrototypeOf(SwitchUserButton)).call(this, props));

        _this4.state = {
            popoverIsOpen: false
        };

        _this4.togglePopover = _this4.togglePopover.bind(_this4);
        return _this4;
    }

    _createClass(SwitchUserButton, [{
        key: "togglePopover",
        value: function togglePopover() {
            this.setState({
                popoverIsOpen: !this.state.popoverIsOpen
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "w-100" },
                _react2.default.createElement(
                    "div",
                    { id: "switch-user-button", onClick: this.togglePopover },
                    _react2.default.createElement(
                        "h6",
                        null,
                        localStorage.username
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Popover,
                    { placement: "right", isOpen: this.state.popoverIsOpen, target: "switch-user-button",
                        toggle: this.togglePopover },
                    _react2.default.createElement(
                        _reactstrap.PopoverBody,
                        null,
                        _react2.default.createElement(
                            _reactstrap.Button,
                            { className: "bg-dlsu", onClick: _index2.default },
                            "Sign out"
                        )
                    )
                )
            );
        }
    }]);

    return SwitchUserButton;
}(_react.Component);

exports.default = MainNavigation;
//# sourceMappingURL=main_navigation.js.map