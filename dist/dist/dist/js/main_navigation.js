"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _tabs_list = require("./tabs/tabs_list");

var _tabs_list2 = _interopRequireDefault(_tabs_list);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

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

var MainNavigation = function (_Component) {
    _inherits(MainNavigation, _Component);

    function MainNavigation(props) {
        _classCallCheck(this, MainNavigation);

        return _possibleConstructorReturn(this, (MainNavigation.__proto__ || Object.getPrototypeOf(MainNavigation)).call(this, props));
    }

    _createClass(MainNavigation, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var navItems = _tabs_list2.default.map(function (tab, index) {
                var isActive = _this2.props.activeTab === tab;
                return _react2.default.createElement(TabItem, { key: index,
                    name: tab.name,
                    image: tab.image,
                    isActive: isActive,
                    navigationIsExpanded: _this2.props.isExpanded,
                    toggleNavigation: _this2.props.toggleNavigation,
                    setActiveTab: function setActiveTab() {
                        return _this2.props.setActiveTab(tab);
                    } });
            });

            var navbarClassName = "bg-dlsu d-flex flex-column";

            if (this.props.isExpanded) {
                navbarClassName += " expanded";
            }

            return _react2.default.createElement(_reactstrap.Navbar, { className: navbarClassName, id: "main-navigation" }, _react2.default.createElement(_reactstrap.Nav, { className: "d-flex flex-column w-100", id: "main-navigation-tabs" }, navItems), _react2.default.createElement(SwitchUserButton, { toggleNavigation: this.props.toggleNavigation }));
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
        key: "render",
        value: function render() {
            var _this4 = this;

            var className = this.props.isActive ? "active" : "";
            var onNavItemClick = function onNavItemClick() {

                if (_this4.props.navigationIsExpanded) {
                    _this4.props.toggleNavigation();
                }

                _this4.props.setActiveTab();
            };

            return _react2.default.createElement(_reactstrap.NavItem, { className: className, onClick: onNavItemClick }, _react2.default.createElement("div", { className: "d-flex flex-row align-items-center tab-set" }, _react2.default.createElement("h5", { className: "mb-0 text-white sidebar-tab-description" }, this.props.name), _react2.default.createElement("img", { src: this.props.image, className: "sidebar-image" })));
        }
    }]);

    return TabItem;
}(_react.Component);

var SwitchUserButton = function (_Component3) {
    _inherits(SwitchUserButton, _Component3);

    function SwitchUserButton(props) {
        _classCallCheck(this, SwitchUserButton);

        var _this5 = _possibleConstructorReturn(this, (SwitchUserButton.__proto__ || Object.getPrototypeOf(SwitchUserButton)).call(this, props));

        _this5.state = {
            popoverIsOpen: false
        };

        _this5.togglePopover = _this5.togglePopover.bind(_this5);
        return _this5;
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
            var _this6 = this;

            var onSignOutButtonClick = function onSignOutButtonClick() {
                _this6.togglePopover();
                (0, _index2.default)();
            };

            return _react2.default.createElement("div", { className: "w-100 p-3 d-flex justify-content-center align-content-center" }, _react2.default.createElement("div", { id: "switch-user-button", onClick: this.togglePopover, className: "p-3 d-flex align-items-center" }, _react2.default.createElement("div", { className: "mr-auto text-left" }, _react2.default.createElement("h6", { className: "mb-0" }, "Hello,"), _react2.default.createElement("h5", { className: "mb-0" }, localStorage.username)), _react2.default.createElement(_reactstrap.Button, { color: "light", onClick: onSignOutButtonClick }, "Sign out")), _react2.default.createElement("button", { className: "expand-button", onClick: this.props.toggleNavigation }, "\u25B6"));
        }
    }]);

    return SwitchUserButton;
}(_react.Component);

exports.default = MainNavigation;
//# sourceMappingURL=main_navigation.js.map
//# sourceMappingURL=main_navigation.js.map
//# sourceMappingURL=main_navigation.js.map