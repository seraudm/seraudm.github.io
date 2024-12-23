const GAME = document.getElementById('game');
const MAP_HTML = document.getElementById('map');
let mapCoordinates;
let mapSizePx;
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
                break;
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
    mapCoordinates = MAP_HTML.getBoundingClientRect();
    mapSizePx={xMax: mapCoordinates.right, xMin:mapCoordinates.left, yMin:mapCoordinates.top, yMax:mapCoordinates.bottom};
}

function main(){
    drawMap();
    addTank(new Tank(2.5,2.5, Math.PI/2,"rgb(255,0,0)","z","s","q","d"," "));
    addTank(new Tank(2.5,5.5,0,"rgb(0,255,0)","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","0"));
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
    mapCoordinates = MAP_HTML.getBoundingClientRect();
    mapSizePx={xMax: mapCoordinates.right, xMin:mapCoordinates.left, yMin:mapCoordinates.top, yMax:mapCoordinates.bottom};
}

window.addEventListener("resize", updateMapSize)