/**
 * OwnerManager Module
 * Handles Room Grid and Tenant Sidebars
 */
const OwnerManager = {

    initHub: function() {
        const phone = localStorage.getItem("userPhone");
        if (!phone) return window.location.href = "index.html";

        // 1. Fetch the Property details assigned to this owner
        db.collection("properties").where("ownerPhone", "==", phone).get()
        .then(snap => {
            snap.forEach(doc => {
                const data = doc.data();
                document.getElementById('propNameDisplay').innerText = data.name;
                this.renderGrid(data.roomCount || 10); // Default to 10 if not set
            });
        });

        // 2. Fetch Upcoming Tenants for the Shady Green sidebar
        this.loadUpcoming(phone);
    },

    renderGrid: function(count) {
        const grid = document.getElementById('roomGrid');
        grid.innerHTML = "";
        for (let i = 1; i <= count; i++) {
            const box = document.createElement('div');
            box.className = "room-box empty";
            box.innerText = i;
            // Toggle logic
            box.onclick = () => this.toggleRoom(box);
            grid.appendChild(box);
        }
    },

    toggleRoom: function(el) {
        if (el.classList.contains('empty')) {
            el.className = "room-box unpaid";
        } else if (el.classList.contains('unpaid')) {
            el.className = "room-box paid";
        } else {
            el.className = "room-box empty";
        }
    },

    loadUpcoming: function(ownerPhone) {
        const list = document.getElementById('upcomingTenants');
        db.collection("bookings")
          .where("ownerPhone", "==", ownerPhone)
          .where("status", "==", "upcoming")
          .onSnapshot(snap => {
              list.innerHTML = "";
              snap.forEach(doc => {
                  const t = doc.data();
                  list.innerHTML += `
                    <div class="tenant-card shady-green">
                        <strong>${t.tenantName}</strong><br>
                        <small>Room ${t.roomNo} • Starts ${t.startDate}</small>
                    </div>
                  `;
              });
          });
    }
};