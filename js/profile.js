import { getFavorites } from "./storage.js";

const profileContainer = document.querySelector("#profile");
const user = JSON.parse(localStorage.getItem("user"));

// Handle navigation logout button
const navLogout = document.querySelector("#navLogout");
if (navLogout) {
  navLogout.addEventListener("click", logout);
}

/**
 * Log out the current user
 */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Check if user is logged in
if (!user) {
  profileContainer.innerHTML = `
    <div class="no-favorites">
      <p>You are not logged in.</p>
      <a href="login.html">Go to Login</a>
    </div>
  `;
} else {
  displayProfile();
}

/**
 * Display user profile information and favorites
 */
async function displayProfile() {
  try {
    // Fetch all games to match with favorites
    const response = await fetch("https://v2.api.noroff.dev/old-games");
    const result = await response.json();
    const allGames = result.data;

    const favoriteIds = getFavorites();
    const favoriteGames = allGames.filter(game => favoriteIds.includes(Number(game.id)));

    let html = `
      <div class="profile-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      </div>
      
      <div class="favorites-section">
        <h2>My Favorite Games (${favoriteGames.length})</h2>
    `;

    if (favoriteGames.length === 0) {
      html += `
        <div class="no-favorites">
          <p>You haven't added any favorites yet.</p>
          <a href="index.html">Browse Games</a>
        </div>
      `;
    } else {
      html += '<div class="favorites-grid">';
      favoriteGames.forEach(game => {
        html += `
          <div class="favorite-item">
            <img src="${game.image.url}" alt="${game.image.alt}" />
            <h3>${game.name}</h3>
            <a href="game.html?id=${game.id}">View Details</a>
          </div>
        `;
      });
      html += '</div>';
    }

    html += '</div>';
    profileContainer.innerHTML = html;
  } catch (error) {
    console.error("Error loading profile:", error);
    profileContainer.innerHTML = `
      <div class="error">
        <p>Error loading profile. Please try again later.</p>
      </div>
    `;
  }
}
