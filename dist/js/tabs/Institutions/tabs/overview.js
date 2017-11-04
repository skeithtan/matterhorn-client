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
                _react2.default.createElement(InstitutionOverviewHead, { institution: this.state.institution,
                    onDeleteInstitution: this.props.onDeleteActiveInstitution,
                    onEditInstitution: this.onEditInstitution }),
                _react2.default.createElement(InstitutionOverviewBody, { institution: this.state.institution })
            );
        }
    }]);

    return InstitutionOverview;
}(_react.Component);

var InstitutionOverviewHead = function (_Component2) {
    _inherits(InstitutionOverviewHead, _Component2);

    function InstitutionOverviewHead(props) {
        _classCallCheck(this, InstitutionOverviewHead);

        var _this4 = _possibleConstructorReturn(this, (InstitutionOverviewHead.__proto__ || Object.getPrototypeOf(InstitutionOverviewHead)).call(this, props));

        _this4.state = {
            deleteInstitutionIsShowing: false,
            editInstitutionIsShowing: false
        };

        _this4.toggleEditInstitution = _this4.toggleEditInstitution.bind(_this4);
        _this4.toggleDeleteInstitution = _this4.toggleDeleteInstitution.bind(_this4);
        return _this4;
    }

    _createClass(InstitutionOverviewHead, [{
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
                { className: "page-head pt-5 d-flex flex-row align-items-center" },
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
                        { className: "page-head-title justify-content-left d-inline-block mr-2" },
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
                { className: "section" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Institution details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Address", fieldValue: institution.address }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Country", fieldValue: institution.country.name }),
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
                { className: "section" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Contact details"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Contact Person", fieldValue: institution.contactPersonName }),
                    _react2.default.createElement(InstitutionDetailRow, { fieldName: "Contact Person Email", fieldValue: institution.contactPersonEmail }),
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

exports.default = InstitutionOverview;
//# sourceMappingURL=overview.js.map