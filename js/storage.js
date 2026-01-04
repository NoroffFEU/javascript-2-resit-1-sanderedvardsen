/**
 * Get all favorite game IDs from localStorage
 * @returns {Array<number>}
 */
export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

/**
 * Toggle a game as favorite
 * @param {number} id
 */
export function toggleFavorite(id) {
  const favorites = getFavorites();
  const exists = favorites.includes(id);

  const updatedFavorites = exists
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
}

/**
 * Check if a game is a favorite
 * @param {number} id
 * @returns {boolean}
 */
export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}
