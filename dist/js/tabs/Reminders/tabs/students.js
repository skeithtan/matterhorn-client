"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Students = function (_Component) {
    _inherits(Students, _Component);

    function Students(props) {
        _classCallCheck(this, Students);

        return _possibleConstructorReturn(this, (Students.__proto__ || Object.getPrototypeOf(Students)).call(this, props));
    }

    _createClass(Students, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column align-items-center page-body" },
                _react2.default.createElement(
                    _reactstrap.Card,
                    { className: "reminders-card mt-4" },
                    _react2.default.createElement(
                        _reactstrap.CardBody,
                        { className: "p-0" },
                        _react2.default.createElement(
                            "div",
                            { className: "d-flex flex-row p-3 justify-content-between align-items-center" },
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "small",
                                    { className: "text-uppercase text-secondary" },
                                    "Student name"
                                ),
                                _react2.default.createElement(
                                    "h6",
                                    { className: "mb-0" },
                                    "Paul McCartney"
                                )
                            ),
                            _react2.default.createElement(
                                "div",
                                null,
                                _react2.default.createElement(
                                    "small",
                                    { className: "text-uppercase text-secondary" },
                                    "ID number"
                                ),
                                _react2.default.createElement(
                                    "h6",
                                    { className: "mb-0" },
                                    "11540680"
                                )
                            ),
                            _react2.default.createElement(
                                _reactstrap.CardSubtitle,
                                { className: "text-danger" },
                                "Returning in 2 months"
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "d-flex flex-column p-0" },
                            _react2.default.createElement(
                                _section.SectionRow,
                                null,
                                _react2.default.createElement(
                                    _section.SectionRowTitle,
                                    null,
                                    "Program"
                                ),
                                _react2.default.createElement(
                                    _section.SectionRowContent,
                                    null,
                                    "Summer Program 2018"
                                )
                            ),
                            _react2.default.createElement(
                                _section.SectionRow,
                                null,
                                _react2.default.createElement(
                                    _section.SectionRowTitle,
                                    null,
                                    "Start Date"
                                ),
                                _react2.default.createElement(
                                    _section.SectionRowContent,
                                    null,
                                    "June 18, 1998"
                                )
                            ),
                            _react2.default.createElement(
                                _section.SectionRow,
                                null,
                                _react2.default.createElement(
                                    _section.SectionRowTitle,
                                    null,
                                    "End Date"
                                ),
                                _react2.default.createElement(
                                    _section.SectionRowContent,
                                    null,
                                    "June 18, 1998"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Students;
}(_react.Component);

exports.default = Students;
//# sourceMappingURL=students.js.map