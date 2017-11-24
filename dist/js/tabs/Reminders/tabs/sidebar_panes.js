"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemorandumsSidebarPane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

var _modals = require("../../Institutions/modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MemorandumsSidebarPane = function (_Component) {
    _inherits(MemorandumsSidebarPane, _Component);

    function MemorandumsSidebarPane(props) {
        _classCallCheck(this, MemorandumsSidebarPane);

        var _this = _possibleConstructorReturn(this, (MemorandumsSidebarPane.__proto__ || Object.getPrototypeOf(MemorandumsSidebarPane)).call(this, props));

        _this.state = {
            memorandum: props.memorandum,
            renewModalIsOpen: false
        };

        _this.toggleRenewModal = _this.toggleRenewModal.bind(_this);
        return _this;
    }

    _createClass(MemorandumsSidebarPane, [{
        key: "toggleRenewModal",
        value: function toggleRenewModal() {
            this.setState({
                renewModalIsOpen: !this.state.renewModalIsOpen
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                memorandum: props.memorandum
            });
        }
    }, {
        key: "render",
        value: function render() {
            var memorandum = this.state.memorandum;
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
                            "Memorandum"
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-body" },
                    _react2.default.createElement(MemorandumDetails, { memorandum: memorandum,
                        toggleRenewModal: this.toggleRenewModal }),
                    _react2.default.createElement(MemorandumLinkages, { linkages: memorandum.linkages }),
                    memorandum !== null && _react2.default.createElement(_modals.MemorandumFormModal, { edit: true,
                        isOpen: this.state.renewModalIsOpen,
                        memorandum: memorandum,
                        toggle: this.toggleRenewModal,
                        refresh: this.props.refresh })
                )
            );
        }
    }]);

    return MemorandumsSidebarPane;
}(_react.Component);

var MemorandumDetails = function (_Component2) {
    _inherits(MemorandumDetails, _Component2);

    function MemorandumDetails(props) {
        _classCallCheck(this, MemorandumDetails);

        return _possibleConstructorReturn(this, (MemorandumDetails.__proto__ || Object.getPrototypeOf(MemorandumDetails)).call(this, props));
    }

    _createClass(MemorandumDetails, [{
        key: "render",
        value: function render() {
            var memorandum = this.props.memorandum;

            var collegeInitiator = "None";

            if (memorandum.college_initiator !== null) {
                collegeInitiator = _settings2.default.colleges[memorandum.college_initiator];
            }

            function formatDate(date) {
                return (0, _moment2.default)(date).format("LL");
            }

            var viewMemorandum = function viewMemorandum() {
                var shell = require("electron").shell;
                shell.openExternal(memorandum.memorandum_file);
            };

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
                            "Memorandum Type"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            memorandum.category
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Date Effective"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            formatDate(memorandum.date_effective)
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Expiration Date"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            formatDate(memorandum.date_expiration)
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "College Initiator"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            null,
                            collegeInitiator
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
                                    className: "mr-2",
                                    onClick: viewMemorandum },
                                "View"
                            ),
                            _react2.default.createElement(
                                _reactstrap.Button,
                                { outline: true,
                                    color: "success",
                                    size: "sm",
                                    onClick: this.props.toggleRenewModal },
                                "Renew"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MemorandumDetails;
}(_react.Component);

var MemorandumLinkages = function (_Component3) {
    _inherits(MemorandumLinkages, _Component3);

    function MemorandumLinkages(props) {
        _classCallCheck(this, MemorandumLinkages);

        return _possibleConstructorReturn(this, (MemorandumLinkages.__proto__ || Object.getPrototypeOf(MemorandumLinkages)).call(this, props));
    }

    _createClass(MemorandumLinkages, [{
        key: "render",
        value: function render() {
            var body = _react2.default.createElement(
                "div",
                { className: "p-4 pt-5 pb-5 bg-light text-center" },
                _react2.default.createElement(
                    "h5",
                    { className: "text-secondary" },
                    "There are no linkages for this memorandum."
                )
            );

            var rows = this.props.linkages.map(function (linkage, index) {
                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: index },
                    _settings2.default.linkages[linkage]
                );
            });

            if (this.props.linkages.length > 0) {
                body = _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    rows
                );
            }

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Linkages"
                ),
                body
            );
        }
    }]);

    return MemorandumLinkages;
}(_react.Component);

exports.MemorandumsSidebarPane = MemorandumsSidebarPane;
//# sourceMappingURL=sidebar_panes.js.map