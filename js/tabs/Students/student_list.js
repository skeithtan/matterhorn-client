import React, { Component } from "react";
import LoadingSpinner from "../../loading";

import {
    Input,
    Button,
} from "reactstrap";

import {
    Section,
    SectionTitle,
    SectionTable,
    SectionRow
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
                    <div className="btn-group ml-auto">
                        <Button outline color="success" size="sm" className="active">Active</Button>
                        <Button outline color="success" size="sm" className="">Historical</Button>
                    </div>
                    <Button outline color="success" size="sm" className="ml-4"
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
                <Button outline color="success">Add a Student</Button>
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
        let familyNameInitials = this.props.students.map(student => student.familyName[0]);

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
                const studentInitial = student.familyName[0];

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
                isActive = this.props.activeStudent.idNumber === student.idNumber;
            }

            const setActiveStudent = () => this.props.setActiveStudent(student);

            return (
                <SectionRow selectable onClick={setActiveStudent} active={isActive} key={student.idNumber}>
                    <small className="d-block">{student.idNumber}</small>
                    <b>{student.familyName}</b>, {student.firstName} {student.middleName}
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