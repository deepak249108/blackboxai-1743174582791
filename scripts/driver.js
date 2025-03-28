// Driver Simulation
const driversCollection = db.collection('drivers');
let currentRide = null;

// Simulate nearby drivers
function simulateDrivers(center, radius = 0.02, count = 5) {
    // Clear existing drivers
    driverMarkers.forEach(marker => map.removeLayer(marker));
    driverMarkers = [];

    // Generate random driver positions
    for (let i = 0; i < count; i++) {
        const offsetLat = (Math.random() * 2 - 1) * radius;
        const offsetLng = (Math.random() * 2 - 1) * radius;
        const driverPos = {
            lat: center.lat + offsetLat,
            lng: center.lng + offsetLng
        };

        // Add driver marker with neon styling
        const driverMarker = L.circleMarker([driverPos.lat, driverPos.lng], {
            radius: 8,
            fillColor: "#ff00aa",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        driverMarkers.push(driverMarker);
    }
}

// Find nearest driver
function findNearestDriver(userLocation) {
    if (driverMarkers.length === 0) return null;
    
    // Simple distance calculation
    const distances = driverMarkers.map(marker => {
        const markerLatLng = marker.getLatLng();
        return {
            marker,
            distance: Math.sqrt(
                Math.pow(markerLatLng.lat - userLocation.lat, 2) +
                Math.pow(markerLatLng.lng - userLocation.lng, 2)
            )
        };
    });

    // Return closest driver
    return distances.reduce((prev, curr) => 
        prev.distance < curr.distance ? prev : curr
    ).marker;
}

// Initialize driver simulation when user location is known
auth.onAuthStateChanged(user => {
    if (user) {
        getUserLocation().then(userLocation => {
            simulateDrivers(userLocation);
        });
    }
});