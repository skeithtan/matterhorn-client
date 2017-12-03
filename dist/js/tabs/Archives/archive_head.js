"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArchivesHead = function (_Component) {
    _inherits(ArchivesHead, _Component);

    function ArchivesHead(props) {
        _classCallCheck(this, ArchivesHead);

        var _this = _possibleConstructorReturn(this, (ArchivesHead.__proto__ || Object.getPrototypeOf(ArchivesHead)).call(this, props));

        _this.onActiveYearChange = _this.onActiveYearChange.bind(_this);
        return _this;
    }

    _createClass(ArchivesHead, [{
        key: "onActiveYearChange",
        value: function onActiveYearChange(event) {
            this.props.setActiveYear(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var years = [];
            var currentYear = (0, _moment2.default)().year();

            //Create options for years 40 years from current year
            for (var i = 0; i <= 40; i++) {
                var year = currentYear - i;
                years.push(_react2.default.createElement(
                    "option",
                    { value: year,
                        key: i },
                    year
                ));
            }

            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-end" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" },
                        this.props.children
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        "div",
                        { className: "d-flex flex-column" },
                        _react2.default.createElement(
                            "label",
                            { className: "mr-3 text-dark mb-1" },
                            "Archives from year"
                        ),
                        _react2.default.createElement(
                            _reactstrap.Input,
                            { type: "select",
                                className: "btn-outline-success",
                                value: this.props.activeYear,
                                onChange: this.onActiveYearChange },
                            years
                        )
                    )
                )
            );
        }
    }]);

    return ArchivesHead;
}(_react.Component);

exports.default = ArchivesHead;
//# sourceMappingURL=archive_head.js.map