Create a full-stack Replit application using a Node.js/Express backend and a React (Vite) frontend. The purpose of this app is to demonstrate a secure authentication flow with JWTs, specifically designed to be tested from a mobile application.

Backend Requirements (Node.js/Express):


1. Dependencies: Use express, cors, jsonwebtoken, and bcryptjs.

2. CORS Configuration: Configure the cors middleware to allow requests from all origins (*) to simplify mobile testing.

3. User Storage: For this demo, use a simple in-memory array to store user objects (e.g., {email, passwordHash}). Do not use a database.

4. API Endpoints:
	- POST /api/register: Takes an email and password. Hash the password with bcryptjs and store the new user.

	- POST /api/login: Takes an email and password. Find the user, compare the password hash with bcryptjs. If it matches, generate a JWT containing the user's email and send it back in the response.

	- GET /api/profile: This is a protected route. It must have middleware that verifies a JWT from the Authorization: Bearer <token> header. If the token is valid, return a success message with the user's email. If not, return a 401 Unauthorized error.


5. Security: Use Replit Secrets to store the JWT_SECRET key. Do not hardcode it.

Frontend Requirements (React/Vite):


1. UI: Create a simple interface with:
	- An input for email and an input for password.

	- Buttons for "Register", "Login", and "Logout".

	- A button labeled "Fetch Protected Data".

	- A status area to display messages from the API (e.g., "Login successful," "Protected data: ...", or error messages).


2. State Management: Use useState to manage the form inputs, the authentication token, login status, and API messages.

3. Functionality:
	- On "Login", send a request to the backend. If successful, store the received JWT in localStorage.

	- When the "Fetch Protected Data" button is clicked, check localStorage for the JWT. If it exists, make a GET request to /api/profile, including the token in the Authorization header like this: Authorization: 'Bearer ' + token.

	- Display the result from the protected data call in the status area.

	- The "Logout" button should clear the JWT from localStorage and reset the UI state.