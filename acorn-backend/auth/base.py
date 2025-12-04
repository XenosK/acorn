"""
Base authentication interface for extensible auth methods.
"""
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any


class AuthProvider(ABC):
    """
    Base class for authentication providers.
    """

    @abstractmethod
    def authenticate(
        self, username: str, password: str, **kwargs: Any
    ) -> Optional[Dict[str, Any]]:
        """
        Authenticate a user with the given credentials.

        Args:
            username: Username to authenticate
            password: Password to authenticate
            **kwargs: Additional authentication parameters

        Returns:
            User information dict if authentication succeeds, None otherwise
        """
        pass

    @abstractmethod
    def get_name(self) -> str:
        """
        Get the name of this authentication provider.

        Returns:
            Provider name (e.g., "password", "ldap", "oauth2")
        """
        pass

