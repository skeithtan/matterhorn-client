"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBar = function (_Component) {
    _inherits(TabBar, _Component);

    function TabBar(props) {
        _classCallCheck(this, TabBar);

        return _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call(this, props));
    }

    _createClass(TabBar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var tabs = this.props.tabs.map(function (tab, index) {
                return _react2.default.createElement(TabItem, { tab: tab,
                    key: index,
                    onClick: function onClick() {
                        return _this2.props.setActiveTab(tab);
                    },
                    isActive: _this2.props.activeTab === tab });
            });

            return _react2.default.createElement(
                "div",
                { className: "tab-bar" },
                _react2.default.createElement(
                    "ul",
                    { className: "p-3 justify-content-center mb-0 d-flex flex-row" },
                    tabs
                )
            );
        }
    }]);

    return TabBar;
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
            var image = this.props.isActive ? this.props.tab.activeImage : this.props.tab.image;
            var textClass = "ml-2 font-weight-bold mb-0 ";
            textClass += this.props.isActive ? "text-dlsu" : "text-secondary";

            return _react2.default.createElement(
                "li",
                { className: "ml-4 mr-4 d-flex flex-row justify-content-center align-items-center selectable-tab",
                    onClick: this.props.isActive ? null : this.props.onClick },
                _react2.default.createElement("img", { className: "tab-bar-image",
                    src: image }),
                _react2.default.createElement(
                    "small",
                    { className: textClass },
                    this.props.tab.name
                )
            );
        }
    }]);

    return TabItem;
}(_react.Component);

exports.default = TabBar;
//# sourceMappingURL=tab_bar.js.map