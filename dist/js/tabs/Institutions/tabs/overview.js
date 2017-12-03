"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeInstitutionOverviewQuery = exports.ContactDetails = exports.InstitutionDetails = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _reactstrap = require("reactstrap");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _modals = require("../modals");

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

var _section = require("../../../components/section");

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _dismissable_toast_maker = require("../../../dismissable_toast_maker");

var _authorization = require("../../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeInstitutionOverviewQuery(id) {
    return _graphql2.default.query("\n    {\n        institution(id:" + id + ") {\n            address\n            website\n            contact_person_email\n            contact_person_name\n            contact_person_number\n            country\n            agreement\n        }\n    }    \n    ");
}

function institutionIsFetched(institution) {
    return institution.website !== undefined;
}

var InstitutionOverview = function (_Component) {
    _inherits(InstitutionOverview, _Component);

    function InstitutionOverview(props) {
        _classCallCheck(this, InstitutionOverview);

        var _this = _possibleConstructorReturn(this, (InstitutionOverview.__proto__ || Object.getPrototypeOf(InstitutionOverview)).call(this, props));

        _this.state = {
            institution: props.institution,
            error: null
        };

        _this.props.setSidebarContent(null);
        _this.fetchInstitution = _this.fetchInstitution.bind(_this);

        _this.fetchInstitution();
        return _this;
    }

    _createClass(InstitutionOverview, [{
        key: "fetchInstitution",
        value: function fetchInstitution(id) {
            var _this2 = this;

            if (id === undefined) {
                id = this.state.institution.id;
            }

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            //Fetch active institution details
            makeInstitutionOverviewQuery(id).then(function (result) {
                var institution = result.institution;

                // Carbon copy
                Object.assign(_this2.state.institution, institution);

                _this2.setState({
                    institution: _this2.state.institution
                });
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            if (this.state.institution !== null && this.state.institution.id === props.institution.id) {
                // Institution is already showing, why reload?
                return;
            }

            this.setState({
                institution: props.institution
            });

            if (!institutionIsFetched(props.institution)) {
                this.fetchInstitution(props.institution.id);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this3.fetchInstitution(_this3.state.institution.id);
                        } },
                    this.state.error.toString()
                );
            }

            //User has already selected, but we haven't fetched it from the database yet
            if (!institutionIsFetched(this.state.institution)) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(OverviewHead, { institution: this.state.institution,
                    onArchiveInstitution: this.props.onArchiveActiveInstitution,
                    onEditInstitution: this.fetchInstitution }),
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
            editInstitutionIsShowing: false
        };

        _this4.confirmArchive = _this4.confirmArchive.bind(_this4);
        _this4.toggleEditInstitution = _this4.toggleEditInstitution.bind(_this4);
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
        key: "confirmArchive",
        value: function confirmArchive() {
            var _this5 = this;

            if (!confirm("Are you sure you want to archive " + this.props.institution.name + "?")) {
                return;
            }

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Archiving",
                message: "Archiving institution..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/institutions/" + this.props.institution.id + "/",
                method: "DELETE",
                beforeSend: _authorization2.default,
                success: function success() {
                    dismissToast();
                    _this5.props.onArchiveInstitution();
                    _izitoast2.default.success({
                        icon: "",
                        title: "Success",
                        message: "Institution archived",
                        progressBar: false
                    });
                },
                error: function error(response) {
                    dismissToast();
                    console.log(response);
                    _izitoast2.default.error({
                        title: "Error",
                        message: "Unable to archive institution",
                        progressBar: false
                    });
                }
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
                        { outline: true,
                            size: "sm",
                            color: "success",
                            className: "mr-2",
                            onClick: this.toggleEditInstitution },
                        "Edit Institution"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            size: "sm",
                            color: "warning",
                            onClick: this.confirmArchive },
                        "Archive"
                    )
                ),
                _react2.default.createElement(_modals.InstitutionFormModal, { edit: true,
                    isOpen: this.state.editInstitutionIsShowing,
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
                            { large: !this.props.sidebar },
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
                            { large: !this.props.sidebar },
                            institution.country
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
                            { large: !this.props.sidebar,
                                className: "text-primary",
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
                            { large: !this.props.sidebar },
                            agreementType
                        )
                    ),
                    this.props.archived && _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { className: "d-flex" },
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "primary",
                                    size: "sm",
                                    className: "ml-auto",
                                    onClick: this.props.toggleRestoreInstitution },
                                "Restore"
                            )
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
                            { large: !this.props.sidebar },
                            institution.contact_person_name
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
                            { large: !this.props.sidebar },
                            institution.contact_person_email
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
                            { large: !this.props.sidebar },
                            institution.contact_person_number
                        )
                    )
                )
            );
        }
    }]);

    return ContactDetails;
}(_react.Component);

exports.default = InstitutionOverview;
exports.InstitutionDetails = InstitutionDetails;
exports.ContactDetails = ContactDetails;
exports.makeInstitutionOverviewQuery = makeInstitutionOverviewQuery;
//# sourceMappingURL=overview.js.map