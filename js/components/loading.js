import React, { Component } from "react";


class LoadingSpinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading-container">
                {!this.props.noSpinner &&
                <div className="spinner spinner-secondary spinner-sm">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                }

                {!this.props.noText &&
                <h3 className="mt-4">Loading...</h3>
                }
            </div>
        );
    }
}

export default LoadingSpinner;