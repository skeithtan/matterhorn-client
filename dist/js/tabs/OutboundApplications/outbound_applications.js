"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchOutboundApplication(onResult) {
    // TODO: fetchOutboundApplication
    // graphql.query().then(onResult);
}

var OutboundApplications = function (_Component) {
    _inherits(OutboundApplications, _Component);

    function OutboundApplications(props) {
        _classCallCheck(this, OutboundApplications);

        return _possibleConstructorReturn(this, (OutboundApplications.__proto__ || Object.getPrototypeOf(OutboundApplications)).call(this, props));
    }

    _createClass(OutboundApplications, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(OutboundApplicationsList, null)
            );
        }
    }]);

    return OutboundApplications;
}(_react.Component);

var OutboundApplicationsList = function (_Component2) {
    _inherits(OutboundApplicationsList, _Component2);

    function OutboundApplicationsList(props) {
        _classCallCheck(this, OutboundApplicationsList);

        return _possibleConstructorReturn(this, (OutboundApplicationsList.__proto__ || Object.getPrototypeOf(OutboundApplicationsList)).call(this, props));
    }

    _createClass(OutboundApplicationsList, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "sidebar h-100" },
                _react2.default.createElement(OutboundApplicationsListHead, null),
                _react2.default.createElement(OutboundApplicationsListTable, null)
            );
        }
    }]);

    return OutboundApplicationsList;
}(_react.Component);

var OutboundApplicationsListHead = function (_Component3) {
    _inherits(OutboundApplicationsListHead, _Component3);

    function OutboundApplicationsListHead(props) {
        _classCallCheck(this, OutboundApplicationsListHead);

        return _possibleConstructorReturn(this, (OutboundApplicationsListHead.__proto__ || Object.getPrototypeOf(OutboundApplicationsListHead)).call(this, props));
    }

    _createClass(OutboundApplicationsListHead, [{
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
                        { outline: true,
                            color: "success",
                            className: "ml-auto",
                            size: "sm" },
                        "Add"
                    )
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    "Applications"
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search",
                    placeholder: "search",
                    className: "search-input" })
            );
        }
    }]);

    return OutboundApplicationsListHead;
}(_react.Component);

var OutboundApplicationsListTable = function (_Component4) {
    _inherits(OutboundApplicationsListTable, _Component4);

    function OutboundApplicationsListTable(props) {
        _classCallCheck(this, OutboundApplicationsListTable);

        return _possibleConstructorReturn(this, (OutboundApplicationsListTable.__proto__ || Object.getPrototypeOf(OutboundApplicationsListTable)).call(this, props));
    }

    _createClass(OutboundApplicationsListTable, [{
        key: "render",
        value: function render() {
            return null; //TODO
        }
    }]);

    return OutboundApplicationsListTable;
}(_react.Component);

exports.default = OutboundApplications;
//# sourceMappingURL=outbound_applications.js.map