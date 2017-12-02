"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorState = function (_Component) {
    _inherits(ErrorState, _Component);

    function ErrorState(props) {
        _classCallCheck(this, ErrorState);

        return _possibleConstructorReturn(this, (ErrorState.__proto__ || Object.getPrototypeOf(ErrorState)).call(this, props));
    }

    _createClass(ErrorState, [{
        key: "render",
        value: function render() {
            var isOnline = JSON.parse(localStorage.isOnline);

            var errorTitle = isOnline ? "An error occurred communicating with the server" : "Could not connect to the server";

            var errorMessage = isOnline ? "" + this.props.children : "Make sure your computer is connected to the internet. " + this.props.children;

            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    errorTitle
                ),
                _react2.default.createElement(
                    "p",
                    { className: "mb-3" },
                    errorMessage
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        color: "success",
                        onClick: this.props.onRetryButtonClick },
                    "Reload data"
                )
            );
        }
    }]);

    return ErrorState;
}(_react.Component);

exports.default = ErrorState;
//# sourceMappingURL=error_state.js.map