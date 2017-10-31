"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(function () {
    // const isLoggedIn = localStorage.token !== undefined;
    var isLoggedIn = true;
    if (isLoggedIn) {
        _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
        (0, _jquery2.default)("#sign-in").remove();
    }

    var signInMessage = (0, _jquery2.default)("#sign-in-message");
    signInMessage.hide();

    (0, _jquery2.default)("#sign-in-button").click(function () {
        var username = (0, _jquery2.default)("#username-input").val();
        var password = (0, _jquery2.default)("#password-input").val();
        console.log(username, password);
        signIn();
    });
});

function signIn() {
    renderReact();
    var signInView = (0, _jquery2.default)("#sign-in");
    signInView.fadeOut(500, function () {
        return signInView.remove();
    });
}

function renderReact() {
    _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
}
//# sourceMappingURL=index.js.map