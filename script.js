// 1. YOUR FIREBASE CONNECTION (The "Plugs")
const firebaseConfig = {
    apiKey: "AIzaSyB1UJr_8cWGkzE1C3MBIz5bl6c44szXGes",
    authDomain: "namma-rent-1eb78.firebaseapp.com",
    projectId: "namma-rent-1eb78",
    storageBucket: "namma-rent-1eb78.firebasestorage.app",
    messagingSenderId: "1014188363352",
    appId: "1:1014188363352:web:9683348e6f24dcbc79042c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ---------------------------------------------------------
// 2. DASHBOARD LOGIC (Saving PG Data)
// ---------------------------------------------------------
const propForm = document.getElementById('propForm');

if (propForm) {
    propForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab values from your HTML inputs
        const pgData = {
            name: document.getElementById('pName').value,
            location: document.getElementById('pLoc').value,
            rent: document.getElementById('pRent').value,
            phone: document.getElementById('ownerPhone').value, // This is the ID link
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Push to the "properties" folder in the Cloud
        db.collection("properties").add(pgData)
            .then(() => {
                alert("Success! " + pgData.name + " is now live.");
                propForm.reset(); // Clears the form for next PG
            })
            .catch((error) => {
                alert("Error saving to cloud: " + error.message);
            });
    });
}

// ---------------------------------------------------------
// 3. TENANT LOGIC (Printing cards to the screen)
// ---------------------------------------------------------
const listContainer = document.getElementById('propertyList');

if (listContainer) {
    // This "Listens" for any new PG added to the database
    db.collection("properties").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        listContainer.innerHTML = ""; // Wipe the screen clean before printing updates
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // This is the HTML "Template" that gets printed for every PG
            const cardHTML = `
                <div class="form-card" style="margin-bottom:20px; border: 1px solid #ddd; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h2 style="margin-top:0; color:#007bff;">${data.name}</h2>
                    <p><strong>📍 Location:</strong> ${data.location}</p>
                    <p><strong>💰 Rent:</strong> ₹${data.rent} / month</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;">
                    <a href="https://wa.me/91${data.phone}?text=Hi, I saw your PG ${data.name} on Namma Rent and want to visit." 
                       target="_blank"
                       style="background: #25D366; color: white; padding: 12px; text-decoration: none; border-radius: 8px; display: block; text-align: center; font-weight: bold;">
                       💬 Chat with Owner on WhatsApp
                    </a>
                </div>
            `;
            
            listContainer.innerHTML += cardHTML;
        });
    });
}