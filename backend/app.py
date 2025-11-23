from flask import Flask, request, jsonify
import sqlite3
import bcrypt
from flask_httpauth import HTTPBasicAuth
import os
import logging

app = Flask(__name__)
auth = HTTPBasicAuth()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

DATABASE_PATH = os.environ.get("DATABASE_PATH", "teams.db")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "Vikram59")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "rtcpl2025")

# Configure basic auth
@auth.verify_password
def verify_password(username, password):
    """Verify the admin credentials."""
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD

def init_db():
    """Initialize the database and create tables if they don't exist."""
    with sqlite3.connect(DATABASE_PATH) as conn:
        cursor = conn.cursor()
        # Create the `teams` table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS teams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_name TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            )
        ''')
        # Create the `players` table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS players (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                team_id INTEGER NOT NULL,
                player_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                FOREIGN KEY (team_id) REFERENCES teams(id)
            )
        ''')
        conn.commit()


@app.route('/api/test', methods=['GET'])
def testing():
    """A dummy endpoint for testing."""
    return jsonify({"message": "This is a test endpoint", "status": "success"}), 200



@app.route('/api/submit-team', methods=['POST'])
@auth.login_required
def submit_team():
    """Handle team submission with players, user_name, and password."""
    data = request.get_json()
    players = data.get('players')
    user_name = data.get('user_name')
    password = data.get('password')

    if not user_name or not players or not isinstance(players, list) or not password:
        return jsonify({"success": False, "error": "Invalid input"}), 400

    try:
        with sqlite3.connect(DATABASE_PATH) as conn:
            cursor = conn.cursor()

            # Check if the user_name already exists
            cursor.execute('SELECT id, password_hash FROM teams WHERE user_name = ?', (user_name,))
            team = cursor.fetchone()

            if team:
                # Team exists, verify password
                logger.debug("# Team exists, verify password")
                team_id, password_hash = team
                if not bcrypt.checkpw(password.encode('utf-8'), password_hash):
                    return jsonify({"success": False, "error": "Incorrect password!! Please use your password!"}), 401

                # Update players for the team
                cursor.execute('DELETE FROM players WHERE team_id = ?', (team_id,))
                for player in players:
                    cursor.execute('''
                        INSERT INTO players (team_id, player_id, name, price)
                        VALUES (?, ?, ?, ?)
                    ''', (team_id, player['id'], player['name'], player['price']))
                conn.commit()
                return jsonify({"success": True, "isNewTeam": False}), 200
            else:
                # New team, create entry
                logger.debug("# New team, create entry")
                password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                cursor.execute('INSERT INTO teams (user_name, password_hash) VALUES (?, ?)', (user_name, password_hash))
                team_id = cursor.lastrowid

                # Insert players for the new team
                for player in players:
                    cursor.execute('''
                        INSERT INTO players (team_id, player_id, name, price)
                        VALUES (?, ?, ?, ?)
                    ''', (team_id, player['id'], player['name'], player['price']))
                conn.commit()
                return jsonify({"success": True, "isNewTeam": True}), 201

    except sqlite3.Error as e:
        return jsonify({"success": False, "error": f"Database error: {e}"}), 500


init_db()  # Ensure database is initialized

if __name__ == '__main__':
    app.run(debug=True, port=os.environ.get('PORT', 5001))
