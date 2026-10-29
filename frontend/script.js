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
document.querySelectorAll("#mobile-menu a").forEach((link) => {
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
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation.
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  mobileMenu.classList.add("hidden");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
  if (window.lucide) lucide.createIcons();
}

menuButton.addEventListener("click", function () {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeMobileMenu();
  } else {
    mobileMenu.classList.remove("hidden");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
    menuButton.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    if (window.lucide) lucide.createIcons();
  }
});

document.querySelectorAll(".mobile-link").forEach(function (link) {
  link.addEventListener("click", closeMobileMenu);
});

// FAQ accordion.
document.querySelectorAll(".faq-toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    const answer = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");
    const willOpen = button.getAttribute("aria-expanded") !== "true";

    button.setAttribute("aria-expanded", String(willOpen));
    answer.hidden = !willOpen;

    if (icon) {
      icon.setAttribute("data-lucide", willOpen ? "minus" : "plus");
      if (window.lucide) lucide.createIcons();
    }
  });
});

// Preselect a service when a service card link is clicked.
document.querySelectorAll("[data-service]").forEach(function (link) {
  link.addEventListener("click", function () {
    const serviceSelect = document.getElementById("service");
    const requestedService = link.getAttribute("data-service");
    const matchingOption = Array.from(serviceSelect.options).find(
      (option) => option.text === requestedService,
    );

    if (matchingOption) serviceSelect.value = matchingOption.value;
  });
});

// Prevent placeholder social links from navigating to the top.
document.querySelectorAll("[data-social-placeholder]").forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    alert(
      "Add your official Devanty social profile URL to activate this link.",
    );
  });
});

// Demo contact form: opens an email draft.
// Replace this address with your official business email.
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const recipient = "mahlatsemakgati72@gmail.com";

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const data = new FormData(contactForm);

  const subject = "Devanty Technologies enquiry: " + data.get("service");

  const body = [
    "New enquiry for Devanty Technologies",
    "",
    "Name: " + data.get("name"),
    "Company / organisation: " + (data.get("company") || "Not provided"),
    "Email: " + data.get("email"),
    "Phone: " + (data.get("phone") || "Not provided"),
    "Service: " + data.get("service"),
    "Estimated budget: " + (data.get("budget") || "Not specified"),
    "",
    "Project details:",
    data.get("message"),
    "",
    "The sender agreed to the enquiry privacy statement.",
  ].join("\n");

  const mailto =
    "mailto:" +
    recipient +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  formStatus.textContent =
    "Opening your email application. Please review and send the draft there.";

  window.location.href = mailto;
});

// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
    password: password,
  };

  try {
    // Send data to FastAPI
    const response = await fetch("http://127.0.0.1:8000/users/add-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

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
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

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
    message.textContent =
      "Cannot connect to LearnHub. Check that the API is running.";
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
    const response = await fetch("http://127.0.0.1:8000/users");

    const users = await response.json();

    console.log("Users:", users);
  } catch (error) {
    console.error("Error getting users:", error);
  }
}

getUsers();

// ================================
// Website Loaded
// ================================

console.log("LearnHub website loaded successfully!");

// ================================
// Tutor Dashboard
// ================================

const SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "English",
  "Afrikaans",
  "Computer Applications Technology",
  "Information Technology",
  "Computer Science",
  "Programming",
  "Statistics",
  "Geography",
  "History",
];
const KEYS = {
  profile: "learnhubTutorProfile",
  subjects: "learnhubTutorSubjects",
  availability: "learnhubTutorAvailability",
  bookings: "learnhubBookings",
};
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
let profile = read(KEYS.profile, {
  name: "Tutor Name",
  email: "",
  rate: 200,
  experience: "New tutor",
  qualification: "",
  level: "High school",
  bio: "Add a short introduction to tell students about yourself.",
});
let subjects = read(KEYS.subjects, ["Mathematics", "English"]);
let availability = read(KEYS.availability, {
  days: ["Saturday"],
  start: "09:00",
  end: "17:00",
  format: "Online",
});
let bookings = read(KEYS.bookings, []);
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const statusClass = (s) =>
  ({
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    declined: "bg-red-100 text-red-800",
  })[s] || "bg-slate-100 text-slate-700";
const nice = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

function showPanel(name) {
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("panel-" + name).classList.add("active");
  document
    .querySelectorAll("[data-panel]")
    .forEach((b) => b.classList.toggle("active", b.dataset.panel === name));
  document.getElementById("pageTitle").textContent = {
    dashboard: "Dashboard",
    bookings: "Session bookings",
    students: "My students",
    subjects: "My subjects",
    availability: "Availability",
    profile: "Tutor profile",
  }[name];
  document.getElementById("mobileNav").classList.add("hidden");
  if (name === "bookings") renderBookings();
  if (name === "students") renderStudents();
  if (name === "subjects") renderSubjects();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document
  .querySelectorAll("[data-panel]")
  .forEach((b) =>
    b.addEventListener("click", () => showPanel(b.dataset.panel)),
  );

function syncProfile() {
  const name = profile.name || "Tutor Name";
  ["headerName", "profileCardName"].forEach(
    (id) => (document.getElementById(id).textContent = name),
  );
  document.getElementById("welcomeName").textContent = name.split(" ")[0];
  document.getElementById("avatar").textContent = name.charAt(0).toUpperCase();
  document.getElementById("profileAvatar").textContent = name
    .charAt(0)
    .toUpperCase();
  document.getElementById("profileCardRate").textContent =
    "R" + Number(profile.rate || 0) + " / hour";
  document.getElementById("profileCardBio").textContent =
    profile.bio || "No introduction added yet.";
  document.getElementById("profileSubjectTags").innerHTML =
    subjects
      .map(
        (s) =>
          `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">${esc(s)}</span>`,
      )
      .join("") ||
    '<span class="text-sm text-slate-400">No subjects selected</span>';
  document.getElementById("tutorName").value =
    profile.name === "Tutor Name" ? "" : profile.name;
  document.getElementById("tutorEmail").value = profile.email || "";
  document.getElementById("tutorRate").value = profile.rate || 200;
  document.getElementById("experience").value =
    profile.experience || "New tutor";
  document.getElementById("qualification").value = profile.qualification || "";
  document.getElementById("level").value = profile.level || "High school";
  document.getElementById("tutorBio").value =
    profile.bio === "Add a short introduction to tell students about yourself."
      ? ""
      : profile.bio;
}
function renderSubjects() {
  document.getElementById("subjectOptions").innerHTML = SUBJECTS.map(
    (s) =>
      `<label class="flex gap-3 items-center p-4 border rounded-xl hover:border-indigo-300 cursor-pointer"><input type="checkbox" name="subject" value="${esc(s)}" ${subjects.includes(s) ? "checked" : ""} class="accent-indigo-600 w-4 h-4"><span class="font-medium text-sm">${esc(s)}</span></label>`,
  ).join("");
}
function addSubject() {
  const input = document.getElementById("customSubject"),
    value = input.value.trim();
  if (!value) return;
  if (!SUBJECTS.some((s) => s.toLowerCase() === value.toLowerCase()))
    SUBJECTS.push(value);
  if (!subjects.includes(value)) subjects.push(value);
  input.value = "";
  renderSubjects();
}
document.getElementById("subjectsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  subjects = [
    ...document.querySelectorAll('input[name="subject"]:checked'),
  ].map((i) => i.value);
  write(KEYS.subjects, subjects);
  syncProfile();
  renderDashboard();
  alert("Your subjects have been saved.");
});
document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();
  profile = {
    name: document.getElementById("tutorName").value.trim(),
    email: document.getElementById("tutorEmail").value.trim(),
    rate: Number(document.getElementById("tutorRate").value),
    experience: document.getElementById("experience").value,
    qualification: document.getElementById("qualification").value.trim(),
    level: document.getElementById("level").value,
    bio: document.getElementById("tutorBio").value.trim(),
  };
  write(KEYS.profile, profile);
  syncProfile();
  document.getElementById("profileMessage").textContent =
    "Profile saved on this browser.";
  setTimeout(
    () => (document.getElementById("profileMessage").textContent = ""),
    3000,
  );
  renderDashboard();
});
document.getElementById("availabilityForm").addEventListener("submit", (e) => {
  e.preventDefault();
  availability = {
    days: [...document.querySelectorAll('input[name="days"]:checked')].map(
      (i) => i.value,
    ),
    start: document.getElementById("startTime").value,
    end: document.getElementById("endTime").value,
    format: document.getElementById("format").value,
  };
  write(KEYS.availability, availability);
  document.getElementById("availabilityMessage").textContent =
    "Availability saved on this browser.";
});
function loadAvailability() {
  document
    .querySelectorAll('input[name="days"]')
    .forEach((i) => (i.checked = availability.days.includes(i.value)));
  document.getElementById("startTime").value = availability.start;
  document.getElementById("endTime").value = availability.end;
  document.getElementById("format").value = availability.format;
}
function getBookings() {
  bookings = read(KEYS.bookings, []);
  return bookings.filter(
    (b) =>
      (b.tutorEmail || "").toLowerCase() ===
        (profile.email || "").toLowerCase() ||
      (b.tutorName || "").toLowerCase() === (profile.name || "").toLowerCase(),
  );
}
function bookingCard(b, showActions = true) {
  return `<div class="p-4 md:p-5 border-b last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="flex gap-3 items-start"><div class="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 grid place-items-center shrink-0"><i data-lucide="user-round"></i></div><div><div class="font-bold">${esc(b.studentName || "Student")}</div><div class="text-sm text-slate-500">${esc(b.subject || "Subject")} · ${esc(b.date || "Date")} at ${esc(b.time || "Time")}</div><div class="text-xs text-slate-400 mt-1">${esc(b.format || "Online")} · ${esc(b.duration || "60")} minutes</div>${b.message ? `<p class="text-sm text-slate-500 mt-2">${esc(b.message)}</p>` : ""}</div></div>
    <div class="flex flex-wrap items-center gap-2"><span class="text-xs font-bold rounded-full px-3 py-1.5 ${statusClass(b.status)}">${esc(nice(b.status || "pending"))}</span>
    ${showActions && b.status === "pending" ? `<button class="btn btn-primary text-sm" onclick="updateBooking('${esc(b.id)}','confirmed')">Accept</button><button class="btn border text-sm" onclick="updateBooking('${esc(b.id)}','declined')">Decline</button>` : ""}
    ${showActions && b.status === "confirmed" ? `<button class="btn btn-light text-sm" onclick="updateBooking('${esc(b.id)}','completed')">Mark completed</button>` : ""}
    </div></div>`;
}
function renderBookings() {
  const all = getBookings(),
    q = (document.getElementById("bookingSearch")?.value || "").toLowerCase(),
    f = document.getElementById("bookingFilter")?.value || "all";
  const list = all
    .filter(
      (b) =>
        (f === "all" || b.status === f) &&
        `${b.studentName} ${b.subject}`.toLowerCase().includes(q),
    )
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  document.getElementById("bookingList").innerHTML = list.length
    ? list.map((b) => bookingCard(b)).join("")
    : '<div class="p-8 text-center text-slate-500">No bookings found. New student requests will appear here.</div>';
  lucide.createIcons();
}
function updateBooking(id, status) {
  const all = read(KEYS.bookings, []),
    index = all.findIndex((b) => String(b.id) === String(id));
  if (index < 0) return;
  all[index].status = status;
  write(KEYS.bookings, all);
  refreshAll();
}
function renderStudents() {
  const q = (
      document.getElementById("studentSearch")?.value || ""
    ).toLowerCase(),
    all = getBookings(),
    map = new Map();
  all.forEach((b) => {
    const key = (b.studentEmail || b.studentName || "student").toLowerCase();
    if (!map.has(key))
      map.set(key, {
        name: b.studentName || "Student",
        email: b.studentEmail || "",
        subjects: new Set(),
        sessions: 0,
        last: b.date || "",
      });
    const s = map.get(key);
    s.subjects.add(b.subject || "");
    s.sessions++;
  });
  const students = [...map.values()].filter((s) =>
    (s.name + " " + s.email).toLowerCase().includes(q),
  );
  document.getElementById("studentList").innerHTML = students.length
    ? students
        .map(
          (s) =>
            `<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b last:border-0"><div><div class="font-bold">${esc(s.name)}</div><div class="text-sm text-slate-500">${esc(s.email || "No email supplied")}</div><div class="text-xs text-slate-400 mt-1">${esc([...s.subjects].filter(Boolean).join(", "))}</div></div><div class="text-sm text-slate-500">${s.sessions} booking(s)</div></div>`,
        )
        .join("")
    : '<div class="py-8 text-center text-slate-500">Your student list will appear after bookings are made.</div>';
}
function renderDashboard() {
  const all = getBookings(),
    pending = all.filter((b) => b.status === "pending"),
    confirmed = all.filter((b) => b.status === "confirmed");
  document.getElementById("statBookings").textContent = all.length;
  document.getElementById("statPending").textContent = pending.length;
  document.getElementById("statConfirmed").textContent = confirmed.length;
  document.getElementById("statSubjects").textContent = subjects.length;
  document.getElementById("bookingBadge").textContent = pending.length;
  document
    .getElementById("noticeDot")
    .classList.toggle("hidden", pending.length === 0);
  const recent = [...all]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 4);
  document.getElementById("recentBookings").innerHTML = recent.length
    ? recent.map((b) => bookingCard(b, false)).join("")
    : '<div class="py-10 text-center"><div class="mx-auto w-12 h-12 bg-slate-100 rounded-2xl grid place-items-center text-slate-400"><i data-lucide="calendar"></i></div><p class="font-bold mt-3">No bookings yet</p><p class="text-sm text-slate-400 mt-1">Your student session requests will appear here.</p></div>';
  lucide.createIcons();
}
function refreshAll() {
  getBookings();
  renderDashboard();
  renderBookings();
  renderStudents();
}
syncProfile();
renderSubjects();
loadAvailability();
renderDashboard();
renderBookings();
renderStudents();
document.getElementById("year").textContent = new Date().getFullYear();
lucide.createIcons();
window.addEventListener("storage", (e) => {
  if (
    e.key === KEYS.bookings ||
    e.key === KEYS.profile ||
    e.key === KEYS.subjects
  ) {
    profile = read(KEYS.profile, profile);
    subjects = read(KEYS.subjects, subjects);
    syncProfile();
    refreshAll();
  }
});

// ================================
// Student dashboard
// ================================

const KEYS = {
  profile: "learnhubTutorProfile",
  subjects: "learnhubTutorSubjects",
  availability: "learnhubTutorAvailability",
  bookings: "learnhubBookings",
  student: "learnhubStudentProfile",
};
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const statusClass = (s) =>
  ({
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    declined: "bg-red-100 text-red-800",
  })[s] || "bg-slate-100 text-slate-700";
const nice = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

const demoTutors = [
  {
    id: "demo1",
    name: "Naledi Mokoena",
    email: "naledi.demo@learnhub.example",
    rate: 180,
    experience: "3–5 years",
    qualification: "BSc Mathematics",
    level: "High school",
    bio: "I make mathematics easier to understand by breaking complex problems into simple, manageable steps.",
    subjects: ["Mathematics", "Statistics"],
    format: "Online",
  },
  {
    id: "demo2",
    name: "Thabo Nkosi",
    email: "thabo.demo@learnhub.example",
    rate: 220,
    experience: "3–5 years",
    qualification: "BSc Computer Science",
    level: "All levels",
    bio: "Friendly and practical technology tutor. Learn programming and computer science concepts through examples and exercises.",
    subjects: ["Computer Science", "Programming", "Information Technology"],
    format: "Online and in person",
  },
  {
    id: "demo3",
    name: "Ayesha Patel",
    email: "ayesha.demo@learnhub.example",
    rate: 200,
    experience: "1–2 years",
    qualification: "BCom Accounting",
    level: "High school",
    bio: "Patient accounting tutor focused on building confidence, mastering calculations, and exam preparation.",
    subjects: ["Accounting", "Economics", "Business Studies"],
    format: "Online",
  },
  {
    id: "demo4",
    name: "Lerato Dlamini",
    email: "lerato.demo@learnhub.example",
    rate: 160,
    experience: "3–5 years",
    qualification: "BA English",
    level: "All levels",
    bio: "I help learners improve their English, reading comprehension, writing, and communication skills.",
    subjects: ["English", "Afrikaans"],
    format: "Online and in person",
  },
  {
    id: "demo5",
    name: "Sipho Khumalo",
    email: "sipho.demo@learnhub.example",
    rate: 250,
    experience: "6+ years",
    qualification: "BSc Physical Sciences",
    level: "High school",
    bio: "Structured science lessons, worked examples, and revision support to help students understand difficult topics.",
    subjects: ["Physical Sciences", "Life Sciences", "Mathematics"],
    format: "In person",
  },
  {
    id: "demo6",
    name: "Demo Tutor",
    email: "demo.tutor@learnhub.example",
    rate: 200,
    experience: "New tutor",
    qualification: "Tutor profile example",
    level: "High school",
    bio: "An example tutor profile for testing the booking flow.",
    subjects: [
      "Mathematical Literacy",
      "Geography",
      "History",
      "Computer Applications Technology",
    ],
    format: "Online",
  },
];

let student = read(KEYS.student, {
  name: "",
  email: "",
  level: "High school",
  format: "Online",
  goals: "",
});
let bookingFilter = "all";
let tutors = [];

function getTutors() {
  const savedProfile = read(KEYS.profile, null),
    savedSubjects = read(KEYS.subjects, []),
    savedAvailability = read(KEYS.availability, null);
  tutors = [...demoTutors];
  // Add the actual tutor profile saved through the Tutor Portal, if present.
  if (
    savedProfile &&
    savedProfile.name &&
    savedProfile.email &&
    savedSubjects.length
  ) {
    const demoMatch = tutors.some(
      (t) => t.email.toLowerCase() === savedProfile.email.toLowerCase(),
    );
    if (!demoMatch) {
      tutors.unshift({
        id: "registered-" + savedProfile.email.toLowerCase(),
        name: savedProfile.name,
        email: savedProfile.email,
        rate: Number(savedProfile.rate || 0),
        experience: savedProfile.experience || "Tutor",
        qualification: savedProfile.qualification || "",
        level: savedProfile.level || "All levels",
        bio: savedProfile.bio || "",
        subjects: savedSubjects,
        format: savedAvailability?.format || "Online",
      });
    }
  }
  const subjectOptions = [
    ...new Set(tutors.flatMap((t) => t.subjects || [])),
  ].sort();
  document.getElementById("subjectFilter").innerHTML =
    '<option value="">All subjects</option>' +
    subjectOptions.map((s) => `<option>${esc(s)}</option>`).join("");
}
function showSection(name) {
  document
    .querySelectorAll(".section")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("section-" + name).classList.add("active");
  document
    .querySelectorAll("[data-section]")
    .forEach((b) => b.classList.toggle("active", b.dataset.section === name));
  document.getElementById("mobileMenu").classList.add("hidden");
  if (name === "bookings") renderBookings();
  if (name === "find") renderTutors();
  if (name === "profile") loadStudentProfile();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document
  .querySelectorAll("[data-section]")
  .forEach((b) =>
    b.addEventListener("click", () => showSection(b.dataset.section)),
  );

function renderTutors() {
  getTutors();
  const q = document.getElementById("tutorSearch").value.trim().toLowerCase();
  const subject = document.getElementById("subjectFilter").value;
  const level = document.getElementById("levelFilter").value;
  const format = document.getElementById("formatFilter").value;
  const maxRate = Number(document.getElementById("rateFilter").value);
  const filtered = tutors.filter(
    (t) =>
      (!q ||
        (t.name + " " + t.subjects.join(" ") + " " + t.qualification)
          .toLowerCase()
          .includes(q)) &&
      (!subject || t.subjects.includes(subject)) &&
      (!level || t.level === level || t.level === "All levels") &&
      (!format || t.format === format || t.format === "Online and in person") &&
      Number(t.rate) <= maxRate,
  );
  document.getElementById("resultsCount").textContent =
    `${filtered.length} tutor${filtered.length === 1 ? "" : "s"} found`;
  document.getElementById("tutorGrid").innerHTML = filtered.length
    ? filtered
        .map(
          (t, i) => `
    <article class="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <div class="h-2 bg-gradient-to-r from-indigo-600 to-violet-500"></div>
      <div class="p-5">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 grid place-items-center text-xl font-extrabold shrink-0">${esc(t.name.charAt(0))}</div>
          <div class="min-w-0 flex-1"><h3 class="font-extrabold text-lg">${esc(t.name)}</h3><p class="text-sm text-slate-500">${esc(t.qualification || "Tutor")}</p><div class="text-xs text-slate-500 mt-2">${esc(t.experience || "Experience not specified")}</div></div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5">${t.subjects.map((s) => `<span class="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-full">${esc(s)}</span>`).join("")}</div>
        <p class="text-sm text-slate-600 leading-relaxed mt-4 min-h-16">${esc(t.bio || "This tutor has not added an introduction yet.")}</p>
        <div class="flex items-center justify-between gap-3 border-t mt-5 pt-4">
          <div><div class="text-xl font-extrabold">R${Number(t.rate)}</div><div class="text-xs text-slate-400">per hour · ${esc(t.format)}</div></div>
          <button class="btn btn-primary" onclick="openBooking('${esc(t.id)}')">Book a session <span class="ml-1">→</span></button>
        </div>
      </div>
    </article>`,
        )
        .join("")
    : '<div class="md:col-span-2 xl:col-span-3 bg-white border rounded-2xl p-10 text-center"><div class="text-lg font-bold">No tutors match those filters</div><p class="text-slate-500 text-sm mt-2">Try a different subject, teaching level, format, or hourly rate.</p><button class="btn btn-light mt-4" onclick="resetFilters()">Clear filters</button></div>';
  lucide.createIcons();
}
function resetFilters() {
  document.getElementById("tutorSearch").value = "";
  document.getElementById("subjectFilter").value = "";
  document.getElementById("levelFilter").value = "";
  document.getElementById("formatFilter").value = "";
  document.getElementById("rateFilter").value = 500;
  document.getElementById("rateLabel").textContent = "R500";
  renderTutors();
}
function openBooking(tutorId) {
  getTutors();
  const tutor = tutors.find((t) => t.id === tutorId);
  if (!tutor) return;
  document.getElementById("selectedTutorId").value = tutor.id;
  document.getElementById("selectedTutorSummary").innerHTML =
    `<div class="font-extrabold">${esc(tutor.name)}</div><div class="text-sm text-slate-600 mt-1">R${Number(tutor.rate)} per hour · ${esc(tutor.format)}</div>`;
  document.getElementById("bookingSubject").innerHTML = tutor.subjects
    .map((s) => `<option>${esc(s)}</option>`)
    .join("");
  document.getElementById("bookingFormat").innerHTML = (
    tutor.format === "Online and in person"
      ? ["Online", "In person"]
      : [tutor.format]
  )
    .map((f) => `<option>${esc(f)}</option>`)
    .join("");
  document.getElementById("bookingDate").min = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 10);
  document.getElementById("bookingDate").value = "";
  document.getElementById("bookingTime").value = "";
  document.getElementById("bookingMessage").value = student.goals || "";
  document.getElementById("bookingError").classList.add("hidden");
  document.getElementById("bookingModal").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeBooking() {
  document.getElementById("bookingModal").classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("bookingModal").addEventListener("click", (e) => {
  if (e.target.id === "bookingModal") closeBooking();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBooking();
});

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("bookingError");
  if (!student.name.trim() || !student.email.trim()) {
    err.textContent =
      "Please save your name and email in My Profile before requesting a session.";
    err.classList.remove("hidden");
    return;
  }
  const tutor = tutors.find(
    (t) => t.id === document.getElementById("selectedTutorId").value,
  );
  if (!tutor) return;
  const date = document.getElementById("bookingDate").value;
  const time = document.getElementById("bookingTime").value;
  if (!date || !time) {
    err.textContent = "Please choose a date and start time.";
    err.classList.remove("hidden");
    return;
  }
  if (new Date(date + "T" + time + ":00") <= new Date()) {
    err.textContent = "Please choose a future date and time.";
    err.classList.remove("hidden");
    return;
  }
  const all = read(KEYS.bookings, []);
  const duration = document.getElementById("bookingDuration").value;
  const newBooking = {
    id: "LH-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    studentName: student.name,
    studentEmail: student.email,
    tutorName: tutor.name,
    tutorEmail: tutor.email,
    tutorId: tutor.id,
    subject: document.getElementById("bookingSubject").value,
    date,
    time,
    duration,
    format: document.getElementById("bookingFormat").value,
    message: document.getElementById("bookingMessage").value.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
    hourlyRate: Number(tutor.rate),
  };
  all.push(newBooking);
  write(KEYS.bookings, all);
  closeBooking();
  refreshStudentUI();
  showSection("bookings");
  alert(
    "Your session request has been saved. It will show as pending until the tutor confirms it.",
  );
});

function getStudentBookings() {
  const all = read(KEYS.bookings, []);
  if (!student.email) return [];
  return all
    .filter(
      (b) =>
        (b.studentEmail || "").toLowerCase() === student.email.toLowerCase(),
    )
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}
function setBookingFilter(filter) {
  bookingFilter = filter;
  renderBookings();
}
function renderBookings() {
  const all = getStudentBookings(),
    filtered = all.filter(
      (b) => bookingFilter === "all" || b.status === bookingFilter,
    );
  document.getElementById("studentBookingList").innerHTML = filtered.length
    ? filtered
        .map(
          (b) => `
    <div class="p-5 border-b last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex gap-3 items-start"><div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 grid place-items-center shrink-0"><i data-lucide="calendar-clock"></i></div>
      <div><div class="font-extrabold">${esc(b.subject)}</div><div class="text-sm text-slate-600 mt-1">Tutor: ${esc(b.tutorName)}</div><div class="text-sm text-slate-500 mt-1">${esc(b.date)} · ${esc(b.time)} · ${esc(b.duration)} minutes</div><div class="text-xs text-slate-400 mt-1">${esc(b.format)} · R${Number(b.hourlyRate || 0)} per hour</div>${b.message ? `<p class="text-sm text-slate-500 mt-2">${esc(b.message)}</p>` : ""}</div></div>
      <div class="flex items-center gap-3"><span class="rounded-full px-3 py-1.5 text-xs font-bold ${statusClass(b.status)}">${esc(nice(b.status || "pending"))}</span>${b.status === "pending" ? `<button class="text-sm font-bold text-red-600" onclick="cancelBooking('${esc(b.id)}')">Cancel request</button>` : ""}</div>
    </div>`,
        )
        .join("")
    : '<div class="p-10 text-center"><div class="w-14 h-14 mx-auto rounded-2xl bg-slate-100 grid place-items-center text-slate-400"><i data-lucide="calendar"></i></div><h3 class="font-extrabold text-lg mt-4">No sessions here yet</h3><p class="text-sm text-slate-500 mt-2">Browse tutors and request your first lesson.</p><button class="btn btn-primary mt-5" onclick="showSection(\'find\')">Find a tutor</button></div>';
  lucide.createIcons();
}
function cancelBooking(id) {
  if (!confirm("Cancel this pending session request?")) return;
  const all = read(KEYS.bookings, []);
  const b = all.find((x) => String(x.id) === String(id));
  if (!b || b.status !== "pending") return;
  b.status = "declined";
  b.cancelledByStudent = true;
  write(KEYS.bookings, all);
  refreshStudentUI();
}
function loadStudentProfile() {
  document.getElementById("studentName").value = student.name || "";
  document.getElementById("studentEmail").value = student.email || "";
  document.getElementById("studentLevel").value =
    student.level || "High school";
  document.getElementById("studentFormat").value = student.format || "Online";
  document.getElementById("studentGoals").value = student.goals || "";
}
document
  .getElementById("studentProfileForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    student = {
      name: document.getElementById("studentName").value.trim(),
      email: document.getElementById("studentEmail").value.trim(),
      level: document.getElementById("studentLevel").value,
      format: document.getElementById("studentFormat").value,
      goals: document.getElementById("studentGoals").value.trim(),
    };
    write(KEYS.student, student);
    document.getElementById("studentProfileMessage").textContent =
      "Your profile has been saved on this browser.";
    updateHeader();
    setTimeout(
      () => (document.getElementById("studentProfileMessage").textContent = ""),
      3000,
    );
  });
function updateHeader() {
  const name = student.name || "Student";
  document.getElementById("studentAvatar").textContent = name
    .charAt(0)
    .toUpperCase();
  const n = getStudentBookings().length;
  document.getElementById("bookingCount").textContent = n;
  document.getElementById("sessionStat").textContent = n;
}
function refreshStudentUI() {
  updateHeader();
  renderBookings();
  renderTutors();
}
window.addEventListener("storage", (e) => {
  if (
    [KEYS.bookings, KEYS.profile, KEYS.subjects, KEYS.availability].includes(
      e.key,
    )
  ) {
    student = read(KEYS.student, student);
    refreshStudentUI();
  }
});
getTutors();
loadStudentProfile();
updateHeader();
renderTutors();
renderBookings();
document.getElementById("year").textContent = new Date().getFullYear();
lucide.createIcons();
