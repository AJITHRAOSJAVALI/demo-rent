// auth-service.js
let isSignUp = false;

const AuthApp = {
    // This function handles the "Sign Up" vs "Login" visual switch
    toggleView: function() {
        isSignUp = !isSignUp;
        const formTitle = document.getElementById('formTitle');
        const submitBtn = document.getElementById('submitBtn');
        const signUpFields = document.getElementById('signUpFields');
        const toggleText = document.getElementById('toggleText');
        const toggleBtn = document.getElementById('toggleAuth');

        formTitle.innerText = isSignUp ? "Create Account" : "Member Login";
        submitBtn.innerText = isSignUp ? "Register Now" : "Secure Login";
        signUpFields.style.display = isSignUp ? "block" : "none";
        toggleText.innerText = isSignUp ? "Already have an account?" : "Don't have an account?";
        toggleBtn.innerText = isSignUp ? "Login" : "Sign Up";
    }
};

// Attach the listener to the toggle link
const toggleAuth = document.getElementById('toggleAuth');
if (toggleAuth) {
    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        AuthApp.toggleView(); // Calling the function by name + dot
    });
}