import React, { Component } from "react";
import { Button } from "reactstrap";


class ErrorState extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isOnline = JSON.parse(localStorage.isOnline);

        const errorTitle = isOnline ?
            "An error occurred communicating with the server" :
            "Could not connect to the server";

        const errorMessage = isOnline ?
            `${this.props.children}` :
            `Make sure your computer is connected to the internet. ${this.props.children}`;

        return (
            <div className="loading-container">
                <h3>{errorTitle}</h3>
                <p className="mb-3">{errorMessage}</p>

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