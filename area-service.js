/**
 * AreaManager Module
 * Handles Bengaluru Area data and UI injection
 */
const AreaManager = {
    
    // 1. Injects the separate HTML file into a placeholder
    loadInterface: function(targetId) {
        fetch('area-list.html')
            .then(response => {
                if (!response.ok) throw new Error("Could not find area-list.html");
                return response.text();
            })
            .then(htmlContent => {
                document.getElementById(targetId).innerHTML = htmlContent;
                // Once HTML is loaded, start the data sync
                this.syncDropdown();
            })
            .catch(err => console.error("Error loading module:", err));
    },

    // 2. Keeps the Dropdown updated with Bengaluru areas in real-time
    syncDropdown: function() {
        db.collection("areas").orderBy("name").onSnapshot((snapshot) => {
            const dropdown = document.getElementById('areaDropdown');
            if (!dropdown) return;

            dropdown.innerHTML = '<option value="">All Bengaluru Areas</option>';
            snapshot.forEach(doc => {
                const area = doc.data().name;
                dropdown.innerHTML += `<option value="${area}">${area}</option>`;
            });
        });
    },

    // 3. Adds a new area to the database
    addNew: function(name) {
        if (!name || name.trim() === "") {
            alert("Please enter a Bengaluru area name.");
            return;
        }

        // Use the name as the Document ID to prevent duplicates
        db.collection("areas").doc(name.toLowerCase().trim()).set({
            name: name.trim(),
            addedAt: new Date().toISOString()
        })
        .then(() => {
            console.log("Area Updated!");
            const input = document.getElementById('newAreaInput');
            if (input) input.value = "";
        })
        .catch(err => alert("Error adding area: " + err.message));
    }
};