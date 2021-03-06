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
import TabBar from "../../components/tab_bar";
import {
    CollapseButton,
    CollapseContent,
    ExpandContent,
} from "../../components/collapse_content";


class StudentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword : null,
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
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
            return null;
        }

        const searchKeyword = this.state.searchKeyword.toLowerCase();

        const filteredStudents = this.props.students.filter(student => {
            const fullName = `${student.first_name} ${student.middle_name} ${student.family_name}`.toLowerCase();
            return fullName.includes(searchKeyword) || student.id_number.includes(searchKeyword);
        });

        return filteredStudents.map(student => student.id);
    }

    toggleCollapse() {
        this.setState({
            collapsed : !this.state.collapsed,
        });
    };

    render() {
        const isSearching = this.state.searchKeyword !== null;

        let className = "sidebar h-100 collapsible ";
        if (this.state.collapsed) {
            className += "collapsed";
        }


        return (
            <div className={className}
                 id="student-list">
                <ExpandContent className="d-flex flex-column h-100">
                    <StudentListHead setSearchKeyword={this.setSearchKeyword}
                                     toggleCollapse={this.toggleCollapse}
                                     activeTab={this.props.activeTab}/>
                    <StudentListTable students={this.props.students}
                                      filtered={this.getFilteredStudents()}
                                      activeStudent={this.props.activeStudent}
                                      setActiveStudent={this.props.setActiveStudent}
                                      currentStudentCategory={this.props.activeTab.name}
                                      isSearching={isSearching}/>
                    <TabBar tabs={this.props.tabs}
                            activeTab={this.props.activeTab}
                            setActiveTab={this.props.setActiveTab}/>
                </ExpandContent>

                <CollapseContent title="Students"
                                 toggle={this.toggleCollapse}/>
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
                    <CollapseButton toggleCollapse={this.props.toggleCollapse}/>
                </div>
                <h4 className="page-head-title">{this.props.activeTab.name} Students</h4>
                <Input type="search"
                       placeholder="Search"
                       className="search-input"
                       onChange={this.onSearchInputChange}/>
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
                <h4>There are no {this.props.currentStudentCategory} students.</h4>
                <p>When added, {this.props.currentStudentCategory} students will show up here.</p>
                {this.props.currentStudentCategory === "Inbound" &&
                <Button outline
                        color="success"
                        onClick={this.props.toggleAddStudent}>Add a Student</Button>
                }
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
            return this.emptyState();
        }

        if (this.props.isSearching && this.props.filtered.length === 0) {
            return StudentListTable.noResultsState();
        }

        const familyNameInitials = this.getStudentsByFamilyNameInitials();

        const sections = familyNameInitials.map((familyNameInitial, index) => {

            const students = familyNameInitial.students;

            let collapsed = false;

            if (this.props.isSearching) {
                collapsed = true;

                students.forEach(student => {
                    if (this.props.filtered.includes(student.id)) {
                        collapsed = false;
                    }
                });
            }

            return <StudentSection key={index}
                                   collapsed={collapsed}
                                   isSearching={this.props.isSearching}
                                   title={familyNameInitial.initial}
                                   activeStudent={this.props.activeStudent}
                                   students={familyNameInitial.students}
                                   filtered={this.props.filtered}
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
                isActive = this.props.activeStudent.id.toString() === student.id.toString();
            }

            const setActiveStudent = () => this.props.setActiveStudent(student);

            let collapsed = false;
            if (this.props.isSearching) {
                collapsed = !this.props.filtered.includes(student.id);
            }

            return (
                <SectionRow selectable
                            collapsed={collapsed}
                            onClick={setActiveStudent}
                            active={isActive}
                            key={student.id}>
                    <small className="d-block">{student.id_number}</small>
                    <b>{student.family_name}</b>, {student.first_name} {student.middle_name}
                </SectionRow>
            );
        });

        return (
            <Section collapsed={this.props.collapsed}>
                <SectionTitle>{this.props.title}</SectionTitle>
                <SectionTable>
                    {rows}
                </SectionTable>
            </Section>
        );
    }
}

export default StudentList;