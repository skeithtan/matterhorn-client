import React, { Component } from "react";
import LoadingSpinner from "../../components/loading";

import {
    Input,
    Button,
} from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow,
} from "../../components/section";


class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword : null,
        };

        this.setSearchKeyword = this.setSearchKeyword.bind(this);
        this.getFilteredStudents = this.getFilteredStudents.bind(this);
    }

    setSearchKeyword(searchString) {
        //If the string is empty, that means the user isn't searching at all
        const searchKeyword = searchString === "" ? null : searchString;
        this.setState({
            searchKeyword : searchKeyword,
        });
    }

    getFilteredStudents() {
        if (this.props.students === null || this.state.searchKeyword === null) {
            return [];
        }

        const searchKeyword = this.state.searchKeyword.toLowerCase();

        return this.props.students.filter(student => {
            const fullName = `${student.firstName} ${student.middleName} ${student.familyName}`.toLowerCase();
            return fullName.includes(searchKeyword) || student.idNumber.includes(searchKeyword);
        });
    }

    render() {
        const isSearching = this.state.searchKeyword !== null;
        const showingStudents = isSearching ? this.getFilteredStudents() : this.props.students;

        return (
            <div className="sidebar h-100" id="student-list">
                <StudentListHead setSearchKeyword={this.setSearchKeyword}
                                 toggleAddStudent={this.props.toggleAddStudent}/>
                <StudentListTable students={showingStudents}
                                  activeStudent={this.props.activeStudent}
                                  setActiveStudent={this.props.setActiveStudent}
                                  toggleAddStudent={this.props.toggleAddStudent}
                                  isSearching={isSearching}/>
            </div>
        );
    }
}

class StudentListHead extends Component {
    constructor(props) {
        super(props);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
    }

    onSearchInputChange(event) {
        const searchInput = event.target.value;
        this.props.setSearchKeyword(searchInput);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <Button outline color="success" size="sm" className="ml-auto"
                            onClick={this.props.toggleAddStudent}>Add</Button>
                </div>
                <h4 className="page-head-title">Students</h4>
                <Input type="search" placeholder="Search" className="search-input" onChange={this.onSearchInputChange}/>
            </div>
        );
    }
}

class StudentListTable extends Component {
    constructor(props) {
        super(props);
        this.getStudentsByFamilyNameInitials = this.getStudentsByFamilyNameInitials.bind(this);
        this.emptyState = this.emptyState.bind(this);
    }

    // DO not make this static
    emptyState() {
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
                <p>When added, Students will show up here.</p>
                <Button outline color="success" onClick={this.props.toggleAddStudent}>Add a Student</Button>
            </div>
        );
    }

    static noResultsState() {
        return (
            <div className="loading-container">
                <h3>No results found</h3>
            </div>
        );
    }

    getStudentsByFamilyNameInitials() {
        //Get first letter
        let familyNameInitials = this.props.students.map(student => student.family_name[0]);

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
            let students = [];
            categorizedByInitial.push({
                initial : initial,
                students : students,
            });

            this.props.students.forEach(student => {
                const studentInitial = student.family_name[0];

                if (studentInitial === initial) {
                    students.push(student);
                }
            });

        });

        return categorizedByInitial;
    }

    render() {
        if (this.props.students === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.students.length === 0) {
            return this.props.isSearching ? StudentListTable.noResultsState() : this.emptyState();
        }

        const familyNameInitials = this.getStudentsByFamilyNameInitials();

        const sections = familyNameInitials.map((familyNameInitial, index) => {
            return <StudentSection key={index}
                                   title={familyNameInitial.initial}
                                   activeStudent={this.props.activeStudent}
                                   students={familyNameInitial.students}
                                   setActiveStudent={this.props.setActiveStudent}/>;
        });


        return (
            <div className="page-body">
                {sections}
            </div>
        );
    }
}

class StudentSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const rows = this.props.students.map(student => {
            let isActive = false;

            if (this.props.activeStudent !== null) {
                isActive = this.props.activeStudent.id === student.id;
            }

            const setActiveStudent = () => this.props.setActiveStudent(student);

            return (
                <SectionRow selectable onClick={setActiveStudent} active={isActive} key={student.id}>
                    <small className="d-block">{student.id_number}</small>
                    <b>{student.family_name}</b>, {student.first_name} {student.middle_name}
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

export default StudentList;