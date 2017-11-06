import React, { Component } from "react";
import InstitutionList from "./institution_list";
import Programs from "./programs";
import StudentList from "./student_list";

class Linkages extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id="linkages-page" className="container-fluid d-flex flex-row p-0 h-100">
                <InstitutionList/>
                <Programs/>
                <StudentList/>
            </div>
        )
    }
}

export default Linkages;