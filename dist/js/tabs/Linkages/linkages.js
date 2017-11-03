"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _institution_list = require("./institution_list");

var _institution_list2 = _interopRequireDefault(_institution_list);

var _programs = require("./programs");

var _programs2 = _interopRequireDefault(_programs);

var _student_list = require("./student_list");

var _student_list2 = _interopRequireDefault(_student_list);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: GraphQL query for institutions with a specified linkage
// TODO: Prop passing n shit

var Linkages = function (_Component) {
    _inherits(Linkages, _Component);

    function Linkages(props) {
        _classCallCheck(this, Linkages);

        var _this = _possibleConstructorReturn(this, (Linkages.__proto__ || Object.getPrototypeOf(Linkages)).call(this, props));

        _this.state = {
            institutionList: null,
            activeLinkage: null,
            activeInstitution: null,
            activeProgram: null
        };

        _this.setActiveLinkage = _this.setActiveLinkage.bind(_this);
        _this.setActiveInstitution = _this.setActiveInstitution.bind(_this);
        _this.setActiveProgram = _this.setActiveProgram.bind(_this);
        _this.refreshInstitutions = _this.refreshInstitutions.bind(_this);
        return _this;
    }

    _createClass(Linkages, [{
        key: "refreshInstitutions",
        value: function refreshInstitutions() {
            // TODO given the fetching query
        }
    }, {
        key: "setActiveLinkage",
        value: function setActiveLinkage(linkage) {
            this.setState({
                activeLinkage: linkage
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
        key: "setActiveProgram",
        value: function setActiveProgram(program) {
            this.setState({
                activeProgram: program
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "container-fluid d-flex flex-row p-0 h-100" },
                _react2.default.createElement(_institution_list2.default, null),
                _react2.default.createElement(_programs2.default, null),
                _react2.default.createElement(_student_list2.default, null)
            );
        }
    }]);

    return Linkages;
}(_react.Component);

exports.default = Linkages;
//# sourceMappingURL=linkages.js.map