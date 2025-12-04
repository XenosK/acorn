"""
Password-based authentication provider.
"""
from typing import Optional, Dict, Any

from acorn_backend.database import db, User
from acorn_backend.auth.base import AuthProvider


class PasswordAuthProvider(AuthProvider):
    """
    Password-based authentication provider.
    """

    def authenticate(
        self, username: str, password: str, **kwargs: Any
    ) -> Optional[Dict[str, Any]]:
        """
        Authenticate user with username and password.

        Args:
            username: Username to authenticate
            password: Password to authenticate
            **kwargs: Additional parameters (not used for password auth)

        Returns:
            User information dict if authentication succeeds, None otherwise
        """
        user = User.query.filter_by(username=username).first()

        if user and user.is_active and user.check_password(password):
            return {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }

        return None

    def get_name(self) -> str:
        """
        Get the name of this authentication provider.

        Returns:
            "password"
        """
        return "password"

