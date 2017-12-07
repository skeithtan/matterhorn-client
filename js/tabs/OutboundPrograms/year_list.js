import React, { Component } from "react";
import LoadingSpinner from "../../components/loading";
import { AcademicYearFormModal } from "./modals";
import { Button } from "reactstrap";

import {
    SectionRow,
    SectionRowContent,
    SectionTable,
} from "../../components/section";


class YearList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addAcademicYearIsShowing : false,
        };

        this.getArrangedYears = this.getArrangedYears.bind(this);
        this.toggleAddAcademicYear = this.toggleAddAcademicYear.bind(this);
    }

    toggleAddAcademicYear() {
        this.setState({
            addAcademicYearIsShowing : !this.state.addAcademicYearIsShowing,
        });
    }

    getArrangedYears() {
        if (this.props.yearList === null) {
            return null;
        }

        // Arrange in ascending order
        return this.props.yearList.sort(function (a, b) {
            return a.academic_year_start - b.academic_year_start;
        });
    }

    render() {
        const years = this.getArrangedYears();

        return (
            <div className="programs-page-pane"
                 id="term-list">
                <YearListHead toggleAddAcademicYear={ this.toggleAddAcademicYear }/>
                <YearListTable yearList={ years }
                               activeYear={ this.props.activeYear }
                               setActiveYear={ this.props.setActiveYear }/>
                <AcademicYearFormModal toggle={ this.toggleAddAcademicYear }
                                       isOpen={ this.state.addAcademicYearIsShowing }/>
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
                    { localStorage.userType !== "administrative_assistant" && <Button outline
                                                                                      color="success"
                                                                                      size="sm"
                                                                                      className="ml-auto"
                                                                                      onClick={ this.props.toggleAddAcademicYear }>Add</Button> }
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

    emptyState() {
        //TODO: Add year
        return (
            <div className="loading-container">
                <h4>There's nothing here.</h4>
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
            const isActive = this.props.activeYear === year.academic_year_start;
            const setActiveYear = () => this.props.setActiveYear(year);

            const yearStart = Number(year.academic_year_start);

            return (
                <SectionRow selectable
                            key={ index }
                            onClick={ setActiveYear }
                            active={ isActive }>

                    <SectionRowContent>{ yearStart } - { yearStart + 1 }</SectionRowContent>

                </SectionRow>
            );
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