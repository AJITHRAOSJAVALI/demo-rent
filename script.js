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

// This runs only on the Dashboard page
if (window.location.pathname.includes('dashboard.html')) {
    const postForm = document.getElementById('postPropertyForm');

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capture the text details
        const propertyData = {
            name: document.querySelector('input[placeholder*="Sunrise PG"]').value,
            location: document.querySelector('input[placeholder*="Koramangala"]').value,
            rent: document.querySelector('input[placeholder="15000"]').value,
            deposit: document.querySelector('input[placeholder="50000"]').value,
            verified: true,
            timestamp: new Date().toLocaleString()
        };

        // 2. Capture the checklist status
        const checks = document.querySelectorAll('.checklist-items input[type="checkbox"]');
        const verificationResults = {};
        checks.forEach((check, index) => {
            verificationResults[`step_${index}`] = check.checked;
        });

        console.log("Saving Property:", propertyData);
        console.log("Verification Checklist:", verificationResults);

        // 3. Show a success notification
        alert(`Success! Property in ${propertyData.location} has been rectified and uploaded.`);
        
        // Reset form for the next property visit
        postForm.reset();
});
}