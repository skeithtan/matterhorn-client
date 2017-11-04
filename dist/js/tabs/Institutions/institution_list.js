"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

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
            searchKeyword: null
        };

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
                return [];
            }

            var filtered = [];
            var searchKeyword = this.state.searchKeyword.toLowerCase();

            this.props.institutions.forEach(function (country) {
                // Array of institutions from this country that conforms to search
                var countryFiltered = country.institution_set.filter(function (institution) {
                    var institutionName = institution.name.toLowerCase();
                    return institutionName.includes(searchKeyword);
                });

                // If country has no matching institutions, don't include in search results
                if (countryFiltered.length > 0) {

                    // Create new country object so as not to affect actual country object
                    filtered.push({
                        name: country.name,
                        institution_set: countryFiltered
                    });
                }
            });

            return filtered;
        }
    }, {
        key: "render",
        value: function render() {
            var isSearching = this.state.searchKeyword !== null;
            //Show all institutions or, if it has a filter, show the filtered?
            var showingInstitutions = isSearching ? this.getFilteredInstitutions() : this.props.institutions;

            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100", id: "institution-list" },
                _react2.default.createElement(InstitutionListHead, { setSearchKeyword: this.setSearchKeyword,
                    toggleAddInstitution: this.props.toggleAddInstitution }),
                _react2.default.createElement(InstitutionListTable, { countries: showingInstitutions,
                    isSearching: isSearching,
                    toggleAddInstitution: this.props.toggleAddInstitution,
                    activeInstitution: this.props.activeInstitution,
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
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "ml-auto",
                            onClick: this.props.toggleAddInstitution },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    "Institutions"
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search", placeholder: "Search", className: "search-input", onChange: this.onSearchInputChange })
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
                    { outline: true, color: "success", onClick: this.props.toggleAddInstitution },
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

            //If we're searching, that means there are simply no results if length == 0
            //If we're not searching, we really just don't have any data
            if (this.props.countries.length === 0) {
                return this.props.isSearching ? InstitutionListTable.noResultsState() : InstitutionListTable.emptyState();
            }

            var sections = this.props.countries.map(function (country, index) {
                return _react2.default.createElement(InstitutionSection, { title: country.name, institutions: country.institution_set, key: index,
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
                    isActive = _this6.props.activeInstitution.id === institution.id;
                }

                var setActiveInstitution = function setActiveInstitution() {
                    return _this6.props.setActiveInstitution(institution);
                };

                return _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true, onClick: setActiveInstitution, active: isActive, key: institution.id },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        null,
                        institution.name
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
            if (this.props.isActive) {
                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    { className: "bg-dlsu text-white" },
                    this.props.institution.name
                );
            } else {
                return _react2.default.createElement(
                    _reactstrap.ListGroupItem,
                    {
                        onClick: this.props.setActiveInstitution },
                    this.props.institution.name
                );
            }
        }
    }]);

    return InstitutionRow;
}(_react.Component);

exports.default = InstitutionList;
//# sourceMappingURL=institution_list.js.map