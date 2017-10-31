import settings from "./settings";

export default function graphql(object) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", `${settings.serverURL}/graphql/`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Token " + localStorage.token);
    xhr.onload = () => object.onResponse(xhr.response);
    xhr.send(JSON.stringify({ query : object.query }));
}
