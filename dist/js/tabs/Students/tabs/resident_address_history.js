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

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: import modals for editing and adding


function makeResidencyQuery(studentId) {
    return _graphql2.default.query("\n    {\n        student(id:" + studentId + ") {\n            residencies {\n                id\n                date_effective\n                contact_person_name\n                contact_person_number\n                address\n                residence\n            }\n        }\n\t}\n\t");
}

function studentIsFetched(student) {
    return student.residencies !== undefined;
}

var ResidentAddressHistory = function (_Component) {
    _inherits(ResidentAddressHistory, _Component);

    function ResidentAddressHistory(props) {
        _classCallCheck(this, ResidentAddressHistory);

        var _this = _possibleConstructorReturn(this, (ResidentAddressHistory.__proto__ || Object.getPrototypeOf(ResidentAddressHistory)).call(this, props));

        _this.state = {
            student: props.student,
            activeResidence: null,
            addResidenceIsShowing: false,
            editResidenceIsShowing: false,
            error: null
        };

        _this.fetchHistory = _this.fetchHistory.bind(_this);
        _this.setActiveResidence = _this.setActiveResidence.bind(_this);
        _this.toggleAddResidence = _this.toggleAddResidence.bind(_this);
        _this.toggleEditResidence = _this.toggleEditResidence.bind(_this);

        _this.fetchHistory(props.student.id);
        return _this;
    }

    _createClass(ResidentAddressHistory, [{
        key: "fetchHistory",
        value: function fetchHistory(studentId) {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeResidencyQuery(studentId).then(function (result) {
                //ID from when query was made must be the same ID now
                if (studentId !== _this2.props.student.id) {
                    return;
                }

                _this2.state.student.residencies = result.student.residencies;
                _this2.setState({
                    student: _this2.state.student
                });
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "toggleAddResidence",
        value: function toggleAddResidence() {
            this.setState({
                addResidenceIsShowing: !this.state.addResidenceIsShowing
            });
        }
    }, {
        key: "toggleEditResidence",
        value: function toggleEditResidence() {
            this.setState({
                editResidenceIsShowing: !this.state.editResidenceIsShowing
            });
        }
    }, {
        key: "setActiveResidence",
        value: function setActiveResidence(residence) {
            if (residence === null) {
                this.props.setSidebarContent(null);
            }

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.ResidenceSidebarPane, { toggleEditResidence: this.toggleEditResidence,
                residence: residence
            }));

            this.setState({
                activeResidence: residence
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            if (this.state.student !== null && this.state.student.id === props.student.id) {
                return;
            }

            // If new student, clear sidebar
            this.props.setSidebarContent(null);

            this.setState({
                student: props.student,
                activeResidence: null
            });

            if (!studentIsFetched(props.student)) {
                this.fetchHistory(props.student.id);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this3.fetchHistory(_this3.state.student.id);
                        } },
                    this.state.error.toString()
                );
            }

            if (!studentIsFetched(this.state.student)) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(HistoryHead, { student: this.state.student,
                    toggleAddResidence: this.toggleAddResidence }),
                _react2.default.createElement(HistoryBody, { residences: this.state.student.residencies,
                    activeResidence: this.state.activeResidence,
                    setActiveResidence: this.setActiveResidence }),
                _react2.default.createElement(_modals.ResidenceAddressFormModal, { edit: true,
                    key: this.state.activeResidence === null ? 0 : this.state.activeResidence.id,
                    isOpen: this.state.editResidenceIsShowing,
                    student: this.state.student,
                    residence: this.state.activeResidence,
                    refreshResidences: this.refreshResidences,
                    toggle: this.toggleEditResidence }),
                _react2.default.createElement(_modals.ResidenceAddressFormModal, { isOpen: this.state.addResidenceIsShowing,
                    student: this.state.student,
                    refreshResidences: this.refreshResidences,
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

                if (_this6.props.activeResidence !== null) {
                    isActive = _this6.props.activeResidence.id === residence.id;
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