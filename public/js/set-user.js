function setUser() {
    let username = document.querySelector("#username").value;

    sessionStorage.setItem("username", username);
}

setUser();
