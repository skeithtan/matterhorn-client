import React, { Component } from "react";
import { Button } from "reactstrap";


class ErrorState extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading-container">
                <h3>An error occurred</h3>
                <p style={{ maxWidth : "400px" }}>Make sure your computer is connected to the
                    internet. {this.props.children}</p>

                <br/>

                <Button outline
                        color="success"
                        onClick={this.props.onRetryButtonClick}>
                    Reload data
                </Button>
            </div>
        );
    }
}

export default ErrorState;