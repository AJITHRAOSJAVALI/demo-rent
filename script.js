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
let currentBuildingData = [];

function addNewFloor() {
    const floor = document.getElementById('floorName').value;
    const count = document.getElementById('roomCount').value;

    if (floor && count) {
        currentBuildingData.push({ floor: floor, roomCount: parseInt(count) });
        renderLayout();
        
        // Clear inputs
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
    if (element.classList.contains('available')) {
        element.classList.remove('available');
        element.classList.add('occupied');
    } else {
        element.classList.remove('occupied');
        element.classList.add('available');
    }
}