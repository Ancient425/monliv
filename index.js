const get = (dom) => { return document.querySelector(dom) }
const getAll = (dom) => { return document.querySelectorAll(dom) }

const TILE_DIMENTIONS = 75; // in pixels
const VIEW_RADIUS = 5; // in tiles er side
const MAP_DIMENTIONS = 50; // in tiles per side

const view = get(".view");
const map = get(".map");
const player = get(".player");
const body = get("body")
const buttons = get(".buttons")

// temporary player id
const num = Math.floor(Math.random() * 900) + 100;


window.addEventListener("load", () => {
    map.style.top = "0px";
    map.style.left = "0px";

    player.style.width = `${TILE_DIMENTIONS}px`
    player.style.height = `${TILE_DIMENTIONS}px`
    player.style.top = `${((Math.floor(VIEW_RADIUS / 2)) + 2) * TILE_DIMENTIONS}px`;
    player.style.left = `${(Math.floor(VIEW_RADIUS / 2)) * TILE_DIMENTIONS}px`;

})

let cords = {
    left: player.style.left,
    top: player.style.top,
    id: num
}
//socketio.emit("connect", "cords");

// dimentions of the camara i.e. view

view.style.width = `${TILE_DIMENTIONS * VIEW_RADIUS}px`
view.style.height = `${(TILE_DIMENTIONS * VIEW_RADIUS) + (TILE_DIMENTIONS * 2)}px`

// dimentions of the map

map.style.width = `${TILE_DIMENTIONS * MAP_DIMENTIONS}px`
map.style.height = `${TILE_DIMENTIONS * MAP_DIMENTIONS}px`

// grid layout 

map.style.gridTemplateColumns = `repeat(${MAP_DIMENTIONS} , 1fr)`
map.style.gridTemplateRows = `repeat(${MAP_DIMENTIONS} , 1fr)`

for (let i = 0; i < MAP_DIMENTIONS ** 2; i++) {
    let div = document.createElement("div");
    div.classList.add("tile")
    div.classList.add(`tile${i}`)

    // div.innerHTML = i;   
    div.style.width = `${TILE_DIMENTIONS}px`
    div.style.height = `${TILE_DIMENTIONS}px`

    map.appendChild(div)
}

// camara view function

const moveCamara = (direction, pixels) => {
    let top = parseInt(getComputedStyle(map).top);    // get current cords
    let left = parseInt(getComputedStyle(map).left);  // get current cords

    // err correction

    top = (Math.round(top / TILE_DIMENTIONS)) * TILE_DIMENTIONS;
    left = (Math.round(left / TILE_DIMENTIONS)) * TILE_DIMENTIONS;

    if (direction == "left") {
        map.style.left = `${left + pixels}px`;
    } else if (direction == "top") {
        map.style.top = `${top + pixels}px`;
    } else {
        return "err";
    }
}

// helper functions

const movePlayer = (direction, pixels) => {
    let top = parseInt(getComputedStyle(player).top);    // get current cords
    let left = parseInt(getComputedStyle(player).left);  // get current cords

    // err correction

    top = (Math.round(top / TILE_DIMENTIONS)) * TILE_DIMENTIONS;
    left = (Math.round(left / TILE_DIMENTIONS)) * TILE_DIMENTIONS;

    if (direction == "left") {
        player.style.left = `${left + pixels}px`;
    } else if (direction == "top") {
        player.style.top = `${top + pixels}px`;
    } else {
        return "err";
    }

    // Get current tile position
    let currentTop = parseInt(getComputedStyle(player).top);
    let currentLeft = parseInt(getComputedStyle(player).left);
    let tileRow = currentTop / TILE_DIMENTIONS;
    let tileCol = currentLeft / TILE_DIMENTIONS;
    let tileIndex = Math.round(tileRow) * MAP_DIMENTIONS + Math.round(tileCol);
    
    let currentTile = get(`.tile${tileIndex}`);
    currentTile.classList.add("animate");

    setTimeout(() => {
        currentTile.classList.remove("animate");
    },1000);
}

// long press button

const repeatActions = {};

const startRepeatAction = (key, action) => {
    if (repeatActions[key]) return;
    action();
    repeatActions[key] = setInterval(action, 100);
};

const stopRepeatAction = (key) => {
    if (!repeatActions[key]) return;
    clearInterval(repeatActions[key]);
    delete repeatActions[key];
};

// movement

// keyboar

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key == "A" || e.key == "a") {
        moveCamara("left", 75)
        movePlayer("left", -75)
    } else if (e.key === "ArrowRight" || e.key == "D" || e.key == "d") {
        moveCamara("left", -75)
        movePlayer("left", 75)
    } else if (e.key === "ArrowUp" || e.key == "W" || e.key == "w") {
        moveCamara("top", 75)
        movePlayer("top", -75)
    } else if (e.key === "ArrowDown" || e.key == "S" || e.key == "s") {
        moveCamara("top", -75)
        movePlayer("top", 75)
    }
})



// mobile
const up = get(".up"),
    down = get(".down"),
    left = get(".left"),
    right = get(".right");

const moveUp = () => {
    moveCamara("top", 75)
    movePlayer("top", -75)
};
const moveDown = () => {
    moveCamara("top", -75)
    movePlayer("top", 75)
};
const moveLeft = () => {
    moveCamara("left", 75)
    movePlayer("left", -75)
};
const moveRight = () => {
    moveCamara("left", -75)
    movePlayer("left", 75)
};

const bindHold = (element, action, key) => {
    if (!element) return;
    const start = (e) => {
        e.preventDefault();
        startRepeatAction(key, action);
    };
    const stop = () => {
        stopRepeatAction(key);
    };

    element.addEventListener("mousedown", start);
    element.addEventListener("touchstart", start, { passive: false });
    element.addEventListener("mouseup", stop);
    element.addEventListener("mouseleave", stop);
    element.addEventListener("touchend", stop);
    element.addEventListener("touchcancel", stop);
    element.addEventListener("click", action);
};

bindHold(up, moveUp, "up");
bindHold(down, moveDown, "down");
bindHold(left, moveLeft, "left");
bindHold(right, moveRight, "right");