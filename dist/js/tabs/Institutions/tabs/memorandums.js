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

var _modals = require("../modals");

var _sidebar_panes = require("./sidebar_panes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitution(id, onResult) {
    _graphql2.default.query("\n    {\n      institution(id:" + id + ") {\n        id\n        name\n        moas {\n          id\n          category\n          memorandum_file\n          date_effective\n          date_expiration\n          college_initiator\n          linkages\n        }\n        mous {\n          id\n          category\n          memorandum_file\n          date_effective\n          date_expiration\n          college_initiator\n          linkages\n        }\n        \n      }\n    }\n    ").then(onResult);
}

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            institution: null,
            institutionID: props.institution.id,
            activeMemorandumId: null
        };

        _this.refreshMemorandums = _this.refreshMemorandums.bind(_this);
        _this.setActiveMemorandum = _this.setActiveMemorandum.bind(_this);

        //Fetch active institution details
        fetchInstitution(_this.props.institution.id, function (result) {
            _this.setState({
                institution: result.institution
            });
        });
        return _this;
    }

    _createClass(Memorandums, [{
        key: "setActiveMemorandum",
        value: function setActiveMemorandum(memorandum) {
            var _this2 = this;

            if (memorandum === null) {
                this.props.setSidebarContent(null);
            }

            var onDeleteMemorandum = function onDeleteMemorandum() {
                _this2.setState({
                    activeMemorandumId: null
                });
                _this2.refreshMemorandums();
                _this2.props.setSidebarContent(null);
            };

            this.props.setSidebarContent(_react2.default.createElement(_sidebar_panes.MemorandumSidebarPane, { memorandum: memorandum,
                removeActiveMemorandum: onDeleteMemorandum,
                refreshMemorandums: this.refreshMemorandums }));

            this.setState({
                activeMemorandumId: memorandum.id
            });
        }
    }, {
        key: "refreshMemorandums",
        value: function refreshMemorandums() {
            var _this3 = this;

            this.setState({
                institution: null
            });

            fetchInstitution(this.props.institution.id, function (result) {
                _this3.setState({
                    institution: result.institution
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this4 = this;

            if (this.state.institutionID === nextProps.institution.id) {
                return;
            }

            this.props.setSidebarContent(null);

            this.setState({
                institutionID: nextProps.institution.id,
                institution: null,
                activeMemorandumId: null //Remove current active memorandum ID
            });

            fetchInstitution(nextProps.institution.id, function (result) {
                _this4.setState({
                    institution: result.institution
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.institution === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            var memorandums = {
                agreements: this.state.institution.moas,
                understandings: this.state.institution.mous,
                latestMOU: this.state.institution.latest_mou,
                latestMOA: this.state.institution.latest_moa
            };

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(MemorandumHead, { institution: this.state.institution,
                    refreshMemorandums: this.refreshMemorandums,
                    memorandumToBeAdded: this.props.memorandumToBeAdded,
                    toggleMemorandumToBeAdded: this.props.toggleMemorandumToBeAdded }),
                _react2.default.createElement(MemorandumBody, { institution: this.state.institution,
                    memorandums: memorandums,
                    activeMemorandumId: this.state.activeMemorandumId,
                    setActiveMemorandum: this.setActiveMemorandum,
                    refreshMemorandums: this.refreshMemorandums,
                    setSidebarContent: this.props.setSidebarContent })
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumHead = function (_Component2) {
    _inherits(MemorandumHead, _Component2);

    function MemorandumHead(props) {
        _classCallCheck(this, MemorandumHead);

        var _this5 = _possibleConstructorReturn(this, (MemorandumHead.__proto__ || Object.getPrototypeOf(MemorandumHead)).call(this, props));

        _this5.state = {
            addMemorandumIsShowing: _this5.props.memorandumToBeAdded
        };

        _this5.toggleAddMemorandum = _this5.toggleAddMemorandum.bind(_this5);
        return _this5;
    }

    _createClass(MemorandumHead, [{
        key: "toggleAddMemorandum",
        value: function toggleAddMemorandum() {
            this.setState({
                addMemorandumIsShowing: !this.state.addMemorandumIsShowing
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
                        "Memorandums"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title mb-0" },
                        this.props.institution.name
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "page-head-actions" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", onClick: this.toggleAddMemorandum },
                        "Add a Memorandum"
                    )
                ),
                _react2.default.createElement(_modals.MemorandumFormModal, { isOpen: this.state.addMemorandumIsShowing,
                    institution: this.props.institution,
                    toggle: this.toggleAddMemorandum,
                    refresh: this.props.refreshMemorandums,
                    memorandumToBeAdded: this.props.memorandumToBeAdded,
                    toggleMemorandumToBeAdded: this.props.toggleMemorandumToBeAdded })
            );
        }
    }]);

    return MemorandumHead;
}(_react.Component);

var MemorandumBody = function (_Component3) {
    _inherits(MemorandumBody, _Component3);

    function MemorandumBody(props) {
        _classCallCheck(this, MemorandumBody);

        return _possibleConstructorReturn(this, (MemorandumBody.__proto__ || Object.getPrototypeOf(MemorandumBody)).call(this, props));
    }

    _createClass(MemorandumBody, [{
        key: "render",
        value: function render() {
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
                            MemorandumListSection,
                            { institution: this.props.institution,
                                activeMemorandumId: this.props.activeMemorandumId,
                                memorandums: this.props.memorandums.agreements,
                                latest: this.props.memorandums.latestMOA,
                                setActiveMemorandum: this.props.setActiveMemorandum,
                                refreshMemorandums: this.props.refreshMemorandums },
                            "MOA (Memorandums of Agreement)"
                        ),
                        _react2.default.createElement(
                            MemorandumListSection,
                            { institution: this.props.institution,
                                memorandums: this.props.memorandums.understandings,
                                latest: this.props.memorandums.latestMOU,
                                activeMemorandumId: this.props.activeMemorandumId,
                                setActiveMemorandum: this.props.setActiveMemorandum,
                                refreshMemorandums: this.props.refreshMemorandums },
                            "MOU (Memorandums of Understanding)"
                        )
                    )
                )
            );
        }
    }]);

    return MemorandumBody;
}(_react.Component);

var MemorandumListSection = function (_Component4) {
    _inherits(MemorandumListSection, _Component4);

    function MemorandumListSection(props) {
        _classCallCheck(this, MemorandumListSection);

        var _this7 = _possibleConstructorReturn(this, (MemorandumListSection.__proto__ || Object.getPrototypeOf(MemorandumListSection)).call(this, props));

        _this7.state = {
            deleteMemorandumIsShowing: false,
            editMemorandumIsShowing: false
        };

        _this7.emptyState = _this7.emptyState.bind(_this7);
        _this7.toggleDeleteMemorandum = _this7.toggleDeleteMemorandum.bind(_this7);
        _this7.toggleEditMemorandum = _this7.toggleEditMemorandum.bind(_this7);
        return _this7;
    }

    _createClass(MemorandumListSection, [{
        key: "toggleDeleteMemorandum",
        value: function toggleDeleteMemorandum() {
            this.setState({
                deleteMemorandumIsShowing: !this.state.deleteMemorandumIsShowing
            });
        }
    }, {
        key: "toggleEditMemorandum",
        value: function toggleEditMemorandum() {
            this.setState({
                editMemorandumIsShowing: !this.state.editMemorandumIsShowing
            });
        }
    }, {
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "p-5 text-center bg-light" },
                _react2.default.createElement(
                    "h5",
                    { className: "text-secondary" },
                    "There are no ",
                    this.props.children,
                    " for this institution"
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            if (this.props.memorandums.length === 0) {
                return _react2.default.createElement(
                    _section.Section,
                    null,
                    _react2.default.createElement(
                        _section.SectionTitle,
                        null,
                        this.props.children
                    ),
                    this.emptyState()
                );
            }

            var rows = this.props.memorandums.map(function (memorandum, index) {
                var onMemorandumRowClick = function onMemorandumRowClick() {
                    return _this8.props.setActiveMemorandum(memorandum);
                };

                var isActive = false;

                if (_this8.props.activeMemorandumId !== null) {
                    isActive = _this8.props.activeMemorandumId === memorandum.id;
                }

                return _react2.default.createElement(MemorandumRow, { memorandum: memorandum,
                    isActive: isActive,
                    onClick: onMemorandumRowClick,
                    latest: index === 0,
                    key: memorandum.id });
            });

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _section.Section,
                    null,
                    _react2.default.createElement(
                        _section.SectionTitle,
                        null,
                        this.props.children
                    ),
                    _react2.default.createElement(
                        _section.SectionTable,
                        { className: "memorandums-accordion" },
                        rows
                    )
                )
            );
        }
    }]);

    return MemorandumListSection;
}(_react.Component);

var MemorandumRow = function (_Component5) {
    _inherits(MemorandumRow, _Component5);

    function MemorandumRow(props) {
        _classCallCheck(this, MemorandumRow);

        return _possibleConstructorReturn(this, (MemorandumRow.__proto__ || Object.getPrototypeOf(MemorandumRow)).call(this, props));
    }

    _createClass(MemorandumRow, [{
        key: "render",
        value: function render() {
            var memorandum = this.props.memorandum;

            function formatDate(date) {
                return (0, _moment2.default)(date).format("LL");
            }

            var dateEffective = formatDate(memorandum.date_effective);
            return _react2.default.createElement(
                _section.SectionRow,
                { selectable: true,
                    onClick: this.props.onClick,
                    active: this.props.isActive },
                this.props.latest && _react2.default.createElement(
                    _section.SectionRowTitle,
                    null,
                    "Latest Memorandum"
                ),
                _react2.default.createElement(
                    _section.SectionRowContent,
                    { large: true },
                    "Effective ",
                    dateEffective
                )
            );
        }
    }]);

    return MemorandumRow;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map