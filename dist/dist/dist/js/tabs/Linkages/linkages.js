"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _institution_list = require("../Institutions/institution_list");

var _institution_list2 = _interopRequireDefault(_institution_list);

var _linkage_list = require("./linkage_list");

var _linkage_list2 = _interopRequireDefault(_linkage_list);

var _programs = require("./programs");

var _programs2 = _interopRequireDefault(_programs);

var _student_list = require("./student_list");

var _student_list2 = _interopRequireDefault(_student_list);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function fetchInstitutions(onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            countries {\n                name\n                institution_set {\n                    id\n                    name\n                }\n            }\n        }\n        ",
        onResponse: onResponse
    });
}

var Linkages = function (_Component) {
    _inherits(Linkages, _Component);

    function Linkages(props) {
        _classCallCheck(this, Linkages);

        var _this = _possibleConstructorReturn(this, (Linkages.__proto__ || Object.getPrototypeOf(Linkages)).call(this, props));

        _this.state = {
            institutionList: null,
            activeInstitution: null
        };

        _this.setActiveInstitution = _this.setActiveInstitution.bind(_this);
        return _this;
    }

    _createClass(Linkages, [{
        key: "setActiveInstitution",
        value: function setActiveInstitution(institution) {
            this.setState({
                activeInstitution: institution
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            fetchInstitutions(function (response) {
                _this2.setState({
                    institutionList: response.data.countries
                });
            });

            return _react2.default.createElement("div", { id: "linkages-page", className: "container-fluid d-flex flex-row p-0 h-100" }, _react2.default.createElement(_institution_list2.default, { institutions: this.state.institutionList,
                activeInstitution: this.state.activeInstitution,
                setActiveInstitution: this.setActiveInstitution }), _react2.default.createElement(_linkage_list2.default, null), _react2.default.createElement(_programs2.default, null), _react2.default.createElement(_student_list2.default, null));
        }
    }]);

    return Linkages;
}(_react.Component);

exports.default = Linkages;
//# sourceMappingURL=linkages.js.map
//# sourceMappingURL=linkages.js.map
//# sourceMappingURL=linkages.js.map