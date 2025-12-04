"""
Flask application for acorn backend authentication.
"""
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from acorn_backend.config import Config
from acorn_backend.database import db, init_db
from acorn_backend.routes import auth_bp


def create_app(config_class: type = Config) -> Flask:
    """
    Create and configure Flask application.

    Args:
        config_class: Configuration class to use

    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app, origins=app.config.get("CORS_ORIGINS", ["http://localhost:3000"]))
    JWTManager(app)
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    # Initialize database
    with app.app_context():
        init_db()

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)

