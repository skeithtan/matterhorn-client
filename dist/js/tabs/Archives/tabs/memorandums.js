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

var _reactstrap = require("reactstrap");

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _sidebar_panes = require("../../Institutions/tabs/sidebar_panes");

var _archive_head = require("../archive_head");

var _archive_head2 = _interopRequireDefault(_archive_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchMemorandums(year, onResult) {
    _graphql2.default.query("\n    {\n        memorandums(archived:true, year_archived:" + year + ") {\n\t\tid\n\t\tcategory\n\t\tarchived_at\n\t\tarchiver\n\t\tmemorandum_file\n        date_expiration\n        college_initiator\n        linkages\n\t\tdate_effective\n            institution {\n                name\n            }\n\t\t}\n\t}\n\t").then(onResult);
}

var MemorandumArchives = function (_Component) {
    _inherits(MemorandumArchives, _Component);

    function MemorandumArchives(props) {
        _classCallCheck(this, MemorandumArchives);

        var _this = _possibleConstructorReturn(this, (MemorandumArchives.__proto__ || Object.getPrototypeOf(MemorandumArchives)).call(this, props));

        _this.state = {
            activeYear: (0, _moment2.default)().year(),
            memorandums: null,
            activeMemorandumId: null
        };

        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.refreshMemorandums = _this.refreshMemorandums.bind(_this);
        _this.setActiveMemorandum = _this.setActiveMemorandum.bind(_this);

        fetchMemorandums(_this.state.activeYear, function (result) {
            _this.setState({
                memorandums: result.memorandums
            });
        });
        return _this;
    }

    _createClass(MemorandumArchives, [{
        key: "setActiveMemorandum",
        value: function setActiveMemorandum(memorandum) {
            this.setState({
                activeMemorandumId: memorandum.id
            });

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.MemorandumSidebarPane, { archived: true,
                onRestoreSuccess: this.refreshMemorandums,
                memorandum: memorandum }));
        }
    }, {
        key: "setActiveYear",
        value: function setActiveYear(year) {
            var _this2 = this;

            this.setState({
                activeYear: year,
                activeMemorandumId: null,
                memorandums: null //Loading
            });

            this.props.setSidebarContent(null);

            fetchMemorandums(year, function (result) {
                _this2.setState({
                    memorandums: result.memorandums
                });
            });
        }
    }, {
        key: "refreshMemorandums",
        value: function refreshMemorandums() {
            this.setActiveYear(this.state.activeYear);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column h-100" },
                _react2.default.createElement(
                    _archive_head2.default,
                    { setActiveYear: this.setActiveYear,
                        activeYear: this.state.activeYear },
                    "Memorandum Archives"
                ),
                _react2.default.createElement(MemorandumArchivesTable, { memorandums: this.state.memorandums,
                    activeYear: this.state.activeYear,
                    setSidebarContent: this.props.setSidebarContent,
                    activeMemorandumId: this.state.activeMemorandumId,
                    setActiveMemorandum: this.setActiveMemorandum })
            );
        }
    }]);

    return MemorandumArchives;
}(_react.Component);

var MemorandumArchivesTable = function (_Component2) {
    _inherits(MemorandumArchivesTable, _Component2);

    function MemorandumArchivesTable(props) {
        _classCallCheck(this, MemorandumArchivesTable);

        var _this3 = _possibleConstructorReturn(this, (MemorandumArchivesTable.__proto__ || Object.getPrototypeOf(MemorandumArchivesTable)).call(this, props));

        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(MemorandumArchivesTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There were no archived memorandums in ",
                    this.props.activeYear,
                    "."
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.props.memorandums === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.memorandums.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.memorandums.map(function (memorandum, index) {
                return _react2.default.createElement(MemorandumArchivesRow, { memorandum: memorandum,
                    key: index,
                    isActive: _this4.props.activeMemorandumId === memorandum.id,
                    onClick: function onClick() {
                        return _this4.props.setActiveMemorandum(memorandum);
                    } });
            });

            return _react2.default.createElement(
                _reactstrap.Table,
                { striped: true,
                    hover: true },
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
                            "Memorandum Type"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Archive Date"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Archived By"
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

    return MemorandumArchivesTable;
}(_react.Component);

var MemorandumArchivesRow = function (_Component3) {
    _inherits(MemorandumArchivesRow, _Component3);

    function MemorandumArchivesRow(props) {
        _classCallCheck(this, MemorandumArchivesRow);

        return _possibleConstructorReturn(this, (MemorandumArchivesRow.__proto__ || Object.getPrototypeOf(MemorandumArchivesRow)).call(this, props));
    }

    _createClass(MemorandumArchivesRow, [{
        key: "render",
        value: function render() {
            var memorandum = this.props.memorandum;
            var memorandumType = memorandum.category === "MOA" ? "Agreement" : "Understanding";
            var archiveDate = (0, _moment2.default)(memorandum.archived_at).format("LLL");

            var className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;

            return _react2.default.createElement(
                "tr",
                { className: className,
                    onClick: this.props.onClick },
                _react2.default.createElement(
                    "td",
                    null,
                    memorandum.institution.name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    memorandumType
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    archiveDate
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    memorandum.archiver
                )
            );
        }
    }]);

    return MemorandumArchivesRow;
}(_react.Component);

exports.default = MemorandumArchives;
//# sourceMappingURL=memorandums.js.map