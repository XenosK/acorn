# Acorn Frontend

Next.js frontend for Acorn authentication system.

## Features

- Login page with username/password authentication
- Protected dashboard page (shows "Hello World" after login)
- JWT token management
- Automatic redirect based on authentication status

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables (optional):
Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
npm run dev
```

The application will start on `http://localhost:3000`.

## Default Credentials

- Username: `admin`
- Password: `admin123`

## Project Structure

- `src/app/login/` - Login page
- `src/app/dashboard/` - Protected dashboard page (shows "Hello World")
- `src/lib/api.ts` - API client for backend communication
- `src/lib/auth.ts` - Authentication utilities (token management)

## Routes

- `/` - Redirects to `/login` or `/dashboard` based on authentication status
- `/login` - Login page
- `/dashboard` - Protected page (requires authentication)

## Building for Production

```bash
npm run build
npm start
```
