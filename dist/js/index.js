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
        var usernameInput = (0, _jquery2.default)("#username-input");
        var passwordInput = (0, _jquery2.default)("#password-input");

        var username = usernameInput.val();
        var password = passwordInput.val();

        usernameInput.val("");
        passwordInput.val("");

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
});

function showSignInBox(signInBoxShouldShow) {
    var spinner = (0, _jquery2.default)("#sign-in-spinner");
    var signInBox = (0, _jquery2.default)("#sign-in-box");

    signInBox.css(signInBoxShouldShow ? showingCSS : hidingCSS);
    spinner.css(signInBoxShouldShow ? hidingCSS : showingCSS);
}

function renderReact() {
    _reactDom2.default.render(_react2.default.createElement(_app2.default, null), document.getElementById("root"));
}

function onSignIn() {
    renderReact();
    var signInView = (0, _jquery2.default)("#sign-in");

    setTimeout(function () {
        toggleSignInContents();
        signInView.css(hidingCSS);
    }, 700);
}

function signOut() {
    localStorage.clear();

    var signInView = (0, _jquery2.default)("#sign-in");
    toggleSignInContents();
    signInView.css(showingCSS);

    showSignInBox(true);
}

function toggleSignInContents() {
    var signInContents = (0, _jquery2.default)("#sign-in-contents");
    signInContents.toggleClass("signed-out");
    signInContents.toggleClass("signed-in");
}

exports.default = signOut;
//# sourceMappingURL=index.js.map