import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import $ from "jquery";
import settings from "./settings";


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

        $.post({
            url : `${settings.serverURL}/sign-in/`,
            data : {
                username : username,
                password : password,
            },
            success : response => {
                localStorage.token = response.token;
                onSignIn();
            },
            error : response => {
                switch(response.statusCode) {
                    case 401:
                        signInMessage.text = "Invalid credentials";
                        signInMessage.show();
                        return;
                    default:
                        signInMessage.text = "Could not connect to the server";
                        signInMessage.show();
                        return;
                }
            },
        });
    });


    function onSignIn() {
        renderReact();
        const signInView = $("#sign-in");
        signInView.fadeOut(500, () => signInView.remove());
    }

    function renderReact() {
        ReactDOM.render(<App/>, document.getElementById("root"));
    }


});