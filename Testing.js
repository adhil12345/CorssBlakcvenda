const loginForm = document.getElementById("login-form");
        const loadingSpinner = document.getElementById("loading-spinner");

        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            // Simulate login process with a timeout (you would replace this with your actual login logic)
            loadingSpinner.style.display = "block";
            setTimeout(() => {
                loadingSpinner.style.display = "none";
                alert("Login successful!");
            }, 2000); // Simulating a 2-second login process
        });