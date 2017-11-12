import React, { Component } from "react";
import graphql from "../../../graphql";
import moment from "moment";
import {
    Card,
} from "reactstrap";
import LoadingSpinner from "../../../loading";
import {
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
} from "../../../components/section";


function fetchInstitutions(onResult) {
    graphql.query(`
                    {
                      institutions {
                        id
                        name
                            latest_mou {
                                id
                                date_expiration
                            }
                            latest_moa {
                                id
                                date_expiration
                            }
                      }
                    }
        `).then(onResult);
}

function makeCardInfo(memorandumType, institution, memorandum) {
    return {
        institution : {
            name : institution.name,
            id : institution.id,
        },
        memorandum : {
            id : memorandum.id,
            type : memorandumType,
            dateEffective : moment(memorandum.date_effective),
            dateExpiration : moment(memorandum.date_expiration),
        },
    };
}

function makeCardsFromInstitution(institutions) {
    let cards = [];


    institutions.forEach(institution => {
        if (institution.latest_mou !== null && institution.latest_mou.date_expiration !== null) {
            cards.push(makeCardInfo("Understanding", institution, institution.latest_mou));
        }

        if (institution.latest_moa !== null && institution.latest_moa.date_expiration !== null) {
            cards.push(makeCardInfo("Agreement", institution, institution.latest_moa));
        }
    });


    cards.sort((a, b) => {
        return a.memorandum.dateExpiration.diff(b.memorandum.dateExpiration);
    });

    return cards;
}

class Memorandums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards : null,
            activeCard : null,
        };

        this.refreshCards = this.refreshCards.bind(this);
        this.setActiveCard = this.setActiveCard.bind(this);

        fetchInstitutions(result => {
            const institutions = result.institutions;
            this.setState({
                cards : makeCardsFromInstitution(institutions),
            });
        });
    }

    static emptyState() {
        return (
            <h5>There are no memorandums found with an expiration date</h5>
        );
    }

    refreshCards() {
        this.setState({
            cards : null //clear first
        });

        fetchInstitutions(result => {
            const institutions = result.institutions;
            this.setState({
                cards : makeCardsFromInstitution(institutions),
            });
        });
    }

    setActiveCard(id) {
        if (this.state.activeCard === id) {
            this.setState({
                activeCard : null //Deselect when already selected
            });

            return;
        }

        this.setState({
            activeCard : id,
        });

    }

    render() {
        if (this.state.cards === null) {
            return <LoadingSpinner/>;
        }

        if (this.state.cards.length === 0) {
            return Memorandums.emptyState();
        }

        const cards = this.state.cards.map(card => {
            const id = card.memorandum.id;
            const isActive = this.state.activeCard === id;
            const setActiveCard = () => this.setActiveCard(id);
            return <MemorandumCard key={id} card={card} onClick={setActiveCard} active={isActive}/>;
        });

        return (
            <div className="d-flex flex-column align-items-center page-body p-4">
                {cards}
            </div>
        );
    }
}

class MemorandumCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dateExpiration = this.props.card.memorandum.dateExpiration.format("LL");
        const expirationToNow = this.props.card.memorandum.dateExpiration.fromNow();

        const now = moment();
        const dateExpirationMoment = this.props.card.memorandum.dateExpiration;
        const monthsBeforeExpiration = dateExpirationMoment.diff(now, "months");
        const hasExpired = dateExpirationMoment.diff(now, "days") <= 0;

        const urgent = monthsBeforeExpiration <= 6;

        let expirationClass = "text-white ";
        if (urgent) {
            expirationClass += "bg-danger";
        } else {
            expirationClass += "bg-dlsu-lighter";
        }

        let cardClass = "home-card rounded ";
        if (this.props.active) {
            cardClass += "active";
        }

        return (
            <div className={cardClass} onClick={this.props.onClick} ref={(card) => this.card = card}>
                <SectionRow className={expirationClass}>
                    <SectionRowContent large>{hasExpired ? "Expired " : "Expires"} {expirationToNow}</SectionRowContent>
                </SectionRow>
                <SectionRow>
                    <SectionRowTitle>Institution Name</SectionRowTitle>
                    <SectionRowContent large>{this.props.card.institution.name}</SectionRowContent>
                </SectionRow>
                <SectionRow>
                    <SectionRowTitle>Memorandum Type</SectionRowTitle>
                    <SectionRowContent large>{this.props.card.memorandum.type}</SectionRowContent>
                </SectionRow>
                <SectionRow>
                    <SectionRowTitle>Date of Expiration</SectionRowTitle>
                    <SectionRowContent large>{dateExpiration}</SectionRowContent>
                </SectionRow>
            </div>
        );
    }
}

export default Memorandums;