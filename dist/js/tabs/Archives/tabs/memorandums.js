"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchMemorandums(year, onResult) {
    _graphql2.default.query("\n    {\n        memorandums(archived:true, year:" + year + ") {\n\t\tid\n\t\tarchived_at\n\t\tarchiver\n\t\tdate_effective\n\t\tinstitution {\n\t\t\tname\n\t\t}\n\t}").then(onResult);
}

var MemorandumArchives = function (_Component) {
    _inherits(MemorandumArchives, _Component);

    function MemorandumArchives(props) {
        _classCallCheck(this, MemorandumArchives);

        var _this = _possibleConstructorReturn(this, (MemorandumArchives.__proto__ || Object.getPrototypeOf(MemorandumArchives)).call(this, props));

        _this.state = {
            currentYear: (0, _moment2.default)().year()
        };

        _this.setCurrentYear = _this.setCurrentYear.bind(_this);
        return _this;
    }

    _createClass(MemorandumArchives, [{
        key: "setCurrentYear",
        value: function setCurrentYear(year) {
            this.setState({
                currentYear: year
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(MemorandumArchivesHead, null);
        }
    }]);

    return MemorandumArchives;
}(_react.Component);

var MemorandumArchivesHead = function (_Component2) {
    _inherits(MemorandumArchivesHead, _Component2);

    function MemorandumArchivesHead(props) {
        _classCallCheck(this, MemorandumArchivesHead);

        return _possibleConstructorReturn(this, (MemorandumArchivesHead.__proto__ || Object.getPrototypeOf(MemorandumArchivesHead)).call(this, props));
    }

    _createClass(MemorandumArchivesHead, [{
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
                        "Memorandum Archives"
                    )
                ),
                _react2.default.createElement("div", { className: "page-head-actions" })
            );
        }
    }]);

    return MemorandumArchivesHead;
}(_react.Component);

exports.default = MemorandumArchives;
//# sourceMappingURL=memorandums.js.map