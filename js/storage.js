/**
 * Get all favorite game IDs from localStorage for the current user
 * @returns {Array<number>}
 */
export function getFavorites() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return [];
  }
  
  const key = `favorites_${user.email}`;
  return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Toggle a game as favorite for the current user
 * @param {number} id
 */
export function toggleFavorite(id) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return;
  }
  
  const key = `favorites_${user.email}`;
  const favorites = getFavorites();
  const exists = favorites.includes(id);

  const updatedFavorites = exists
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];

  localStorage.setItem(key, JSON.stringify(updatedFavorites));
}

/**
 * Check if a game is a favorite for the current user
 * @param {number} id
 * @returns {boolean}
 */
export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.includes(id);
}
