import { toggleFavorite, isFavorite } from "./storage.js";

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

/**
 * Fetch all old games from the API
 * @returns {Promise<Array>} Promise that resolves to an array of games
 */
export async function fetchGames() {
  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/old-games"
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch games", data);
      return [];
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const genre = params.get("genre");

/* ---------------- GAME DETAILS PAGE ---------------- */

if (id) {
  const gameContainer = document.querySelector("#game");
  const favBtn = document.querySelector("#favBtn");

  if (gameContainer) {
    gameContainer.innerHTML = '<div class="loading">Loading game details...</div>';
  }

  fetch(`https://v2.api.noroff.dev/old-games/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Game not found");
      }
      return res.json();
    })
    .then(result => {
      const game = result.data;
      const gameId = Number(game.id);

      if (!gameContainer) return;

      gameContainer.innerHTML = `
        <img src="${game.image.url}" alt="${game.image.alt}" />
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p><strong>Released:</strong> ${game.released}</p>
        <p>
          <strong>Genres:</strong>
          ${game.genre
            .map(g => `<a href="genre.html?genre=${encodeURIComponent(g)}">${g}</a>`)
            .join(", ")}
        </p>
      `;

      /**
       * Update favorite button text based on current state
       */
      function updateFavoriteButton() {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user) {
          favBtn.textContent = "⭐ Login to Favorite";
          return;
        }
        
        favBtn.textContent = isFavorite(gameId)
          ? "⭐ Remove from Favorites"
          : "⭐ Add to Favorites";
      }

      if (favBtn) {
        favBtn.addEventListener("click", () => {
          const user = JSON.parse(localStorage.getItem("user"));
          
          if (!user) {
            alert("Please login to favorite games");
            window.location.href = "login.html";
            return;
          }
          
          toggleFavorite(gameId);
          updateFavoriteButton();
        });

        updateFavoriteButton();
      }
    })
    .catch(error => {
      console.error("Error loading game:", error);
      if (gameContainer) {
        gameContainer.innerHTML = `
          <div class="error">
            <p>Failed to load game details. Please try again later.</p>
            <a href="index.html">Back to Home</a>
          </div>
        `;
      }
    });
}

/* ---------------- GENRE PAGE ---------------- */

if (genre) {
  const container = document.querySelector("#games");
  const title = document.querySelector("#genreTitle");

  if (title) {
    title.textContent = `${genre} Games`;
  }

  if (container) {
    container.innerHTML = '<div class="loading">Loading games...</div>';
  }

  fetchGames().then(games => {
    const filteredGames = games.filter(game =>
      game.genre.includes(genre)
    );

    if (!container) return;

    if (filteredGames.length === 0) {
      container.innerHTML = `
        <div class="error">
          <p>No games found in this genre.</p>
          <a href="index.html">Back to Home</a>
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    filteredGames.forEach(game => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${game.image.url}" alt="${game.image.alt}" />
        <h3>${game.name}</h3>
        <p>Released: ${game.released}</p>
        <p>${game.genre.join(", ")}</p>
        <a href="game.html?id=${game.id}">View Details</a>
      `;
      container.appendChild(div);
    });
  }).catch(error => {
    console.error("Error loading genre games:", error);
    if (container) {
      container.innerHTML = `
        <div class="error">
          <p>Failed to load games. Please try again later.</p>
          <a href="index.html">Back to Home</a>
        </div>
      `;
    }
  });
}
