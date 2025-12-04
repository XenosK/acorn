"""
Database models and initialization.
"""
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

db = SQLAlchemy()


class User(db.Model):
    """
    User model for authentication.
    """
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    def __repr__(self) -> str:
        return f"<User {self.username}>"

    def check_password(self, password: str) -> bool:
        """
        Check if provided password matches the user's password hash.

        Args:
            password: Plain text password to check

        Returns:
            True if password matches, False otherwise
        """
        from werkzeug.security import check_password_hash
        return check_password_hash(self.password_hash, password)


def init_db() -> None:
    """
    Initialize database tables and create default admin user if needed.
    """
    db.create_all()

    # Create default admin user if no users exist
    if User.query.count() == 0:
        admin_user = User(
            username="admin",
            email="admin@acorn.local",
            password_hash=generate_password_hash("admin123"),
            is_active=True,
        )
        db.session.add(admin_user)
        db.session.commit()
        print("Created default admin user: admin/admin123")

