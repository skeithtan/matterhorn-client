"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var activeInstitution = null;
var setActiveInstitution = function setActiveInstitution(institution) {};

var InstitutionList = function (_Component) {
    _inherits(InstitutionList, _Component);

    function InstitutionList(props) {
        _classCallCheck(this, InstitutionList);

        var _this = _possibleConstructorReturn(this, (InstitutionList.__proto__ || Object.getPrototypeOf(InstitutionList)).call(this, props));

        setActiveInstitution = props.setActiveInstitution;
        return _this;
    }

    _createClass(InstitutionList, [{
        key: "render",
        value: function render() {
            activeInstitution = this.props.activeInstitution;

            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "institution-list" },
                _react2.default.createElement(InstitutionListHead, null),
                _react2.default.createElement(InstitutionListTable, { countries: this.props.institutions,
                    setActiveInstitution: this.props.setActiveInstitution })
            );
        }
    }]);

    return InstitutionList;
}(_react.Component);

var InstitutionListHead = function (_Component2) {
    _inherits(InstitutionListHead, _Component2);

    function InstitutionListHead(props) {
        _classCallCheck(this, InstitutionListHead);

        return _possibleConstructorReturn(this, (InstitutionListHead.__proto__ || Object.getPrototypeOf(InstitutionListHead)).call(this, props));
    }

    _createClass(InstitutionListHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "ml-auto" },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    "Institutions"
                ),
                _react2.default.createElement(_reactstrap.Input, { placeholder: "Search", className: "search-input mt-2" })
            );
        }
    }]);

    return InstitutionListHead;
}(_react.Component);

var InstitutionListTable = function (_Component3) {
    _inherits(InstitutionListTable, _Component3);

    function InstitutionListTable(props) {
        _classCallCheck(this, InstitutionListTable);

        return _possibleConstructorReturn(this, (InstitutionListTable.__proto__ || Object.getPrototypeOf(InstitutionListTable)).call(this, props));
    }

    _createClass(InstitutionListTable, [{
        key: "render",
        value: function render() {
            if (this.props.countries === null) {
                return InstitutionListTable.loadingState();
            }

            if (this.props.countries.length === 0) {
                return InstitutionListTable.emptyState();
            }

            var sections = this.props.countries.map(function (country, index) {
                return _react2.default.createElement(InstitutionSection, { title: country.name, institutions: country.institutionSet, key: index });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                sections
            );
        }
    }], [{
        key: "loadingState",
        value: function loadingState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "Loading..."
                )
            );
        }
    }, {
        key: "emptyState",
        value: function emptyState() {}
    }]);

    return InstitutionListTable;
}(_react.Component);

var InstitutionSection = function (_Component4) {
    _inherits(InstitutionSection, _Component4);

    function InstitutionSection(props) {
        _classCallCheck(this, InstitutionSection);

        return _possibleConstructorReturn(this, (InstitutionSection.__proto__ || Object.getPrototypeOf(InstitutionSection)).call(this, props));
    }

    _createClass(InstitutionSection, [{
        key: "render",
        value: function render() {
            var rows = this.props.institutions.map(function (institution) {
                return _react2.default.createElement(InstitutionRow, { institution: institution,
                    key: institution.id });
            });

            return _react2.default.createElement(
                "div",
                { className: "section" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    this.props.title
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    rows
                )
            );
        }
    }]);

    return InstitutionSection;
}(_react.Component);

var InstitutionRow = function (_Component5) {
    _inherits(InstitutionRow, _Component5);

    function InstitutionRow(props) {
        _classCallCheck(this, InstitutionRow);

        return _possibleConstructorReturn(this, (InstitutionRow.__proto__ || Object.getPrototypeOf(InstitutionRow)).call(this, props));
    }

    _createClass(InstitutionRow, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            var isActive = activeInstitution !== null ? this.props.institution.id === activeInstitution.id : false;

            if (isActive) {
                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    { className: "bg-dlsu text-white" },
                    this.props.institution.name
                );
            } else {
                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    {
                        onClick: function onClick() {
                            return setActiveInstitution(_this6.props.institution);
                        } },
                    this.props.institution.name
                );
            }
        }
    }]);

    return InstitutionRow;
}(_react.Component);

exports.default = InstitutionList;
//# sourceMappingURL=institution_list.js.map