import React, { Component } from "react";
import {
    SectionRow,
    SectionRowContent,
    SectionTable,
} from "../../components/section";
import LoadingSpinner from "../../components/loading";
import { Button } from "reactstrap";


class YearList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar h-100" id="term-list">
                <YearListHead/>
                <YearListTable yearList={this.props.yearList}
                               activeYear={this.props.activeYear}
                               setActiveYear={this.props.setActiveYear}/>
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

    // TODO: Arrange years in ascending order

    // IDK if this is right
    emptyState() {
        return (
            <div>
                This is empty
            </div>
        );
    }

    render() {
        if (this.props.yearList === null) {
            return <LoadingSpinner/>;
        }

        if (this.props.yearList.length === 0) {
            return this.emptyState();
        }

        const rows = this.props.yearList.map((year, index) => {
            let isActive = false;

            if (this.props.activeYear !== null) {
                isActive = this.props.activeYear === year.academic_year_start;
            }

            const setActiveYear = () => this.props.setActiveYear(year.academic_year_start);

            const yearStart = Number(year.academic_year_start);
            return <SectionRow selectable key={index} onClick={setActiveYear} active={isActive}>
                <SectionRowContent>{yearStart} - {yearStart + 1}</SectionRowContent>
            </SectionRow>;
        });

        return (
            <div className="page-body">
                <SectionTable>
                    {rows}
                </SectionTable>
            </div>
        );
    }
}

export default YearList;