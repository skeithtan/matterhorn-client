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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramList = function (_Component) {
    _inherits(ProgramList, _Component);

    function ProgramList(props) {
        _classCallCheck(this, ProgramList);

        return _possibleConstructorReturn(this, (ProgramList.__proto__ || Object.getPrototypeOf(ProgramList)).call(this, props));
    }

    _createClass(ProgramList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "h-100 d-flex flex-column" },
                _react2.default.createElement(ProgramListHead, { year: this.props.activeYear,
                    term: this.props.activeTerm }),
                _react2.default.createElement(ProgramListTable, { programList: this.props.programList,
                    activeProgram: this.props.activeProgram,
                    setActiveProgram: this.props.setActiveProgram })
            );
        }
    }]);

    return ProgramList;
}(_react.Component);

var ProgramListHead = function (_Component2) {
    _inherits(ProgramListHead, _Component2);

    function ProgramListHead(props) {
        _classCallCheck(this, ProgramListHead);

        return _possibleConstructorReturn(this, (ProgramListHead.__proto__ || Object.getPrototypeOf(ProgramListHead)).call(this, props));
    }

    _createClass(ProgramListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head d-flex flex-column align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row w-100 mb-2 align-items-center" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0 text-secondary mt-3" },
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
                                this.props.year + 1,
                                _react2.default.createElement(
                                    "span",
                                    { className: "text-secondary font-weight-normal" },
                                    " Term ",
                                    this.props.term
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input" })
            );
        }
    }]);

    return ProgramListHead;
}(_react.Component);

var ProgramListTable = function (_Component3) {
    _inherits(ProgramListTable, _Component3);

    function ProgramListTable(props) {
        _classCallCheck(this, ProgramListTable);

        var _this3 = _possibleConstructorReturn(this, (ProgramListTable.__proto__ || Object.getPrototypeOf(ProgramListTable)).call(this, props));

        _this3.getFilteredPrograms = _this3.getFilteredPrograms.bind(_this3);
        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(ProgramListTable, [{
        key: "getFilteredPrograms",
        value: function getFilteredPrograms() {
            var _this4 = this;

            if (this.props.programList === null) {
                return [];
            }

            var institutions = [];

            // Makes the list of Institution Names
            this.props.programList.forEach(function (program) {
                institutions.push(program.memorandum.institution.name);
            });

            // Get uniques only?
            institutions = institutions.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });

            // Arrange alphabetically
            institutions = institutions.sort();

            var categorizedByInstitution = [];

            institutions.forEach(function (institution) {
                var programs = [];
                categorizedByInstitution.push({
                    institution: institution,
                    programs: programs
                });

                _this4.props.programList.forEach(function (program) {
                    var programInstitution = program.memorandum.institution.name;
                    if (programInstitution === institution) {
                        programs.push(program);
                    }
                });
            });

            return categorizedByInstitution;
        }
    }, {
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                null,
                "This is empty"
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            if (this.props.programList === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.programList.length === 0) {
                return this.emptyState();
            }

            var institutionPrograms = this.getFilteredPrograms();

            var sections = institutionPrograms.map(function (institutionProgram, index) {
                return _react2.default.createElement(ProgramSection, { key: index,
                    title: institutionProgram.institution,
                    activeProgram: _this5.props.activeProgram,
                    programs: institutionProgram.programs,
                    setActiveProgram: _this5.props.setActiveProgram });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                sections
            );
        }
    }]);

    return ProgramListTable;
}(_react.Component);

var ProgramSection = function (_Component4) {
    _inherits(ProgramSection, _Component4);

    function ProgramSection(props) {
        _classCallCheck(this, ProgramSection);

        return _possibleConstructorReturn(this, (ProgramSection.__proto__ || Object.getPrototypeOf(ProgramSection)).call(this, props));
    }

    _createClass(ProgramSection, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            var rows = this.props.programs.map(function (program, index) {
                var isActive = false;

                if (_this7.props.activeProgram !== null) {
                    isActive = _this7.props.activeProgram.name === program.name;
                }

                var setActiveProgram = function setActiveProgram() {
                    return _this7.props.setActiveProgram(program);
                };

                return _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true, key: index, onClick: setActiveProgram, active: isActive },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        null,
                        program.name
                    )
                );
            });

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    this.props.title
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    rows
                )
            );
        }
    }]);

    return ProgramSection;
}(_react.Component);

exports.default = ProgramList;
//# sourceMappingURL=program_list.js.map