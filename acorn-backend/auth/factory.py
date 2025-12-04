"""
Authentication provider factory.
"""
from typing import Dict, Type, Optional

from acorn_backend.config import Config
from acorn_backend.auth.base import AuthProvider
from acorn_backend.auth.password import PasswordAuthProvider


# Registry of available authentication providers
_providers: Dict[str, Type[AuthProvider]] = {
    "password": PasswordAuthProvider,
    # Future providers:
    # "ldap": LDAPAuthProvider,
    # "oauth2": OAuth2AuthProvider,
}


def get_auth_provider(method: Optional[str] = None) -> AuthProvider:
    """
    Get an authentication provider instance.

    Args:
        method: Authentication method name. If None, uses default from config.

    Returns:
        Authentication provider instance

    Raises:
        ValueError: If the requested authentication method is not available
    """
    if method is None:
        method = Config.DEFAULT_AUTH_METHOD

    if method not in _providers:
        available = ", ".join(_providers.keys())
        raise ValueError(
            f"Authentication method '{method}' not available. "
            f"Available methods: {available}"
        )

    provider_class = _providers[method]
    return provider_class()


def register_auth_provider(name: str, provider_class: Type[AuthProvider]) -> None:
    """
    Register a new authentication provider.

    Args:
        name: Name of the authentication method
        provider_class: Provider class that implements AuthProvider
    """
    _providers[name] = provider_class

