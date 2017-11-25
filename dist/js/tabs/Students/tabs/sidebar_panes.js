"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResidenceSidebarPane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: import modals

var ResidenceSidebarPane = function (_Component) {
    _inherits(ResidenceSidebarPane, _Component);

    function ResidenceSidebarPane(props) {
        _classCallCheck(this, ResidenceSidebarPane);

        var _this = _possibleConstructorReturn(this, (ResidenceSidebarPane.__proto__ || Object.getPrototypeOf(ResidenceSidebarPane)).call(this, props));

        _this.state = {
            residence: props.residence
        };
        return _this;
    }

    _createClass(ResidenceSidebarPane, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                residence: nextProps.residence
            });
        }
    }, {
        key: "render",
        value: function render() {
            var residence = this.state.residence;

            function formatDate(date) {
                return (0, _moment2.default)(date).format("LL");
            }

            var dateEffective = formatDate(residence.date_effective);
            return _react2.default.createElement(
                "div",
                { className: "p-0 h-100 d-flex flex-column" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head pt-5 d-flex flex-row align-items-end" },
                    _react2.default.createElement(
                        "div",
                        { className: "mr-auto" },
                        _react2.default.createElement(
                            "h5",
                            { className: "mb-0" },
                            "Effective ",
                            dateEffective
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(ResidenceDetails, { residence: residence })
                )
            );
        }
    }]);

    return ResidenceSidebarPane;
}(_react.Component);

var ResidenceDetails = function (_Component2) {
    _inherits(ResidenceDetails, _Component2);

    function ResidenceDetails(props) {
        _classCallCheck(this, ResidenceDetails);

        return _possibleConstructorReturn(this, (ResidenceDetails.__proto__ || Object.getPrototypeOf(ResidenceDetails)).call(this, props));
    }

    _createClass(ResidenceDetails, [{
        key: "render",
        value: function render() {
            var residence = this.props.residence;

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Details"
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Contact Person"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            residence.contact_person_name
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Contact Number"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            residence.contact_person_number
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Residence Type"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            residence.residence
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Address"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            residence.address
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { className: "d-flex" },
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "success",
                                    size: "sm",
                                    className: "mr-auto" },
                                "Edit"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ResidenceDetails;
}(_react.Component);

exports.ResidenceSidebarPane = ResidenceSidebarPane;
//# sourceMappingURL=sidebar_panes.js.map