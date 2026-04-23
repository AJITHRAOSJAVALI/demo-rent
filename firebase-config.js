// ==========================================
// PARENT: FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB1UJr_8cWGkzE1C3MBIz5bl6c44szXGes",
    authDomain: "namma-rent-1eb78.firebaseapp.com",
    projectId: "namma-rent-1eb78",
    storageBucket: "namma-rent-1eb78.firebasestorage.app",
    messagingSenderId: "1014188363352",
    appId: "1:1014188363352:web:9683348e6f24dcbc79042c"
};

// Initialize Firebase once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();