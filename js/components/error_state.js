import React, { Component } from "react";
import { Button } from "reactstrap";


class ErrorState extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading-container">
                <h3>Could not connect to the server</h3>
                <p className="mb-3">Make sure your computer is connected to the internet. {this.props.children}</p>

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