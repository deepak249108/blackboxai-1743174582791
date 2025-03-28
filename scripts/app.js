// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add custom neon-themed tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// User location marker
let userMarker = null;
let driverMarkers = [];

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDummyKeyForDemoPurposes",
    authDomain: "neonride-demo.firebaseapp.com",
    projectId: "neonride-demo",
    storageBucket: "neonride-demo.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:dummyappidforneonride"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Simulate getting user location
function getUserLocation() {
    return new Promise((resolve) => {
        // For demo, use London coordinates
        resolve({ lat: 51.505, lng: -0.09 });
    });
}

// Initialize the app
async function initApp() {
    try {
        const userLocation = await getUserLocation();
        
        // Add user marker with neon styling
        userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
            radius: 10,
            fillColor: "#00f0ff",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);

        // Add pulsing effect
        userMarker.setStyle({
            className: 'pulse'
        });

        // Set view to user location
        map.setView([userLocation.lat, userLocation.lng], 15);

        console.log("App initialized successfully");
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);