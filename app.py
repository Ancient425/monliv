from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on("connect")
def on_connect():
    print("Client connected!")

@socketio.on("message")
def on_message(msg):
    print("Received:", msg)
    socketio.send(f"Server received: {msg}")

if __name__ == "__main__":
    socketio.run(app, debug=True)