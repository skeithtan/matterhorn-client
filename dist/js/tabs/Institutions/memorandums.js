"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            showing: "MOU"
        };

        _this.onAgreementClick = _this.onAgreementClick.bind(_this);
        _this.onUnderstandingClick = _this.onUnderstandingClick.bind(_this);
        return _this;
    }

    _createClass(Memorandums, [{
        key: "onUnderstandingClick",
        value: function onUnderstandingClick() {
            var newShowing = this.state.showing === "MOU" ? null : "MOU";

            this.setState({
                showing: newShowing
            });
        }
    }, {
        key: "onAgreementClick",
        value: function onAgreementClick() {
            var newShowing = this.state.showing === "MOA" ? null : "MOA";

            this.setState({
                showing: newShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "mb-4" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Memorandums"
                ),
                _react2.default.createElement(
                    "div",
                    { id: "memorandums-accordion" },
                    _react2.default.createElement(MemorandumsOfUnderstanding, { showing: this.state.showing === "MOU",
                        toggle: this.onUnderstandingClick }),
                    _react2.default.createElement(MemorandumsOfAgreement, { showing: this.state.showing === "MOA", toggle: this.onAgreementClick })
                ),
                _react2.default.createElement(
                    "small",
                    { className: "section-footer" },
                    "Select a memorandum type to reveal details."
                )
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumsOfUnderstanding = function (_Component2) {
    _inherits(MemorandumsOfUnderstanding, _Component2);

    function MemorandumsOfUnderstanding(props) {
        _classCallCheck(this, MemorandumsOfUnderstanding);

        return _possibleConstructorReturn(this, (MemorandumsOfUnderstanding.__proto__ || Object.getPrototypeOf(MemorandumsOfUnderstanding)).call(this, props));
    }

    _createClass(MemorandumsOfUnderstanding, [{
        key: "render",
        value: function render() {
            var cardHeaderClass = "d-flex flex-row align-items-center ";

            if (!this.props.showing) {
                cardHeaderClass += "collapsed";
            }

            return _react2.default.createElement(
                _reactstrap.Card,
                null,
                _react2.default.createElement(
                    _reactstrap.CardHeader,
                    { className: cardHeaderClass, onClick: this.props.toggle },
                    _react2.default.createElement(
                        "h5",
                        { className: "mr-auto mb-0" },
                        "Memorandums of Understanding"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "add-memorandum-btn" },
                        "Add a new version"
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Collapse,
                    { isOpen: this.props.showing },
                    "BODY!"
                )
            );
        }
    }]);

    return MemorandumsOfUnderstanding;
}(_react.Component);

var MemorandumsOfAgreement = function (_Component3) {
    _inherits(MemorandumsOfAgreement, _Component3);

    function MemorandumsOfAgreement(props) {
        _classCallCheck(this, MemorandumsOfAgreement);

        return _possibleConstructorReturn(this, (MemorandumsOfAgreement.__proto__ || Object.getPrototypeOf(MemorandumsOfAgreement)).call(this, props));
    }

    _createClass(MemorandumsOfAgreement, [{
        key: "render",
        value: function render() {
            var cardHeaderClass = "d-flex flex-row align-items-center ";

            if (!this.props.showing) {
                cardHeaderClass += "collapsed";
            }

            return _react2.default.createElement(
                _reactstrap.Card,
                null,
                _react2.default.createElement(
                    _reactstrap.CardHeader,
                    { className: cardHeaderClass, onClick: this.props.toggle },
                    _react2.default.createElement(
                        "h5",
                        { className: "mr-auto mb-0" },
                        "Memorandums of Agreement"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "add-memorandum-btn" },
                        "Add a new version"
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Collapse,
                    { isOpen: this.props.showing },
                    "BODY!"
                )
            );
        }
    }]);

    return MemorandumsOfAgreement;
}(_react.Component);

var MemorandumVersionRow = function (_Component4) {
    _inherits(MemorandumVersionRow, _Component4);

    function MemorandumVersionRow() {
        _classCallCheck(this, MemorandumVersionRow);

        return _possibleConstructorReturn(this, (MemorandumVersionRow.__proto__ || Object.getPrototypeOf(MemorandumVersionRow)).apply(this, arguments));
    }

    return MemorandumVersionRow;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map