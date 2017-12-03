"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProgramSidebarPane = exports.MemorandumSidebarPane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _reactstrap = require("reactstrap");

var _modals = require("../modals");

var _section = require("../../../components/section");

var _modals2 = require("../../Archives/tabs/modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemorandumSidebarPane = function (_Component) {
    _inherits(MemorandumSidebarPane, _Component);

    function MemorandumSidebarPane(props) {
        _classCallCheck(this, MemorandumSidebarPane);

        var _this = _possibleConstructorReturn(this, (MemorandumSidebarPane.__proto__ || Object.getPrototypeOf(MemorandumSidebarPane)).call(this, props));

        _this.state = {
            deleteMemorandumIsShowing: false,
            editMemorandumIsShowing: false,
            restoreMemorandumIsShowing: false,
            memorandum: props.memorandum
        };

        _this.onEditMemorandum = _this.onEditMemorandum.bind(_this);
        _this.toggleEditMemorandum = _this.toggleEditMemorandum.bind(_this);
        _this.toggleDeleteMemorandum = _this.toggleDeleteMemorandum.bind(_this);
        _this.toggleRestoreMemorandum = _this.toggleRestoreMemorandum.bind(_this);
        return _this;
    }

    _createClass(MemorandumSidebarPane, [{
        key: "toggleRestoreMemorandum",
        value: function toggleRestoreMemorandum() {
            this.setState({
                restoreMemorandumIsShowing: !this.state.restoreMemorandumIsShowing
            });
        }
    }, {
        key: "toggleDeleteMemorandum",
        value: function toggleDeleteMemorandum() {
            this.setState({
                deleteMemorandumIsShowing: !this.state.deleteMemorandumIsShowing
            });
        }
    }, {
        key: "toggleEditMemorandum",
        value: function toggleEditMemorandum() {
            this.setState({
                editMemorandumIsShowing: !this.state.editMemorandumIsShowing
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                memorandum: props.memorandum
            });
        }
    }, {
        key: "onEditMemorandum",
        value: function onEditMemorandum(memorandum) {
            this.setState({
                memorandum: memorandum
            });
        }
    }, {
        key: "render",
        value: function render() {
            var memorandum = this.state.memorandum;
            return _react2.default.createElement(
                "div",
                { className: "p-0 h-100 d-flex flex-column" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head pt-5 d-flex flex-row align-items-end" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0" },
                            "Memorandum"
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(MemorandumDetails, { archived: this.props.archived,
                        memorandum: memorandum,
                        toggleRestoreMemorandum: this.toggleRestoreMemorandum,
                        toggleDeleteMemorandum: this.toggleDeleteMemorandum,
                        toggleEditMemorandum: this.toggleEditMemorandum }),
                    _react2.default.createElement(MemorandumLinkages, { linkages: memorandum.linkages }),
                    this.state.activeMemorandum !== null && _react2.default.createElement(_modals.ArchiveMemorandumModal, { isOpen: this.state.deleteMemorandumIsShowing,
                        memorandum: memorandum,
                        toggle: this.toggleDeleteMemorandum,
                        onDeleteSuccess: this.props.removeActiveMemorandum,
                        refresh: this.props.refreshMemorandums }),
                    this.state.activeMemorandum !== null && _react2.default.createElement(_modals.MemorandumFormModal, { edit: true,
                        isOpen: this.state.editMemorandumIsShowing,
                        memorandum: memorandum,
                        toggle: this.toggleEditMemorandum,
                        onEditSuccess: this.onEditMemorandum,
                        refresh: this.props.refreshMemorandums }),
                    this.state.activeMemorandum !== null && _react2.default.createElement(_modals2.RestoreMemorandumModal, { memorandum: memorandum,
                        onRestoreSuccess: this.props.onRestoreSuccess,
                        isOpen: this.state.restoreMemorandumIsShowing,
                        toggle: this.toggleRestoreMemorandum })
                )
            );
        }
    }]);

    return MemorandumSidebarPane;
}(_react.Component);

var MemorandumDetails = function (_Component2) {
    _inherits(MemorandumDetails, _Component2);

    function MemorandumDetails(props) {
        _classCallCheck(this, MemorandumDetails);

        return _possibleConstructorReturn(this, (MemorandumDetails.__proto__ || Object.getPrototypeOf(MemorandumDetails)).call(this, props));
    }

    _createClass(MemorandumDetails, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            function formatDate(date) {
                return (0, _moment2.default)(date).format("LL");
            }

            var dateEffective = formatDate(this.props.memorandum.date_effective);
            var type = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
            var expiryDate = this.props.memorandum.date_expiration === null ? "None" : formatDate(this.props.memorandum.date_expiration);
            var college = this.props.memorandum.college_initiator === null ? "None" : this.props.memorandum.college_initiator;
            var viewMemorandum = function viewMemorandum() {
                var shell = require("electron").shell;
                shell.openExternal(_this3.props.memorandum.memorandum_file);
            };

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Details"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Memorandum Type"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            type
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Date Effective"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            dateEffective
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Expiration Date"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            expiryDate
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "College Initiator"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            college
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { className: "d-flex" },
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "success",
                                    size: "sm",
                                    className: "mr-2",
                                    onClick: viewMemorandum },
                                "View"
                            ),
                            !this.props.archived && _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "success",
                                    size: "sm",
                                    className: "mr-auto",
                                    onClick: this.props.toggleEditMemorandum },
                                "Edit"
                            ),
                            !this.props.archived && _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "warning",
                                    size: "sm",
                                    onClick: this.props.toggleDeleteMemorandum },
                                "Archive"
                            ),
                            this.props.archived && _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "primary",
                                    size: "sm",
                                    className: "ml-auto",
                                    onClick: this.props.toggleRestoreMemorandum },
                                "Restore"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MemorandumDetails;
}(_react.Component);

var MemorandumLinkages = function (_Component3) {
    _inherits(MemorandumLinkages, _Component3);

    function MemorandumLinkages(props) {
        _classCallCheck(this, MemorandumLinkages);

        return _possibleConstructorReturn(this, (MemorandumLinkages.__proto__ || Object.getPrototypeOf(MemorandumLinkages)).call(this, props));
    }

    _createClass(MemorandumLinkages, [{
        key: "render",
        value: function render() {
            var body = _react2.default.createElement(
                "div",
                { className: "p-4 pt-5 pb-5 bg-light text-center" },
                _react2.default.createElement(
                    "h5",
                    { className: "text-secondary" },
                    "There are no linkages for this memorandum."
                )
            );

            var rows = this.props.linkages.map(function (linkage, index) {
                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: index },
                    _settings2.default.linkages[linkage]
                );
            });

            if (this.props.linkages.length > 0) {
                body = _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    rows
                );
            }

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Linkages"
                ),
                body
            );
        }
    }]);

    return MemorandumLinkages;
}(_react.Component);

var ProgramSidebarPane = function (_Component4) {
    _inherits(ProgramSidebarPane, _Component4);

    function ProgramSidebarPane(props) {
        _classCallCheck(this, ProgramSidebarPane);

        var _this5 = _possibleConstructorReturn(this, (ProgramSidebarPane.__proto__ || Object.getPrototypeOf(ProgramSidebarPane)).call(this, props));

        _this5.state = {
            deleteProgramIsShowing: false,
            editProgramIsShowing: false
        };

        _this5.toggleDeleteProgram = _this5.toggleDeleteProgram.bind(_this5);
        _this5.toggleEditProgram = _this5.toggleEditProgram.bind(_this5);
        return _this5;
    }

    _createClass(ProgramSidebarPane, [{
        key: "toggleDeleteProgram",
        value: function toggleDeleteProgram() {
            this.setState({
                deleteMemorandumIsShowing: !this.state.deleteProgramIsShowing
            });
        }
    }, {
        key: "toggleEditProgram",
        value: function toggleEditProgram() {
            this.setState({
                editProgramIsShowing: !this.state.editProgramIsShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            var program = this.props.program;

            return _react2.default.createElement(
                "div",
                { className: "p-0 h-100 d-flex flex-column" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head pt-5 d-flex flex-row align-items-end" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0" },
                            program.name
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(ProgramDetails, { program: program,
                        toggleDeleteProgram: this.toggleDeleteProgram,
                        toggleEditProgram: this.toggleEditProgram })
                )
            );
        }
    }]);

    return ProgramSidebarPane;
}(_react.Component);

var ProgramDetails = function (_Component5) {
    _inherits(ProgramDetails, _Component5);

    function ProgramDetails(props) {
        _classCallCheck(this, ProgramDetails);

        return _possibleConstructorReturn(this, (ProgramDetails.__proto__ || Object.getPrototypeOf(ProgramDetails)).call(this, props));
    }

    _createClass(ProgramDetails, [{
        key: "render",
        value: function render() {
            var program = this.props.program;
            var academicYear = program.academic_year.academic_year_start + " - " + (program.academic_year.academic_year_start + 1);

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Details"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Program Name"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            program.name
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Linkage"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            program.linkage.name
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Academic Year"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            academicYear
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { className: "d-flex" },
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "success",
                                    size: "sm",
                                    className: "mr-auto" },
                                "Edit"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ProgramDetails;
}(_react.Component);

exports.MemorandumSidebarPane = MemorandumSidebarPane;
exports.ProgramSidebarPane = ProgramSidebarPane;
//# sourceMappingURL=sidebar_panes.js.map