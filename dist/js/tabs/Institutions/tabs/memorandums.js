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

var _loading = require("../../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

var _modals = require("../modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitution(id, onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            institution(id: " + id + ") {\n                id\n                name\n                memorandum_set {\n                    id\n                    category\n                    memorandum_file\n                    date_effective\n                    date_expiration\n                    college_initiator\n                    linkages {\n                        code\n                    }\n                }\n            }\n        }\n       ",
        onResponse: onResponse
    });
}

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            institution: null,
            institutionID: props.institution.id
        };

        _this.refreshMemorandums = _this.refreshMemorandums.bind(_this);

        //Fetch active institution details
        fetchInstitution(props.institution.id, function (response) {
            _this.setState({
                institution: response.data.institution
            });
        });
        return _this;
    }

    _createClass(Memorandums, [{
        key: "refreshMemorandums",
        value: function refreshMemorandums() {
            var _this2 = this;

            this.setState({
                institution: null
            });

            fetchInstitution(this.props.institution.id, function (response) {
                _this2.setState({
                    institution: response.data.institution
                });
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            this.setState({
                institutionID: nextProps.institution.id,
                institution: null
            });

            fetchInstitution(nextProps.institution.id, function (response) {
                _this3.setState({
                    institution: response.data.institution
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.institution === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { id: "institution-memorandums", className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(MemorandumHead, { institution: this.state.institution, refreshMemorandums: this.refreshMemorandums }),
                _react2.default.createElement(MemorandumBody, { institution: this.state.institution,
                    memorandums: this.state.institution.memorandum_set,
                    refreshMemorandums: this.refreshMemorandums })
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumHead = function (_Component2) {
    _inherits(MemorandumHead, _Component2);

    function MemorandumHead(props) {
        _classCallCheck(this, MemorandumHead);

        var _this4 = _possibleConstructorReturn(this, (MemorandumHead.__proto__ || Object.getPrototypeOf(MemorandumHead)).call(this, props));

        _this4.state = {
            addMemorandumIsShowing: false
        };

        _this4.toggleAddMemorandum = _this4.toggleAddMemorandum.bind(_this4);
        return _this4;
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
                    refresh: this.props.refreshMemorandums })
            );
        }
    }]);

    return MemorandumHead;
}(_react.Component);

var MemorandumBody = function (_Component3) {
    _inherits(MemorandumBody, _Component3);

    function MemorandumBody(props) {
        _classCallCheck(this, MemorandumBody);

        //Sort by most recent
        var _this5 = _possibleConstructorReturn(this, (MemorandumBody.__proto__ || Object.getPrototypeOf(MemorandumBody)).call(this, props));

        props.memorandums.sort(function (a, b) {
            var aTime = (0, _moment2.default)(a.date_effective);
            var bTime = (0, _moment2.default)(b.date_effective);

            if (aTime.isBefore(bTime)) {
                return 1;
            }

            if (aTime.isAfter(bTime)) {
                return -1;
            }

            return 0;
        });

        var agreements = [];
        var understandings = [];

        //Categorize
        props.memorandums.forEach(function (memorandum) {
            switch (memorandum.category) {
                case "MOA":
                    agreements.push(memorandum);
                    return;
                case "MOU":
                    understandings.push(memorandum);
                    return;
                default:
                    return;
            }
        });

        _this5.state = {
            activeMemorandum: null,
            showing: null,
            agreements: agreements,
            understandings: understandings
        };

        _this5.setActiveMemorandum = _this5.setActiveMemorandum.bind(_this5);
        return _this5;
    }

    _createClass(MemorandumBody, [{
        key: "setActiveMemorandum",
        value: function setActiveMemorandum(memorandum) {
            this.setState({
                activeMemorandum: memorandum
            });
        }
    }, {
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
                                activeMemorandum: this.state.activeMemorandum,
                                memorandums: this.state.agreements,
                                setActiveMemorandum: this.setActiveMemorandum,
                                refreshMemorandums: this.props.refreshMemorandums },
                            "MOA (Memorandums of Agreement)"
                        ),
                        _react2.default.createElement(
                            MemorandumListSection,
                            { institution: this.props.institution,
                                memorandums: this.state.understandings,
                                activeMemorandum: this.state.activeMemorandum,
                                setActiveMemorandum: this.setActiveMemorandum,
                                refreshMemorandums: this.props.refreshMemorandums },
                            "MOU (Memorandums of Understanding)"
                        )
                    ),
                    this.state.activeMemorandum !== null && _react2.default.createElement(MemorandumDetailPane, { activeMemorandum: this.state.activeMemorandum,
                        institution: this.props.institution,
                        refreshMemorandums: this.props.refreshMemorandums })
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

        var _this6 = _possibleConstructorReturn(this, (MemorandumListSection.__proto__ || Object.getPrototypeOf(MemorandumListSection)).call(this, props));

        _this6.state = {
            deleteMemorandumIsShowing: false,
            editMemorandumIsShowing: false
        };

        _this6.emptyState = _this6.emptyState.bind(_this6);
        _this6.toggleDeleteMemorandum = _this6.toggleDeleteMemorandum.bind(_this6);
        _this6.toggleEditMemorandum = _this6.toggleEditMemorandum.bind(_this6);
        return _this6;
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
            var _this7 = this;

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
                    return _this7.props.setActiveMemorandum(memorandum);
                };

                var isActive = false;

                if (_this7.props.activeMemorandum !== null) {
                    isActive = _this7.props.activeMemorandum.id === memorandum.id;
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
                        _react2.default.createElement(
                            _reactstrap.ListGroup,
                            null,
                            rows
                        )
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
                { onClick: this.props.onClick,
                    active: this.props.isActive },
                "Effective ",
                dateEffective
            );
        }
    }]);

    return MemorandumRow;
}(_react.Component);

var MemorandumDetailPane = function (_Component6) {
    _inherits(MemorandumDetailPane, _Component6);

    function MemorandumDetailPane(props) {
        _classCallCheck(this, MemorandumDetailPane);

        var _this9 = _possibleConstructorReturn(this, (MemorandumDetailPane.__proto__ || Object.getPrototypeOf(MemorandumDetailPane)).call(this, props));

        _this9.state = {
            deleteMemorandumIsShowing: false,
            editMemorandumIsShowing: false
        };

        _this9.toggleDeleteMemorandum = _this9.toggleDeleteMemorandum.bind(_this9);
        _this9.toggleEditMemorandum = _this9.toggleEditMemorandum.bind(_this9);
        return _this9;
    }

    _createClass(MemorandumDetailPane, [{
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
        key: "render",
        value: function render() {
            var memorandum = this.props.activeMemorandum;
            return _react2.default.createElement(
                "div",
                { id: "memorandum-detail", className: "p-0 h-100 page-body justify-content-center" },
                _react2.default.createElement(MemorandumDetails, { memorandum: memorandum,
                    toggleDeleteMemorandum: this.toggleDeleteMemorandum,
                    toggleEditMemorandum: this.toggleEditMemorandum }),
                _react2.default.createElement(MemorandumLinkages, { linkages: memorandum.linkages }),
                this.state.activeMemorandum !== null && _react2.default.createElement(_modals.DeleteMemorandumModal, { isOpen: this.state.deleteMemorandumIsShowing,
                    institution: this.props.institution,
                    memorandum: memorandum,
                    toggle: this.toggleDeleteMemorandum,
                    refresh: this.props.refreshMemorandums }),
                this.state.activeMemorandum !== null && _react2.default.createElement(_modals.MemorandumFormModal, { edit: true,
                    isOpen: this.state.editMemorandumIsShowing,
                    institution: this.props.institution,
                    memorandum: memorandum,
                    toggle: this.toggleEditMemorandum,
                    refresh: this.props.refreshMemorandums })
            );
        }
    }]);

    return MemorandumDetailPane;
}(_react.Component);

var MemorandumDetails = function (_Component7) {
    _inherits(MemorandumDetails, _Component7);

    function MemorandumDetails(props) {
        _classCallCheck(this, MemorandumDetails);

        return _possibleConstructorReturn(this, (MemorandumDetails.__proto__ || Object.getPrototypeOf(MemorandumDetails)).call(this, props));
    }

    _createClass(MemorandumDetails, [{
        key: "render",
        value: function render() {
            function formatDate(date) {
                return (0, _moment2.default)(date).format("LL");
            }

            var dateEffective = formatDate(this.props.memorandum.date_effective);
            var type = this.props.memorandum.category === "MOA" ? "Agreement" : "Understanding";
            var expiryDate = this.props.memorandum.date_expiration === null ? "None" : formatDate(this.props.memorandum.date_expiration);
            var college = this.props.memorandum.college_initiator === null ? "None" : this.props.memorandum.college_initiator;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "h6",
                    { className: "text-center mt-5" },
                    "Effective ",
                    dateEffective
                ),
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row justify-content-center mt-3" },
                    _react2.default.createElement(
                        "div",
                        { className: "text-right d-flex flex-column mr-3" },
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted" },
                            "Memorandum Type"
                        ),
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted" },
                            "Expiration Date"
                        ),
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted" },
                            "College Initiator"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "d-flex flex-column" },
                        _react2.default.createElement(
                            "small",
                            null,
                            type
                        ),
                        _react2.default.createElement(
                            "small",
                            null,
                            expiryDate
                        ),
                        _react2.default.createElement(
                            "small",
                            null,
                            college
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "d-flex flex-row justify-content-center mt-3" },
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "mr-2" },
                        "View"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "success", size: "sm", className: "mr-2",
                            onClick: this.props.toggleEditMemorandum },
                        "Edit"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, color: "danger", size: "sm",
                            onClick: this.props.toggleDeleteMemorandum },
                        "Delete"
                    )
                )
            );
        }
    }]);

    return MemorandumDetails;
}(_react.Component);

var MemorandumLinkages = function (_Component8) {
    _inherits(MemorandumLinkages, _Component8);

    function MemorandumLinkages(props) {
        _classCallCheck(this, MemorandumLinkages);

        return _possibleConstructorReturn(this, (MemorandumLinkages.__proto__ || Object.getPrototypeOf(MemorandumLinkages)).call(this, props));
    }

    _createClass(MemorandumLinkages, [{
        key: "render",
        value: function render() {
            if (this.props.linkages.length === 0) {
                return _react2.default.createElement(
                    "div",
                    { className: "p-5 mt-3 text-center" },
                    _react2.default.createElement(
                        "h5",
                        { className: "text-secondary" },
                        "There are no linkages for this institution"
                    )
                );
            }

            var rows = this.props.linkages.map(function (linkage, index) {
                return _react2.default.createElement(
                    _section.SectionRow,
                    { key: inde },
                    _settings2.default.linkages[linkage.code]
                );
            });

            console.log(this.props.linkages);
            return _react2.default.createElement(
                "div",
                { id: "memorandum-linkages" },
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    "Linkages"
                ),
                _react2.default.createElement(
                    _reactstrap.ListGroup,
                    null,
                    rows
                )
            );
        }
    }]);

    return MemorandumLinkages;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map