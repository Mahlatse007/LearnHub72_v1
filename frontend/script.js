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
    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check that passwords match
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Collect registration data
    const user = {

        firstname:
            document.getElementById("firstname").value,

        lastname:
            document.getElementById("lastname").value,

        idnumber:
            document.getElementById("idnumber").value,

        email:
            document.getElementById("email").value,

        role:
            document.getElementById("role").value,

        username:
            document.getElementById("username").value,

        address:
            document.getElementById("address").value,

        contactnumber:
            document.getElementById("contactnumber").value,

        password:
            password
    };


    // Show data in browser console
    console.log("Sending user:", user);


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


        console.log("API response:", data);


        // Check whether registration succeeded
        if (!response.ok) {

            console.error(
                "Registration failed:",
                data
            );

            alert("Registration failed.");

            return;
        }


        // Success
        alert("Registration successful!");


        // Clear form
        document.querySelector("form").reset();


    } catch (error) {

        console.error(
            "Error registering user:",
            error
        );

        alert(
            "Could not connect to the LearnHub API."
        );
    }
}


// ================================
// Get Users
// ================================

async function getUsers() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/users"
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