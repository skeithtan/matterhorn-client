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

function fetchInstitutions(onResult) {
    _graphql2.default.query("\n    {\n        institutions {\n            id\n            name\n            latest_moa {\n                id\n                date_effective\n                date_expiration\n            }\n            latest_mou {\n                id\n                date_effective\n                date_expiration\n            }\n        }\n    }\n    ").then(onResult);
}

function makeMemorandumInfo(memorandumType, institution, memorandum) {
    return {
        institution: {
            name: institution.name,
            id: institution.id
        },
        memorandum: {
            id: memorandum.id,
            type: memorandumType,
            dateEffective: (0, _moment2.default)(memorandum.date_effective),
            dateExpiration: (0, _moment2.default)(memorandum.date_expiration)
        }
    };
}

function makeMemorandumsFromInstitutions(institutions) {
    var memorandums = [];

    institutions.forEach(function (institution) {
        if (institution.latest_mou !== null && institution.latest_mou.date_expiration !== null) {
            memorandums.push(makeMemorandumInfo("Understanding", institution, institution.latest_mou));
        }

        if (institution.latest_moa !== null && institution.latest_moa.date_expiration !== null) {
            memorandums.push(makeMemorandumInfo("Agreement", institution, institution.latest_moa));
        }
    });

    memorandums.sort(function (a, b) {
        return a.memorandum.dateExpiration.diff(b.memorandum.dateExpiration);
    });

    return memorandums;
}

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            activeCategory: "Agreement",
            institutions: null,
            activeMemorandum: null
        };

        fetchInstitutions(function (result) {
            _this.setState({
                institutions: result.institutions
            });
        });

        _this.setMemorandums = _this.setMemorandums.bind(_this);
        _this.setActiveMemorandum = _this.setActiveMemorandum.bind(_this);
        return _this;
    }

    _createClass(Memorandums, [{
        key: "setMemorandums",
        value: function setMemorandums(category) {
            var filteredMemorandums = [];

            var institutions = this.state.institutions;

            if (institutions !== null) {
                var memorandums = makeMemorandumsFromInstitutions(institutions);

                memorandums.forEach(function (memorandum) {
                    if (memorandum.memorandum.type === category) {
                        filteredMemorandums.push(memorandum);
                    }
                });
            }

            return filteredMemorandums;
        }
    }, {
        key: "setActiveMemorandum",
        value: function setActiveMemorandum(memorandum) {
            // TODO
        }
    }, {
        key: "render",
        value: function render() {
            var memorandums = this.setMemorandums(this.state.activeCategory);

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column h-100" },
                _react2.default.createElement(MemorandumsHead, { setMemorandums: this.setMemorandums }),
                _react2.default.createElement(MemorandumsBody, { activeCategory: this.state.activeCategory,
                    memorandums: memorandums })
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumsHead = function (_Component2) {
    _inherits(MemorandumsHead, _Component2);

    function MemorandumsHead(props) {
        _classCallCheck(this, MemorandumsHead);

        var _this2 = _possibleConstructorReturn(this, (MemorandumsHead.__proto__ || Object.getPrototypeOf(MemorandumsHead)).call(this, props));

        _this2.onCategoryChange = _this2.onCategoryChange.bind(_this2);
        return _this2;
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
                            { value: "Agreement" },
                            "Agreement"
                        ),
                        _react2.default.createElement(
                            "option",
                            { value: "Understanding" },
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

        var _this3 = _possibleConstructorReturn(this, (MemorandumsBody.__proto__ || Object.getPrototypeOf(MemorandumsBody)).call(this, props));

        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(MemorandumsBody, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There are no expiring Memorandums of ",
                    this.props.activeCategory
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var memorandums = this.props.memorandums;

            return _react2.default.createElement("div", null);
        }
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