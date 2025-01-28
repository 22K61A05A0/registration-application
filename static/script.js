document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const fullName = document.querySelector('input[placeholder="Enter your name"]');
    const username = document.querySelector('input[placeholder="Enter your username"]');
    const email = document.querySelector('input[placeholder="Enter email-id"]');
    const phone = document.querySelector('input[placeholder="Enter mobile no"]');
    const password = document.querySelector('input[placeholder="Enter valid password"]');
    const confirmPassword = document.querySelector('input[placeholder="Confirm  password"]');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!fullName.value.trim()) {
            alert("Full Name is required.");
            fullName.focus();
            return;
        }
        
        if (!username.value.trim()) {
            alert("Username is required.");
            username.focus();
            return;
        }
        
        if (!validateEmail(email.value)) {
            alert("Please enter a valid email address.");
            email.focus();
            return;
        }
        
        if (!validatePhone(phone.value)) {
            alert("Please enter a valid phone number (10 digits).");
            phone.focus();
            return;
        }
        
        if (password.value.length < 6) {
            alert("Password must be at least 6 characters long.");
            password.focus();
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match.");
            confirmPassword.focus();
            return;
        }
        
        if (![...genderRadios].some(radio => radio.checked)) {
            alert("Please select a gender.");
            return;
        }
        
        // Successful Submission
        alert("Registration Successful!");
        form.reset(); // Reset the form after successful submission
    });
    
    // Helper Functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
});


