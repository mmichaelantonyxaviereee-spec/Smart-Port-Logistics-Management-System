/**
 * Smart Port & Logistics - Dashboard Script
 */

// Update time display
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('timeDisplay').textContent = `${hours}:${minutes}:${seconds}`;
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Update time every second
    updateTime();
    setInterval(updateTime, 1000);

    // Set user email
    const userEmail = document.getElementById('userEmail');
    if (userEmail) {
        userEmail.textContent = FakeDatabase.currentUser.email;
    }

    // Update KPI values
    const summary = FakeDatabase.getSummary();
    
    const elements = {
        totalShips: document.getElementById('totalShips'),
        shipsWaiting: document.getElementById('shipsWaiting'),
        availableBerths: document.getElementById('availableBerths'),
        activeCranes: document.getElementById('activeCranes'),
        cargoContainers: document.getElementById('cargoContainers'),
        trucksInPort: document.getElementById('trucksInPort'),
    };

    if (elements.totalShips) elements.totalShips.textContent = summary.totalShips;
    if (elements.shipsWaiting) elements.shipsWaiting.textContent = summary.shipsWaiting;
    if (elements.availableBerths) elements.availableBerths.textContent = summary.availableBerths;
    if (elements.activeCranes) elements.activeCranes.textContent = summary.activeCranes;
    if (elements.cargoContainers) elements.cargoContainers.textContent = summary.cargoContainers.toLocaleString();
    if (elements.trucksInPort) elements.trucksInPort.textContent = summary.trucksInPort;

    // Draw charts
    drawCharts();

    // Setup navigation
    setupNavigation();
});

// Draw charts
function drawCharts() {
    // Cargo Volume Chart
    const cargoChart = new SimpleChart('cargoChart', 'line');
    cargoChart.draw({
        labels: FakeDatabase.cargoVolumeHistory.map(d => d.day),
        datasets: [
            {
                label: 'Cargo Volume',
                data: FakeDatabase.cargoVolumeHistory.map(d => d.volume),
                color: '#0066cc',
            }
        ]
    });

    // Truck Movement Chart
    const truckChart = new SimpleChart('truckChart', 'bar');
    truckChart.draw({
        labels: FakeDatabase.truckMovementHistory.map(d => d.time),
        datasets: [
            {
                label: 'Entering',
                data: FakeDatabase.truckMovementHistory.map(d => d.entering),
                color: '#28a745',
            },
            {
                label: 'Leaving',
                data: FakeDatabase.truckMovementHistory.map(d => d.leaving),
                color: '#0066cc',
            }
        ]
    });
}

// Setup navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Set active based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Real-time update simulation (updates every 30 seconds)
setInterval(() => {
    // Simulate data changes
    const summary = FakeDatabase.getSummary();
    
    // You could update dashboard with new data here
    // For now, just show that system is live
    console.log('Dashboard updated:', summary);
}, 30000);
