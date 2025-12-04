# Acorn Backend

Flask backend for Acorn authentication system.

## Features

- User authentication with username/password
- JWT token-based authentication
- SQLite database for user storage
- Extensible authentication system (ready for LDAP and OAuth2)

## Setup

1. Install dependencies (from the `acorn-backend` directory):
```bash
cd acorn-backend
pip install -e .
```

**Note**: The package will be installed as `acorn_backend` (with underscore) even though the directory name uses a hyphen. This is handled automatically by setuptools.

2. Run the application:
```bash
python main.py
```

Or use Flask directly:
```bash
flask --app app run
```

Or use the app module directly:
```bash
python -m acorn_backend.app
```

The server will start on `http://localhost:5000`.

## Default Credentials

On first run, a default admin user is created:
- Username: `admin`
- Password: `admin123`

**Important**: Change the default password in production!

## API Endpoints

### POST /api/auth/login
Login with username and password.

Request body:
```json
{
  "username": "admin",
  "password": "admin123",
  "method": "password"  // optional, defaults to "password"
}
```

Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@acorn.local"
  }
}
```

### GET /api/auth/verify
Verify JWT token and get current user info.

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "username": "admin",
  "authenticated": true
}
```

## Configuration

Configuration is managed in `config.py`. Key settings:

- `SECRET_KEY`: Flask secret key (set via `SECRET_KEY` environment variable)
- `JWT_SECRET_KEY`: JWT signing key (set via `JWT_SECRET_KEY` environment variable)
- `SQLALCHEMY_DATABASE_URI`: Database connection string (defaults to SQLite)
- `AUTH_METHODS`: List of available authentication methods
- `DEFAULT_AUTH_METHOD`: Default authentication method to use

## Database

The application uses SQLite by default. The database file `acorn.db` will be created in the project root on first run.

## Extending Authentication

The authentication system is designed to be extensible. To add new authentication methods (e.g., LDAP, OAuth2):

1. Create a new provider class in `auth/` that extends `AuthProvider`
2. Register it in `auth/factory.py`
3. Update `config.py` to include the new method in `AUTH_METHODS`

Example:
```python
# auth/ldap.py
class LDAPAuthProvider(AuthProvider):
    def authenticate(self, username: str, password: str, **kwargs):
        # LDAP authentication logic
        pass
    
    def get_name(self):
        return "ldap"

# auth/factory.py
from acorn_backend.auth.ldap import LDAPAuthProvider

_providers = {
    "password": PasswordAuthProvider,
    "ldap": LDAPAuthProvider,  # Add new provider
}
```

