function authorizeXHR(xhr) {
    xhr.setRequestHeader("Authorization", `Token ${localStorage.token}`);
}

export default authorizeXHR;