"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../components/section");

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _modals = require("../Institutions/modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramList = function (_Component) {
    _inherits(ProgramList, _Component);

    function ProgramList(props) {
        _classCallCheck(this, ProgramList);

        var _this = _possibleConstructorReturn(this, (ProgramList.__proto__ || Object.getPrototypeOf(ProgramList)).call(this, props));

        _this.state = {
            programFormModalIsShowing: false
        };

        _this.toggleProgramFormModal = _this.toggleProgramFormModal.bind(_this);
        return _this;
    }

    _createClass(ProgramList, [{
        key: "toggleProgramFormModal",
        value: function toggleProgramFormModal() {
            this.setState({
                programFormModalIsShowing: !this.state.programFormModalIsShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: "programs-page-pane d-flex flex-column" },
                _react2.default.createElement(ProgramListHead, { year: this.props.activeYear,
                    activeTerm: this.props.activeTerm,
                    setActiveTerm: this.props.setActiveTerm,
                    toggleProgramFormModal: this.toggleProgramFormModal }),
                _react2.default.createElement(ProgramListTable, { programs: this.props.programList,
                    activeTerm: this.props.activeTerm,
                    activeProgram: this.props.activeProgram,
                    setActiveProgram: this.props.setActiveProgram }),
                _react2.default.createElement(
                    "div",
                    { className: "tab-bar" },
                    _react2.default.createElement(
                        "div",
                        { className: "p-3 justify-content-center mb-0 d-flex flex-row" },
                        _react2.default.createElement(
                            _reactstrap.ButtonGroup,
                            null,
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    size: "sm",
                                    color: "success",
                                    active: this.props.activeTerm === 1,
                                    onClick: function onClick() {
                                        return _this2.props.setActiveTerm(1);
                                    } },
                                "Term 1"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    size: "sm",
                                    color: "success",
                                    active: this.props.activeTerm === 2,
                                    onClick: function onClick() {
                                        return _this2.props.setActiveTerm(2);
                                    } },
                                "Term 2"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    size: "sm",
                                    color: "success",
                                    active: this.props.activeTerm === 3,
                                    onClick: function onClick() {
                                        return _this2.props.setActiveTerm(3);
                                    } },
                                "Term 3"
                            )
                        )
                    )
                ),
                _react2.default.createElement(_modals.ProgramFormModal, { toggle: this.toggleProgramFormModal,
                    refresh: this.props.refreshPrograms,
                    isOpen: this.state.programFormModalIsShowing,
                    institution: null })
            );
        }
    }]);

    return ProgramList;
}(_react.Component);

var ProgramListHead = function (_Component2) {
    _inherits(ProgramListHead, _Component2);

    function ProgramListHead(props) {
        _classCallCheck(this, ProgramListHead);

        var _this3 = _possibleConstructorReturn(this, (ProgramListHead.__proto__ || Object.getPrototypeOf(ProgramListHead)).call(this, props));

        _this3.onTermChange = _this3.onTermChange.bind(_this3);
        return _this3;
    }

    _createClass(ProgramListHead, [{
        key: "onTermChange",
        value: function onTermChange(event) {
            this.props.setActiveTerm(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls w-100" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            size: "sm",
                            className: "ml-auto",
                            onClick: this.props.toggleProgramFormModal },
                        "Add Inbound Program"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row w-100 mb-2 align-items-center" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0 text-secondary" },
                            "Programs"
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "d-flex flex-row" },
                            _react2.default.createElement(
                                "h4",
                                { className: "page-head-title mb-0" },
                                this.props.year,
                                " - ",
                                this.props.year + 1
                            )
                        )
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search",
                    placeholder: "Search",
                    className: "search-input" })
            );
        }
    }]);

    return ProgramListHead;
}(_react.Component);

var ProgramListTable = function (_Component3) {
    _inherits(ProgramListTable, _Component3);

    function ProgramListTable(props) {
        _classCallCheck(this, ProgramListTable);

        var _this4 = _possibleConstructorReturn(this, (ProgramListTable.__proto__ || Object.getPrototypeOf(ProgramListTable)).call(this, props));

        _this4.emptyState = _this4.emptyState.bind(_this4);
        return _this4;
    }

    _createClass(ProgramListTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h5",
                    null,
                    "There are no programs for Term ",
                    this.props.activeTerm
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            if (this.props.programs === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.programs.length === 0) {
                return this.emptyState();
            }

            var programs = this.props.programs;

            var rows = programs.map(function (program, index) {
                var isActive = false;

                if (_this5.props.activeProgram !== null) {
                    isActive = _this5.props.activeProgram.id === program.id;
                }

                var setActiveProgram = function setActiveProgram() {
                    return _this5.props.setActiveProgram(program);
                };

                return _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true,
                        key: index,
                        onClick: setActiveProgram,
                        active: isActive },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        null,
                        program.name
                    )
                );
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                rows
            );
        }
    }]);

    return ProgramListTable;
}(_react.Component);

exports.default = ProgramList;
//# sourceMappingURL=inbound_program_list.js.map