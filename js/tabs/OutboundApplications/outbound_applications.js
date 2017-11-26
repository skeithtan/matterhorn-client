import React, { Component } from "react";
import graphql from "../../graphql";
import {
    Button,
    Input,
} from "reactstrap";
import LoadingSpinner from "../../components/loading";


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
        this.setActiveApplicant = this.setActiveApplicant.bind(this);
    }

    setActiveCategory(category) {
        this.setState({
            activeCategory : category,
        });

        // TODO: fetch appropriate applicants under that category
    }

    // TODO: switching between applicant categories called setApplicants, category as the param
    // TODO: refreshing the applicants and at the same time conforming to the activeCategory

    setActiveApplicant(applicant) {
        this.setState({
            activeApplicant : applicant,
        });
    }

    render() {
        return (
            <div className="sidebar h-100">
                <OutboundApplicationsListHead activeCategory={ this.state.activeCategory }
                                              setActiveCategory={ this.setActiveCategory }/>
                <OutboundApplicationsListTable activeCategory={ this.state.activeCategory }
                                               applicants={ this.state.applicants }
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
                <h4 className="page-head-title">Applications</h4>
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
        let students = [];

        this.props.applicants.forEach(applicant => {
            students.push(applicant.student);
        });

        //Get first letter
        let familyNameInitials = students.map(student => student.family_name[0]);

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
            let categorizedStudents = [];
            categorizedByInitial.push({
                initial : initial,
                students : categorizedStudents,
            });

            students.forEach(student => {
                const studentInitial = student.family_name[0];

                if (studentInitial === initial) {
                    categorizedStudents.push(student);
                }
            });

        });

        console.log(categorizedByInitial);
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

            const students = familyNameInitial.students;

            // TODO: Return sections
        });

        return (
            <div className="page-body">
                { sections }
            </div>
        );
    }
}

export default OutboundApplications;