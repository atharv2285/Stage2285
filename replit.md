# Stage - Interactive Portfolio Builder

## Overview
Stage is a full-stack portfolio builder web application designed for students and early engineers to create interactive, builder-style profiles. Built with React, Node.js, Express, and PostgreSQL.

## Project Architecture
- **Frontend**: React (Vite) with TailwindCSS and Framer Motion
- **Backend**: Express.js REST API
- **Database**: PostgreSQL (schema in `server/schema.sql`)
- **Authentication**: JWT-based with email/password and Google OAuth support

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── utils/         # Utilities
│   └── package.json
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Auth middleware
│   ├── config/           # Database config
│   └── schema.sql        # Database schema
└── package.json          # Root package.json
```

## Features
1. **Authentication & Onboarding**: Google OAuth and email/password login
2. **Profile Setup**: Name, tagline, college, skills, interests, stage level
3. **Portfolio Page**: Dynamic profile with projects, experience, skills
4. **Projects**: Add, edit, and showcase projects with status tracking
5. **Feed/Notes**: Post updates and reflections
6. **Edit Mode**: Inline editing for profile owners

## Database Setup
The database schema is defined in `server/schema.sql`. To set up the database:
1. Create a PostgreSQL database
2. Run the schema.sql file to create tables
3. Update the DATABASE_URL in server/.env

## Environment Variables
Required in `server/.env`:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT tokens
- `SESSION_SECRET`: Secret for sessions
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: For OAuth (optional)

## Development
Run `npm run dev` from the root to start both frontend and backend servers.
- Frontend: http://localhost:5000
- Backend: http://localhost:3000

## Recent Changes
### October 20, 2025
- ✅ Set up PostgreSQL database with complete schema
- ✅ Installed all dependencies (Node.js 20, React, Express, etc.)
- ✅ Configured environment variables for development
- ✅ Updated server to serve static files in production mode
- ✅ Configured deployment settings for Replit (VM deployment)
- ✅ Set up development workflow with concurrently running frontend and backend
- ✅ Verified database connection and application is running successfully

### Initial Setup
- Initial project setup with full-stack architecture
- Implemented authentication flow (email/password)
- Created profile setup and display pages
- Built project and post management features
- Configured TailwindCSS with custom orange/white theme
