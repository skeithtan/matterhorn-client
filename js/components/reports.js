import React, { Component } from "react";
import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import moment from "moment";


class ReportBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="report-bar bg-dlsu-lighter d-flex flex-row p-3 pt-2 pb-2 align-items-center">
                <div className="mr-auto d-flex flex-row">
                    {this.props.children}
                </div>
                <div>
                    <Button color="light"
                            onClick={() => window.print()}>Print report</Button>
                </div>
            </div>
        );
    }
}

class YearAndTermReportBar extends Component {
    constructor(props) {
        super(props);

        this.onActiveYearChange = this.onActiveYearChange.bind(this);
    }

    onActiveYearChange(event) {
        this.props.setActiveYear(event.target.value);
    }

    render() {
        const academicYears = this.props.academicYears.map(year =>
            <option value={year}
                    key={year}>{`${year} - ${year + 1}`}</option>,
        );

        return (
            <ReportBar>
                <Form inline>
                    <FormGroup className="mr-4">
                        <Label for="academic-year"
                               className="text-white mr-3">Academic Year</Label>
                        <Input type="select"
                               className="btn-outline-light"
                               value={this.props.activeYear}
                               onChange={this.onActiveYearChange}>
                            {academicYears}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="term"
                               className="text-white mr-3">Term</Label>
                        <ButtonGroup>
                            <Button outline
                                    color="light"
                                    onClick={() => this.props.setActiveTerm(1)}
                                    active={this.props.activeTerm === 1}>1</Button>
                            <Button outline
                                    color="light"
                                    onClick={() => this.props.setActiveTerm(2)}
                                    active={this.props.activeTerm === 2}>2</Button>
                            <Button outline
                                    color="light"
                                    onClick={() => this.props.setActiveTerm(3)}
                                    active={this.props.activeTerm === 3}>3</Button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>

            </ReportBar>
        );
    }
}


class ReportHead extends Component {
    render() {
        const dateGenerated = moment().format("LLL");

        return (
            <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-row mr-auto align-items-center">
                    <img src="../images/dlsu_green.png"
                         className="report-dlsu-logo mr-2"/>
                    <div className="d-flex flex-column">
                        <div>External Relations and Internationalization Office</div>
                        <div>De La Salle University Manila</div>
                    </div>
                </div>

                <div className="d-flex flex-column text-right">
                    <div>Report Generated</div>
                    <div>{dateGenerated}</div>
                </div>
            </div>
        );
    }
}

class ReportTitleContainer extends Component {
    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                {this.props.children}
            </div>
        );
    }
}

class EndOfReportIndicator extends Component {
    render() {
        return (
            <div className="w-100 text-center p-5">
                <small className="font-weight-bold text-uppercase text-muted">End of Report</small>
            </div>
        )
    }
}

export {
    ReportBar,
    ReportHead,
    ReportTitleContainer,
    YearAndTermReportBar,
    EndOfReportIndicator
};