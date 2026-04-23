/**
 * AdminManager Module
 * Handles executive verification tasks
 */
const AdminManager = {
    
    init: function() {
        console.log("Admin Dashboard Initialized");
        // No need to sync dropdown here because area-service.js 
        // does it automatically when loadInterface is called.
    },

    verifyAndPublish: function() {
        const name = document.getElementById('propName').value;
        const area = document.getElementById('areaDropdown').value;

        if (!name || !area) {
            alert("Error: Name and Area are required to publish.");
            return;
        }

        // Create the property in the database
        db.collection("properties").add({
            name: name,
            area: area,
            isVerified: true,
            status: "available",
            verifiedAt: new Date().toISOString()
        })
        .then(() => {
            alert("Success! " + name + " is now live for Tenants.");
            document.getElementById('propName').value = ""; // Reset
        })
        .catch(error => {
            alert("Database Error: " + error.message);
        });
    }
};