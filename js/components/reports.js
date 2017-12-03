import React, { Component } from "react";
import { Button } from "reactstrap";
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

export {
    ReportBar,
    ReportHead,
    ReportTitleContainer,
};