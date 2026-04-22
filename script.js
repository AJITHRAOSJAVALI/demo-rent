document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents page from reloading

        // Get the values the user typed in
        const emailOrPhone = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // Simple validation for now
        if (emailOrPhone === "admin" && password === "1234") {
            alert("Login Successful! Welcome to Namma Rent.");
            // Later we will redirect to the home page here:
            // window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Try 'admin' and '1234' for testing.");
        }
    });
});

function toggleRoom(element) {
    if (element.classList.contains('available')) {
        element.classList.remove('available');
        element.classList.add('occupied');
        // You would eventually send an update to your database here
        console.log("Room " + element.innerText + " marked as Occupied");
    } else {
        element.classList.remove('occupied');
        element.classList.add('available');
        console.log("Room " + element.innerText + " marked as Available");
    }
}