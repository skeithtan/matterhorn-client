"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _loading = require("../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _institution_detail_overview = require("./institution_detail_overview");

var _modals = require("./modals");

var _memorandums = require("./memorandums");

var _memorandums2 = _interopRequireDefault(_memorandums);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitution(id, onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            institution(id:" + id + ") {\n                id\n                name\n                email\n                address\n                website\n                contactPersonName\n                contactPersonNumber\n                country {\n                    name\n                }\n                agreement\n                memorandumSet {\n                    id\n                    category\n                    memorandumFile\n                    versionDate\n                    dateEffective\n                    dateExpiration\n                    collegeInitiator\n                }\n            }\n        }\n       ",
        onResponse: onResponse
    });
}

var InstitutionDetail = function (_Component) {
    _inherits(InstitutionDetail, _Component);

    function InstitutionDetail(props) {
        _classCallCheck(this, InstitutionDetail);

        var _this = _possibleConstructorReturn(this, (InstitutionDetail.__proto__ || Object.getPrototypeOf(InstitutionDetail)).call(this, props));

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

    _createClass(InstitutionDetail, [{
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
                _react2.default.createElement(InstitutionDetailHead, { institution: this.state.institution,
                    toggleDeleteInstitution: this.toggleDeleteInstitution,
                    toggleEditInstitution: this.toggleEditInstitution }),
                _react2.default.createElement(InstitutionDetailBody, { institution: this.state.institution }),
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
    }], [{
        key: "unselectedState",
        value: function unselectedState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "Select an institution to see its details"
                )
            );
        }
    }]);

    return InstitutionDetail;
}(_react.Component);

var InstitutionDetailHead = function (_Component2) {
    _inherits(InstitutionDetailHead, _Component2);

    function InstitutionDetailHead(props) {
        _classCallCheck(this, InstitutionDetailHead);

        return _possibleConstructorReturn(this, (InstitutionDetailHead.__proto__ || Object.getPrototypeOf(InstitutionDetailHead)).call(this, props));
    }

    _createClass(InstitutionDetailHead, [{
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
                        this.props.institution.name
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "text-muted d-inline-block font-weight-normal mb-0" },
                        this.props.institution.country.name
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

    return InstitutionDetailHead;
}(_react.Component);

var InstitutionDetailBody = function (_Component3) {
    _inherits(InstitutionDetailBody, _Component3);

    function InstitutionDetailBody(props) {
        _classCallCheck(this, InstitutionDetailBody);

        return _possibleConstructorReturn(this, (InstitutionDetailBody.__proto__ || Object.getPrototypeOf(InstitutionDetailBody)).call(this, props));
    }

    _createClass(InstitutionDetailBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                _react2.default.createElement(_institution_detail_overview.InstitutionDetailOverview, { institution: this.props.institution }),
                _react2.default.createElement(_institution_detail_overview.InstitutionContact, { institution: this.props.institution }),
                _react2.default.createElement(_memorandums2.default, { memorandums: this.props.institution.memorandumSet })
            );
        }
    }]);

    return InstitutionDetailBody;
}(_react.Component);

exports.default = InstitutionDetail;
//# sourceMappingURL=institution_detail.js.map