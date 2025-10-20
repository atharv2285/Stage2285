# Stage - Interactive Portfolio Builder

A full-stack portfolio builder application for students and early engineers to create interactive, builder-style profiles.

## Features

- 🔐 **Authentication**: Email/password login and registration (Google OAuth ready)
- 👤 **Profile Setup**: Customizable profiles with tagline, bio, skills, and interests
- 🚀 **Projects Showcase**: Add and manage your projects with status tracking
- 📝 **Feed/Notes**: Share updates and reflections
- ✏️ **Edit Mode**: Inline editing for profile owners
- 🎨 **Modern UI**: Clean orange/white theme with smooth animations

## Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS + Framer Motion
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT + Passport.js

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Database Setup

1. **Create a PostgreSQL database** (or use Replit's built-in PostgreSQL)
   
2. **Run the schema** to create tables:
   ```bash
   psql -U your_username -d your_database -f server/schema.sql
   ```

3. **Update environment variables**:
   - Copy `server/.env.example` to `server/.env`
   - Set your `DATABASE_URL`:
     ```
     DATABASE_URL=postgresql://username:password@host:port/database_name
     ```

### Installation & Running

```bash
# Install all dependencies
npm install
cd client && npm install
cd ../server && npm install
cd ..

# Start the application (runs both frontend and backend)
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3000

## Environment Variables

Create a `server/.env` file with:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/stage_db
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
NODE_ENV=development

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components (Login, Setup, Profile)
│   │   └── App.jsx        # Main app with routing
│   └── package.json
├── server/                # Express backend
│   ├── routes/           # API endpoints
│   ├── models/           # Database models
│   ├── middleware/       # Auth middleware
│   ├── config/           # Database configuration
│   ├── schema.sql        # Database schema
│   └── index.js          # Server entry point
└── package.json          # Root package file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:identifier` - Get user by ID or username
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/setup` - Complete profile setup

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects/user/:userId` - Get user's projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Posts
- `POST /api/posts` - Create post
- `GET /api/posts/user/:userId` - Get user's posts
- `DELETE /api/posts/:id` - Delete post

## Usage Guide

1. **Register**: Create an account with email and password
2. **Setup Profile**: Complete your profile with tagline, skills, and interests
3. **Add Projects**: Showcase your work with project cards
4. **Share Updates**: Post reflections and updates to your feed
5. **Edit Anytime**: Click "Edit Profile" to update your information

## Database Schema

The database includes three main tables:
- **users**: Profile information, credentials, and preferences
- **projects**: User projects with descriptions, tags, and links
- **posts**: Feed posts and updates

See `server/schema.sql` for the complete schema.

## Next Steps / Enhancements

- [ ] Implement Google OAuth (backend routes ready, needs API keys)
- [ ] Add image upload for profile pictures and project images
- [ ] Add project logs/timeline feature
- [ ] Implement search and discovery features
- [ ] Add public profile links (stage.io/username format)
- [ ] Add AI "Reflect" feature for work summaries
- [ ] Add themes (light/dark mode)
- [ ] Add auto-save for edits

## Troubleshooting

### Database Connection Issues
If you see "Database connection failed" in the logs:
1. Ensure PostgreSQL is running
2. Check your `DATABASE_URL` in `server/.env`
3. Run the schema file: `psql -U user -d db -f server/schema.sql`

### Port Already in Use
If port 5000 or 3000 is in use:
1. Kill the process using the port
2. Or change ports in `client/vite.config.js` and `server/.env`

## Contributing

This is a portfolio builder project. Feel free to fork and customize for your needs!

## License

MIT
