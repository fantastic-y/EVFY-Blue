function setUser() {
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let firstname = document.querySelector("#firstname").value;
    let lastname = document.querySelector("#lastname").value;

    if (username != "") {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("firstname", firstname);
        sessionStorage.setItem("lastname", lastname);
    } else {
        fetch("/getUserDetails", {
            method: "POST",
            body: JSON.stringify({ username }),
        })
            .then((res) => res.json())
            .then(console.log);

        document.querySelector("#username").value =
            sessionStorage.getItem("username");
        document.querySelector("#email").value =
            sessionStorage.getItem("email");
        document.querySelector("#firstname").value =
            sessionStorage.getItem("firstname");
        document.querySelector("#lastname").value =
            sessionStorage.getItem("lastname");
    }
}

setUser();
