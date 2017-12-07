"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _collapse_content = require("../../components/collapse_content");

var _section = require("../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstitutionList = function (_Component) {
    _inherits(InstitutionList, _Component);

    function InstitutionList(props) {
        _classCallCheck(this, InstitutionList);

        var _this = _possibleConstructorReturn(this, (InstitutionList.__proto__ || Object.getPrototypeOf(InstitutionList)).call(this, props));

        _this.state = {
            searchKeyword: null,
            collapsed: false
        };

        _this.toggleCollapse = _this.toggleCollapse.bind(_this);
        _this.setSearchKeyword = _this.setSearchKeyword.bind(_this);
        _this.getFilteredInstitutions = _this.getFilteredInstitutions.bind(_this);
        return _this;
    }

    _createClass(InstitutionList, [{
        key: "setSearchKeyword",
        value: function setSearchKeyword(searchString) {
            //If the string is empty, that means the user isn't searching at all
            var searchKeyword = searchString === "" ? null : searchString;
            this.setState({
                searchKeyword: searchKeyword
            });
        }
    }, {
        key: "getFilteredInstitutions",
        value: function getFilteredInstitutions() {
            if (this.props.institutions === null || this.state.searchKeyword === null) {
                return null;
            }

            var filtered = [];
            var searchKeyword = this.state.searchKeyword.toLowerCase();

            this.props.institutions.forEach(function (country) {
                // Array of institutions from this country that conforms to search
                country.institutions.forEach(function (institution) {
                    var institutionName = institution.name.toLowerCase();
                    if (institutionName.includes(searchKeyword)) {
                        filtered.push(institution.id);
                    }
                });
            });

            return filtered;
        }
    }, {
        key: "toggleCollapse",
        value: function toggleCollapse() {
            this.setState({
                collapsed: !this.state.collapsed
            });
        }
    }, {
        key: "render",
        value: function render() {
            var isSearching = this.state.searchKeyword !== null;
            //Show all institutions or, if it has a filter, show the filtered?
            // const showingInstitutions = isSearching ? this.getFilteredInstitutions() : this.props.institutions;

            var className = "sidebar h-100 collapsible ";
            if (this.state.collapsed) {
                className += "collapsed";
            }

            return _react2.default.createElement(
                "div",
                { className: className,
                    id: "institution-list" },
                _react2.default.createElement(
                    _collapse_content.ExpandContent,
                    { className: "d-flex flex-column h-100" },
                    _react2.default.createElement(InstitutionListHead, { setSearchKeyword: this.setSearchKeyword,
                        toggleAddInstitution: this.props.toggleAddInstitution,
                        toggleCollapse: this.toggleCollapse }),
                    _react2.default.createElement(InstitutionListTable, { countries: this.props.institutions,
                        filtered: this.getFilteredInstitutions(),
                        isSearching: isSearching,
                        toggleAddInstitution: this.props.toggleAddInstitution,
                        activeInstitution: this.props.activeInstitution,
                        setActiveInstitution: this.props.setActiveInstitution })
                ),
                _react2.default.createElement(_collapse_content.CollapseContent, { title: "Institutions",
                    toggle: this.toggleCollapse })
            );
        }
    }]);

    return InstitutionList;
}(_react.Component);

var InstitutionListHead = function (_Component2) {
    _inherits(InstitutionListHead, _Component2);

    function InstitutionListHead(props) {
        _classCallCheck(this, InstitutionListHead);

        var _this2 = _possibleConstructorReturn(this, (InstitutionListHead.__proto__ || Object.getPrototypeOf(InstitutionListHead)).call(this, props));

        _this2.onSearchInputChange = _this2.onSearchInputChange.bind(_this2);
        return _this2;
    }

    _createClass(InstitutionListHead, [{
        key: "onSearchInputChange",
        value: function onSearchInputChange(event) {
            var searchInput = event.target.value;
            this.props.setSearchKeyword(searchInput);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls" },
                    _react2.default.createElement(_collapse_content.CollapseButton, { toggleCollapse: this.props.toggleCollapse }),
                    localStorage.userType !== "program_assistant" && _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "success",
                            size: "sm",
                            className: "ml-auto",
                            onClick: this.props.toggleAddInstitution },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    "Institutions"
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search",
                    placeholder: "Search",
                    className: "search-input",
                    onChange: this.onSearchInputChange })
            );
        }
    }]);

    return InstitutionListHead;
}(_react.Component);

var InstitutionListTable = function (_Component3) {
    _inherits(InstitutionListTable, _Component3);

    function InstitutionListTable(props) {
        _classCallCheck(this, InstitutionListTable);

        var _this3 = _possibleConstructorReturn(this, (InstitutionListTable.__proto__ || Object.getPrototypeOf(InstitutionListTable)).call(this, props));

        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    _createClass(InstitutionListTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h4",
                    null,
                    "There's nothing here."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "When added, Institutions will show up here."
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        color: "success",
                        onClick: this.props.toggleAddInstitution },
                    "Add an Institution"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            if (this.props.countries === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var filtered = this.props.filtered;

            if (this.props.isSearching && filtered.length === 0) {
                return InstitutionListTable.noResultsState();
            }

            //If we're searching, that means there are simply no results if length == 0
            //If we're not searching, we really just don't have any data
            if (this.props.countries.length === 0) {
                return this.emptyState();
            }

            var sections = this.props.countries.map(function (country, index) {

                var collapsed = false;

                if (_this4.props.isSearching) {
                    collapsed = true;

                    country.institutions.forEach(function (institution) {
                        if (filtered.includes(institution.id)) {
                            collapsed = false;
                        }
                    });
                }

                return _react2.default.createElement(InstitutionSection, { title: country.name,
                    institutions: country.institutions,
                    key: index,
                    collapsed: collapsed,
                    filtered: _this4.props.filtered,
                    activeInstitution: _this4.props.activeInstitution,
                    setActiveInstitution: _this4.props.setActiveInstitution });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                sections
            );
        }
    }], [{
        key: "noResultsState",
        value: function noResultsState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "No results found"
                )
            );
        }
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
            var _this6 = this;

            var rows = this.props.institutions.map(function (institution) {
                var isActive = false;

                if (_this6.props.activeInstitution !== null) {
                    var activeInstitutionId = _this6.props.activeInstitution.id.toString();
                    isActive = activeInstitutionId === institution.id;
                }

                var setActiveInstitution = function setActiveInstitution() {
                    return _this6.props.setActiveInstitution(institution);
                };

                var collapsed = false;
                if (_this6.props.filtered !== null) {
                    collapsed = !_this6.props.filtered.includes(institution.id);
                }

                return _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true,
                        onClick: setActiveInstitution,
                        active: isActive,
                        collapsed: collapsed,
                        key: institution.id },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        null,
                        institution.name
                    )
                );
            });

            return _react2.default.createElement(
                _section.Section,
                { collapsed: this.props.collapsed },
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

    return InstitutionSection;
}(_react.Component);

exports.default = InstitutionList;
//# sourceMappingURL=institution_list.js.map