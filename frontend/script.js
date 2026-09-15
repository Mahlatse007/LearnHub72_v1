// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create a notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = '<i data-lucide="check-circle" class="h-5 w-5"></i><span>Message sent successfully!</span>';
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Reset form
    this.reset();
});

// Add hover effects to reference placeholders
document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

<<<<<<< HEAD:frontend/script.js
#console.log('Website loaded successfully!');

//
//
// login and registration form handling
//
//
const API_URL = 'http://localhost:3000/api/auth';
const form = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('toggleBtn');
const toggleText = document.getElementById('toggleText');
const message = document.getElementById('message');

let isLoginMode = true;

// Toggle between login and register
toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    formTitle.textContent = isLoginMode ? 'Login' : 'Register';
    submitBtn.textContent = isLoginMode ? 'Login' : 'Register';
    toggleText.textContent = isLoginMode ? "Don't have an account?" : "Already have an account?";
    toggleBtn.textContent = isLoginMode ? 'Register' : 'Login';
    message.textContent = '';
    message.className = '';
});

// Handle form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = '';
    message.className = '';
    submitBtn.disabled = true;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const endpoint = isLoginMode ? '/login' : '/register';
    const url = API_URL + endpoint;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        if (isLoginMode) {
            // Save token and redirect
            localStorage.setItem('token', data.token);
            message.textContent = 'Login successful! Redirecting...';
            message.className = 'success';
            setTimeout(() => {
                window.location.href = '/dashboard.html'; // change to your protected page
            }, 1000);
        } else {
            message.textContent = 'Account created! Please login.';
            message.className = 'success';
            // Switch to login mode
            toggleBtn.click();
        }

    } catch (err) {
        message.textContent = err.message;
        message.className = 'error';
    } finally {
        submitBtn.disabled = false;
    }
});
=======
//GETTING USERS FROM API
async function getUsers() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/users"
        );

        const users = await response.json();

        console.log(users);

    } catch (error) {
        console.error("Error getting users:", error);
    }
}

getUsers();
>>>>>>> 79defc265bc89c9dd1254a3eeb9da48d18bcb93d:app/script.js
