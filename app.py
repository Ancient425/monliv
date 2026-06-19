from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)


def game_loop():
    while True:
        socketio.emit("game_state", {"players": players})
        socketio.sleep(0.05)  # gng 50ms 

socketio.start_background_task(game_loop)


@socketio.on("connect")
def on_connect():
    print("Client connected!")

@socketio.on("test")
def test_xd(msg):
    print("Received:", msg)
    socketio.emit("test_back", f"{msg} sent ✅️")

@socketio.on("player_data")
def move():
    pass

socketio.run(app, debug=True)