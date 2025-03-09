from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

# Function to connect to the PostgreSQL database
def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',      # Replace with your database host
        database='visionx',   # Replace with your database name
        user='postgres',      # Replace with your database username
        password='your_password'  # Replace with your database password
    )
    return conn

# Route to fetch camera data from the database
@app.route('/cameras')
def get_cameras():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM cameras;')  # Replace 'cameras' with your table name
    cameras = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(cameras)

# Home route
@app.route('/')
def home():
    return "Welcome to VisionX!"

if __name__ == '__main__':
    app.run(debug=True)