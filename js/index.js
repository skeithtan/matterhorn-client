import React from "react";
import ReactDOM from "react-dom";
import SignIn from "./sign_in";


ReactDOM.render(<SignIn/>, document.getElementById("root"));


// import App from "./app";
// import $ from "jquery";
// import settings from "./settings";
// import iziToast from "izitoast";
//
// //Default iziToast settings

// const showingCSS = {
//     "opacity" : 1,
//     "pointer-events" : "all",
// };
//
// const hidingCSS = {
//     "opacity" : 0,
//     "pointer-events" : "none",
// };
//
// $(() => {
//     const isLoggedIn = localStorage.token !== undefined;
//     const signInBox = $("#sign-in-box");
//     signInBox.css("opacity", 0);
//
//     setTimeout(() => {
//         if (isLoggedIn) {
//             onSignIn();
//             return;
//         }
//
//         showSignInBox(true);
//     }, 500);
//
//
//     const signInMessage = $("#sign-in-message");
//     signInMessage.hide();
//
//     $("#sign-in-button").click(attemptSignIn);
//     $("#password-input").on("keydown", event => {
//         if (event.which === 13) {
//             attemptSignIn();
//         }
//     });
//
//     function attemptSignIn() {
//         const usernameInput = $("#username-input");
//         const passwordInput = $("#password-input");
//
//         const username = usernameInput.val();
//         const password = passwordInput.val();
//
//         usernameInput.val("");
//         passwordInput.val("");
//
//         signInMessage.hide();
//
//         showSignInBox(false);
//

//
// });
//
// function showSignInBox(signInBoxShouldShow) {
//     const spinner = $("#sign-in-spinner");
//     const signInBox = $("#sign-in-box");
//
//     signInBox.css(signInBoxShouldShow ? showingCSS : hidingCSS);
//     spinner.css(signInBoxShouldShow ? hidingCSS : showingCSS);
// }
//
// function renderReact() {
//     ReactDOM.render(<App/>, document.getElementById("root"));
// }
//
// function onSignIn() {
//     renderReact();
//     const signInView = $("#sign-in");
//
//     setTimeout(() => {
//         toggleSignInContents();
//         signInView.css(hidingCSS);
//     }, 700);
// }
//
// function signOut() {
//     localStorage.clear();
//
//     const signInView = $("#sign-in");
//     toggleSignInContents();
//     signInView.css(showingCSS);
//
//     showSignInBox(true);
// }
//
// function toggleSignInContents() {
//     const signInContents = $("#sign-in-contents");
//     signInContents.toggleClass("signed-out");
//     signInContents.toggleClass("signed-in");
// }
//
// export default signOut;
