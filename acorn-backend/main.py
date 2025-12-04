"""
Main entry point for acorn backend.
"""
from acorn_backend.app import create_app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=5000)
