// 1. YOUR CLOUD CONNECTION (From your Firebase Photo)
const firebaseConfig = {
  apiKey: "AIzaSyB1UJr_8cWGkzE1C3MBIz5bl6c44szXGes",
  authDomain: "namma-rent-1eb78.firebaseapp.com",
  projectId: "namma-rent-1eb78",
  storageBucket: "namma-rent-1eb78.firebasestorage.app",
  messagingSenderId: "1014188363352",
  appId: "1:1014188363352:web:9683348e6f24dcbc79042c"
};

// Initialize the "Brain"
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ---------------------------------------------------------
// 2. DASHBOARD: SAVE NEW PROPERTY TO CLOUD
// ---------------------------------------------------------
const propForm = document.getElementById('propForm');

if (propForm) {
    propForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newProperty = {
            name: document.getElementById('pName').value,
            location: document.getElementById('pLoc').value,
            rent: document.getElementById('pRent').value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Real-time clock
        };

        // This sends the data to the Cloud instead of your laptop's memory
        db.collection("properties").add(newProperty)
            .then(() => {
                alert("Success! Property is now LIVE in the Cloud.");
                propForm.reset();
                window.location.href = "tenant.html"; // Go see it live!
            })
            .catch((error) => {
                console.error("Error saving to cloud: ", error);
                alert("Error: Check if you set 'Rules' to true in Firebase.");
            });
    });
}

// ---------------------------------------------------------
// 3. TENANT PAGE: REAL-TIME UPDATES (No Refresh Needed)
// ---------------------------------------------------------
const tenantGrid = document.getElementById('tenantGrid');

if (tenantGrid) {
    // This "listens" to the cloud. If you add a property on the dashboard, 
    // it pops up here instantly on any device!
    db.collection("properties").orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            tenantGrid.innerHTML = ""; // Clear old cards

            snapshot.forEach((doc) => {
                const data = doc.data();
                
                // Create the Card HTML
                const card = `
                    <div class="prop-card">
                        <div class="prop-info">
                            <h3>${data.name}</h3>
                            <p>📍 ${data.location}</p>
                            <p class="rent-tag">₹${data.rent}/month</p>
                        </div>
                        <button class="view-btn" onclick="goToRooms('${doc.id}')">
                            View Availability
                        </button>
                    </div>
                `;
                tenantGrid.innerHTML += card;
            });
        });
}

// Helper function to navigate
function goToRooms(propertyId) {
    window.location.href = `owner.html?id=${propertyId}`;
}