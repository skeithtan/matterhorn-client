"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var HomeTabBar = function (_Component) {
    _inherits(HomeTabBar, _Component);

    function HomeTabBar(props) {
        _classCallCheck(this, HomeTabBar);

        return _possibleConstructorReturn(this, (HomeTabBar.__proto__ || Object.getPrototypeOf(HomeTabBar)).call(this, props));
    }

    _createClass(HomeTabBar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var tabs = this.props.tabs.map(function (tab, index) {
                return _react2.default.createElement(HomeTab, { tab: tab,
                    key: index,
                    onClick: function onClick() {
                        return _this2.props.setActiveTab(tab);
                    },
                    isActive: _this2.props.activeTab === tab });
            });

            return _react2.default.createElement("div", { className: "tab-bar" }, _react2.default.createElement("ul", { className: "p-3 justify-content-center mb-0 d-flex flex-row" }, tabs));
        }
    }]);

    return HomeTabBar;
}(_react.Component);

var HomeTab = function (_Component2) {
    _inherits(HomeTab, _Component2);

    function HomeTab(props) {
        _classCallCheck(this, HomeTab);

        return _possibleConstructorReturn(this, (HomeTab.__proto__ || Object.getPrototypeOf(HomeTab)).call(this, props));
    }

    _createClass(HomeTab, [{
        key: "render",
        value: function render() {
            var image = this.props.isActive ? this.props.tab.activeImage : this.props.tab.image;
            var textClass = "ml-2 font-weight-bold mb-0 ";
            textClass += this.props.isActive ? "text-dlsu" : "text-secondary";

            return _react2.default.createElement("li", { className: "col-lg-2 d-flex flex-row justify-content-center align-items-center",
                onClick: this.props.isActive ? null : this.props.onClick }, _react2.default.createElement("img", { className: "tab-bar-image", src: image }), _react2.default.createElement("small", { className: textClass }, this.props.tab.name));
        }
    }]);

    return HomeTab;
}(_react.Component);

exports.default = HomeTabBar;
//# sourceMappingURL=home_tabs.js.map
//# sourceMappingURL=home_tabs.js.map