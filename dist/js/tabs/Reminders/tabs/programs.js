"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Change query, if ever
function fetchInstitutions(onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            institutions {\n                id\n                name\n                latest_moa {\n                    active_program {\n                        name\n                        linkage {\n                            name\n                        }\n                        terms {\n                            number\n                            end_date\n                        }\n                    }\n                }\n            }\n        }\n        ",
        onResponse: onResponse
    });
}

function makeCardInfo(institution, program) {
    return {
        institution: {
            name: institution.name,
            id: institution.id
        },
        program: {
            name: program.name,
            linkage: program.linkage.name
            // TODO: terms, we only need the active one
        }
    };
}

function makeCardsFromInstitution(institutions) {
    var cards = [];

    institutions.forEach(function (institution) {
        if (institution.latest_moa !== null && institution.latest_moa.active_program !== null) {
            cards.push(makeCardInfo(institution, institution.latest_moa.active_program));
        }
    });

    // TODO: Sorting by end date

    return cards;
}

var Programs = function (_Component) {
    _inherits(Programs, _Component);

    function Programs(props) {
        _classCallCheck(this, Programs);

        var _this = _possibleConstructorReturn(this, (Programs.__proto__ || Object.getPrototypeOf(Programs)).call(this, props));

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

    _createClass(Programs, [{
        key: "setActiveCard",
        value: function setActiveCard(index) {
            if (this.state.activeCard === index) {
                this.setState({
                    activeCard: null
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
                return Programs.emptyState();
            }

            var cards = this.state.cards.map(function (card, index) {
                var isActive = _this2.state.activeCard === index;
                var setActiveCard = function setActiveCard() {
                    return _this2.setActiveCard(index);
                };
                return _react2.default.createElement(ProgramCard, { key: index, card: card, onClick: setActiveCard, active: isActive });
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

    return Programs;
}(_react.Component);

var ProgramCard = function (_Component2) {
    _inherits(ProgramCard, _Component2);

    function ProgramCard(props) {
        _classCallCheck(this, ProgramCard);

        return _possibleConstructorReturn(this, (ProgramCard.__proto__ || Object.getPrototypeOf(ProgramCard)).call(this, props));
    }

    _createClass(ProgramCard, [{
        key: "render",
        value: function render() {
            // TODO: dates

            var cardClass = "reminders-card rounded ";
            if (this.props.active) {
                cardClass += "active";
            }

            // TODO: What is urgent?

            var expirationClass = "text-white ";
            // TODO: Conditions for class variations

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column align-items-center page-body" },
                _react2.default.createElement(
                    _reactstrap.Card,
                    { className: cardClass, onClick: this.props.onClick },
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(_section.SectionRowContent, { large: true })
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
                            "Program Name"
                        ),
                        _react2.default.createElement(
                            _section.SectionRowContent,
                            { large: true },
                            this.props.card.program.name
                        )
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "Linkage"
                        ),
                        _react2.default.createElement(_section.SectionRowContent, { large: true })
                    ),
                    _react2.default.createElement(
                        _section.SectionRow,
                        null,
                        _react2.default.createElement(
                            _section.SectionRowTitle,
                            null,
                            "End Date"
                        ),
                        _react2.default.createElement(_section.SectionRowContent, { large: true })
                    )
                )
            );
        }
    }]);

    return ProgramCard;
}(_react.Component);

exports.default = Programs;
//# sourceMappingURL=outbound_programs.js.map