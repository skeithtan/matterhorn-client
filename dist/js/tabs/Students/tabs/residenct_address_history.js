"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: import modals for editing and adding
// TODO: import sidebarpane for residency details

function fetchResidencyAddressHistory(onResult) {
    _graphql2.default.query("\n    {\n        \n\t}\n\t").then(onResult);
}

var ResidentAddressHistory = function (_Component) {
    _inherits(ResidentAddressHistory, _Component);

    function ResidentAddressHistory(props) {
        _classCallCheck(this, ResidentAddressHistory);

        var _this = _possibleConstructorReturn(this, (ResidentAddressHistory.__proto__ || Object.getPrototypeOf(ResidentAddressHistory)).call(this, props));

        _this.state = {
            student: null,
            studentId: props.student.id,
            activeResidenceId: null
        };

        // TODO: fetch the resident address through student

        _this.setActiveResidence = _this.setActiveResidence.bind(_this);
        return _this;
    }

    _createClass(ResidentAddressHistory, [{
        key: "setActiveResidence",
        value: function setActiveResidence(residence) {
            // TODO: set sidebar content to null if residence is null

            // TODO: set sidebar content with props

            this.setState({
                activeResidenceId: residence.id
            });
        }
    }, {
        key: "refreshResidences",
        value: function refreshResidences() {
            this.setState({
                student: null
            });

            // TODO: fetch residence
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.studentId === nextProps.student.id) {
                return;
            }

            // TODO: set sidebar content to null

            this.setState({
                studentId: nextProps.student.id,
                student: null,
                activeResidenceId: null
            });

            // TODO: fetch residences
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.student === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var residences = {
                residences: this.state.student.residences,
                latestResidence: this.state.student.latest_residence
            };

            return _react2.default.createElement("div", { className: "d-flex flex-column p-0 h-100" });
        }
    }]);

    return ResidentAddressHistory;
}(_react.Component);

var HistoryHead = function (_Component2) {
    _inherits(HistoryHead, _Component2);

    function HistoryHead(props) {
        _classCallCheck(this, HistoryHead);

        var _this2 = _possibleConstructorReturn(this, (HistoryHead.__proto__ || Object.getPrototypeOf(HistoryHead)).call(this, props));

        _this2.state = {
            addResidenceIsShowing: false
        };

        _this2.toggleAddResidence = _this2.toggleAddResidence.bind(_this2);
        return _this2;
    }

    _createClass(HistoryHead, [{
        key: "toggleAddResidence",
        value: function toggleAddResidence() {
            this.setState({
                addResidenceIsShowing: !this.state.addResidenceIsShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-end" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Resident Address History"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title mb-0" },
                        "[Student Name]"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", onClick: this.toggleAddResidence },
                        "Add a Residence"
                    )
                )
            );
        }
    }]);

    return HistoryHead;
}(_react.Component);

var HistoryBody = function (_Component3) {
    _inherits(HistoryBody, _Component3);

    function HistoryBody(props) {
        _classCallCheck(this, HistoryBody);

        return _possibleConstructorReturn(this, (HistoryBody.__proto__ || Object.getPrototypeOf(HistoryBody)).call(this, props));
    }

    _createClass(HistoryBody, [{
        key: "render",
        value: function render() {}
    }]);

    return HistoryBody;
}(_react.Component);

var HistorySection = function (_Component4) {
    _inherits(HistorySection, _Component4);

    function HistorySection(props) {
        _classCallCheck(this, HistorySection);

        return _possibleConstructorReturn(this, (HistorySection.__proto__ || Object.getPrototypeOf(HistorySection)).call(this, props));
    }

    _createClass(HistorySection, [{
        key: "render",
        value: function render() {}
    }]);

    return HistorySection;
}(_react.Component);

var HistoryRow = function (_Component5) {
    _inherits(HistoryRow, _Component5);

    function HistoryRow(props) {
        _classCallCheck(this, HistoryRow);

        return _possibleConstructorReturn(this, (HistoryRow.__proto__ || Object.getPrototypeOf(HistoryRow)).call(this, props));
    }

    _createClass(HistoryRow, [{
        key: "render",
        value: function render() {}
    }]);

    return HistoryRow;
}(_react.Component);

exports.default = ResidentAddressHistory;
//# sourceMappingURL=resident_address_history.js.map