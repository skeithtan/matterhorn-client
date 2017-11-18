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

var _archive_head = require("../archive_head");

var _archive_head2 = _interopRequireDefault(_archive_head);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _sidebar_panes = require("./sidebar_panes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitutions(year, onResult) {
    _graphql2.default.query("\n    {\n        institutions(archived: true, year_archived: " + year + ") {\n            id\n            name\n            country {\n                name\n            }\n            archived_at\n            archiver\n        }\n    }\n    ").then(onResult);
}

var InstitutionArchives = function (_Component) {
    _inherits(InstitutionArchives, _Component);

    function InstitutionArchives(props) {
        _classCallCheck(this, InstitutionArchives);

        var _this = _possibleConstructorReturn(this, (InstitutionArchives.__proto__ || Object.getPrototypeOf(InstitutionArchives)).call(this, props));

        _this.state = {
            activeYear: (0, _moment2.default)().year(),
            institutions: null,
            activeInstitutionId: null
        };

        _this.setActiveYear = _this.setActiveYear.bind(_this);
        _this.refreshInstitutions = _this.refreshInstitutions.bind(_this);
        _this.setActiveInstitution = _this.setActiveInstitution.bind(_this);

        fetchInstitutions(_this.state.activeYear, function (result) {
            result.institutions.forEach(function (institution) {
                //Make country = country.name for simplicity
                institution.country = institution.country.name;
            });

            _this.setState({
                institutions: result.institutions
            });
        });
        return _this;
    }

    _createClass(InstitutionArchives, [{
        key: "setActiveYear",
        value: function setActiveYear(year) {
            var _this2 = this;

            this.setState({
                activeYear: year,
                institutions: null,
                activeInstitutionId: null
            });

            this.props.setSidebarContent(null);

            fetchInstitutions(year, function (result) {
                result.institutions.forEach(function (institution) {
                    //Make country = country.name for simplicity
                    return institution.country = institution.country.name;
                });

                _this2.setState({
                    institutions: resut.institutions
                });
            });
        }
    }, {
        key: "setActiveInstitution",
        value: function setActiveInstitution(institution) {
            this.setState({
                activeInstitutionId: institution.id
            });

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.InstitutionSidebarPane, { institution: institution }));
        }
    }, {
        key: "refreshInstitutions",
        value: function refreshInstitutions() {
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
                    "Institution Archives"
                ),
                _react2.default.createElement(InstitutionArchivesTable, { institutions: this.state.institutions,
                    activeYear: this.state.activeYear,
                    setSidebarContent: this.props.setSidebarContent,
                    activeInstitutionId: this.state.activeInstitutionId,
                    setActiveInstitution: this.setActiveInstitution })
            );
        }
    }]);

    return InstitutionArchives;
}(_react.Component);

var InstitutionArchivesTable = function (_Component2) {
    _inherits(InstitutionArchivesTable, _Component2);

    function InstitutionArchivesTable(props) {
        _classCallCheck(this, InstitutionArchivesTable);

        var _this3 = _possibleConstructorReturn(this, (InstitutionArchivesTable.__proto__ || Object.getPrototypeOf(InstitutionArchivesTable)).call(this, props));

        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(InstitutionArchivesTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There were no archived institutions in ",
                    this.props.activeYear
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.props.institutions === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.institutions.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.institutions.map(function (institution) {
                return _react2.default.createElement(InstitutionArchivesRow, { institution: institution,
                    key: institution.id,
                    isActive: _this4.props.activeInstitutionId === institution.id,
                    onClick: function onClick() {
                        return _this4.props.setActiveInstitution(institution);
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
                            "Name"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Country"
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

    return InstitutionArchivesTable;
}(_react.Component);

var InstitutionArchivesRow = function (_Component3) {
    _inherits(InstitutionArchivesRow, _Component3);

    function InstitutionArchivesRow(props) {
        _classCallCheck(this, InstitutionArchivesRow);

        return _possibleConstructorReturn(this, (InstitutionArchivesRow.__proto__ || Object.getPrototypeOf(InstitutionArchivesRow)).call(this, props));
    }

    _createClass(InstitutionArchivesRow, [{
        key: "render",
        value: function render() {
            var institution = this.props.institution;
            var archiveDate = (0, _moment2.default)(institution.archived_at).format("LLL");

            var className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;

            return _react2.default.createElement(
                "tr",
                { className: className,
                    onClick: this.props.onClick },
                _react2.default.createElement(
                    "td",
                    null,
                    institution.name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    institution.country
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    archiveDate
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    institution.archiver
                )
            );
        }
    }]);

    return InstitutionArchivesRow;
}(_react.Component);

exports.default = InstitutionArchives;
//# sourceMappingURL=instititutions.js.map