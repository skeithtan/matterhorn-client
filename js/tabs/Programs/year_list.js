import React, { Component } from "react";
import {
    SectionRow,
    SectionTable,
} from "../../components/section";
import {
    ListGroupItem,
    Button,
} from "reactstrap";
import LoadingSpinner from "../../loading";

class YearList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100" id="term-list">
                <YearListHead/>
                <YearListTable yearList={ this.props.yearList }
                               setActiveYear={ this.props.setActiveYear }/>
            </div>
        );
    }
}

class YearListHead extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-head">
                <div className="page-head-controls">
                    <Button outline color="success" size="sm" className="ml-auto">Add</Button>
                </div>
                <h4 className="page-head-title mb-0">Academic Years</h4>
            </div>
        );
    }
}

class YearListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.yearList === null) {
            return <LoadingSpinner/>;
        }

        const rows = this.props.yearList.map((year, index) => {
            const yearStart = Number(year.academic_year.academic_year_start);
            return <ListGroupItem key={ index }
                                  onClick={ () => this.props.setActiveYear(year.academic_year.academic_year_start) }>
                { yearStart } - { yearStart + 1 }
            </ListGroupItem>;
        });

        return (
            <div className="page-body">
                <SectionTable>
                    { rows }
                </SectionTable>
            </div>
        );
    }
}

export default YearList;