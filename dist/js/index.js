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
    var spinner = (0, _jquery2.default)("#sign-in-spinner");
    var signInBox = (0, _jquery2.default)("#sign-in-box");
    signInBox.css("opacity", 0);

    setTimeout(function () {
        if (isLoggedIn) {
            onSignIn();
            return;
        }

        showSignInBox(true);
    }, 500);

    var signInMessage = (0, _jquery2.default)("#sign-in-message");
    signInMessage.hide();

    (0, _jquery2.default)("#sign-in-button").click(attemptSignIn);
    (0, _jquery2.default)("#password-input").on("keydown", function (event) {
        if (event.which === 13) {
            attemptSignIn();
        }
    });

    function attemptSignIn() {
        var username = (0, _jquery2.default)("#username-input").val();
        var password = (0, _jquery2.default)("#password-input").val();

        showSignInBox(false);

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
                console.log(response);
                switch (response.statusCode) {
                    case 401:
                        signInMessage.text = "Invalid credentials";
                        break;
                    default:
                        signInMessage.text = "Could not connect to the server";
                        break;
                }

                signInMessage.show();
                showSignInBox(true);
            }
        });
    }

    function showSignInBox(shouldShow) {
        signInBox.css("opacity", shouldShow ? 1 : 0);
        spinner.css("opacity", shouldShow ? 0 : 1);
    }

    function onSignIn() {
        renderReact();

        setTimeout(function () {
            var signInView = (0, _jquery2.default)("#sign-in");
            signInView.css({
                "opacity": 0,
                "pointer-events": "none"
            });
        }, 700);
    }

    function renderReact() {
        _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
    }
});
//# sourceMappingURL=index.js.map