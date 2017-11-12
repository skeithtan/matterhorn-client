"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _scrollIntoView = require("scroll-into-view");

var _scrollIntoView2 = _interopRequireDefault(_scrollIntoView);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _section = require("../../../components/section");

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitutions(onResult) {
    _graphql2.default.query("\n    {\n      institutions {\n        id\n        name\n            latest_mou {\n                id\n                date_expiration\n            }\n            latest_moa {\n                id\n                date_expiration\n            }\n      }\n    }\n    ").then(onResult);
}

function fetchMemorandumDetails(id, onResult) {
    _graphql2.default.query("\n    {\n      memorandum(id: " + id + ") {\n        id\n        category\n        memorandum_file\n        date_effective\n        date_expiration\n        college_initiator\n        linkages\n      }\n    }\n    ").then(onResult);
}

function memorandumIsFetched(memorandum) {
    return memorandum.category !== undefined;
}

function makeCardInfo(memorandumType, institution, memorandum) {
    return {
        institution: {
            name: institution.name,
            id: institution.id
        },
        memorandum: {
            id: memorandum.id,
            type: memorandumType,
            dateEffective: (0, _moment2.default)(memorandum.date_effective),
            dateExpiration: (0, _moment2.default)(memorandum.date_expiration)
        }
    };
}

function makeCardsFromInstitution(institutions) {
    var cards = [];

    institutions.forEach(function (institution) {
        if (institution.latest_mou !== null && institution.latest_mou.date_expiration !== null) {
            cards.push(makeCardInfo("Understanding", institution, institution.latest_mou));
        }

        if (institution.latest_moa !== null && institution.latest_moa.date_expiration !== null) {
            cards.push(makeCardInfo("Agreement", institution, institution.latest_moa));
        }
    });

    cards.sort(function (a, b) {
        return a.memorandum.dateExpiration.diff(b.memorandum.dateExpiration);
    });

    return cards;
}

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            cards: null,
            activeCard: null
        };

        _this.refreshCards = _this.refreshCards.bind(_this);
        _this.setActiveCard = _this.setActiveCard.bind(_this);

        fetchInstitutions(function (result) {
            var institutions = result.institutions;
            _this.setState({
                cards: makeCardsFromInstitution(institutions)
            });
        });
        return _this;
    }

    _createClass(Memorandums, [{
        key: "refreshCards",
        value: function refreshCards() {
            var _this2 = this;

            this.setState({
                cards: null //clear first
            });

            fetchInstitutions(function (result) {
                var institutions = result.institutions;
                _this2.setState({
                    cards: makeCardsFromInstitution(institutions)
                });
            });
        }
    }, {
        key: "setActiveCard",
        value: function setActiveCard(id) {
            if (this.state.activeCard === id) {
                this.setState({
                    activeCard: null //Deselect when already selected
                });

                return;
            }

            this.setState({
                activeCard: id
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.cards === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.state.cards.length === 0) {
                return Memorandums.emptyState();
            }

            var cards = this.state.cards.map(function (card) {
                var id = card.memorandum.id;
                var isActive = _this3.state.activeCard === id;
                var setActiveCard = function setActiveCard() {
                    return _this3.setActiveCard(id);
                };
                return _react2.default.createElement(MemorandumCard, { key: id, card: card, onClick: setActiveCard, active: isActive });
            });

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column align-items-center page-body p-4" },
                cards
            );
        }
    }], [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "h5",
                null,
                "There are no memorandums found with an expiration date"
            );
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumCard = function (_Component2) {
    _inherits(MemorandumCard, _Component2);

    function MemorandumCard(props) {
        _classCallCheck(this, MemorandumCard);

        return _possibleConstructorReturn(this, (MemorandumCard.__proto__ || Object.getPrototypeOf(MemorandumCard)).call(this, props));
    }

    _createClass(MemorandumCard, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            var dateExpiration = this.props.card.memorandum.dateExpiration.format("LL");
            var expirationToNow = this.props.card.memorandum.dateExpiration.fromNow();

            var now = (0, _moment2.default)();
            var dateExpirationMoment = this.props.card.memorandum.dateExpiration;
            var monthsBeforeExpiration = dateExpirationMoment.diff(now, "months");
            var hasExpired = dateExpirationMoment.diff(now, "days") <= 0;

            var urgent = monthsBeforeExpiration <= 6;

            var expirationClass = "text-white ";
            if (urgent) {
                expirationClass += "bg-danger";
            } else {
                expirationClass += "bg-dlsu-lighter";
            }

            var cardClass = "home-card rounded ";
            if (this.props.active) {
                cardClass += "active";
            }

            var collapseContent = null;

            if (memorandumIsFetched(this.props.card.memorandum) || this.props.active) {
                //Have we fetched it yet? This way we only mount those that have been fetched
                //or if it hasn't been fetched but is active.
                collapseContent = _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(MemorandumCardCollapseContent, { memorandum: this.props.card.memorandum })
                );
            }

            var onCardClick = function onCardClick() {
                (0, _scrollIntoView2.default)(_this5.card);
                _this5.props.onClick();
            };

            return _react2.default.createElement(
                "div",
                { className: cardClass, onClick: onCardClick, ref: function ref(card) {
                        return _this5.card = card;
                    } },
                _react2.default.createElement(
                    _section.SectionRow,
                    { className: expirationClass },
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        hasExpired ? "Expired " : "Expires",
                        " ",
                        expirationToNow
                    )
                ),
                _react2.default.createElement(
                    _section.SectionRow,
                    null,
                    _react2.default.createElement(
                        _section.SectionRowTitle,
                        null,
                        "Institution Name"
                    ),
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        this.props.card.institution.name
                    )
                ),
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
                        { large: true },
                        this.props.card.memorandum.type
                    )
                ),
                _react2.default.createElement(
                    _section.SectionRow,
                    null,
                    _react2.default.createElement(
                        _section.SectionRowTitle,
                        null,
                        "Date of Expiration"
                    ),
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        dateExpiration
                    )
                ),
                _react2.default.createElement(
                    _reactstrap.Collapse,
                    { isOpen: this.props.active },
                    collapseContent
                )
            );
        }
    }]);

    return MemorandumCard;
}(_react.Component);

var MemorandumCardCollapseContent = function (_Component3) {
    _inherits(MemorandumCardCollapseContent, _Component3);

    function MemorandumCardCollapseContent(props) {
        _classCallCheck(this, MemorandumCardCollapseContent);

        var _this6 = _possibleConstructorReturn(this, (MemorandumCardCollapseContent.__proto__ || Object.getPrototypeOf(MemorandumCardCollapseContent)).call(this, props));

        _this6.state = {
            memorandum: props.memorandum,
            isOpen: false
        };

        fetchMemorandumDetails(props.memorandum.id, function (result) {
            var memorandum = result.memorandum;
            var stateMemorandum = _this6.state.memorandum;

            // Store fetched information in the instance
            stateMemorandum.category = memorandum.category;
            stateMemorandum.memorandum_file = memorandum.memorandum_file;
            stateMemorandum.date_effective = memorandum.date_effective;
            stateMemorandum.college_initiator = memorandum.college_initiator;
            stateMemorandum.linkages = memorandum.linkages;

            _this6.setState({
                memorandum: memorandum
            });
        });
        return _this6;
    }

    _createClass(MemorandumCardCollapseContent, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            var memorandum = this.state.memorandum;

            if (!memorandumIsFetched(memorandum)) {
                return _react2.default.createElement(
                    "div",
                    { className: "card-details" },
                    _react2.default.createElement(_loading2.default, { noText: true })
                );
            }

            var dateEffective = (0, _moment2.default)(memorandum.date_effective).format("LL");

            var collegeInitiator = "No college initiator";
            if (memorandum.college_initiator !== null) {
                collegeInitiator = _settings2.default.colleges[memorandum.college_initiator];
            }

            var linkages = "No linkages";
            if (memorandum.linkages.length > 0) {
                linkages = "";

                memorandum.linkages.forEach(function (linkage, index) {
                    var linkageString = _settings2.default.linkages[linkage];
                    if (index === memorandum.linkages.length - 1) {
                        linkages += linkageString;
                    } else {
                        linkages += linkageString + ", ";
                    }
                });
            }

            // Allows content to expand gracefully
            setTimeout(function () {
                _this7.setState({
                    isOpen: true
                });
            }, 200);

            return _react2.default.createElement(
                _reactstrap.Collapse,
                { isOpen: this.state.isOpen },
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
                        { large: true },
                        dateEffective
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
                        { large: true },
                        collegeInitiator
                    )
                ),
                _react2.default.createElement(
                    _section.SectionRow,
                    null,
                    _react2.default.createElement(
                        _section.SectionRowTitle,
                        null,
                        "Linkages"
                    ),
                    _react2.default.createElement(
                        _section.SectionRowContent,
                        { large: true },
                        linkages
                    )
                ),
                _react2.default.createElement(
                    _section.SectionRow,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success", className: "mr-2" },
                        "View memorandum document"
                    ),
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true, size: "sm", color: "success" },
                        "Renew Memorandum"
                    )
                )
            );
        }
    }]);

    return MemorandumCardCollapseContent;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map