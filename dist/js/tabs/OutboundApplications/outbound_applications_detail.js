"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchOutboundApplicationDetail(id, onResult) {
    // TODO: fetchOutboundApplicationDetail
    // graphql.query().then(onResult);
}

var OutboundApplicationsDetail = function (_Component) {
    _inherits(OutboundApplicationsDetail, _Component);

    function OutboundApplicationsDetail(props) {
        _classCallCheck(this, OutboundApplicationsDetail);

        return _possibleConstructorReturn(this, (OutboundApplicationsDetail.__proto__ || Object.getPrototypeOf(OutboundApplicationsDetail)).call(this, props));
    }

    _createClass(OutboundApplicationsDetail, [{
        key: "render",
        value: function render() {}
    }]);

    return OutboundApplicationsDetail;
}(_react.Component);

var OutboundApplicationDetailHead = function (_Component2) {
    _inherits(OutboundApplicationDetailHead, _Component2);

    function OutboundApplicationDetailHead(props) {
        _classCallCheck(this, OutboundApplicationDetailHead);

        return _possibleConstructorReturn(this, (OutboundApplicationDetailHead.__proto__ || Object.getPrototypeOf(OutboundApplicationDetailHead)).call(this, props));
    }

    return OutboundApplicationDetailHead;
}(_react.Component);

exports.default = OutboundApplicationsDetail;
//# sourceMappingURL=outbound_applications_detail.js.map