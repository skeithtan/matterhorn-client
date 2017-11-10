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

var InstitutionDetailTabBar = function (_Component) {
    _inherits(InstitutionDetailTabBar, _Component);

    function InstitutionDetailTabBar(props) {
        _classCallCheck(this, InstitutionDetailTabBar);

        return _possibleConstructorReturn(this, (InstitutionDetailTabBar.__proto__ || Object.getPrototypeOf(InstitutionDetailTabBar)).call(this, props));
    }

    _createClass(InstitutionDetailTabBar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var tabs = this.props.tabs.map(function (tab, index) {
                return _react2.default.createElement(InstitutionDetailTab, {
                    tab: tab,
                    key: index,
                    onClick: function onClick() {
                        return _this2.props.setActiveTab(tab);
                    },
                    isActive: _this2.props.activeTab === tab
                });
            });

            return _react2.default.createElement("div", { className: "tab-bar" }, _react2.default.createElement("ul", { className: "p-3 justify-content-center mb-0 d-flex flex-row" }, tabs));
        }
    }]);

    return InstitutionDetailTabBar;
}(_react.Component);

var InstitutionDetailTab = function (_Component2) {
    _inherits(InstitutionDetailTab, _Component2);

    function InstitutionDetailTab(props) {
        _classCallCheck(this, InstitutionDetailTab);

        return _possibleConstructorReturn(this, (InstitutionDetailTab.__proto__ || Object.getPrototypeOf(InstitutionDetailTab)).call(this, props));
    }

    _createClass(InstitutionDetailTab, [{
        key: "render",
        value: function render() {
            var image = this.props.isActive ? this.props.tab.activeImage : this.props.tab.image;
            var textClass = "ml-2 font-weight-bold mb-0 ";
            textClass += this.props.isActive ? "text-dlsu" : "text-secondary";

            return _react2.default.createElement("li", { className: "col-lg-2 d-flex flex-row justify-content-center align-items-center",
                onClick: this.props.isActive ? null : this.props.onClick }, _react2.default.createElement("img", { className: "nav-image", src: image }), _react2.default.createElement("small", { className: textClass }, this.props.tab.name));
        }
    }]);

    return InstitutionDetailTab;
}(_react.Component);

exports.default = InstitutionDetailTabBar;
//# sourceMappingURL=institution_detail_tabs.js.map
//# sourceMappingURL=institution_detail_tabs.js.map
//# sourceMappingURL=institution_detail_tabs.js.map