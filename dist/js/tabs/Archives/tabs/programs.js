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

function fetchPrograms(year, onResult) {
    _graphql2.default.query("\n    {\n        programs(archived:true, year_archived:" + year + ") {\n            id\n            name\n            linkage {\n                name\n            }\n            studyfield_set {\n                name\n            }\n            memorandum {\n                institution {\n                    name\n                }\n            }\n            archiver\n            archived_at\n        }\n\t}\n\t").then(onResult);
}

var ProgramArchives = function (_Component) {
    _inherits(ProgramArchives, _Component);

    function ProgramArchives(props) {
        _classCallCheck(this, ProgramArchives);

        var _this = _possibleConstructorReturn(this, (ProgramArchives.__proto__ || Object.getPrototypeOf(ProgramArchives)).call(this, props));

        _this.state = {
            activeYear: (0, _moment2.default)().year(),
            programs: null,
            activeProgramId: null
        };

        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        _this.setActiveYear = _this.setActiveYear.bind(_this);

        fetchPrograms(_this.state.activeYear, function (result) {
            _this.setState({
                programs: result.programs
            });
        });
        return _this;
    }

    _createClass(ProgramArchives, [{
        key: "setActiveProgram",
        value: function setActiveProgram(program) {
            this.setState({
                activeProgramId: program.id
            });

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.ProgramSidebarPane, { archived: true,
                onRestoreSuccess: this.refreshPrograms,
                program: program }));
        }
    }, {
        key: "setActiveYear",
        value: function setActiveYear(year) {
            var _this2 = this;

            this.setState({
                activeYear: year,
                activeProgramId: null,
                programs: null
            });

            this.props.setSidebarContent(null);

            fetchPrograms(year, function (result) {
                _this2.setState({
                    programs: result.programs
                });
            });
        }
    }, {
        key: "refreshPrograms",
        value: function refreshPrograms() {
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
                    { setActiveYear: this.setActiveYear, activeYear: this.state.activeYear },
                    "Program Archives"
                ),
                _react2.default.createElement(ProgramArchivesTable, { programs: this.state.programs,
                    activeYear: this.state.activeYear,
                    setSidebarContent: this.props.setSidebarContent,
                    activeProgramId: this.state.activeProgramId,
                    setActiveProgram: this.setActiveProgram })
            );
        }
    }]);

    return ProgramArchives;
}(_react.Component);

var ProgramArchivesTable = function (_Component2) {
    _inherits(ProgramArchivesTable, _Component2);

    function ProgramArchivesTable(props) {
        _classCallCheck(this, ProgramArchivesTable);

        var _this3 = _possibleConstructorReturn(this, (ProgramArchivesTable.__proto__ || Object.getPrototypeOf(ProgramArchivesTable)).call(this, props));

        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(ProgramArchivesTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There were no archived programs in ",
                    this.props.activeYear,
                    "."
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.props.programs === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.programs.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.programs.map(function (program, index) {
                return _react2.default.createElement(ProgramArchivesRow, { program: program, key: index,
                    isActive: _this4.props.activeProgramId === program.id,
                    onClick: function onClick() {
                        return _this4.props.setActiveProgram(program);
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
                            "Program Name"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "Linkage"
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

    return ProgramArchivesTable;
}(_react.Component);

var ProgramArchivesRow = function (_Component3) {
    _inherits(ProgramArchivesRow, _Component3);

    function ProgramArchivesRow(props) {
        _classCallCheck(this, ProgramArchivesRow);

        return _possibleConstructorReturn(this, (ProgramArchivesRow.__proto__ || Object.getPrototypeOf(ProgramArchivesRow)).call(this, props));
    }

    _createClass(ProgramArchivesRow, [{
        key: "render",
        value: function render() {
            var program = this.props.program;
            var archiveDate = (0, _moment2.default)(program.archived_at).format("LLL");
            var className = this.props.isActive ? "bg-dlsu-lighter text-white" : null;

            return _react2.default.createElement(
                "tr",
                { className: className,
                    onClick: this.props.onClick },
                _react2.default.createElement(
                    "td",
                    null,
                    program.memorandum.institution.name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    program.name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    program.linkage.name
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    archiveDate
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    program.archiver
                )
            );
        }
    }]);

    return ProgramArchivesRow;
}(_react.Component);

exports.default = ProgramArchives;
//# sourceMappingURL=programs.js.map