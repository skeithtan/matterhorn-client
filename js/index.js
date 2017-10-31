import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import $ from "jquery";


$(() => {
    const isLoggedIn = localStorage.token !== undefined;
    if (isLoggedIn) {
        ReactDOM.render(<App/>, document.getElementById("root"));
        $("#sign-in").remove();
    }

    const signInMessage = $("#sign-in-message");
    signInMessage.hide();

    $("#sign-in-button").click(() => {
        const username = $("#username-input").val();
        const password = $("#password-input").val();
        console.log(username, password);
        signIn();
    });
});

function signIn() {
    renderReact();
    const signInView = $("#sign-in");
    signInView.fadeOut(500, () => signInView.remove());
}

function renderReact() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}



