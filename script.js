
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });
});

$(document).ready(function () {

    // Mobile navigation
    $("#menuBtn").click(function () {
        $("#navLinks").toggleClass("open");

        const isOpen = $("#navLinks").hasClass("open");
        $(this).text(isOpen ? "✕" : "☰");
        $(this).attr("aria-expanded", String(isOpen));
    });

    // Restore saved dark mode
    if (localStorage.getItem("theme") === "dark") {
        $("body").addClass("dark");
        $("#themeBtn").text("☀");
    }

    // Light and dark mode
    $("#themeBtn").click(function () {
        $("body").toggleClass("dark");

        const dark = $("body").hasClass("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
        $(this).text(dark ? "☀" : "☾");
    });

    // Close mobile menu after navigation
    $("#navLinks a").click(function () {
        $("#navLinks").removeClass("open");
        $("#menuBtn").text("☰").attr("aria-expanded", "false");
    });

    // Contact form validation
    $("#contactForm").submit(function (event) {
        event.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();

        if (!name || !email || !subject || !message) {
            $("#formStatus").text("Please fill in all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $("#formStatus").text("Please enter a valid email.");
            return;
        }

        // Replace with your actual email address
        const recipient = "your.email@example.com";

        const mailSubject = encodeURIComponent(subject);
        const mailBody = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        $("#formStatus").text("Opening your email application...");

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + mailSubject +
            "&body=" + mailBody;
    });

});
