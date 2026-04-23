// property-service.js
const PropertyApp = {
    loadMarket: function(containerId) {
        const container = document.getElementById(containerId);
        
        // Listen for all verified properties
        db.collection("properties")
          .where("isVerified", "==", true)
          .onSnapshot((snapshot) => {
            container.innerHTML = ""; // Clear the "Loading" text

            if (snapshot.empty) {
                container.innerHTML = "<p>Searching for homes in Bengaluru...</p>";
                return;
            }

            snapshot.forEach(doc => {
                const data = doc.data();
                // We build the HTML inside the JS and inject it
                container.innerHTML += `
                    <div class="market-card">
                        <div class="card-info">
                            <h3>${data.name}</h3>
                            <p>📍 ${data.area}</p>
                            <span class="status-tag">${data.status || 'Available'}</span>
                        </div>
                        <button class="btn-primary" onclick="alert('Contacting Owner...')">
                            Book Now
                        </button>
                    </div>
                `;
            });
        });
    }
};