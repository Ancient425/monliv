const get = (dom) => { return document.querySelector(dom) }
const getAll = (dom) => { return document.querySelectorAll(dom) }

const TILE_DIMENTIONS = 75; // in pixels
const VIEW_RADIUS = 5; // in tiles er side
const MAP_DIMENTIONS = 20; // in tiles per side

const view = get(".view");
const map = get(".map");
const player = get(".player");

window.addEventListener("load", () => {
    map.style.top = "0px";
    map.style.left = "0px";

    player.style.width = `${TILE_DIMENTIONS}px`
    player.style.height = `${TILE_DIMENTIONS}px`
    player.style.top = `${(Math.floor(VIEW_RADIUS/2))*TILE_DIMENTIONS}px`;
    player.style.left = `${(Math.floor(VIEW_RADIUS/2))*TILE_DIMENTIONS}px`;
})

// dimentions of the camara i.e. view

view.style.width = `${TILE_DIMENTIONS * VIEW_RADIUS}px`
view.style.height = `${TILE_DIMENTIONS * VIEW_RADIUS}px`

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

    div.innerHTML = i;
    map.appendChild(div)
}

// camara view function

const moveCamara = (direction, pixels) => {
    let top = parseInt(getComputedStyle(map).top);    // get current cords
    let left = parseInt(getComputedStyle(map).left);  // get current cords

    // err correction
    
    top = (Math.round(top/TILE_DIMENTIONS))*TILE_DIMENTIONS;  
    left = (Math.round(left/TILE_DIMENTIONS))*TILE_DIMENTIONS;
    
    if (direction == "left") {
        map.style.left = `${left + pixels}px`;
    } else if (direction == "top") {
        map.style.top = `${top + pixels}px`;
    } else {
        return "err";
    }
}

const movePlayer = (direction, pixels) => {
    let top = parseInt(getComputedStyle(player).top);    // get current cords
    let left = parseInt(getComputedStyle(player).left);  // get current cords

    // err correction
    
    top = (Math.round(top/TILE_DIMENTIONS))*TILE_DIMENTIONS;  
    left = (Math.round(left/TILE_DIMENTIONS))*TILE_DIMENTIONS;
    
    if (direction == "left") {
        player.style.left = `${left + pixels}px`;
    } else if (direction == "top") {
        player.style.top = `${top + pixels}px`;
    } else {
        return "err";
    }
}

// movement

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