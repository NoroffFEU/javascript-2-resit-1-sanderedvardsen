# Old Games - JavaScript 2 Resit Project

A fully responsive web application for browsing, searching, and favoriting classic video games. Built with vanilla JavaScript using ES6 modules and the Noroff Old Games API.

## How to Run the Project

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor (VS Code recommended)
- Live Server extension for VS Code

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NoroffFEU/javascript-2-resit-1-sanderedvardsen.git
   cd javascript-2-resit-1-sanderedvardsen
   ```

2. Open the project in VS Code:
   ```bash
   code .
   ```

3. Start Live Server:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The application will open at `http://localhost:5500`

4. Alternative method:
   - Open `index.html` directly in your browser
   - Note: A local server is recommended for optimal functionality

### First Time Usage

1. Register a new account using a Noroff email (@noroff.no or @stud.noroff.no)
2. Login with your credentials
3. Browse games, search, sort, and add favorites
4. View your profile to see saved favorites

## Project Structure

```
js2resit/
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── api.js            # API configuration
│   ├── auth.js           # Authentication logic
│   ├── games.js          # Game data handling
│   ├── main.js           # Home page logic
│   ├── profile.js        # Profile page logic
│   └── storage.js        # LocalStorage utilities
├── index.html            # Home page
├── login.html            # Login page
├── register.html         # Registration page
├── game.html             # Game details page
├── genre.html            # Genre filter page
├── profile.html          # User profile page
└── readme.md             # Documentation
```

## Features

### User Authentication
- User registration with Noroff email validation
- Secure login system
- Persistent authentication using localStorage

### Game Management
- Browse all classic games
- Real-time search functionality
- Sort by title or release year
- View detailed game information
- Filter games by genre

### Favorites System
- Add and remove favorite games
- View all favorites on profile page
- Persistent storage using localStorage

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Retro gaming-themed interface

## API Endpoints

### Old Games API
- Base URL: `https://v2.api.noroff.dev`
- GET `/old-games` - Retrieve all games
- GET `/old-games/{id}` - Retrieve single game

### Authentication API
- Base URL: `https://v2.api.noroff.dev`
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user

## Technical Implementation

### ES6 Modules
All JavaScript files use ES6 import/export syntax for modular code organization.

### JSDoc Documentation
The following functions include JSDoc comments:
- `register(name, email, password)` in auth.js
- `login(email, password)` in auth.js
- `fetchGames()` in games.js
- `getFavorites()` in storage.js
- `toggleFavorite(id)` in storage.js
- `isFavorite(id)` in storage.js

### Data Manipulation
- Array methods: filter, map, sort, includes
- Object handling and destructuring
- LocalStorage for data persistence

## Author

Sander Edvardsen
Noroff School of Technology and Digital Media
JavaScript 2 - Resit Assignment - 2026
