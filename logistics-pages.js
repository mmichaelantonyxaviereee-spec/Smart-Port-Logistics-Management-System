document.addEventListener('DOMContentLoaded', () => {
    const routeButton = document.getElementById('optimizeRoute');
    if (routeButton) routeButton.addEventListener('click', () => {
        document.querySelector('.route-option.recommended')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    const etaForm = document.getElementById('etaForm');
    if (etaForm) etaForm.addEventListener('input', () => {
        const distance = Number(document.getElementById('etaDistance').value) || 350;
        const speed = Number(document.getElementById('etaSpeed').value) || 62;
        const traffic = Number(document.getElementById('etaTraffic').value) || 15;
        const hours = distance / Math.max(speed - traffic, 20);
        const arrival = new Date(Date.now() + hours * 3600000);
        document.getElementById('etaResult').textContent = arrival.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        document.getElementById('etaDelay').textContent = traffic > 25 ? 'Expected Delay: 45 minutes' : 'On schedule: traffic impact is low';
    });

    const refresh = document.getElementById('refreshTracking');
    if (refresh) refresh.addEventListener('click', () => {
        document.querySelectorAll('[data-speed]').forEach(cell => { cell.textContent = `${58 + Math.floor(Math.random() * 10)} km/h`; });
        document.getElementById('trackingUpdated').textContent = `Updated ${new Date().toLocaleTimeString()}`;
    });

    document.querySelectorAll('[data-toggle]').forEach(toggle => toggle.addEventListener('change', event => {
        event.target.closest('.toggle-row').querySelector('.toggle-state').textContent = event.target.checked ? 'Enabled' : 'Disabled';
    }));
});
