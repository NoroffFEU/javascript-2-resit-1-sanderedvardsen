import { fetchGames } from "./games.js";

const gamesContainer = document.querySelector("#games");
const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#sort");

// Handle navigation state
updateNavigation();

// Handle logout button
const navLogout = document.querySelector("#navLogout");
if (navLogout) {
  navLogout.addEventListener("click", logout);
}

/**
 * Update navigation based on login status
 */
function updateNavigation() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navLogin = document.querySelector("#navLogin");
  const navProfile = document.querySelector("#navProfile");
  const navLogout = document.querySelector("#navLogout");

  if (user) {
    if (navLogin) navLogin.style.display = "none";
    if (navProfile) navProfile.style.display = "block";
    if (navLogout) navLogout.style.display = "block";
  } else {
    if (navLogin) navLogin.style.display = "block";
    if (navProfile) navProfile.style.display = "none";
    if (navLogout) navLogout.style.display = "none";
  }
}

/**
 * Log out the current user
 */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

if (gamesContainer) {
  // Show loading state
  gamesContainer.innerHTML = '<div class="loading">Loading games...</div>';

  fetchGames().then(games => {
    if (!games || games.length === 0) {
      gamesContainer.innerHTML = '<div class="error">No games found.</div>';
      return;
    }

    let filteredGames = [...games];

    /**
     * Render games to the container
     * @param {Array} list - Array of game objects to render
     */
    function renderGames(list) {
      if (list.length === 0) {
        gamesContainer.innerHTML = '<div class="error">No games match your search.</div>';
        return;
      }

      gamesContainer.innerHTML = "";

      list.forEach(game => {
        const card = document.createElement("div");
        card.innerHTML = `
          <img src="${game.image.url}" alt="${game.image.alt}">
          <h3>${game.name}</h3>
          <p>Released: ${game.released}</p>
          <p>${game.genre.join(", ")}</p>
          <a href="game.html?id=${game.id}">View Details</a>
        `;
        gamesContainer.appendChild(card);
      });
    }

    renderGames(filteredGames);

    // Search functionality
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(value)
      );
      renderGames(filteredGames);
    });

    // Sort functionality
    sortSelect.addEventListener("change", (e) => {
      if (e.target.value === "title") {
        filteredGames.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        filteredGames.sort((a, b) =>
          Number(a.released) - Number(b.released)
        );
      }
      renderGames(filteredGames);
    });
  }).catch(error => {
    console.error("Error fetching games:", error);
    gamesContainer.innerHTML = '<div class="error">Failed to load games. Please try again later.</div>';
  });
}
