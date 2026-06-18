const socket = io(http://127.0.0.1:5000);

socket.on("test_back", (msg) => {
    console.log(msg);
});

import {cords} from './index.js';

socketio.emit("player_cords", "cords");

