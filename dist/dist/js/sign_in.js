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

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _form_validator = require("./form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

var _lokkaTransportHttp = require("lokka-transport-http");

var _settings = require("./settings");

var _settings2 = _interopRequireDefault(_settings);

var _graphql = require("./graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _reactstrap = require("reactstrap");

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

var SignIn = function (_Component) {
    _inherits(SignIn, _Component);

    function SignIn(props) {
        _classCallCheck(this, SignIn);

        var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this, props));

        _this.state = {
            isSignedIn: false,
            showing: true,
            invalidCredentials: false,
            loading: true,
            form: {
                username: "",
                password: ""
            }
        };

        _this.signOut = _this.signOut.bind(_this);
        _this.signInPage = _this.signInPage.bind(_this);
        _this.attemptSignIn = _this.attemptSignIn.bind(_this);
        _this.getFormErrors = _this.getFormErrors.bind(_this);

        // Fake initial loading
        setTimeout(function () {
            var signedIn = localStorage.token !== undefined;
            _this.setState({
                loading: false,
                isSignedIn: signedIn,
                showing: !signedIn
            });
        }, 700);
        return _this;
    }

    _createClass(SignIn, [{
        key: "signOut",
        value: function signOut() {
            var _this2 = this;

            localStorage.clear();

            this.setState({
                showing: true,
                loading: true
            });

            setTimeout(function () {
                _this2.setState({
                    isSignedIn: false,
                    loading: false
                });
            }, 500);
        }
    }, {
        key: "getChangeHandler",
        value: function getChangeHandler(fieldName) {
            var _this3 = this;

            var form = this.state.form;
            return function (event) {
                form[fieldName] = event.target.value;
                _this3.setState({
                    invalidCredentials: false, //Remove invalid credentials on retry
                    form: form
                });
            };
        }
    }, {
        key: "attemptSignIn",
        value: function attemptSignIn() {
            var _this4 = this;

            this.setState({
                loading: true
            });

            $.post({
                url: _settings2.default.serverURL + "/sign-in/",
                data: this.state.form
            }).done(function (response) {
                $("#sign-in").find("input").val("");
                localStorage.token = response.token;
                localStorage.username = response.username;

                var headers = { "Authorization": "Token " + localStorage.token };
                // Add headers to transport
                _graphql2.default._transport = new _lokkaTransportHttp.Transport(_settings2.default.serverURL + "/graphql/", { headers: headers });

                setTimeout(function () {
                    _this4.setState({
                        isSignedIn: true,
                        loading: false,
                        showing: false,
                        form: {
                            username: "",
                            password: "" //Reset fields
                        }
                    });
                }, 700);
            }).fail(function (response) {
                console.log(response);

                if (response.status === 401) {
                    _this4.setState({
                        invalidCredentials: true,
                        loading: false
                    });
                    return;
                }

                alert("An error occurred connecting to the server.");
                _this4.setState({
                    loading: false
                });
            });
        }
    }, {
        key: "getFormErrors",
        value: function getFormErrors() {
            return (0, _form_validator2.default)([{
                name: "Username",
                characterLimit: 30,
                value: this.state.form.username,
                customValidators: [{
                    isValid: function isValid(fieldValue) {
                        return fieldValue.indexOf(" ") === -1;
                    },
                    errorMessage: function errorMessage(fieldName) {
                        return fieldName + " should not have whitespaces";
                    }
                }]
            }, {
                name: "Password",
                characterLimit: null,
                value: this.state.form.password
            }]);
        }
    }, {
        key: "signInPage",
        value: function signInPage() {
            var _this5 = this;

            var _getFormErrors = this.getFormErrors(),
                formHasErrors = _getFormErrors.formHasErrors,
                fieldErrors = _getFormErrors.fieldErrors;

            var complaint = null;

            if (formHasErrors) {
                if (fieldErrors["Password"].length > 0) {
                    complaint = fieldErrors["Password"][0];
                }

                if (fieldErrors["Username"].length > 0) {
                    complaint = fieldErrors["Username"][0];
                }
            }

            if (this.state.invalidCredentials) {
                complaint = "Invalid Credentials";
            }

            var handleEnterKeypress = function handleEnterKeypress(event) {
                if (event.key === "Enter" && !formHasErrors) {
                    _this5.attemptSignIn();
                }
            };

            return _react2.default.createElement("div", { id: "sign-in",
                className: "bg-dlsu h-100 w-100 p-5 d-flex flex-column justify-content-center align-items-center " + (this.state.showing ? "showing" : "hidden") }, _react2.default.createElement("div", { id: "sign-in-contents",
                className: "d-flex flex-column justify-content-center align-items-center " + (this.state.showing ? "signed-out" : "signed-in") }, _react2.default.createElement("div", { id: "logo-set", className: "d-flex flex-row align-items-center mb-3" }, _react2.default.createElement("img", { src: "./images/dlsu_white.png", className: "mr-5 dlsu-logo" }), _react2.default.createElement("h1", { id: "erio-logo", className: "text-white" }, "External Relations and Internationalization Office")), _react2.default.createElement("div", { className: "d-flex align-items-center justify-content-between mt-5" }, _react2.default.createElement(SignInSpinner, { className: this.state.loading ? "showing" : "hidden" }), _react2.default.createElement("div", { id: "sign-in-box", className: "flex-column\n                                " + (this.state.loading || this.state.isSignedIn ? "hidden" : "showing") + "\n                                " + (this.state.invalidCredentials ? "shaking" : "") }, complaint !== null && _react2.default.createElement("p", { className: "mb-3 text-center text-white" }, complaint), _react2.default.createElement(_reactstrap.Input, { className: "bg-dlsu-lighter text-white border-0 mb-3",
                placeholder: "Username", onChange: this.getChangeHandler("username"),
                onKeyPress: handleEnterKeypress,
                defaultValue: this.state.form.username }), _react2.default.createElement(_reactstrap.Input, { type: "password", className: "bg-dlsu-lighter text-white border-0 mb-3",
                placeholder: "Password", onChange: this.getChangeHandler("password"),
                onKeyPress: handleEnterKeypress,
                defaultValue: this.state.form.password }), _react2.default.createElement(_reactstrap.Button, { outline: true, color: "light", disabled: formHasErrors, onClick: this.attemptSignIn }, "Sign in")))));
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", null, this.signInPage(), this.state.isSignedIn && _react2.default.createElement(_app2.default, { signOut: this.signOut }));
        }
    }]);

    return SignIn;
}(_react.Component);

var SignInSpinner = function (_Component2) {
    _inherits(SignInSpinner, _Component2);

    function SignInSpinner(props) {
        _classCallCheck(this, SignInSpinner);

        return _possibleConstructorReturn(this, (SignInSpinner.__proto__ || Object.getPrototypeOf(SignInSpinner)).call(this, props));
    }

    _createClass(SignInSpinner, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { id: "sign-in-spinner", className: this.props.className }, _react2.default.createElement("div", { className: "spinner spinner-white spinner-lg" }, _react2.default.createElement("div", { className: "bounce1" }), _react2.default.createElement("div", { className: "bounce2" }), _react2.default.createElement("div", { className: "bounce3" })));
        }
    }]);

    return SignInSpinner;
}(_react.Component);

exports.default = SignIn;
//# sourceMappingURL=sign_in.js.map
//# sourceMappingURL=sign_in.js.map