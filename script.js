// Database Keys
let properties = JSON.parse(localStorage.getItem('nr_props')) || [];
let tempLayout = [];

// 1. Building Generator
function addFloor() {
    const f = document.getElementById('fName').value;
    const r = document.getElementById('rCount').value;
    if(f && r) {
        tempLayout.push({ floor: f, count: parseInt(r) });
        render('adminLayout', tempLayout);
        document.getElementById('fName').value = "";
        document.getElementById('rCount').value = "";
    }
}

function render(id, layout) {
    const area = document.getElementById(id);
    if(!area) return;
    area.innerHTML = layout.map(L => `
        <div class="floor-row">
            <div class="floor-label">Floor ${L.floor}</div>
            <div class="room-grid">
                ${Array.from({length: L.count}, (_, i) => `
                    <div class="room" onclick="this.classList.toggle('occupied')">${L.floor}0${i+1}</div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 2. Save Property
const form = document.getElementById('propForm');
if(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const p = {
    id: Date.now(),
    name: document.getElementById('pName').value,
    loc: document.getElementById('pLoc').value,
    rent: parseInt(document.getElementById('pRent').value),
    type: document.getElementById('pType').value,
    beds: document.getElementById('pBeds').value || "N/A",
    feats: document.getElementById('pFeatures').value.split(','),
    imgs: [
        document.getElementById('imgM').value,
        document.getElementById('imgR').value,
        document.getElementById('imgK').value,
        document.getElementById('imgB').value
    ],
    layout: [...tempLayout]
};
        properties.push(p);
        localStorage.setItem('nr_props', JSON.stringify(properties));
        alert("Published!");
        window.location.href = "listings.html";
    });
}

function loadListings() {
    const grid = document.getElementById('listingsGrid');
    if(!grid) return;
    grid.innerHTML = properties.map(p => `
        <div class="prop-card" id="card-${p.id}">
            <img src="${p.imgs[0]}" class="prop-img">
            <div class="prop-info">
                <h3>${p.name}</h3>
                <p>📍 ${p.loc} | ₹${p.rent}</p>
                <button class="btn" onclick="openModal(${p.id})">Check Details</button>
                <button onclick="deleteProperty(${p.id})" style="background:#ff7675; margin-top:5px;" class="btn">Delete Property</button>
            </div>
        </div>
    `).join('');
}

function deleteProperty(id) {
    if(confirm("Are you sure you want to delete this property?")) {
        properties = properties.filter(p => p.id !== id);
        localStorage.setItem('nr_props', JSON.stringify(properties));
        location.reload();
    }
}

function openModal(id) {
    const p = properties.find(x => x.id === id);
    const m = document.getElementById('modal');
    m.style.display = 'block';
    document.getElementById('mTitle').innerText = p.name;
    
    document.getElementById('mFeats').innerHTML = p.feats.map(f => `<span class="amenity-tag">✅ ${f.trim()}</span>`).join('');
    document.getElementById('mImgs').innerHTML = p.imgs.slice(1).map(src => src ? `<img src="${src}" class="modal-img">` : '').join('');
    
    // Added Inquiry Button
    let inquiryBtn = `<a href="https://wa.me/91XXXXXXXXXX?text=I'm interested in ${p.name}" target="_blank" class="btn" style="text-decoration:none; display:block; text-align:center; background:#25D366; margin-bottom:15px;">Inquire via WhatsApp</a>`;
    
    const layoutArea = document.getElementById('mLayout');
    render('mLayout', p.layout);
    layoutArea.insertAdjacentHTML('afterbegin', inquiryBtn);
}

window.onclick = (e) => { if(e.target.className === 'modal') e.target.style.display = 'none'; }

if(document.getElementById('listingsGrid')) loadListings();

function searchProperties() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('prop-card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        let loc = cards[i].querySelector('p').innerText.toLowerCase();
        if (title.includes(input) || loc.includes(input)) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function applyTenantFilters() {
    const locFilter = document.getElementById('fLoc').value.toLowerCase();
    const typeFilter = document.getElementById('fType').value;
    const priceFilter = document.getElementById('fPrice').value;

    const filtered = properties.filter(p => {
        const matchLoc = p.loc.toLowerCase().includes(locFilter);
        const matchType = typeFilter === "All" || p.type === typeFilter;
        const matchPrice = !priceFilter || p.rent <= parseInt(priceFilter);
        return matchLoc && matchType && matchPrice;
    });

    renderTenantListings(filtered);
}

function renderTenantListings(data) {
    const grid = document.getElementById('tenantGrid');
    if(!grid) return;
    grid.innerHTML = data.map(p => `
        <div class="prop-card">
            <div style="position:relative">
                <img src="${p.imgs[0]}" class="prop-img">
                <span style="position:absolute; top:10px; right:10px; background:var(--primary); color:white; padding:2px 8px; border-radius:4px; font-size:0.7rem; font-weight:bold;">${p.type}</span>
            </div>
            <div class="prop-info">
                <h3>${p.name}</h3>
                <p>📍 ${p.loc}</p>
                <p style="font-weight:bold; color:var(--primary)">₹${p.rent}/month</p>
                <div style="font-size:0.8rem; color:#666; margin-bottom:10px;">
                    ${p.type === 'PG' ? `🛏️ ${p.beds} Beds/Room` : '🏠 Full Unit'}
                </div>
                <button class="btn" onclick="openModal(${p.id})">View Details & Photos</button>
            </div>
        </div>
    `).join('');
}

// Call this on page load for tenant.html
if(document.getElementById('tenantGrid')) renderTenantListings(properties);