import { AUTH_BASE_URL } from "./api.js";

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

/**
 * Register a new user with the Noroff API
 * @param {string} name - The username for the new account
 * @param {string} email - The email address (must be @noroff.no or @stud.noroff.no)
 * @param {string} password - The password (minimum 8 characters)
 */
async function register(name, email, password) {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.errors?.[0]?.message || "Registration failed";
      alert(`Registration Error: ${errorMessage}`);
      return;
    }

    alert("✅ Registration successful! You can now log in.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Registration error:", error);
    alert("Network error. Please check your connection and try again.");
  }
}

/**
 * Log in a user with the Noroff API
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 */
async function login(email, password) {
  try {
    const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.errors?.[0]?.message || "Login failed";
      alert(`Login Error: ${errorMessage}`);
      return;
    }

    // Store authentication data
    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("user", JSON.stringify({
      name: data.data.name,
      email: data.data.email,
    }));

    alert("✅ Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Network error. Please check your connection and try again.");
  }
}

// Register form handler
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    // Basic validation
    if (name.length < 1) {
      alert("Please enter a username");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (!email.match(/^[\w\-.]+@(stud\.)?noroff\.no$/)) {
      alert("Email must be a valid Noroff email (@noroff.no or @stud.noroff.no)");
      return;
    }

    register(name, email, password);
  });
}

// Login form handler
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    login(email, password);
  });
}
