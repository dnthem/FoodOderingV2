document.querySelector(".email-signup").classList.add("hidden");
document.querySelector("#signup-box-link").onclick = function() {
    document.querySelector(".email-login").classList.add("hidden");
    document.querySelector(".email-signup").classList.remove("hidden");
    document.querySelector("#login-box-link").classList.remove("active");
    document.querySelector("#signup-box-link").classList.add("active");
    };

document.querySelector("#login-box-link").onclick = function() {
    document.querySelector(".email-login").classList.remove("hidden")
    document.querySelector(".email-signup").classList.add("hidden");
    document.querySelector("#login-box-link").classList.add("active");
    document.querySelector("#signup-box-link").classList.remove("active");
};