// ================================
// LearnHub Frontend JavaScript
// ================================


// ================================
// Mobile Menu
// ================================

function toggleMobileMenu() {

    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenu) {
        mobileMenu.classList.toggle("hidden");
    }
}


// Close mobile menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        const mobileMenu = document.getElementById("mobile-menu");

        if (mobileMenu) {
            mobileMenu.classList.add("hidden");
        }

    });

});

// ================================
// HOME
// ================================


    
        // Render Lucide icons.
        if (window.lucide) {
            lucide.createIcons();
        }

        // Current year.
        document.getElementById('year').textContent = new Date().getFullYear();

        // Mobile navigation.
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        function closeMobileMenu() {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation menu');
            menuButton.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            if (window.lucide) lucide.createIcons();
        }

        menuButton.addEventListener('click', function () {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                closeMobileMenu();
            } else {
                mobileMenu.classList.remove('hidden');
                menuButton.setAttribute('aria-expanded', 'true');
                menuButton.setAttribute('aria-label', 'Close navigation menu');
                menuButton.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
                if (window.lucide) lucide.createIcons();
            }
        });

        document.querySelectorAll('.mobile-link').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // FAQ accordion.
        document.querySelectorAll('.faq-toggle').forEach(function (button) {
            button.addEventListener('click', function () {
                const answer = button.nextElementSibling;
                const icon = button.querySelector('.faq-icon');
                const willOpen = button.getAttribute('aria-expanded') !== 'true';

                button.setAttribute('aria-expanded', String(willOpen));
                answer.hidden = !willOpen;

                if (icon) {
                    icon.setAttribute('data-lucide', willOpen ? 'minus' : 'plus');
                    if (window.lucide) lucide.createIcons();
                }
            });
        });

        // Preselect a service when a service card link is clicked.
        document.querySelectorAll('[data-service]').forEach(function (link) {
            link.addEventListener('click', function () {
                const serviceSelect = document.getElementById('service');
                const requestedService = link.getAttribute('data-service');
                const matchingOption = Array.from(serviceSelect.options).find(
                    option => option.text === requestedService
                );

                if (matchingOption) serviceSelect.value = matchingOption.value;
            });
        });

        // Prevent placeholder social links from navigating to the top.
        document.querySelectorAll('[data-social-placeholder]').forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                alert('Add your official Devanty social profile URL to activate this link.');
            });
        });

        // Demo contact form: opens an email draft.
        // Replace this address with your official business email.
        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');
        const recipient = 'mahlatsemakgati72@gmail.com';

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const data = new FormData(contactForm);

            const subject = 'Devanty Technologies enquiry: ' + data.get('service');

            const body = [
                'New enquiry for Devanty Technologies',
                '',
                'Name: ' + data.get('name'),
                'Company / organisation: ' + (data.get('company') || 'Not provided'),
                'Email: ' + data.get('email'),
                'Phone: ' + (data.get('phone') || 'Not provided'),
                'Service: ' + data.get('service'),
                'Estimated budget: ' + (data.get('budget') || 'Not specified'),
                '',
                'Project details:',
                data.get('message'),
                '',
                'The sender agreed to the enquiry privacy statement.'
            ].join('\n');

            const mailto = 'mailto:' + recipient
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);

            formStatus.textContent =
                'Opening your email application. Please review and send the draft there.';

            window.location.href = mailto;
        });
    


// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        event.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ================================
// Navbar Scroll Effect
// ================================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (nav) {

        if (window.scrollY > 50) {
            nav.classList.add("shadow-md");
        } else {
            nav.classList.remove("shadow-md");
        }

    }

});


// ================================
// Registration
// ================================

async function registerUser(event) {

    // Stop the normal HTML form submission
    event.preventDefault();

    // Get passwords
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check that passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }


    // Collect registration data
    const user = {

        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        idnumber: document.getElementById("idnumber").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value,
        username: document.getElementById("username").value,
        address: document.getElementById("address").value,
        contactnumber: document.getElementById("contactnumber").value,
        password: password
    };

    try {

        // Send data to FastAPI
        const response = await fetch(
            "http://127.0.0.1:8000/users/add-users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            }
        );

        
        // Get API response
        const data = await response.json();
        //console.log("API response:", data);

        // Check whether registration succeeded
        if (!response.ok) {
            console.error("Registration failed:", data);
            alert("Registration failed.");
            return;
        } else {
            // Success
            alert("Registration successful!");
        }

        // Clear form
        document.querySelector("form").reset();


    } catch (error) {
        console.error("Error registering user:", error);
        alert("Could not connect to the LearnHub API.");
    }       
}

// =================================
// Login 
// =================================

async function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const button = document.getElementById("login-button");
    const message = document.getElementById("login-message");

    button.disabled = true;
    message.textContent = "Checking your details...";
    message.style.color = "";

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.detail || "Login failed.";
            message.style.color = "red";
            return;
        }

        message.textContent = "Login successful!";
        message.style.color = "green";

        console.log("Logged-in user:", data.user);

        if (data.user.role === "Student") {
            window.location.href = "/student";
        } else if (data.user.role === "Tutor") {
            window.location.href = "/tutor";
        } else if (data.user.role === "Admin") {
            window.location.href = "/admin";
        }

    } catch (error) {
        console.error("Login error:", error);
        message.textContent = "Cannot connect to LearnHub. Check that the API is running.";
        message.style.color = "red";
    } finally {
        button.disabled = false;
    }
}
 
// ================================
// Get Users
// ================================

async function getUsers() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/users"
        );


        const users = await response.json();


        console.log("Users:", users);


    } catch (error) {

        console.error(
            "Error getting users:",
            error
        );

    }

}


getUsers();


// ================================
// Website Loaded
// ================================

console.log("LearnHub website loaded successfully!");