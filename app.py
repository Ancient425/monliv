from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)
@socketio.on("connect")
def on_connect():
    print("Client connected!")

@socketio.on("test")
def test_xd(msg):
    print("Received:", msg)
    socketio.emit("test_back", f"{msg} sent ✅️")

socketio.run(app, debug=True)