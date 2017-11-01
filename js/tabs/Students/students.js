import React, { Component } from "react";
import graphql from "../../graphql";
import StudentList from "./student_list";


function fetchStudents(onResponse) {
    graphql({
        query : `
        {
            students {
                kind
                idNumber
                college
                familyName
                firstName
                middleName
                nickname
                nationality
                homeAddress
                phoneNumber
                birthDate
                sex
                emergencyContactName
                emergencyContactNumber
                email
                civilStatus
            }
        }
        `,
        onResponse : onResponse,
    });
}

function sortStudents(students) {
    let familyNames = {};
    students.forEach(student => {
        const firstLetter = student.familyName[0];
        if (familyNames[firstLetter] === undefined) {
            familyNames[firstLetter] = [student];
        } else {
            familyNames[firstLetter].push(student);
        }
    });

    let letters = [];
    for (let key in familyNames) {
        if (familyNames.hasOwnProperty(key)) {
            letters.push(key);
        }
    }

    letters.sort((a, b) => {
        //Alphabetically
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });

    let sorted = [];

    letters.forEach(letter => {
        const students = familyNames[letter];
        sorted.push({
            letter : letter,
            students : students,
        });
    });

    return sorted;
}

class Students extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentList : null,
            activeStudent : null,
        };

        fetchStudents(response => {
            this.setState({
                studentList : response.data,
            });
        });
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <StudentList students={this.state.studentList}/>
            </div>
        );
    }
}

export default Students;