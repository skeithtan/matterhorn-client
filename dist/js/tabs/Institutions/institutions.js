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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitutions(onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            countries {\n                name\n                institutionSet {\n                    id\n                    name\n                }\n            }\n        }\n        ",
        onResponse: onResponse
    });
}

var Institutions = function (_Component) {
    _inherits(Institutions, _Component);

    function Institutions(props) {
        _classCallCheck(this, Institutions);

        var _this = _possibleConstructorReturn(this, (Institutions.__proto__ || Object.getPrototypeOf(Institutions)).call(this, props));

        _this.state = {
            institutionList: null,
            activeInstitution: null,
            addInstitutionIsShowing: false
        };

        fetchInstitutions(function (response) {
            _this.setState({
                institutionList: response.data.countries
            });
        });

        _this.setActiveInstitution = _this.setActiveInstitution.bind(_this);
        _this.toggleAddInstitution = _this.toggleAddInstitution.bind(_this);
        return _this;
    }

    _createClass(Institutions, [{
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
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "container-fluid d-flex flex-row p-0 h-100" },
                _react2.default.createElement(_institution_list2.default, { institutions: this.state.institutionList,
                    activeInstitution: this.state.activeInstitution,
                    setActiveInstitution: this.setActiveInstitution,
                    toggleAddInstitution: this.toggleAddInstitution }),
                _react2.default.createElement(_institution_detail2.default, { institution: this.state.activeInstitution }),
                _react2.default.createElement(_modals.AddInstitutionModal, { isOpen: this.state.addInstitutionIsShowing, toggle: this.toggleAddInstitution })
            );
        }
    }]);

    return Institutions;
}(_react.Component);

exports.default = Institutions;
//# sourceMappingURL=institutions.js.map