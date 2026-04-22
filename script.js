// --- 1. LOGIN LOGIC ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        if (email === "admin" && pass === "1234") {
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials. Try admin / 1234");
        }
    });
}

// --- 2. DYNAMIC INVENTORY LOGIC ---
// This line now checks if there is already a building saved in the browser
let currentBuildingData = JSON.parse(localStorage.getItem('nammaRentBuilding')) || [];

function addNewFloor() {
    const floor = document.getElementById('floorName').value;
    const count = document.getElementById('roomCount').value;

    if (floor && count) {
        currentBuildingData.push({ floor: floor, roomCount: parseInt(count) });
        
        // SAVE: This line pushes the data into the browser's permanent memory
        localStorage.setItem('nammaRentBuilding', JSON.stringify(currentBuildingData));
        
        renderLayout();
        
        document.getElementById('floorName').value = "";
        document.getElementById('roomCount').value = "";
    } else {
        alert("Enter floor name and room count!");
    }
}

function renderLayout() {
    const displayArea = document.getElementById('dynamicInventory');
    if (!displayArea) return;

    displayArea.innerHTML = ""; 

    currentBuildingData.forEach(level => {
        let row = document.createElement('div');
        row.className = 'floor-row';
        row.innerHTML = `<div class="floor-label">Floor ${level.floor}</div>`;

        let grid = document.createElement('div');
        grid.className = 'room-grid';

        for (let i = 1; i <= level.roomCount; i++) {
            grid.innerHTML += `<div class="room available" onclick="toggleStatus(this)">${level.floor}0${i}</div>`;
        }

        row.appendChild(grid);
        displayArea.appendChild(row);
    });
}

// --- 3. TOGGLE ROOM STATUS ---
function toggleStatus(element) {
    element.classList.toggle('available');
    element.classList.toggle('occupied');
}

// --- 4. THE "MEMORY" BOOT-UP ---
// When the dashboard opens, automatically show the saved floors
window.onload = function() {
    if (document.getElementById('dynamicInventory')) {
        renderLayout();
    }
};

// EXTRA: Clear data button (useful for testing)
function resetBuilding() {
    if(confirm("Are you sure you want to delete the whole building layout?")) {
        localStorage.removeItem('nammaRentBuilding');
        currentBuildingData = [];
        renderLayout();
    }
}