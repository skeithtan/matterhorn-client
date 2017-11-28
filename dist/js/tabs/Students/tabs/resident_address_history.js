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

var _sidebar_panes = require("./sidebar_panes");

var _modals = require("../modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: import modals for editing and adding


function fetchHistory(id, onResult) {
    _graphql2.default.query("\n    {\n        student(id:" + id + ") {\n            id\n            id_number\n            first_name\n            middle_name\n            family_name\n            residencies {\n                id\n                date_effective\n                contact_person_name\n                contact_person_number\n                address\n                residence\n            }\n        }\n\t}\n\t").then(onResult);
}

var ResidentAddressHistory = function (_Component) {
    _inherits(ResidentAddressHistory, _Component);

    function ResidentAddressHistory(props) {
        _classCallCheck(this, ResidentAddressHistory);

        var _this = _possibleConstructorReturn(this, (ResidentAddressHistory.__proto__ || Object.getPrototypeOf(ResidentAddressHistory)).call(this, props));

        _this.state = {
            student: props.student,
            studentId: props.student.id,
            residenceList: null,
            activeResidenceId: null,
            addResidenceIsShowing: false
        };

        fetchHistory(_this.state.studentId, function (result) {
            _this.setState({
                residenceList: result.student.residencies
            });
        });

        _this.toggleAddResidence = _this.toggleAddResidence.bind(_this);
        _this.setActiveResidence = _this.setActiveResidence.bind(_this);
        _this.refreshResidences = _this.refreshResidences.bind(_this);
        return _this;
    }

    _createClass(ResidentAddressHistory, [{
        key: "toggleAddResidence",
        value: function toggleAddResidence() {
            this.setState({
                addResidenceIsShowing: !this.state.addResidenceIsShowing
            });
        }
    }, {
        key: "setActiveResidence",
        value: function setActiveResidence(residence) {
            if (residence === null) {
                this.props.setSidebarContent(null);
            }

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.ResidenceSidebarPane, { residence: residence }));

            this.setState({
                activeResidenceId: residence.id
            });
        }
    }, {
        key: "refreshResidences",
        value: function refreshResidences() {
            var _this2 = this;

            fetchHistory(this.state.studentId, function (result) {
                _this2.setState({
                    residenceList: result.student.residencies
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            var _this3 = this;

            if (this.state.studentId === props.student.id) {
                return;
            }

            // If new student, clear sidebar
            this.props.setSidebarContent(null);

            this.setState({
                studentId: props.student.id,
                student: props.student,
                activeResidenceId: null,
                residenceList: null
            });

            fetchHistory(props.student.id, function (result) {
                _this3.setState({
                    residenceList: result.student.residencies
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.student === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(HistoryHead, { student: this.state.student,
                    toggleAddResidence: this.toggleAddResidence }),
                _react2.default.createElement(HistoryBody, { residences: this.state.residenceList,
                    activeResidenceId: this.state.activeResidenceId,
                    setActiveResidence: this.setActiveResidence }),
                _react2.default.createElement(_modals.ResidenceAddressFormModal, { isOpen: this.state.addResidenceIsShowing,
                    student: this.state.student,
                    toggle: this.toggleAddResidence })
            );
        }
    }]);

    return ResidentAddressHistory;
}(_react.Component);

var HistoryHead = function (_Component2) {
    _inherits(HistoryHead, _Component2);

    function HistoryHead(props) {
        _classCallCheck(this, HistoryHead);

        return _possibleConstructorReturn(this, (HistoryHead.__proto__ || Object.getPrototypeOf(HistoryHead)).call(this, props));
    }

    _createClass(HistoryHead, [{
        key: "render",
        value: function render() {
            var student = this.props.student;

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
                        student.first_name,
                        " ",
                        student.middle_name,
                        " ",
                        student.family_name,
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted ml-2" },
                            this.props.student.id_number
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            size: "sm",
                            color: "success",
                            onClick: this.props.toggleAddResidence },
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

        var _this5 = _possibleConstructorReturn(this, (HistoryBody.__proto__ || Object.getPrototypeOf(HistoryBody)).call(this, props));

        _this5.emptyState = _this5.emptyState.bind(_this5);
        return _this5;
    }

    _createClass(HistoryBody, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "There are no residences for this student"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            if (this.props.residences === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.residences.length === 0) {
                return this.emptyState();
            }

            var sections = this.props.residences.map(function (residence, index) {
                var onResidenceRowClick = function onResidenceRowClick() {
                    return _this6.props.setActiveResidence(residence);
                };

                var isActive = false;

                if (_this6.props.activeResidenceId !== null) {
                    isActive = _this6.props.activeResidenceId === residence.id;
                }

                return _react2.default.createElement(ResidenceRow, { key: index,
                    residence: residence,
                    isActive: isActive,
                    onClick: onResidenceRowClick,
                    latest: index === 0 });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body w-100" },
                _react2.default.createElement(
                    "div",
                    { className: "d-flex h-100 p-0 flex-row" },
                    _react2.default.createElement(
                        "div",
                        { className: "w-100" },
                        _react2.default.createElement(
                            _section.SectionTable,
                            null,
                            sections
                        )
                    )
                )
            );
        }
    }]);

    return HistoryBody;
}(_react.Component);

var ResidenceRow = function (_Component4) {
    _inherits(ResidenceRow, _Component4);

    function ResidenceRow(props) {
        _classCallCheck(this, ResidenceRow);

        return _possibleConstructorReturn(this, (ResidenceRow.__proto__ || Object.getPrototypeOf(ResidenceRow)).call(this, props));
    }

    _createClass(ResidenceRow, [{
        key: "render",
        value: function render() {
            var residence = this.props.residence;

            function formatDate(date) {
                return (0, _moment2.default)(date).format("LL");
            }

            var dateEffective = formatDate(residence.date_effective);

            return _react2.default.createElement(
                _section.Section,
                null,
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    dateEffective
                ),
                _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true,
                        onClick: this.props.onClick,
                        active: this.props.isActive },
                    this.props.latest && _react2.default.createElement(
                        _section.SectionRowTitle,
                        null,
                        "Latest Residence"
                    ),
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        residence.address
                    )
                )
            );
        }
    }]);

    return ResidenceRow;
}(_react.Component);

exports.default = ResidentAddressHistory;
//# sourceMappingURL=resident_address_history.js.map