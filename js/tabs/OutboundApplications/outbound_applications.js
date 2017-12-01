import React, { Component } from "react";
import graphql from "../../graphql";
import {
    Button,
    Input,
} from "reactstrap";
import LoadingSpinner from "../../components/loading";
import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
} from "../../components/section";


function fetchOutboundApplication(onResult) {
    graphql.query(`
    {
        outbound_student_programs {
            id
            student {
                id
                id_number
                first_name
                middle_name
                family_name
            }
            is_requirements_complete
        }
    }
    `).then(onResult);
}


class OutboundApplications extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <OutboundApplicationsList/>
            </div>
        );
    }
}

class OutboundApplicationsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategory : "Incomplete",
            applicants : null,
            activeApplicant : null,
        };

        fetchOutboundApplication(result => {
            this.setState({
                applicants : result.outbound_student_programs,
            });
        });

        this.setActiveCategory = this.setActiveCategory.bind(this);
        this.getApplicantsByCategory = this.getApplicantsByCategory.bind(this);
        this.setActiveApplicant = this.setActiveApplicant.bind(this);
    }

    setActiveCategory(category) {
        this.setState({
            activeCategory : category,
        });

        this.getApplicantsByCategory(this.state.applicants);
    }

    getApplicantsByCategory(applicants) {
        if (applicants === null) {
            return null;
        }

        const filteredApplicants = [];

        applicants.forEach(applicant => {
            if (this.state.activeCategory === "Incomplete") {
                if (!applicant.is_requirements_complete) {
                    filteredApplicants.push(applicant);
                }
            } else {
                if (applicant.is_requirements_complete) {
                    filteredApplicants.push(applicant);
                }
            }
        });


        return filteredApplicants;
    }

    // TODO: refreshing the applicants and at the same time conforming to the activeCategory

    setActiveApplicant(applicant) {
        this.setState({
            activeApplicant : applicant,
        });
    }

    render() {
        const applicants = this.getApplicantsByCategory(this.state.applicants);

        return (
            <div className="sidebar h-100">
                <OutboundApplicationsListHead activeCategory={ this.state.activeCategory }
                                              setActiveCategory={ this.setActiveCategory }/>
                <OutboundApplicationsListTable activeCategory={ this.state.activeCategory }
                                               applicants={ applicants }
                                               activeApplicant={ this.state.activeApplicant }
                                               setActiveApplicant={ this.setActiveApplicant }/>
            </div>
        );
    }
}

class OutboundApplicationsListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <div className="btn-group" role="group">
                        <Button outline
                                color="success"
                                size="sm"
                                onClick={ () => this.props.setActiveCategory("Incomplete") }
                                active={ this.props.activeCategory === "Incomplete" }>Incomplete</Button>
                        <Button outline
                                color="success"
                                size="sm"
                                onClick={ () => this.props.setActiveCategory("Complete") }
                                active={ this.props.activeCategory === "Complete" }>Complete</Button>
                    </div>
                    <Button outline
                            color="success"
                            className="ml-auto"
                            size="sm">Add Applicant</Button>
                </div>
                <h4 className="page-head-title">{ this.props.activeCategory } Applications</h4>
                <Input type="search"
                       placeholder="search"
                       className="search-input"/>
            </div>
        );
    }
}

class OutboundApplicationsListTable extends Component {
    constructor(props) {
        super(props);

        this.getStudentsByFamilyNameInitials = this.getStudentsByFamilyNameInitials.bind(this);
        this.emptyState = this.emptyState.bind(this);
    }

    getStudentsByFamilyNameInitials() {
        if (this.props.applicants === null) {
            return null;
        }

        const applicants = [];

        this.props.applicants.forEach(applicant => {
            applicants.push(applicant.student);
        });

        //Get first letter
        let familyNameInitials = applicants.map(student => student.family_name[0]);

        //Get uniques only
        familyNameInitials = familyNameInitials.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        // Sort alphabetically
        familyNameInitials = familyNameInitials.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        let categorizedByInitial = [];

        // Categorize by family name initial
        familyNameInitials.forEach(initial => {
            let categorizedApplicants = [];
            categorizedByInitial.push({
                initial : initial,
                applicants : categorizedApplicants,
            });

            applicants.forEach(applicant => {
                const studentInitial = applicant.family_name[0];

                if (studentInitial === initial) {
                    categorizedApplicants.push(applicant);
                }
            });

        });
        return categorizedByInitial;
    }

    emptyState() {
        return (
            <div className="loading-container">
                <h4>There are no { this.props.activeCategory } applicants.</h4>
            </div>
        );
    }

    render() {
        if (this.props.applicants === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.applicants.length === 0) {
            return this.emptyState();
        }

        const familyNameInitials = this.getStudentsByFamilyNameInitials();

        const sections = familyNameInitials.map((familyNameInitial, index) => {
            return <OutboundApplicationsListSection key={ index }
                                                    title={ familyNameInitial.initial }
                                                    activeApplicant={ this.props.activeApplicant }
                                                    applicants={ familyNameInitial.applicants }
                                                    setActiveApplicant={ this.props.setActiveApplicant }/>;
        });

        return (
            <div className="page-body">
                { sections }
            </div>
        );
    }
}

class OutboundApplicationsListSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const rows = this.props.applicants.map((applicant, index) => {
            let isActive = false;

            if (this.props.activeApplicant !== null) {
                isActive = this.props.activeApplicant.id.toString() === applicant.id.toString();
            }

            const setActiveApplicant = () => this.props.setActiveApplicant(applicant);

            return (
                <SectionRow selectable
                            onClick={ setActiveApplicant }
                            active={ isActive }
                            key={ index }>
                    <small className="d-block">{ applicant.id_number }</small>
                    <b>{ applicant.family_name }</b>, { applicant.first_name } { applicant.middle_name }
                </SectionRow>
            );
        });

        return (
            <Section>
                <SectionTitle>{ this.props.title }</SectionTitle>
                <SectionTable>
                    { rows }
                </SectionTable>
            </Section>
        );
    }
}

export default OutboundApplications;