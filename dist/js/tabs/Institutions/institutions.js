"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _institution_list = require("./institution_list");

var _institution_list2 = _interopRequireDefault(_institution_list);

var _institution_detail = require("./institution_detail");

var _institution_detail2 = _interopRequireDefault(_institution_detail);

var _modals = require("./modals");

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _error_state = require("../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeInstitutionsQuery() {
    return _graphql2.default.query("\n        {\n            countries {\n                name\n                institutions {\n                    id\n                    name\n                }\n            }\n        }\n    ");
}

var Institutions = function (_Component) {
    _inherits(Institutions, _Component);

    function Institutions(props) {
        _classCallCheck(this, Institutions);

        var _this = _possibleConstructorReturn(this, (Institutions.__proto__ || Object.getPrototypeOf(Institutions)).call(this, props));

        _this.state = {
            institutionList: null,
            activeInstitution: null,
            addInstitutionIsShowing: false,
            memorandumToBeAdded: false,
            error: null
        };

        _this.fetchInstitutions = _this.fetchInstitutions.bind(_this);
        _this.setActiveInstitution = _this.setActiveInstitution.bind(_this);

        _this.toggleAddInstitution = _this.toggleAddInstitution.bind(_this);
        _this.toggleMemorandumToBeAdded = _this.toggleMemorandumToBeAdded.bind(_this);

        _this.onArchiveActiveInstitution = _this.onArchiveActiveInstitution.bind(_this);
        _this.onAddInstitution = _this.onAddInstitution.bind(_this);

        _this.fetchInstitutions();
        return _this;
    }

    _createClass(Institutions, [{
        key: "fetchInstitutions",
        value: function fetchInstitutions() {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeInstitutionsQuery().then(function (result) {
                _this2.setState({
                    institutionList: result.countries
                });
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "onArchiveActiveInstitution",
        value: function onArchiveActiveInstitution() {
            this.setState({
                activeInstitution: null
            });

            this.fetchInstitutions();
        }
    }, {
        key: "toggleAddInstitution",
        value: function toggleAddInstitution() {
            this.setState({
                addInstitutionIsShowing: !this.state.addInstitutionIsShowing
            });
        }
    }, {
        key: "setActiveInstitution",
        value: function setActiveInstitution(institution) {
            this.setState({
                activeInstitution: institution
            });
        }
    }, {
        key: "onAddInstitution",
        value: function onAddInstitution(institution) {
            this.setState({
                activeInstitution: institution
            });
            this.toggleMemorandumToBeAdded();
        }
    }, {
        key: "toggleMemorandumToBeAdded",
        value: function toggleMemorandumToBeAdded() {
            this.setState({
                memorandumToBeAdded: !this.state.memorandumToBeAdded
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this3.fetchInstitutions(_this3.state.activeYear);
                        } },
                    this.state.error.toString()
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "container-fluid d-flex flex-row p-0 h-100" },
                _react2.default.createElement(_institution_list2.default, { institutions: this.state.institutionList,
                    activeInstitution: this.state.activeInstitution,
                    setActiveInstitution: this.setActiveInstitution,
                    toggleAddInstitution: this.toggleAddInstitution }),
                _react2.default.createElement(_institution_detail2.default, { institution: this.state.activeInstitution,
                    onArchiveActiveInstitution: this.onArchiveActiveInstitution,
                    refreshInstitutions: this.fetchInstitutions,
                    memorandumToBeAdded: this.state.memorandumToBeAdded,
                    toggleMemorandumToBeAdded: this.toggleMemorandumToBeAdded }),
                _react2.default.createElement(_modals.InstitutionFormModal, { isOpen: this.state.addInstitutionIsShowing,
                    toggle: this.toggleAddInstitution,
                    onAddInstitution: this.onAddInstitution,
                    refresh: this.fetchInstitutions })
            );
        }
    }]);

    return Institutions;
}(_react.Component);

exports.default = Institutions;
//# sourceMappingURL=institutions.js.map