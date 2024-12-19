const GAME = document.getElementById('game');
const MAP_HTML = document.getElementById('map');
let map_coordinates;
let map_size_px;
const MAP = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1],
                [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

const MAP_SIZE = MAP.length;



let listKeysPressed = new Map();
listKeysPressed.set("z",false);
listKeysPressed.set("q",false);
listKeysPressed.set("s",false);
listKeysPressed.set("d",false);
listKeysPressed.set(" ",false);
listKeysPressed.set("ArrowLeft",false);
listKeysPressed.set("ArrowRight",false);
listKeysPressed.set("ArrowDown",false);
listKeysPressed.set("ArrowUp",false);
listKeysPressed.set("0",false);

let currentTime= Date.now();

function collisionsBulletsTanks(){
    for (tank of listTanks){
        for (bullet of listBullets){
            if (distance(bullet.position, tank.position) < (bullet.size + tank.size)/2){
                tank.remove();
                bullet.remove();
            }
        }
    }
}

function drawMap(){
    
    MAP_HTML.style.gridTemplateColumns = `repeat(${MAP_SIZE}, 1fr)`;

    if (window.innerHeight<window.innerWidth){
        MAP_HTML.style.width = "100vh";
        MAP_HTML.style.height = "100vh";

    } else {
        MAP_HTML.style.width = "100vw";
        MAP_HTML.style.height = "100vw";
    }

    for (let i = 0; i < MAP_SIZE; i++) {
        for (let j = 0; j < MAP_SIZE; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (MAP[i][j]===1){
                cell.style.backgroundColor = "#333";
            }
            MAP_HTML.appendChild(cell);
          }
    }
    map_coordinates = MAP_HTML.getBoundingClientRect();
    map_size_px={xMax: map_coordinates.right, xMin:map_coordinates.left, yMin:map_coordinates.top, yMax:map_coordinates.bottom};
}

function main(){
    drawMap();
    addTank(new Tank(100,100,0,"rgb(255,0,0)","z","s","q","d"," "));
    addTank(new Tank(200,750,0,"rgb(0,255,0)","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","0"));
}

main();

function tick(){
    let nextTime = Date.now();
    let dt = (nextTime - currentTime)/1000; //Delta between two ticks in s
    currentTime = nextTime;
    
    updateTanksPosition(dt);
    updateBulletsPosition(dt);
    shootTanks(dt);
    collisionsBulletsTanks();
    drawBullets();
    drawTanks();
}

setInterval(tick, 20);


// Mise a jour des touches pressées
document.addEventListener("keydown", (e) => {
    if (listKeysPressed.has(e.key)){
        listKeysPressed.set(e.key, true);
    }
});

document.addEventListener("keyup", (e) => {
    if (listKeysPressed.has(e.key)){
        listKeysPressed.set(e.key, false);
    }
});

function updateMapSize(){
    if (window.innerHeight<window.innerWidth){
        MAP_HTML.style.width = "100vh";
        MAP_HTML.style.height = "100vh";

    } else {
        MAP_HTML.style.width = "100vw";
        MAP_HTML.style.height = "100vw";
    }
    map_coordinates = MAP_HTML.getBoundingClientRect();
    map_size_px={xMax: map_coordinates.right, xMin:map_coordinates.left, yMin:map_coordinates.top, yMax:map_coordinates.bottom};
}

window.addEventListener("resize", updateMapSize)