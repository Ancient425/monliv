from flask import Flask
from flask_socketio import SocketIO
from myfunc import check_for_p

app = Flask(__name__)
socketio = SocketIO(
    app,
    cors_allowed_origins="*"
)

players = {}

def game_loop():
    while True:
        socketio.emit("game_state", players)
        socketio.sleep(0.05)  # gng 50ms 

socketio.start_background_task(game_loop)


@socketio.on("connect")
def on_connect(cords):
    print("Client connected!")

    players = check_for_p(cords,players)

@socketio.on("test")
def test_xd(msg):
    print("Received:", msg)
    socketio.emit("test_back", f"{msg} sent ✅️")

@socketio.on("player_data")
def move():
    pass

socketio.run(app, debug=True)