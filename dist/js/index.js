"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Default iziToast settings
_izitoast2.default.settings({
    progressBar: false
});

var showingCSS = {
    "opacity": 1,
    "pointer-events": "all"
};

var hidingCSS = {
    "opacity": 0,
    "pointer-events": "none"
};

(0, _jquery2.default)(function () {
    var isLoggedIn = localStorage.token !== undefined;
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

        signInMessage.hide();

        showSignInBox(false);

        _jquery2.default.post({
            url: _settings2.default.serverURL + "/sign-in/",
            data: {
                username: username,
                password: password
            },
            success: function success(response) {
                localStorage.token = response.token;
                localStorage.username = response.username;
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

    function onSignIn() {
        renderReact();

        setTimeout(function () {
            var signInView = (0, _jquery2.default)("#sign-in");
            signInView.css(hidingCSS);
        }, 700);
    }

    function renderReact() {
        _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
    }
});

function showSignInBox(signInBoxShouldShow) {
    var spinner = (0, _jquery2.default)("#sign-in-spinner");
    var signInBox = (0, _jquery2.default)("#sign-in-box");

    signInBox.css(signInBoxShouldShow ? showingCSS : hidingCSS);
    spinner.css(signInBoxShouldShow ? hidingCSS : showingCSS);
}

function signOut() {
    localStorage.clear();

    var signInView = (0, _jquery2.default)('#sign-in');
    signInView.css(showingCSS);
    showSignInBox(true);
}

exports.default = signOut;
//# sourceMappingURL=index.js.map