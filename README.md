# JaMoveo – Web Rehearsal App

This project was developed as part of Moveo’s coding challenge. It is a web application designed to support real-time music rehearsals by connecting musicians and displaying synchronized lyrics and chords.

## Features

- **Signup & Login**:
  - Users can register with a username, password, and instrument.
  - Admins can register and manage the session.
  - Authenticated users are redirected based on their role.

- **Admin Functionality**:
  - Admins can search for a song by name (in English or Hebrew).
  - Matching songs are displayed with their title, artist, and image.
  - Admins can start a session that pushes the selected song to all connected clients.

- **Live Session**:
  - Players see lyrics with or without chords depending on their role.
  - Includes auto-scroll and contrast toggle for readability.
  - Admins can terminate the session at any time.

## Tech Stack

- **Frontend**: React.js (React Router, Bootstrap)
- **Backend**: Node.js with Express
- **Database**: MongoDB (via Mongoose)
- **Real-Time Communication**: Socket.IO
- **Deployment**: Initially intended with Railway (backend) and Vercel (frontend), but local environment was used for testing and development due to deployment limitations.

## How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/ophirsegal/jamoveo.git
cd jamoveo
```

### 2. Setup the Server
```bash
cd server
npm install
npm start
```

### 3. Setup the Client
```bash
cd ../client
npm install
npm start
```

## Environment Variables

To avoid hardcoding backend URLs, the client uses a `.env` file:

**client/.env**
```
REACT_APP_API_URL=http://localhost:4000/api
```

In `client/src/api/api.js`, Axios is configured as follows:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
```

Ensure `.env` is listed in `.gitignore` to prevent accidental exposure.

## Notes

- Production deployment to Railway and Vercel was attempted but not completed.
- The system works correctly in a local environment, with full support for authentication, role-based routing, and real-time song broadcasting.

