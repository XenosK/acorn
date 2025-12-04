"""
Configuration settings for acorn backend.
"""
import os
from typing import List


class Config:
    """
    Base configuration class.
    """

    # Flask settings
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")
    SQLALCHEMY_DATABASE_URI: str = os.environ.get(
        "DATABASE_URL", "sqlite:///acorn.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False

    # JWT settings
    JWT_SECRET_KEY: str = os.environ.get("JWT_SECRET_KEY", SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES: int = 3600  # 1 hour

    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]

    # Authentication settings
    AUTH_METHODS: List[str] = ["password"]  # Future: ["password", "ldap", "oauth2"]
    DEFAULT_AUTH_METHOD: str = "password"


class DevelopmentConfig(Config):
    """
    Development configuration.
    """
    DEBUG: bool = True


class ProductionConfig(Config):
    """
    Production configuration.
    """
    DEBUG: bool = False

