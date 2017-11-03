"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _loading = require("../../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _modals = require("../modals");

var _memorandums = require("./memorandums");

var _memorandums2 = _interopRequireDefault(_memorandums);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitution(id, onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            institution(id:" + id + ") {\n                id\n                name\n                email\n                address\n                website\n                contactPersonName\n                contactPersonNumber\n                country {\n                    name\n                }\n                agreement\n            }\n        }\n       ",
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
            institutionID: null,
            deleteInstitutionIsShowing: false,
            editInstitutionIsShowing: false
        };

        _this.toggleDeleteInstitution = _this.toggleDeleteInstitution.bind(_this);
        _this.toggleEditInstitution = _this.toggleEditInstitution.bind(_this);
        _this.onEditInstitution = _this.onEditInstitution.bind(_this);
        return _this;
    }

    _createClass(InstitutionOverview, [{
        key: "toggleDeleteInstitution",
        value: function toggleDeleteInstitution() {
            this.setState({
                deleteInstitutionIsShowing: !this.state.deleteInstitutionIsShowing
            });
        }
    }, {
        key: "toggleEditInstitution",
        value: function toggleEditInstitution() {
            this.setState({
                editInstitutionIsShowing: !this.state.editInstitutionIsShowing
            });
        }
    }, {
        key: "onEditInstitution",
        value: function onEditInstitution() {
            var _this2 = this;

            //Refresh and fetch new data from server
            this.setState({
                institution: null
            });

            fetchInstitution(this.state.institutionID, function (response) {
                var institution = response.data.institution;
                _this2.setState({
                    institution: institution
                });

                _this2.props.refreshInstitutions();
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            var institution = nextProps.institution;

            if (institution === null) {
                this.setState({
                    institution: null,
                    institutionID: null
                });

                return;
            }

            // Inform state about an active institution, but remove old institution
            this.setState({
                institutionID: institution.id,
                institution: null
            });

            //Fetch active institution details
            fetchInstitution(institution.id, function (response) {
                _this3.setState({
                    institution: response.data.institution
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            //User has not selected yet, no activeInstitution ID
            if (this.state.institutionID === null) {
                return InstitutionDetail.unselectedState();
            }

            //User has already selected, but we haven't fetched it from the database yet
            if (this.state.institution === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { id: "institution-detail", className: "container-fluid d-flex flex-column p-0" },
                _react2.default.createElement(InstitutionOverviewHead, { institution: this.state.institution,
                    toggleDeleteInstitution: this.toggleDeleteInstitution,
                    toggleEditInstitution: this.toggleEditInstitution }),
                _react2.default.createElement(InstitutionOverviewBody, { institution: this.state.institution }),
                this.state.institution !== null && //If activeInstitution is not null
                _react2.default.createElement(_modals.DeleteInstitutionModal, { isOpen: this.state.deleteInstitutionIsShowing,
                    institution: this.state.institution,
                    toggle: this.toggleDeleteInstitution,
                    refresh: this.props.onDeleteActiveInstitution }),
                this.state.institution !== null && _react2.default.createElement(_modals.EditInstitutionModal, { isOpen: this.state.editInstitutionIsShowing,
                    institution: this.state.institution,
                    refresh: this.onEditInstitution,
                    toggle: this.toggleEditInstitution })
            );
        }
    }]);

    return InstitutionOverview;
}(_react.Component);

var InstitutionOverviewHead = function (_Component2) {
    _inherits(InstitutionOverviewHead, _Component2);

    function InstitutionOverviewHead(props) {
        _classCallCheck(this, InstitutionOverviewHead);

        return _possibleConstructorReturn(this, (InstitutionOverviewHead.__proto__ || Object.getPrototypeOf(InstitutionOverviewHead)).call(this, props));
    }

    _createClass(InstitutionOverviewHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" },
                        this.props.institution.name,
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted ml-2" },
                            this.props.institution.country.name
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "mr-2",
                            onClick: this.props.toggleEditInstitution },
                        "Edit Institution"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "danger",
                            onClick: this.props.toggleDeleteInstitution },
                        "Delete"
                    )
                )
            );
        }
    }]);

    return InstitutionOverviewHead;
}(_react.Component);

var InstitutionOverviewBody = function (_Component3) {
    _inherits(InstitutionOverviewBody, _Component3);

    function InstitutionOverviewBody(props) {
        _classCallCheck(this, InstitutionOverviewBody);

        return _possibleConstructorReturn(this, (InstitutionOverviewBody.__proto__ || Object.getPrototypeOf(InstitutionOverviewBody)).call(this, props));
    }

    _createClass(InstitutionOverviewBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(InstitutionDetailOverview, { institution: this.props.institution }),
                _react2.default.createElement(InstitutionContact, { institution: this.props.institution })
            );
        }
    }]);

    return InstitutionOverviewBody;
}(_react.Component);

var InstitutionDetailOverview = function (_Component4) {
    _inherits(InstitutionDetailOverview, _Component4);

    function InstitutionDetailOverview(props) {
        _classCallCheck(this, InstitutionDetailOverview);

        return _possibleConstructorReturn(this, (InstitutionDetailOverview.__proto__ || Object.getPrototypeOf(InstitutionDetailOverview)).call(this, props));
    }

    _createClass(InstitutionDetailOverview, [{
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
                "div",
                null,
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Institution details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Email", fieldValue: institution.email }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Address", fieldValue: institution.address }),
                    _react2.default.createElement(
                        _reactstrap.ListGroupItem,
                        null,
                        _react2.default.createElement(
                            "small",
                            { className: "font-weight-bold" },
                            "Website"
                        ),
                        _react2.default.createElement(
                            "p",
                            { className: "lead m-0 text-primary", onClick: openWebsite },
                            website
                        )
                    ),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Agreement Type", fieldValue: agreementType })
                )
            );
        }
    }]);

    return InstitutionDetailOverview;
}(_react.Component);

var InstitutionContact = function (_Component5) {
    _inherits(InstitutionContact, _Component5);

    function InstitutionContact(props) {
        _classCallCheck(this, InstitutionContact);

        return _possibleConstructorReturn(this, (InstitutionContact.__proto__ || Object.getPrototypeOf(InstitutionContact)).call(this, props));
    }

    _createClass(InstitutionContact, [{
        key: "render",
        value: function render() {
            var institution = this.props.institution;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Contact details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Contact Person", fieldValue: institution.contactPersonName }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Contact Phone Number",
                        fieldValue: institution.contactPersonNumber })
                )
            );
        }
    }]);

    return InstitutionContact;
}(_react.Component);

var InstitutionDetailRow = function (_Component6) {
    _inherits(InstitutionDetailRow, _Component6);

    function InstitutionDetailRow(props) {
        _classCallCheck(this, InstitutionDetailRow);

        return _possibleConstructorReturn(this, (InstitutionDetailRow.__proto__ || Object.getPrototypeOf(InstitutionDetailRow)).call(this, props));
    }

    _createClass(InstitutionDetailRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                { onClick: this.props.onClick },
                _react2.default.createElement(
                    "small",
                    { className: "font-weight-bold" },
                    this.props.fieldName
                ),
                _react2.default.createElement(
                    "p",
                    { className: "lead m-0" },
                    this.props.fieldValue
                )
            );
        }
    }]);

    return InstitutionDetailRow;
}(_react.Component);

exports.default = InstitutionDetail;
//# sourceMappingURL=institution_overview.js.map