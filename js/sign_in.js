import React, { Component } from "react";
import App from "./app";
import validateForm from "./form_validator";
import { Transport } from "lokka-transport-http";
import settings from "./settings";
import graphql from "./graphql";

import {
    Button,
    Input,
} from "reactstrap";


class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignedIn : false,
            showing : true,
            invalidCredentials : false,
            loading : true,
            form : {
                username : "",
                password : "",
            },
        };

        this.signOut = this.signOut.bind(this);
        this.signInPage = this.signInPage.bind(this);
        this.attemptSignIn = this.attemptSignIn.bind(this);
        this.getFormErrors = this.getFormErrors.bind(this);

        // Fake initial loading
        setTimeout(() => {
            const signedIn = localStorage.token !== undefined;
            this.setState({
                loading : false,
                isSignedIn : signedIn,
                showing : !signedIn,
            });
        }, 700);
    }

    signOut() {
        localStorage.clear();

        this.setState({
            showing : true,
            loading : true,
        });

        setTimeout(() => {
            this.setState({
                isSignedIn : false,
                loading : false,
            });
        }, 500);
    }

    getChangeHandler(fieldName) {
        const form = this.state.form;
        return event => {
            form[fieldName] = event.target.value;
            this.setState({
                invalidCredentials : false, //Remove invalid credentials on retry
                form : form,
            });
        };
    }

    attemptSignIn() {
        this.setState({
            loading : true,
        });

        $.post({
            url : `${settings.serverURL}/sign-in/`,
            data : this.state.form,
        }).done(response => {
            $("#sign-in").find("input").val("");
            localStorage.token = response.token;
            localStorage.username = response.username;

            const headers = { "Authorization" : `Token ${localStorage.token}` };
            // Add headers to transport
            graphql._transport = new Transport(`${settings.serverURL}/graphql/`, { headers });

            setTimeout(() => {
                this.setState({
                    isSignedIn : true,
                    loading : false,
                    showing : false,
                    form : {
                        username : "",
                        password : "", //Reset fields
                    },
                });
            }, 700);
        }).fail((response) => {
            console.log(response);

            if (response.status === 401) {
                this.setState({
                    invalidCredentials : true,
                    loading : false,
                });
                return;
            }

            alert("An error occurred connecting to the server.");
            this.setState({
                loading : false,
            });

        });
    }

    getFormErrors() {
        return validateForm([
            {
                name : "Username",
                characterLimit : 30,
                value : this.state.form.username,
                customValidators : [{
                    isValid : fieldValue => fieldValue.indexOf(" ") === -1,
                    errorMessage : fieldName => `${fieldName} should not have whitespaces`,
                }],
            },
            {
                name : "Password",
                characterLimit : null,
                value : this.state.form.password,
            },
        ]);
    }

    signInPage() {
        const { formHasErrors, fieldErrors } = this.getFormErrors();

        let complaint = null;

        if (formHasErrors) {
            if (fieldErrors["Password"].length > 0) {
                complaint = fieldErrors["Password"][0];
            }

            if (fieldErrors["Username"].length > 0) {
                complaint = fieldErrors["Username"][0];
            }
        }

        if (this.state.invalidCredentials) {
            complaint = "Invalid Credentials";
        }

        const handleEnterKeypress = (event) => {
            if (event.key === "Enter" && !formHasErrors && !this.state.invalidCredentials) {
                this.attemptSignIn();
            }
        };

        return (
            <div id="sign-in"
                 className={`bg-dlsu h-100 w-100 p-5 d-flex flex-column justify-content-center align-items-center ${this.state.showing ? "showing" : "hidden"}`}>

                <div id="sign-in-contents"
                     className={`d-flex flex-column justify-content-center align-items-center ${this.state.showing ? "signed-out" : "signed-in"}`}>

                    <div id="logo-set"
                         className="d-flex flex-row align-items-center mb-3">
                        <img src="./images/dlsu_white.png"
                             className="mr-5 dlsu-logo"/>
                        <h1 id="erio-logo"
                            className="text-white">
                            External Relations and Internationalization Office
                        </h1>
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-5">

                        <SignInSpinner className={this.state.loading ? "showing" : "hidden"}/>

                        <div id="sign-in-box"
                             className={`flex-column
                                ${this.state.loading || this.state.isSignedIn ? "hidden" : "showing"}
                                ${this.state.invalidCredentials ? "shaking" : ""}`}>

                            {complaint !== null && <p className={`mb-3 text-center text-white`}>
                                {complaint}
                            </p>}

                            <Input className="bg-dlsu-lighter text-white border-0 mb-3"
                                   placeholder="Username"
                                   onChange={this.getChangeHandler("username")}
                                   onKeyPress={handleEnterKeypress}
                                   defaultValue={this.state.form.username}/>

                            <Input type="password"
                                   className="bg-dlsu-lighter text-white border-0 mb-3"
                                   placeholder="Password"
                                   onChange={this.getChangeHandler("password")}
                                   onKeyPress={handleEnterKeypress}
                                   defaultValue={this.state.form.password}/>

                            <Button outline
                                    color="light"
                                    disabled={formHasErrors || this.state.invalidCredentials}
                                    onClick={this.attemptSignIn}>
                                Sign in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.signInPage()}
                {this.state.isSignedIn && <App signOut={this.signOut}/>}
            </div>
        );
    }

}

class SignInSpinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="sign-in-spinner"
                 className={this.props.className}>
                <div className="spinner spinner-white spinner-lg">
                    <div className="bounce1">

                    </div>
                    <div className="bounce2">

                    </div>
                    <div className="bounce3">

                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;