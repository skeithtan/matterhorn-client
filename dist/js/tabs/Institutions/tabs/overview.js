"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _reactstrap = require("reactstrap");

var _modals = require("../modals");

var _section = require("../../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitution(id, onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            institution(id:" + id + ") {\n                id\n                name\n                address\n                website\n                contactPersonEmail\n                contactPersonName\n                contactPersonNumber\n                country {\n                    name\n                }\n                agreement\n            }\n        }\n       ",
        onResponse: onResponse
    });
}

var InstitutionOverview = function (_Component) {
    _inherits(InstitutionOverview, _Component);

    function InstitutionOverview(props) {
        _classCallCheck(this, InstitutionOverview);

        var _this = _possibleConstructorReturn(this, (InstitutionOverview.__proto__ || Object.getPrototypeOf(InstitutionOverview)).call(this, props));

        _this.state = {
            institution: null,
            institutionID: props.institution.id
        };

        _this.onEditInstitution = _this.onEditInstitution.bind(_this);

        //Fetch active institution details
        fetchInstitution(props.institution.id, function (response) {
            _this.setState({
                institution: response.data.institution
            });
        });
        return _this;
    }

    _createClass(InstitutionOverview, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            this.setState({
                institutionID: nextProps.institution.id,
                institution: null
            });

            fetchInstitution(nextProps.institution.id, function (response) {
                _this2.setState({
                    institution: response.data.institution
                });
            });
        }
    }, {
        key: "onEditInstitution",
        value: function onEditInstitution() {
            var _this3 = this;

            //Refresh and fetch new data from server
            this.setState({
                institution: null
            });

            fetchInstitution(this.state.institutionID, function (response) {
                var institution = response.data.institution;
                _this3.setState({
                    institution: institution
                });

                _this3.props.refreshInstitutions();
            });
        }
    }, {
        key: "render",
        value: function render() {
            //User has already selected, but we haven't fetched it from the database yet
            if (this.state.institution === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(OverviewHead, { institution: this.state.institution,
                    onDeleteInstitution: this.props.onDeleteActiveInstitution,
                    onEditInstitution: this.onEditInstitution }),
                _react2.default.createElement(OverviewBody, { institution: this.state.institution })
            );
        }
    }]);

    return InstitutionOverview;
}(_react.Component);

var OverviewHead = function (_Component2) {
    _inherits(OverviewHead, _Component2);

    function OverviewHead(props) {
        _classCallCheck(this, OverviewHead);

        var _this4 = _possibleConstructorReturn(this, (OverviewHead.__proto__ || Object.getPrototypeOf(OverviewHead)).call(this, props));

        _this4.state = {
            deleteInstitutionIsShowing: false,
            editInstitutionIsShowing: false
        };

        _this4.toggleEditInstitution = _this4.toggleEditInstitution.bind(_this4);
        _this4.toggleDeleteInstitution = _this4.toggleDeleteInstitution.bind(_this4);
        return _this4;
    }

    _createClass(OverviewHead, [{
        key: "toggleEditInstitution",
        value: function toggleEditInstitution() {
            this.setState({
                editInstitutionIsShowing: !this.state.editInstitutionIsShowing
            });
        }
    }, {
        key: "toggleDeleteInstitution",
        value: function toggleDeleteInstitution() {
            this.setState({
                deleteInstitutionIsShowing: !this.state.deleteInstitutionIsShowing
            });
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
                        "Overview"
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
                        { outline: true, size: "sm", color: "success", className: "mr-2",
                            onClick: this.toggleEditInstitution },
                        "Edit Institution"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "danger",
                            onClick: this.toggleDeleteInstitution },
                        "Delete"
                    )
                ),
                _react2.default.createElement(_modals.DeleteInstitutionModal, { isOpen: this.state.deleteInstitutionIsShowing,
                    institution: this.props.institution,
                    toggle: this.toggleDeleteInstitution,
                    refresh: this.props.onDeleteInstitution }),
                _react2.default.createElement(_modals.EditInstitutionModal, { isOpen: this.state.editInstitutionIsShowing,
                    institution: this.props.institution,
                    refresh: this.props.onEditInstitution,
                    toggle: this.toggleEditInstitution })
            );
        }
    }]);

    return OverviewHead;
}(_react.Component);

var OverviewBody = function (_Component3) {
    _inherits(OverviewBody, _Component3);

    function OverviewBody(props) {
        _classCallCheck(this, OverviewBody);

        return _possibleConstructorReturn(this, (OverviewBody.__proto__ || Object.getPrototypeOf(OverviewBody)).call(this, props));
    }

    _createClass(OverviewBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(InstitutionDetails, { institution: this.props.institution }),
                _react2.default.createElement(ContactDetails, { institution: this.props.institution })
            );
        }
    }]);

    return OverviewBody;
}(_react.Component);

var InstitutionDetails = function (_Component4) {
    _inherits(InstitutionDetails, _Component4);

    function InstitutionDetails(props) {
        _classCallCheck(this, InstitutionDetails);

        return _possibleConstructorReturn(this, (InstitutionDetails.__proto__ || Object.getPrototypeOf(InstitutionDetails)).call(this, props));
    }

    _createClass(InstitutionDetails, [{
        key: "render",
        value: function render() {
            var institution = this.props.institution;
            var agreementType = this.props.institution.agreement === "B" ? "Bilateral" : "Multilateral";
            var website = "http://" + institution.website;

            function openWebsite() {
                var _require = require("electron"),
                    shell = _require.shell;

                shell.openExternal(website);
            }

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Institution details"
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
                            "Address"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            institution.address
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Country"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            institution.country.name
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Website"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true, className: "text-primary",
                                onClick: openWebsite },
                            website
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Agreement Type"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            agreementType
                        )
                    )
                )
            );
        }
    }]);

    return InstitutionDetails;
}(_react.Component);

var ContactDetails = function (_Component5) {
    _inherits(ContactDetails, _Component5);

    function ContactDetails(props) {
        _classCallCheck(this, ContactDetails);

        return _possibleConstructorReturn(this, (ContactDetails.__proto__ || Object.getPrototypeOf(ContactDetails)).call(this, props));
    }

    _createClass(ContactDetails, [{
        key: "render",
        value: function render() {
            var institution = this.props.institution;

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Contact Details"
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
                            "Contact Person"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            institution.contactPersonName
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Contact Person Email"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            institution.contactPersonEmail
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Contact Person Number"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            institution.contactPersonNumber
                        )
                    )
                )
            );
        }
    }]);

    return ContactDetails;
}(_react.Component);

exports.default = InstitutionOverview;
//# sourceMappingURL=overview.js.map