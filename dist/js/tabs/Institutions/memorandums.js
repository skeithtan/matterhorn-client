"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        //Parse dates
        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        props.memorandums.forEach(function (memorandum) {
            memorandum.versionDate = (0, _moment2.default)(memorandum.versionDate);
            memorandum.dateEffective = (0, _moment2.default)(memorandum.dateEffective);
            memorandum.dateExpiration = (0, _moment2.default)(memorandum.dateExpiration);
        });

        //Sort by most recent
        props.memorandums.sort(function (a, b) {
            var aTime = a.versionDate;
            var bTime = b.versionDate;

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

        _this.state = {
            showing: null,
            agreements: agreements,
            understandings: understandings
        };

        _this.onAgreementClick = _this.onAgreementClick.bind(_this);
        _this.onUnderstandingClick = _this.onUnderstandingClick.bind(_this);
        return _this;
    }

    _createClass(Memorandums, [{
        key: "onUnderstandingClick",
        value: function onUnderstandingClick() {
            var newShowing = this.state.showing === "MOU" ? null : "MOU";

            this.setState({
                showing: newShowing
            });
        }
    }, {
        key: "onAgreementClick",
        value: function onAgreementClick() {
            var newShowing = this.state.showing === "MOA" ? null : "MOA";

            this.setState({
                showing: newShowing
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "mb-4" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Memorandums"
                ),
                _react2.default.createElement(
                    "div",
                    { id: "memorandums-accordion" },
                    _react2.default.createElement(MemorandumsOfUnderstanding, { showing: this.state.showing === "MOU",
                        memorandums: this.state.understandings,
                        toggle: this.onUnderstandingClick }),
                    _react2.default.createElement(MemorandumsOfAgreement, { showing: this.state.showing === "MOA",
                        memorandums: this.state.agreements,
                        toggle: this.onAgreementClick })
                ),
                _react2.default.createElement(
                    "small",
                    { className: "section-footer" },
                    "Select a memorandum type to reveal details."
                )
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumsOfUnderstanding = function (_Component2) {
    _inherits(MemorandumsOfUnderstanding, _Component2);

    function MemorandumsOfUnderstanding(props) {
        _classCallCheck(this, MemorandumsOfUnderstanding);

        var _this2 = _possibleConstructorReturn(this, (MemorandumsOfUnderstanding.__proto__ || Object.getPrototypeOf(MemorandumsOfUnderstanding)).call(this, props));

        _this2.state = {
            latestMemorandum: null,
            previousMemorandums: [],
            showingMemorandumId: null
        };

        if (props.memorandums.length > 0) {
            // This is sorted by date so latest version is the one on top
            _this2.state.latestMemorandum = props.memorandums[0];
            _this2.state.previousMemorandums = props.memorandums.splice(1); //Everything else
        }

        _this2.emptyState = _this2.emptyState.bind(_this2);
        _this2.getCollapseContent = _this2.getCollapseContent.bind(_this2);
        _this2.memorandumIsShowing = _this2.memorandumIsShowing.bind(_this2);
        _this2.makeMemorandumShowing = _this2.makeMemorandumShowing.bind(_this2);
        return _this2;
    }

    _createClass(MemorandumsOfUnderstanding, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "p-5 text-center text-muted" },
                _react2.default.createElement(
                    "h5",
                    { className: "mb-0" },
                    "There are no Memorandums of Understanding for this institution."
                )
            );
        }
    }, {
        key: "makeMemorandumShowing",
        value: function makeMemorandumShowing(memorandum) {
            // If there are no showing memorandums or if the memorandum showing is not the one clicked
            if (this.state.showingMemorandumId === null || this.state.showingMemorandumId !== memorandum.id) {
                this.setState({
                    showingMemorandumId: memorandum.id
                });
            } else {
                // If the showing memorandum is clicked, collapse it
                this.setState({
                    showingMemorandumId: null
                });
            }
        }
    }, {
        key: "memorandumIsShowing",
        value: function memorandumIsShowing(memorandum) {
            if (this.state.showingMemorandumId === null) {
                return false;
            }

            return this.state.showingMemorandumId === memorandum.id;
        }
    }, {
        key: "getCollapseContent",
        value: function getCollapseContent() {
            var _this3 = this;

            if (this.state.latestMemorandum === null) {
                return this.emptyState();
            }

            var previousMemorandums = this.state.previousMemorandums.map(function (memorandum) {
                return _react2.default.createElement(MemorandumRow, { memorandum: memorandum, isOpen: _this3.memorandumIsShowing(memorandum),
                    toggle: function toggle() {
                        return _this3.makeMemorandumShowing(memorandum);
                    } });
            });

            var hasPreviousMemorandums = previousMemorandums.length !== 0;

            return _react2.default.createElement(
                _reactstrap.CardBody,
                { className: "pt-0" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Latest Memorandum"
                ),
                _react2.default.createElement(MemorandumRow, { memorandum: this.state.latestMemorandum,
                    isOpen: this.memorandumIsShowing(this.state.latestMemorandum),
                    toggle: function toggle() {
                        return _this3.makeMemorandumShowing(_this3.state.latestMemorandum);
                    } }),
                hasPreviousMemorandums && _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Previous Memorandums"
                ),
                previousMemorandums
            );
        }
    }, {
        key: "render",
        value: function render() {
            var cardHeaderClass = "d-flex flex-row align-items-center ";

            if (!this.props.showing) {
                cardHeaderClass += "collapsed";
            }

            return _react2.default.createElement(
                _reactstrap.Card,
                null,
                _react2.default.createElement(
                    _reactstrap.CardHeader,
                    { className: cardHeaderClass, onClick: this.props.toggle },
                    _react2.default.createElement(
                        "h5",
                        { className: "mr-auto mb-0" },
                        "Memorandums of Understanding"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "add-memorandum-btn" },
                        "Add a new version"
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Collapse,
                    { isOpen: this.props.showing },
                    this.getCollapseContent()
                )
            );
        }
    }]);

    return MemorandumsOfUnderstanding;
}(_react.Component);

var MemorandumsOfAgreement = function (_Component3) {
    _inherits(MemorandumsOfAgreement, _Component3);

    function MemorandumsOfAgreement(props) {
        _classCallCheck(this, MemorandumsOfAgreement);

        var _this4 = _possibleConstructorReturn(this, (MemorandumsOfAgreement.__proto__ || Object.getPrototypeOf(MemorandumsOfAgreement)).call(this, props));

        _this4.state = {
            latestMemorandum: null,
            previousMemorandums: [],
            showingMemorandumId: null
        };

        if (props.memorandums.length > 0) {
            // This is sorted by date so latest version is the one on top
            _this4.state.latestMemorandum = props.memorandums[0];
            _this4.state.previousMemorandums = props.memorandums.splice(1); //Everything else
        }

        _this4.emptyState = _this4.emptyState.bind(_this4);
        _this4.getCollapseContent = _this4.getCollapseContent.bind(_this4);
        _this4.memorandumIsShowing = _this4.memorandumIsShowing.bind(_this4);
        _this4.makeMemorandumShowing = _this4.makeMemorandumShowing.bind(_this4);
        return _this4;
    }

    _createClass(MemorandumsOfAgreement, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "p-5 text-center text-muted" },
                _react2.default.createElement(
                    "h5",
                    { className: "mb-0" },
                    "There are no Memorandums of Agreement for this institution."
                )
            );
        }
    }, {
        key: "makeMemorandumShowing",
        value: function makeMemorandumShowing(memorandum) {
            // If there are no showing memorandums or if the memorandum showing is not the one clicked
            if (this.state.showingMemorandumId === null || this.state.showingMemorandumId !== memorandum.id) {
                this.setState({
                    showingMemorandumId: memorandum.id
                });
            } else {
                // If the showing memorandum is clicked, collapse it
                this.setState({
                    showingMemorandumId: null
                });
            }
        }
    }, {
        key: "memorandumIsShowing",
        value: function memorandumIsShowing(memorandum) {
            if (this.state.showingMemorandumId === null) {
                return false;
            }

            return this.state.showingMemorandumId === memorandum.id;
        }
    }, {
        key: "getCollapseContent",
        value: function getCollapseContent() {
            var _this5 = this;

            if (this.state.latestMemorandum === null) {
                return this.emptyState();
            }

            var previousMemorandums = this.state.previousMemorandums.map(function (memorandum) {
                return _react2.default.createElement(MemorandumRow, { memorandum: memorandum, isOpen: _this5.memorandumIsShowing(memorandum),
                    toggle: function toggle() {
                        return _this5.makeMemorandumShowing(memorandum);
                    } });
            });

            var hasPreviousMemorandums = previousMemorandums.length !== 0;

            return _react2.default.createElement(
                _reactstrap.CardBody,
                { className: "pt-0" },
                _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Latest Memorandum"
                ),
                _react2.default.createElement(MemorandumRow, { memorandum: this.state.latestMemorandum,
                    isOpen: this.memorandumIsShowing(this.state.latestMemorandum),
                    toggle: function toggle() {
                        return _this5.makeMemorandumShowing(_this5.state.latestMemorandum);
                    } }),
                hasPreviousMemorandums && _react2.default.createElement(
                    "small",
                    { className: "section-title" },
                    "Previous Memorandums"
                ),
                previousMemorandums
            );
        }
    }, {
        key: "render",
        value: function render() {
            var cardHeaderClass = "d-flex flex-row align-items-center ";

            if (!this.props.showing) {
                cardHeaderClass += "collapsed";
            }

            this.getCollapseContent();

            return _react2.default.createElement(
                _reactstrap.Card,
                null,
                _react2.default.createElement(
                    _reactstrap.CardHeader,
                    { className: cardHeaderClass, onClick: this.props.toggle },
                    _react2.default.createElement(
                        "h5",
                        { className: "mr-auto mb-0" },
                        "Memorandums of Agreement"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "add-memorandum-btn" },
                        "Add a new version"
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Collapse,
                    { isOpen: this.props.showing },
                    this.getCollapseContent()
                )
            );
        }
    }]);

    return MemorandumsOfAgreement;
}(_react.Component);

var MemorandumRow = function (_Component4) {
    _inherits(MemorandumRow, _Component4);

    function MemorandumRow(props) {
        _classCallCheck(this, MemorandumRow);

        return _possibleConstructorReturn(this, (MemorandumRow.__proto__ || Object.getPrototypeOf(MemorandumRow)).call(this, props));
    }

    _createClass(MemorandumRow, [{
        key: "render",
        value: function render() {
            console.log(this.props);
            var cardHeaderClass = this.props.showing ? "" : "collapsed";
            var memorandum = this.props.memorandum;

            function formatDate(date) {
                return date.format("LL");
            }

            var versionDate = formatDate(memorandum.versionDate);
            var dateEffective = formatDate(memorandum.dateEffective);
            var dateExpiration = memorandum.dateExpiration === null ? "No expiration" : formatDate(memorandum.dateExpiration);
            var collegeInitiator = memorandum.collegeInitiator === null ? "No college initiator" : memorandum.collegeInitiator;

            return _react2.default.createElement(
                _reactstrap.Card,
                null,
                _react2.default.createElement(
                    _reactstrap.CardHeader,
                    { className: cardHeaderClass, onClick: this.props.toggle },
                    "Version ",
                    versionDate
                ),
                _react2.default.createElement(
                    _reactstrap.Collapse,
                    { isOpen: this.props.isOpen },
                    _react2.default.createElement(
                        _reactstrap.CardBody,
                        { className: "p-0" },
                        _react2.default.createElement(
                            _reactstrap.ListGroup,
                            null,
                            _react2.default.createElement(MemorandumDetailRow, { fieldName: "Date Effective",
                                fieldValue: dateEffective }),
                            _react2.default.createElement(MemorandumDetailRow, { fieldName: "Date Expiration",
                                fieldValue: dateExpiration }),
                            _react2.default.createElement(MemorandumDetailRow, { fieldName: "College Initiator",
                                fieldValue: collegeInitiator }),
                            _react2.default.createElement(
                                _reactstrap.ListGroupItem,
                                null,
                                _react2.default.createElement(
                                    _reactstrap.Button,
                                    { outline: true, color: "primary" },
                                    "Open Memorandum Copy"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MemorandumRow;
}(_react.Component);

var MemorandumDetailRow = function (_Component5) {
    _inherits(MemorandumDetailRow, _Component5);

    function MemorandumDetailRow(props) {
        _classCallCheck(this, MemorandumDetailRow);

        return _possibleConstructorReturn(this, (MemorandumDetailRow.__proto__ || Object.getPrototypeOf(MemorandumDetailRow)).call(this, props));
    }

    _createClass(MemorandumDetailRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.ListGroupItem,
                null,
                _react2.default.createElement(
                    "small",
                    { className: "font-weight-bold" },
                    this.props.fieldName
                ),
                _react2.default.createElement(
                    "p",
                    { className: "mb-0" },
                    this.props.fieldValue
                )
            );
        }
    }]);

    return MemorandumDetailRow;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map