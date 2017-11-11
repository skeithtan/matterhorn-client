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

var _home_tabs_list = require("./tabs/home_tabs_list");

var _home_tabs_list2 = _interopRequireDefault(_home_tabs_list);

var _home_tabs = require("./tabs/home_tabs");

var _home_tabs2 = _interopRequireDefault(_home_tabs);

var _home_sidebar = require("./home_sidebar");

var _home_sidebar2 = _interopRequireDefault(_home_sidebar);

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

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home(props) {
        _classCallCheck(this, Home);

        var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

        _this.state = {
            activeTab: _home_tabs_list2.default[0]
        };

        _this.setActiveTab = _this.setActiveTab.bind(_this);
        return _this;
    }

    _createClass(Home, [{
        key: "setActiveTab",
        value: function setActiveTab(tab) {
            this.setState({
                activeTab: tab
            });
        }
    }, {
        key: "render",
        value: function render() {
            var currentTab = this.state.activeTab.tab;
            return _react2.default.createElement("div", { id: "home", className: "container-fluid d-flex flex-row p-0 h-100" }, _react2.default.createElement("div", { className: "d-flex flex-column p-0 h-100 w-100" }, _react2.default.createElement("div", { id: "tab-content" }, currentTab), _react2.default.createElement(_home_tabs2.default, { setActiveTab: this.setActiveTab,
                activeTab: this.state.activeTab,
                tabs: _home_tabs_list2.default })), _react2.default.createElement(_home_sidebar2.default, null));
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;
//# sourceMappingURL=home.js.map
//# sourceMappingURL=home.js.map
//# sourceMappingURL=home.js.map
//# sourceMappingURL=home.js.map