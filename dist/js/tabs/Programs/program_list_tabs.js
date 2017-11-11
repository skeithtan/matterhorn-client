"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramListTabBar = function (_Component) {
    _inherits(ProgramListTabBar, _Component);

    function ProgramListTabBar(props) {
        _classCallCheck(this, ProgramListTabBar);

        return _possibleConstructorReturn(this, (ProgramListTabBar.__proto__ || Object.getPrototypeOf(ProgramListTabBar)).call(this, props));
    }

    _createClass(ProgramListTabBar, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "institution-navigation" },
                _react2.default.createElement(
                    "ul",
                    { className: "p-3 justify-content-center mb-0 d-flex flex-row" },
                    _react2.default.createElement(
                        "li",
                        { className: "d-flex" },
                        _react2.default.createElement(
                            "small",
                            { className: "font-weight-bold mb-0 " },
                            "Term 1"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "d-flex" },
                        _react2.default.createElement(
                            "small",
                            { className: "ml-4 font-weight-bold mb-0 " },
                            "Term 2"
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "d-flex" },
                        _react2.default.createElement(
                            "small",
                            { className: "ml-4 font-weight-bold mb-0 " },
                            "Term 3"
                        )
                    )
                )
            );
        }
    }]);

    return ProgramListTabBar;
}(_react.Component);

exports.default = ProgramListTabBar;
//# sourceMappingURL=program_list_tabs.js.map