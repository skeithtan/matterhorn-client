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

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _sidebar_panes = require("./sidebar_panes");

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeMemorandumsQuery() {
    return _graphql2.default.query("\n    {\n        institutions {\n            id\n            name\n            latest_moa {\n                id\n                category\n                memorandum_file\n                college_initiator\n                linkages\n                date_effective\n                date_expiration\n            }\n            latest_mou {\n                id\n                category\n                memorandum_file\n                college_initiator\n                linkages\n                date_effective\n                date_expiration\n            }\n        }\n    }\n    ");
}

function makeMemorandumInfo(memorandumType, institution, memorandum) {
    return {
        institution: {
            name: institution.name,
            id: institution.id
        },
        memorandum: {
            id: memorandum.id,
            category: memorandumType,
            memorandum_file: memorandum.memorandum_file,
            college_initiator: memorandum.college_initiator,
            linkages: memorandum.linkages,
            date_effective: (0, _moment2.default)(memorandum.date_effective),
            date_expiration: (0, _moment2.default)(memorandum.date_expiration)
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
        return a.memorandum.date_expiration.diff(b.memorandum.date_expiration);
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
            activeMemorandum: null,
            error: null
        };

        _this.getMemorandumsFromCategory = _this.getMemorandumsFromCategory.bind(_this);
        _this.setActiveCategory = _this.setActiveCategory.bind(_this);
        _this.setActiveMemorandum = _this.setActiveMemorandum.bind(_this);
        _this.refreshMemorandums = _this.refreshMemorandums.bind(_this);
        _this.performQuery = _this.performQuery.bind(_this);

        _this.performQuery();
        return _this;
    }

    _createClass(Memorandums, [{
        key: "performQuery",
        value: function performQuery() {
            var _this2 = this;

            if (this.state.error !== null) {
                this.setState({
                    error: null
                });
            }

            makeMemorandumsQuery().then(function (result) {
                return _this2.setState({
                    institutions: result.institutions
                });
            }).catch(function (error) {
                _this2.props.setSidebarContent(null);
                _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "setActiveCategory",
        value: function setActiveCategory(category) {
            this.setState({
                activeCategory: category,
                activeMemorandum: null
            });

            this.props.setSidebarContent(null);
        }
    }, {
        key: "getMemorandumsFromCategory",
        value: function getMemorandumsFromCategory(category) {
            var institutions = this.state.institutions;

            if (institutions === null) {
                return null;
            }

            var filteredMemorandums = [];

            var memorandums = makeMemorandumsFromInstitutions(institutions);

            memorandums.forEach(function (memorandum) {
                if (memorandum.memorandum.category === category) {
                    filteredMemorandums.push(memorandum);
                }
            });
            return filteredMemorandums;
        }
    }, {
        key: "setActiveMemorandum",
        value: function setActiveMemorandum(memorandum) {
            this.setState({
                activeMemorandum: memorandum
            });

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.MemorandumsSidebarPane, { institution: memorandum.institution,
                memorandum: memorandum.memorandum,
                refresh: this.refreshMemorandums }));
        }
    }, {
        key: "refreshMemorandums",
        value: function refreshMemorandums() {
            var _this3 = this;

            this.props.setSidebarContent(null);

            makeMemorandumsQuery().then(function (result) {
                return _this3.setState({
                    activeMemorandum: null,
                    institutions: result.institutions
                });
            }).catch(onQueryError);

            this.getMemorandumsFromCategory(this.state.activeCategory);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: this.performQuery },
                    this.state.error.toString()
                );
            }

            var memorandums = this.getMemorandumsFromCategory(this.state.activeCategory);

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column h-100" },
                _react2.default.createElement(MemorandumsHead, { setMemorandums: this.getMemorandumsFromCategory,
                    setActiveCategory: this.setActiveCategory }),
                _react2.default.createElement(MemorandumsTable, { activeCategory: this.state.activeCategory,
                    memorandums: memorandums,
                    activeMemorandum: this.state.activeMemorandum,
                    setActiveMemorandum: this.setActiveMemorandum })
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumsHead = function (_Component2) {
    _inherits(MemorandumsHead, _Component2);

    function MemorandumsHead(props) {
        _classCallCheck(this, MemorandumsHead);

        var _this4 = _possibleConstructorReturn(this, (MemorandumsHead.__proto__ || Object.getPrototypeOf(MemorandumsHead)).call(this, props));

        _this4.onCategoryChange = _this4.onCategoryChange.bind(_this4);
        return _this4;
    }

    _createClass(MemorandumsHead, [{
        key: "onCategoryChange",
        value: function onCategoryChange(event) {
            this.props.setActiveCategory(event.target.value);
            this.props.getMemorandumsFromCategory(event.target.value);
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

var MemorandumsTable = function (_Component3) {
    _inherits(MemorandumsTable, _Component3);

    function MemorandumsTable(props) {
        _classCallCheck(this, MemorandumsTable);

        var _this5 = _possibleConstructorReturn(this, (MemorandumsTable.__proto__ || Object.getPrototypeOf(MemorandumsTable)).call(this, props));

        _this5.emptyState = _this5.emptyState.bind(_this5);
        return _this5;
    }

    _createClass(MemorandumsTable, [{
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
            var _this6 = this;

            var memorandums = this.props.memorandums;

            if (memorandums === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (memorandums.length === 0) {
                return this.emptyState();
            }

            var rows = memorandums.map(function (memorandum, index) {
                var isActive = false;

                if (_this6.props.activeMemorandum !== null) {
                    isActive = _this6.props.activeMemorandum.memorandum.id === memorandum.memorandum.id;
                }

                var onMemorandumRowClick = function onMemorandumRowClick() {
                    return _this6.props.setActiveMemorandum(memorandum);
                };

                return _react2.default.createElement(MemorandumRow, { key: index,
                    memorandum: memorandum,
                    isActive: isActive,
                    onClick: onMemorandumRowClick });
            });

            return _react2.default.createElement(
                _reactstrap.Table,
                { hover: true },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            null,
                            "Institution Name"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Date Effective"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Date of Expiration"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return MemorandumsTable;
}(_react.Component);

var MemorandumRow = function (_Component4) {
    _inherits(MemorandumRow, _Component4);

    function MemorandumRow(props) {
        _classCallCheck(this, MemorandumRow);

        return _possibleConstructorReturn(this, (MemorandumRow.__proto__ || Object.getPrototypeOf(MemorandumRow)).call(this, props));
    }

    _createClass(MemorandumRow, [{
        key: "render",
        value: function render() {
            var memorandum = this.props.memorandum;

            var expirationToNow = memorandum.memorandum.date_expiration.fromNow();

            var now = (0, _moment2.default)();

            var dateExpirationMoment = memorandum.memorandum.date_expiration;
            var monthsBeforeExpiration = dateExpirationMoment.diff(now, "months");
            var hasExpired = dateExpirationMoment.diff(now, "days") <= 0;

            var urgent = monthsBeforeExpiration <= 6;

            var expirationClass = "";

            if (this.props.isActive) {
                expirationClass += "text-white ";
            }

            if (urgent) {
                expirationClass += this.props.isActive ? "bg-danger" : "table-danger";
            } else {
                expirationClass += this.props.isActive ? "bg-dlsu-lighter" : "table-light";
            }

            return _react2.default.createElement(
                "tr",
                { className: expirationClass,
                    onClick: this.props.onClick },
                _react2.default.createElement(
                    "td",
                    null,
                    memorandum.institution.name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    memorandum.memorandum.date_effective.format("LL")
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    hasExpired ? "Expired" : "Expires",
                    " ",
                    expirationToNow
                )
            );
        }
    }]);

    return MemorandumRow;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map