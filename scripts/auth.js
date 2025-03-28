// Firebase Authentication
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Login function
async function login(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("User logged in:", userCredential.user);
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Signup function
async function signup(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log("User signed up:", userCredential.user);
    } catch (error) {
        console.error("Error signing up:", error);
    }
}

// Event listeners for forms
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        login(email, password);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        signup(email, password);
    });
}