import React, { Component } from "react";
import InstitutionList from "./institution_list";


const fakeData = [
    {
        name : "France",
        institutions : [
            {
                id : 1,
                name : "Universite le France",
            },
            {
                id : 2,
                name : "Le Paris Universite",
            },
        ],
    },
    {
        name : "Japan",
        institutions : [
            {
                id : 3,
                name : "University of Tokyo",
            }, {
                id : 4,
                name : "Nihongo University",
            }, {
                id : 5,
                name : "Konnichiwa Nihon Language University",
            },
        ],
    },
    {
        name : "Singapore",
        institutions : [
            {
                id : 6,
                name : "Singapore Management University",
            }, {
                id : 7,
                name : "Lee Kwan Yoo Univesity",
            },
        ],
    },
    {
        name : "Korea",
        institutions : [
            {
                id : 8,
                name : "University of Koreaboos",
            }, {
                id : 9,
                name : "Dva University",
            },
        ],
    },
];

class Institutions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList institutions={fakeData}/>
            </div>
        );
    }
}

export default Institutions;