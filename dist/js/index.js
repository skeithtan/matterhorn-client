"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _settings = require("./settings");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(function () {
    var isLoggedIn = localStorage.token !== undefined;
    if (isLoggedIn) {
        _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
        (0, _jquery2.default)("#sign-in").remove();
    }

    var signInMessage = (0, _jquery2.default)("#sign-in-message");
    signInMessage.hide();

    (0, _jquery2.default)("#sign-in-button").click(function () {
        var username = (0, _jquery2.default)("#username-input").val();
        var password = (0, _jquery2.default)("#password-input").val();

        _jquery2.default.post({
            url: _settings2.default.serverURL + "/sign-in/",
            data: {
                username: username,
                password: password
            },
            success: function success(response) {
                localStorage.token = response.token;
                onSignIn();
            },
            error: function error(response) {
                switch (response.statusCode) {
                    case 401:
                        signInMessage.text = "Invalid credentials";
                        signInMessage.show();
                        return;
                    default:
                        signInMessage.text = "Could not connect to the server";
                        signInMessage.show();
                        return;
                }
            }
        });
    });

    function onSignIn() {
        renderReact();
        var signInView = (0, _jquery2.default)("#sign-in");
        signInView.fadeOut(500, function () {
            return signInView.remove();
        });
    }

    function renderReact() {
        _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
    }
});
//# sourceMappingURL=index.js.map