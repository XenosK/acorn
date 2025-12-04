"""
API routes for acorn backend.
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from acorn_backend.auth.factory import get_auth_provider

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login() -> tuple:
    """
    Authenticate user and return JWT token.

    Request body:
        {
            "username": "string",
            "password": "string",
            "method": "string" (optional, defaults to "password")
        }

    Returns:
        JSON response with access token or error message
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body is required"}), 400

    username = data.get("username")
    password = data.get("password")
    method = data.get("method", "password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    try:
        auth_provider = get_auth_provider(method)
        user_info = auth_provider.authenticate(username, password)

        if user_info:
            access_token = create_access_token(identity=user_info["username"])
            return jsonify({
                "access_token": access_token,
                "user": {
                    "id": user_info["id"],
                    "username": user_info["username"],
                    "email": user_info.get("email"),
                },
            }), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Authentication failed"}), 500


@auth_bp.route("/verify", methods=["GET"])
@jwt_required()
def verify() -> tuple:
    """
    Verify JWT token and return current user information.

    Returns:
        JSON response with user information
    """
    current_username = get_jwt_identity()
    return jsonify({
        "username": current_username,
        "authenticated": True,
    }), 200

