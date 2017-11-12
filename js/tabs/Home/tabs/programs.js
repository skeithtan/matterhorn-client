import React, { Component } from "react";
import {
    Card,
    CardBody,
    CardSubtitle,
} from "reactstrap";
import {
    SectionRow,
    SectionRowContent,
    SectionRowTitle,
} from "../../../components/section";
import LoadingSpinner from "../../../loading";
import moment from "moment";
import graphql from "../../../graphql";

// TODO: Change query, if ever
function fetchInstitutions(onResponse) {
    graphql({
        query : `
        {
            institutions {
                id
                name
                latest_moa {
                    active_program {
                        name
                        linkage {
                            name
                        }
                        terms {
                            number
                            end_date
                        }
                    }
                }
            }
        }
        `,
        onResponse : onResponse,
    });
}

function makeCardInfo(institution, program) {
    return {
        institution : {
            name : institution.name,
            id : institution.id,
        },
        program : {
            name : program.name,
            linkage : program.linkage.name,
            // TODO: terms, we only need the active one
        },
    };
}

function makeCardsFromInstitution(institutions) {
    let cards = [];

    institutions.forEach(institution => {
        if (institution.latest_moa !== null && institution.latest_moa.active_program !== null) {
            cards.push(makeCardInfo(institution, institution.latest_moa.active_program));
        }
    });

    // TODO: Sorting by end date

    return cards;
}

class Programs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards : null,
            activeCard : null,
        };

        fetchInstitutions(response => {
            const institutions = response.data.institutions;
            this.setState({
                cards : makeCardsFromInstitution(institutions),
            });
        });

        this.setActiveCard = this.setActiveCard.bind(this);
    }

    static emptyState() {
        return (
            <h5>There are no memorandums found with an expiration date</h5>
        );
    }

    setActiveCard(index) {
        if (this.state.activeCard === index) {
            this.setState({
                activeCard : null,
            });
            return;
        }

        this.setState({
            activeCard : index,
        });
    }

    render() {
        if (this.state.cards === null) {
            return <LoadingSpinner/>;
        }

        if (this.state.cards.length === 0) {
            return Programs.emptyState();
        }

        const cards = this.state.cards.map((card, index) => {
            const isActive = this.state.activeCard === index;
            const setActiveCard = () => this.setActiveCard(index);
            return <ProgramCard key={ index } card={ card } onClick={ setActiveCard } active={ isActive }/>;
        });

        return (
            <div className="d-flex flex-column align-items-center page-body p-4">
                { cards }
            </div>
        );
    }
}

class ProgramCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // TODO: dates

        let cardClass = "home-card rounded ";
        if (this.props.active) {
            cardClass += "active";
        }

        // TODO: What is urgent?

        let expirationClass = "text-white ";
        // TODO: Conditions for class variations

        return (
            <div className="d-flex flex-column align-items-center page-body">
                <Card className={ cardClass } onClick={ this.props.onClick }>
                    <SectionRow>
                        <SectionRowContent large>{ /*Expiry*/ }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Institution Name</SectionRowTitle>
                        <SectionRowContent large>{ this.props.card.institution.name }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Program Name</SectionRowTitle>
                        <SectionRowContent large>{ this.props.card.program.name }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>Linkage</SectionRowTitle>
                        <SectionRowContent large>{ /*Linkage*/ }</SectionRowContent>
                    </SectionRow>
                    <SectionRow>
                        <SectionRowTitle>End Date</SectionRowTitle>
                        <SectionRowContent large>{ /*End Date*/ }</SectionRowContent>
                    </SectionRow>
                </Card>
            </div>
        );
    }
}

export default Programs;