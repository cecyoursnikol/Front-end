document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");
    var message = document.getElementById("message");
    var loginBtn = document.getElementById("loginBtn");

    var attempts = 0;
    var isLocked = false;

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if (isLocked) return;

        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        if (username === "admin" && password === "123") {
            message.innerText = "Login successful!";
            message.style.color = "lightgreen";
            message.classList.add("show");
        } else {
            attempts++;
            if (attempts >= 3) {
                isLocked = true;
                message.innerText = "Account locked for 30 seconds.";
                message.classList.add("show");
                loginBtn.disabled = true;

                setTimeout(function() {
                    attempts = 0;
                    isLocked = false;
                    message.innerText = "";
                    message.classList.remove("show");
                    loginBtn.disabled = false;
                }, 30000);
            } else {
                message.innerText = "Incorrect login. " + (3 - attempts) + " attempts left.";
                message.classList.add("show");
            }
        }
    });
});
