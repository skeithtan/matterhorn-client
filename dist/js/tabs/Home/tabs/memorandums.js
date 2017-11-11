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

var _section = require("../../../components/section");

var _loading = require("../../../loading");

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchInstitutions(onResponse) {
    (0, _graphql2.default)({
        query: "\n                {\n                  institutions {\n                    id\n                    name\n                        latest_mou {\n                            date_expiration\n                        }\n                        latest_moa {\n                            date_expiration\n                        }\n                  }\n                }\n        ",
        onResponse: onResponse
    });
}

function makeCardInfo(memorandumType, institution, memorandum) {
    return {
        institution: {
            name: institution.name,
            id: institution.id
        },
        memorandum: {
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

        fetchInstitutions(function (response) {
            var institutions = response.data.institutions;
            _this.setState({
                cards: makeCardsFromInstitution(institutions)
            });
        });

        _this.setActiveCard = _this.setActiveCard.bind(_this);
        return _this;
    }

    _createClass(Memorandums, [{
        key: "setActiveCard",
        value: function setActiveCard(index) {
            if (this.state.activeCard === index) {
                this.setState({
                    activeCard: null //Deselect when already selected
                });

                return;
            }

            this.setState({
                activeCard: index
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (this.state.cards === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.state.cards.length === 0) {
                return Memorandums.emptyState();
            }

            var cards = this.state.cards.map(function (card, index) {
                var isActive = _this2.state.activeCard === index;
                var setActiveCard = function setActiveCard() {
                    return _this2.setActiveCard(index);
                };
                return _react2.default.createElement(MemorandumCard, { key: index, card: card, onClick: setActiveCard, active: isActive });
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
            var _this4 = this;

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

            return _react2.default.createElement(
                "div",
                { className: cardClass, onClick: this.props.onClick, ref: function ref(card) {
                        return _this4.card = card;
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
                )
            );
        }
    }]);

    return MemorandumCard;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map