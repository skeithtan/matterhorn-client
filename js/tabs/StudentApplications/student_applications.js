import React, { Component } from "react";
import graphql from "../../graphql";
import ApplicationDetail from "./application_detail";
import { StudentFormModal } from "../Students/modals";
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
import TabBar from "../../components/tab_bar";
import ErrorState from "../../components/error_state";


const tabs = [
    {
        name : "Inbound",
        image : "./images/inboundgrey.png",
        activeImage : "./images/inboundgreen.png",
    },
    {
        name : "Outbound",
        image : "./images/airplanegrey.png",
        activeImage : "./images/airplanegreen.png",
    },
];

function makeOutboundApplicationsQuery() {
    return graphql.query(`
    {
        outbound_student_programs(deployed:false) {
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
    `);
}

function makeInboundApplicationsQuery() {
    return graphql.query(`
    {
        inbound_student_programs(accepted:false) {
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
    `);
}

class StudentApplications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategory : "Incomplete",
            activeTab : tabs[0],
            applicants : null,
            activeApplicant : null,
            errors : null,
            addStudentIsShowing : false,
        };

        this.setApplicants = this.setApplicants.bind(this);
        this.setActiveTab = this.setActiveTab.bind(this);
        this.setActiveCategory = this.setActiveCategory.bind(this);
        this.getApplicantsByCategory = this.getApplicantsByCategory.bind(this);
        this.setActiveApplicant = this.setActiveApplicant.bind(this);
        this.fetchInboundApplications = this.fetchInboundApplications.bind(this);
        this.fetchOutboundApplications = this.fetchOutboundApplications.bind(this);
        this.toggleStudentModal = this.toggleStudentModal.bind(this);

        this.fetchInboundApplications();
    }

    fetchInboundApplications() {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeInboundApplicationsQuery()
            .then(result => {
                this.setState({
                    applicants : result.inbound_student_programs,
                });
            })
            .catch(error => this.setState({
                error : error,
            }));
    }

    fetchOutboundApplications() {
        if (this.state.error) {
            this.setState({
                error : null,
            });
        }

        makeOutboundApplicationsQuery()
            .then(result => this.setState({
                applicants : result.outbound_student_programs,
            }))
            .catch(error => this.setState({
                error : error,
            }));
    }

    setApplicants(tabName) {
        this.setState({
            applicants : null,
            activeApplicant : null,
        });

        if (tabName === "Inbound") {
            this.fetchInboundApplications();
        } else {
            this.fetchOutboundApplications();
        }
    }

    setActiveTab(tab) {
        this.setState({
            activeTab : tab,
            activeApplicant : null,
            applicants : null,
        });

        this.setApplicants(tab.name);
    }

    setActiveCategory(category) {
        this.setState({
            activeCategory : category,
            activeApplicant : null,
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

    setActiveApplicant(applicant) {
        this.setState({
            activeApplicant : applicant,
        });
    }

    toggleStudentModal() {
        this.setState({
            addStudentIsShowing : !this.state.addStudentIsShowing,
        });
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorState onRefreshButtonClick={() => this.setApplicants(this.state.activeTab.name)}>
                    {this.state.error.toString()}
                </ErrorState>
            );
        }

        const applicants = this.getApplicantsByCategory(this.state.applicants);

        const refresh = () => this.setApplicants(this.state.activeTab.name);

        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <StudentApplicationsList activeCategory={this.state.activeCategory}
                                         setActiveCategory={this.setActiveCategory}
                                         applicants={applicants}
                                         activeApplicant={this.state.activeApplicant}
                                         setActiveApplicant={this.setActiveApplicant}
                                         tabs={tabs}
                                         activeTab={this.state.activeTab}
                                         setActiveTab={this.setActiveTab}
                                         toggleStudentModal={this.toggleStudentModal}/>

                <ApplicationDetail student={this.state.activeApplicant}
                                   inbound={this.state.activeTab.name === "Inbound"}
                                   refreshStudents={refresh}/>

                <StudentFormModal applicant
                                  isOpen={ this.state.addStudentIsShowing }
                                  refresh={ refresh }
                                  toggle={ this.toggleStudentModal }/>
            </div>
        );
    }
}

class StudentApplicationsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100">
                <StudentApplicationsListHead activeCategory={this.props.activeCategory}
                                             setActiveCategory={this.props.setActiveCategory}
                                             toggleStudentModal={this.props.toggleStudentModal}/>
                <StudentApplicationsListTable activeCategory={this.props.activeCategory}
                                              applicants={this.props.applicants}
                                              activeApplicant={this.props.activeApplicant}
                                              setActiveApplicant={this.props.setActiveApplicant}/>
                <TabBar tabs={this.props.tabs}
                        activeTab={this.props.activeTab}
                        setActiveTab={this.props.setActiveTab}/>
            </div>
        );
    }
}

class StudentApplicationsListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <div className="btn-group"
                         role="group">
                        <Button outline
                                color="success"
                                size="sm"
                                onClick={() => this.props.setActiveCategory("Incomplete")}
                                active={this.props.activeCategory === "Incomplete"}>Incomplete</Button>
                        <Button outline
                                color="success"
                                size="sm"
                                onClick={() => this.props.setActiveCategory("Complete")}
                                active={this.props.activeCategory === "Complete"}>Complete</Button>
                    </div>
                    <Button outline
                            color="success"
                            className="ml-auto"
                            size="sm"
                            onClick={this.props.toggleStudentModal}>Add</Button>
                </div>
                <h4 className="page-head-title">{this.props.activeCategory} Applications</h4>
                <Input type="search"
                       placeholder="search"
                       className="search-input"/>
            </div>
        );
    }
}

class StudentApplicationsListTable extends Component {
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
                <h4>There are no {this.props.activeCategory} applicants.</h4>
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
            return <StudentApplicationsListSection key={index}
                                                   title={familyNameInitial.initial}
                                                   activeApplicant={this.props.activeApplicant}
                                                   applicants={familyNameInitial.applicants}
                                                   setActiveApplicant={this.props.setActiveApplicant}/>;
        });

        return (
            <div className="page-body">
                {sections}
            </div>
        );
    }
}

class StudentApplicationsListSection extends Component {
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
                            onClick={setActiveApplicant}
                            active={isActive}
                            key={index}>
                    <small className="d-block">{applicant.id_number}</small>
                    <b>{applicant.family_name}</b>, {applicant.first_name} {applicant.middle_name}
                </SectionRow>
            );
        });

        return (
            <Section>
                <SectionTitle>{this.props.title}</SectionTitle>
                <SectionTable>
                    {rows}
                </SectionTable>
            </Section>
        );
    }
}

export default StudentApplications;