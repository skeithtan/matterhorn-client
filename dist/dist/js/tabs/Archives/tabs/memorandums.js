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

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactstrap = require("reactstrap");

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

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

function fetchMemorandums(year, onResult) {
    _graphql2.default.query("\n    {\n        memorandums(archived:true, year_archived:" + year + ") {\n\t\tid\n\t\tcategory\n\t\tarchived_at\n\t\tarchiver\n\t\tdate_effective\n            institution {\n                name\n            }\n\t\t}\n\t}\n\t").then(onResult);
}

var MemorandumArchives = function (_Component) {
    _inherits(MemorandumArchives, _Component);

    function MemorandumArchives(props) {
        _classCallCheck(this, MemorandumArchives);

        var _this = _possibleConstructorReturn(this, (MemorandumArchives.__proto__ || Object.getPrototypeOf(MemorandumArchives)).call(this, props));

        _this.state = {
            activeYear: (0, _moment2.default)().year(),
            memorandums: null
        };

        _this.setCurrentYear = _this.setCurrentYear.bind(_this);

        fetchMemorandums(_this.state.activeYear, function (result) {
            _this.setState({
                memorandums: result.memorandums
            });
        });
        return _this;
    }

    _createClass(MemorandumArchives, [{
        key: "setCurrentYear",
        value: function setCurrentYear(year) {
            var _this2 = this;

            this.setState({
                activeYear: year,
                memorandums: null //Loading
            });

            fetchMemorandums(year, function (result) {
                _this2.setState({
                    memorandums: result.memorandums
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "d-flex flex-column h-100" }, _react2.default.createElement(MemorandumArchivesHead, { setCurrentYear: this.setCurrentYear,
                activeYear: this.state.activeYear }), _react2.default.createElement(MemorandumArchivesTable, { memorandums: this.state.memorandums }));
        }
    }]);

    return MemorandumArchives;
}(_react.Component);

var MemorandumArchivesHead = function (_Component2) {
    _inherits(MemorandumArchivesHead, _Component2);

    function MemorandumArchivesHead(props) {
        _classCallCheck(this, MemorandumArchivesHead);

        var _this3 = _possibleConstructorReturn(this, (MemorandumArchivesHead.__proto__ || Object.getPrototypeOf(MemorandumArchivesHead)).call(this, props));

        _this3.onCurrentYearChange = _this3.onCurrentYearChange.bind(_this3);
        return _this3;
    }

    _createClass(MemorandumArchivesHead, [{
        key: "onCurrentYearChange",
        value: function onCurrentYearChange(event) {
            this.props.setCurrentYear(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var years = [];
            var currentYear = (0, _moment2.default)().year();

            //Create options for years 100 years from current year
            for (var i = 0; i <= 100; i++) {
                var year = currentYear - i;
                years.push(_react2.default.createElement("option", { value: year,
                    key: i }, year));
            }

            return _react2.default.createElement("div", { className: "page-head pt-5 d-flex flex-row align-items-end" }, _react2.default.createElement("div", { className: "mr-auto" }, _react2.default.createElement("h4", { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" }, "Memorandum Archives")), _react2.default.createElement("div", { className: "page-head-actions" }, _react2.default.createElement("div", { className: "d-flex flex-row align-items-center" }, _react2.default.createElement("b", { className: "mr-3" }, "Year"), _react2.default.createElement(_reactstrap.Input, { type: "select",
                className: "btn-outline-success",
                defaultValue: this.props.activeYear,
                onChange: this.onCurrentYearChange }, years))));
        }
    }]);

    return MemorandumArchivesHead;
}(_react.Component);

var MemorandumArchivesTable = function (_Component3) {
    _inherits(MemorandumArchivesTable, _Component3);

    function MemorandumArchivesTable(props) {
        _classCallCheck(this, MemorandumArchivesTable);

        return _possibleConstructorReturn(this, (MemorandumArchivesTable.__proto__ || Object.getPrototypeOf(MemorandumArchivesTable)).call(this, props));
    }

    _createClass(MemorandumArchivesTable, [{
        key: "render",
        value: function render() {
            if (this.props.memorandums === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.memorandums.length === 0) {
                return MemorandumArchivesTable.emptyState();
            }

            var rows = this.props.memorandums.map(function (memorandum, index) {
                return _react2.default.createElement(MemorandumArchivesRow, { memorandum: memorandum, key: index });
            });

            return _react2.default.createElement(_reactstrap.Table, { striped: true }, _react2.default.createElement("thead", null, _react2.default.createElement("tr", null, _react2.default.createElement("th", null, "Institution Name"), _react2.default.createElement("th", null, "Memorandum Type"), _react2.default.createElement("th", null, "Date Effective"), _react2.default.createElement("th", null, "Archive Date"), _react2.default.createElement("th", null, "Archived By"))), _react2.default.createElement("tbody", null, rows));
        }
    }], [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement("div", { className: "loading-container" }, _react2.default.createElement("h3", null, "There's nothing here"));
        }
    }]);

    return MemorandumArchivesTable;
}(_react.Component);

var MemorandumArchivesRow = function (_Component4) {
    _inherits(MemorandumArchivesRow, _Component4);

    function MemorandumArchivesRow(props) {
        _classCallCheck(this, MemorandumArchivesRow);

        return _possibleConstructorReturn(this, (MemorandumArchivesRow.__proto__ || Object.getPrototypeOf(MemorandumArchivesRow)).call(this, props));
    }

    _createClass(MemorandumArchivesRow, [{
        key: "render",
        value: function render() {
            var memorandumType = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
            var dateEffective = (0, _moment2.default)(this.props.memorandum.date_effective).format("LL");
            var archiveDate = (0, _moment2.default)(this.props.memorandum.archived_at).format("LLL");

            return _react2.default.createElement("tr", null, _react2.default.createElement("td", null, this.props.memorandum.institution.name), _react2.default.createElement("td", null, memorandumType), _react2.default.createElement("td", null, dateEffective), _react2.default.createElement("td", null, archiveDate), _react2.default.createElement("td", null, this.props.memorandum.archiver));
        }
    }]);

    return MemorandumArchivesRow;
}(_react.Component);

exports.default = MemorandumArchives;
//# sourceMappingURL=memorandums.js.map
//# sourceMappingURL=memorandums.js.map