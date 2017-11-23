"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _section = require("../../../components/section");

var _reactstrap = require("reactstrap");

var _modals = require("../../Institutions/modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitutionAgreements(onResult) {
    _graphql2.default.query("\n    {\n        institutions {\n            id\n            name\n            latest_moa {\n                id\n                date_effective\n                date_expiration\n            }\n        }\n    }\n    ").then(onResult);
}

function fetchInstitutionUnderstandings(onResult) {
    _graphql2.default.query("\n    {\n        institutions {\n            id\n            name\n            latest_mou {\n                id\n                date_effective\n                date_expiration\n            }\n        }\n    }\n    ").then(onResult);
}

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            memorandums: null,
            activeMemorandum: null
        };

        fetchInstitutionAgreements(function (result) {
            _this.setState({
                memorandums: result.institutions
            });
        });

        _this.setMemorandums = _this.setMemorandums.bind(_this);
        return _this;
    }

    _createClass(Memorandums, [{
        key: "setMemorandums",
        value: function setMemorandums(category) {
            var _this2 = this;

            this.setState({
                memorandums: null // loading
            });

            if (category === "MOA") {
                fetchInstitutionAgreements(function (result) {
                    _this2.setState({
                        memorandums: result.institutions
                    });
                });
            } else {
                fetchInstitutionUnderstandings(function (result) {
                    _this2.setState({
                        memorandums: result.institutions
                    });
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column h-100" },
                _react2.default.createElement(MemorandumsHead, { setMemorandums: this.setMemorandums })
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumsHead = function (_Component2) {
    _inherits(MemorandumsHead, _Component2);

    function MemorandumsHead(props) {
        _classCallCheck(this, MemorandumsHead);

        var _this3 = _possibleConstructorReturn(this, (MemorandumsHead.__proto__ || Object.getPrototypeOf(MemorandumsHead)).call(this, props));

        _this3.onCategoryChange = _this3.onCategoryChange.bind(_this3);
        return _this3;
    }

    _createClass(MemorandumsHead, [{
        key: "onCategoryChange",
        value: function onCategoryChange(event) {
            this.props.setMemorandums(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-end" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" },
                        "Memorandum Reminders"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Input,
                        { type: "select",
                            className: "btn-outline-success",
                            defaultValue: "MOA",
                            onChange: this.onCategoryChange },
                        _react2.default.createElement(
                            "option",
                            { value: "MOA" },
                            "Agreement"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "MOU" },
                            "Understanding"
                        )
                    )
                )
            );
        }
    }]);

    return MemorandumsHead;
}(_react.Component);

var MemorandumsBody = function (_Component3) {
    _inherits(MemorandumsBody, _Component3);

    function MemorandumsBody(props) {
        _classCallCheck(this, MemorandumsBody);

        return _possibleConstructorReturn(this, (MemorandumsBody.__proto__ || Object.getPrototypeOf(MemorandumsBody)).call(this, props));
    }

    _createClass(MemorandumsBody, [{
        key: "render",
        value: function render() {}
    }]);

    return MemorandumsBody;
}(_react.Component);

var MemorandumRow = function (_Component4) {
    _inherits(MemorandumRow, _Component4);

    function MemorandumRow(props) {
        _classCallCheck(this, MemorandumRow);

        return _possibleConstructorReturn(this, (MemorandumRow.__proto__ || Object.getPrototypeOf(MemorandumRow)).call(this, props));
    }

    _createClass(MemorandumRow, [{
        key: "render",
        value: function render() {}
    }]);

    return MemorandumRow;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums-refactor.js.map