// Main JavaScript file for workshop landing page
// Form validation and submission handling

/**
 * Validates email address format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validates name input
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateName(name) {
    if (!name || typeof name !== 'string') {
        return false;
    }
    
    const trimmedName = name.trim();
    
    // Check if name is empty or only whitespace
    if (trimmedName.length === 0) {
        return false;
    }
    
    // Check length constraints (minimum 2, maximum 100 characters)
    if (trimmedName.length < 2 || trimmedName.length > 100) {
        return false;
    }
    
    return true;
}

/**
 * Sanitizes user input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
function sanitizeInput(input) {
    if (!input || typeof input !== 'string') {
        return '';
    }
    
    // Remove HTML tags and potentially dangerous characters
    return input
        .replace(/</g, '')
        .replace(/>/g, '')
        .replace(/&/g, '')
        .trim();
}

/**
 * Validates entire form data
 * @param {Object} formData - Object containing form fields
 * @returns {boolean} - True if all fields are valid, false otherwise
 */
function validateForm(formData) {
    if (!formData || typeof formData !== 'object') {
        return false;
    }
    
    // Check if both name and email are valid
    return validateName(formData.name) && validateEmail(formData.email);
}

/**
 * Generates a simple CSRF token
 * @returns {string} - CSRF token
 */
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

/**
 * Checks if honeypot field is empty (good - means human user)
 * @param {string} honeypotValue - Value from honeypot field
 * @returns {boolean} - True if honeypot is empty (human), false if filled (bot)
 */
function checkHoneypot(honeypotValue) {
    return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Rate limiting check (simple implementation using localStorage)
 * @returns {boolean} - True if submission is allowed, false if rate limited
 */
function checkRateLimit() {
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    const now = Date.now();
    const cooldownPeriod = 30000; // 30 seconds
    
    if (lastSubmission && (now - parseInt(lastSubmission)) < cooldownPeriod) {
        return false;
    }
    
    return true;
}

/**
 * Handles form submission
 * @param {Event} event - Form submit event
 */
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const honeypot = formData.get('website'); // honeypot field
    const csrfToken = formData.get('csrf_token');
    
    // Security checks
    if (!checkHoneypot(honeypot)) {
        console.log('Bot detected via honeypot');
        return;
    }
    
    if (!checkRateLimit()) {
        showMessage('Please wait before submitting again.', 'error');
        return;
    }
    
    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    
    // Validate form data
    const formDataObj = {
        name: sanitizedName,
        email: sanitizedEmail
    };
    
    if (!validateForm(formDataObj)) {
        showMessage('Please check your input and try again.', 'error');
        return;
    }
    
    // Store submission (simulate backend)
    storeSubmission(formDataObj);
    
    // Update rate limiting
    localStorage.setItem('lastFormSubmission', Date.now().toString());
    
    // Show success message
    showMessage('Thank you for registering! We\'ll send you more details soon.', 'success');
    
    // Clear form
    form.reset();
}

/**
 * Stores form submission data (simulated backend)
 * @param {Object} data - Form data to store
 */
function storeSubmission(data) {
    // Get existing submissions
    const submissions = JSON.parse(localStorage.getItem('workshopSubmissions') || '[]');
    
    // Add new submission with timestamp
    submissions.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: generateCSRFToken()
    });
    
    // Store back to localStorage
    localStorage.setItem('workshopSubmissions', JSON.stringify(submissions));
    
    console.log('Submission stored:', data);
}

/**
 * Shows message to user
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add form submission handler
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Add CSRF token to form
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = generateCSRFToken();
        form.appendChild(csrfInput);
    }
    
    // Add smooth scrolling to CTA buttons
    const ctaButtons = document.querySelectorAll('[data-scroll-to]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            smoothScrollTo(targetId);
        });
    });
});