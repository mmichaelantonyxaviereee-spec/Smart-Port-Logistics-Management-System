/**
 * Smart Port & Logistics - Fake Database
 * Mock data for development and testing
 */

const FakeDatabase = {
    // Current user
    currentUser: {
        email: 'm.michaelantonyxaviereee@gmail.com',
        name: 'Michael Xavier',
        role: 'Port Manager',
        loginTime: new Date()
    },

    // Ships data
    ships: [
        { id: 'SHIP001', name: 'CMA CGM Corsica', status: 'berthed', berth: 2, containers: 450, eta: '08:30', etd: '16:45' },
        { id: 'SHIP002', name: 'Maersk Seatrade', status: 'waiting', berth: null, containers: 320, eta: '09:15', etd: null },
        { id: 'SHIP003', name: 'Hapag Express', status: 'berthed', berth: 5, containers: 380, eta: '07:00', etd: '17:30' },
        { id: 'SHIP004', name: 'Evergreen Universe', status: 'waiting', berth: null, containers: 520, eta: '10:00', etd: null },
        { id: 'SHIP005', name: 'OOCL Hong Kong', status: 'berthed', berth: 1, containers: 410, eta: '06:30', etd: '15:00' },
        { id: 'SHIP006', name: 'MSC Gulsun', status: 'waiting', berth: null, containers: 550, eta: '11:30', etd: null },
        { id: 'SHIP007', name: 'ONE Apus', status: 'berthed', berth: 4, containers: 480, eta: '08:00', etd: '18:00' },
        { id: 'SHIP008', name: 'Seatrade Reefer', status: 'waiting', berth: null, containers: 200, eta: '12:00', etd: null },
        { id: 'SHIP009', name: 'Pacific Bridge', status: 'loading', berth: 3, containers: 390, eta: '07:45', etd: '16:15' },
        { id: 'SHIP010', name: 'Global Sky', status: 'waiting', berth: null, containers: 340, eta: '13:30', etd: null },
    ],

    // Berths data
    berths: [
        { id: 'BERTH01', name: 'Berth 01', status: 'occupied', ship: 'SHIP005', cranes: [1, 2, 3], capacity: 500 },
        { id: 'BERTH02', name: 'Berth 02', status: 'occupied', ship: 'SHIP001', cranes: [4, 5], capacity: 500 },
        { id: 'BERTH03', name: 'Berth 03', status: 'occupied', ship: 'SHIP009', cranes: [6, 7, 8], capacity: 500 },
        { id: 'BERTH04', name: 'Berth 04', status: 'occupied', ship: 'SHIP007', cranes: [9, 10], capacity: 500 },
        { id: 'BERTH05', name: 'Berth 05', status: 'occupied', ship: 'SHIP003', cranes: [11], capacity: 500 },
        { id: 'BERTH06', name: 'Berth 06', status: 'available', ship: null, cranes: [], capacity: 500 },
        { id: 'BERTH07', name: 'Berth 07', status: 'available', ship: null, cranes: [], capacity: 500 },
        { id: 'BERTH08', name: 'Berth 08', status: 'maintenance', ship: null, cranes: [], capacity: 500 },
    ],

    // Cranes data
    cranes: [
        { id: 'CRANE01', name: 'Crane 01', status: 'active', ship: 'SHIP005', utilization: 95 },
        { id: 'CRANE02', name: 'Crane 02', status: 'active', ship: 'SHIP005', utilization: 88 },
        { id: 'CRANE03', name: 'Crane 03', status: 'active', ship: 'SHIP005', utilization: 92 },
        { id: 'CRANE04', name: 'Crane 04', status: 'active', ship: 'SHIP001', utilization: 85 },
        { id: 'CRANE05', name: 'Crane 05', status: 'maintenance', ship: null, utilization: 0 },
        { id: 'CRANE06', name: 'Crane 06', status: 'active', ship: 'SHIP009', utilization: 78 },
        { id: 'CRANE07', name: 'Crane 07', status: 'active', ship: 'SHIP009', utilization: 82 },
        { id: 'CRANE08', name: 'Crane 08', status: 'active', ship: 'SHIP009', utilization: 90 },
        { id: 'CRANE09', name: 'Crane 09', status: 'active', ship: 'SHIP007', utilization: 75 },
        { id: 'CRANE10', name: 'Crane 10', status: 'active', ship: 'SHIP007', utilization: 88 },
        { id: 'CRANE11', name: 'Crane 11', status: 'active', ship: 'SHIP003', utilization: 70 },
        { id: 'CRANE12', name: 'Crane 12', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE13', name: 'Crane 13', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE14', name: 'Crane 14', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE15', name: 'Crane 15', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE16', name: 'Crane 16', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE17', name: 'Crane 17', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE18', name: 'Crane 18', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE19', name: 'Crane 19', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE20', name: 'Crane 20', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE21', name: 'Crane 21', status: 'idle', ship: null, utilization: 0 },
        { id: 'CRANE22', name: 'Crane 22', status: 'idle', ship: null, utilization: 0 },
    ],

    // Cargo data
    cargo: [
        { id: 'CARGO001', ship: 'SHIP005', containers: 450, status: 'unloading', progress: 75 },
        { id: 'CARGO002', ship: 'SHIP001', containers: 320, status: 'unloading', progress: 45 },
        { id: 'CARGO003', ship: 'SHIP003', containers: 380, status: 'customs', progress: 60 },
        { id: 'CARGO004', ship: 'SHIP009', containers: 390, status: 'unloading', progress: 50 },
        { id: 'CARGO005', ship: 'SHIP007', containers: 480, status: 'storage', progress: 85 },
    ],

    // Trucks data
    trucks: [
        { id: 'TRUCK001', status: 'in_port', cargo: 'CARGO005', gate: 'Gate 01', arrived: '10:30' },
        { id: 'TRUCK002', status: 'waiting', cargo: 'CARGO003', gate: 'Gate 02', arrived: '10:45' },
        { id: 'TRUCK003', status: 'in_port', cargo: 'CARGO001', gate: 'Gate 01', arrived: '11:00' },
        { id: 'TRUCK004', status: 'waiting', cargo: 'CARGO002', gate: 'Gate 02', arrived: '11:15' },
        { id: 'TRUCK005', status: 'departed', cargo: 'CARGO005', gate: 'Gate 03', arrived: '09:00' },
    ],

    // Yard/Storage data
    yard: {
        totalCapacity: 10000,
        currentContainers: 8700,
        pendingContainers: 1200,
        occupancy: 87,
        congestionLevel: 'HIGH',
        averageUnloadingTime: 4.2, // hours
    },

    // Traffic data
    traffic: {
        trucksEntering: 12,
        trucksLeaving: 8,
        trucksWaiting: 32,
        averageWaitingTime: 25, // minutes
        gateCongestion: 'MODERATE',
        roadCongestion: 'HIGH',
        trafficLevel: 'MODERATE',
    },

    // Cargo volume history (last 7 days)
    cargoVolumeHistory: [
        { day: 'Mon', volume: 2100 },
        { day: 'Tue', volume: 2450 },
        { day: 'Wed', volume: 1950 },
        { day: 'Thu', volume: 2800 },
        { day: 'Fri', volume: 3100 },
        { day: 'Sat', volume: 2600 },
        { day: 'Sun', volume: 2450 },
    ],

    // Truck movement history
    truckMovementHistory: [
        { time: '08:00', entering: 15, leaving: 8 },
        { time: '09:00', entering: 18, leaving: 12 },
        { time: '10:00', entering: 22, leaving: 10 },
        { time: '11:00', entering: 12, leaving: 15 },
        { time: '12:00', entering: 25, leaving: 18 },
        { time: '13:00', entering: 20, leaving: 22 },
        { time: '14:00', entering: 16, leaving: 14 },
    ],

    // Get summary statistics
    getSummary() {
        return {
            totalShips: this.ships.length,
            shipsWaiting: this.ships.filter(s => s.status === 'waiting').length,
            shipsLoading: this.ships.filter(s => s.status === 'loading' || s.status === 'berthed').length,
            availableBerths: this.berths.filter(b => b.status === 'available').length,
            totalBerths: this.berths.length,
            activeCranes: this.cranes.filter(c => c.status === 'active').length,
            totalCranes: this.cranes.length,
            cargoContainers: this.cargo.reduce((sum, c) => sum + c.containers, 0),
            trucksInPort: this.trucks.filter(t => t.status === 'in_port' || t.status === 'waiting').length,
            trucksWaiting: this.trucks.filter(t => t.status === 'waiting').length,
            trafficStatus: this.traffic.trafficLevel,
            congestionLevel: this.yard.congestionLevel,
            yardOccupancy: this.yard.occupancy,
        };
    },

    // Get ship details
    getShip(shipId) {
        return this.ships.find(s => s.id === shipId);
    },

    // Get berth details
    getBerth(berthId) {
        return this.berths.find(b => b.id === berthId);
    },

    // Update crane assignment
    assignCrane(craneId, shipId) {
        const crane = this.cranes.find(c => c.id === craneId);
        if (crane) {
            crane.ship = shipId;
            crane.status = 'active';
            return true;
        }
        return false;
    },

    // Release crane
    releaseCrane(craneId) {
        const crane = this.cranes.find(c => c.id === craneId);
        if (crane) {
            crane.ship = null;
            crane.status = 'idle';
            return true;
        }
        return false;
    },

    // Get trucks for cargo
    getTrucksForCargo(cargoId) {
        return this.trucks.filter(t => t.cargo === cargoId);
    },
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FakeDatabase;
}
