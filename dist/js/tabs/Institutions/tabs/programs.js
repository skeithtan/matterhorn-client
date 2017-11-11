"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _loading = require("../../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

        _this.state = {
            currentProgram: null
        };

        _this.setCurrentProgram = _this.setCurrentProgram.bind(_this);
        return _this;
    }

    _createClass(Programs, [{
        key: "setCurrentProgram",
        value: function setCurrentProgram(program) {
            this.setState({
                currentProgram: program
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "h-100 w-100" },
                _react2.default.createElement(ProgramsHead, { institution: this.props.institution }),
                _react2.default.createElement(ProgramsTable, { setCurrentProgram: this.setCurrentProgram })
            );
        }
    }]);

    return Programs;
}(_react.Component);

var ProgramsHead = function (_Component2) {
    _inherits(ProgramsHead, _Component2);

    function ProgramsHead(props) {
        _classCallCheck(this, ProgramsHead);

        return _possibleConstructorReturn(this, (ProgramsHead.__proto__ || Object.getPrototypeOf(ProgramsHead)).call(this, props));
    }

    _createClass(ProgramsHead, [{
        key: "toggleAddPrograms",
        value: function toggleAddPrograms() {
            //TODO
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
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Programs"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title mb-0" },
                        this.props.institution.name
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success" },
                        "Add a Program"
                    )
                )
            );
        }
    }]);

    return ProgramsHead;
}(_react.Component);

var ProgramsTable = function (_Component3) {
    _inherits(ProgramsTable, _Component3);

    function ProgramsTable(props) {
        _classCallCheck(this, ProgramsTable);

        return _possibleConstructorReturn(this, (ProgramsTable.__proto__ || Object.getPrototypeOf(ProgramsTable)).call(this, props));
    }

    _createClass(ProgramsTable, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "h1",
                null,
                "World"
            );
        }
    }]);

    return ProgramsTable;
}(_react.Component);

var ProgramsListSection = function (_Component4) {
    _inherits(ProgramsListSection, _Component4);

    function ProgramsListSection(props) {
        _classCallCheck(this, ProgramsListSection);

        var _this4 = _possibleConstructorReturn(this, (ProgramsListSection.__proto__ || Object.getPrototypeOf(ProgramsListSection)).call(this, props));

        _this4.emptyState = _this4.emptyState.bind(_this4);
        return _this4;
    }

    _createClass(ProgramsListSection, [{
        key: "emptyState",
        value: function emptyState() {
            //TODO
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.programs.length === 0) {
                return this.emptyState();
            }

            var rows = this.props.programs.map(function (program) {
                //TODO: onClick
                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: program.id },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        program.name
                    )
                );
            });

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _section.Section,
                    null,
                    _react2.default.createElement(
                        _section.SectionTitle,
                        null,
                        this.props.children
                    ),
                    _react2.default.createElement(
                        _section.SectionTable,
                        { className: "memorandums-accordion" },
                        rows
                    )
                )
            );
        }
    }]);

    return ProgramsListSection;
}(_react.Component);

exports.default = Programs;
//# sourceMappingURL=programs.js.map