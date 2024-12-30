const GAME = document.getElementById('game');
const MAP_HTML = document.getElementById('map');
const EPSILON = 10**(-5);
const CELLS_COLOURS = [new Colour(255, 255, 255, 255), new Colour(0, 0, 0, 255), new Colour(255, 0, 0, 255)];
let mapCoordinates;
let mapSizePx;
const MAP = getMap("map1");
// const MAP = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,1],
//                 [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
//                 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

const MAP_SIZE_X = MAP[0].length;
const MAP_SIZE_Y = MAP.length;

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
    let indexTank = 0;
    while (indexTank<listTanks.length) {
        const tank = listTanks[indexTank];
        let isTankDeleted = false;
        let indexBullet = 0;

        while (indexBullet<listBullets.length && !(isTankDeleted)) {
            const bullet = listBullets[indexBullet];
            if ( (bullet.position.sub(tank.position)).norm() < (bullet.size + tank.size)/2){
                tank.remove();
                bullet.remove();
                isTankDeleted = true;
            }
            indexBullet ++;
        }
        
        if (!isTankDeleted){
            indexTank ++;
        }
    }
            
}

function drawMap(){
    
    MAP_HTML.style.gridTemplate = `repeat(${MAP_SIZE_Y}, 1fr) / repeat(${MAP_SIZE_X}, 1fr)`;

    for (let i = 0; i < MAP_SIZE_Y; i++) {
        for (let j = 0; j < MAP_SIZE_X; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (MAP[i][j]===1){
                cell.style.backgroundColor = "#333";
            }
            MAP_HTML.appendChild(cell);
          }
    }

    updateMapSize();

}



function main(){
    drawMap();
    addTank(new Tank(new Vector(2.5,2.5), Math.PI/2,"rgb(255,0,0)","z","s","q","d"," "));
    addTank(new Tank(new Vector(2.5,5.5),0,"rgb(0,255,0)","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","0"));
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

setInterval(tick, 10);


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
    let ratio = MAP_SIZE_X / MAP_SIZE_Y;
    if (window.innerHeight * MAP_SIZE_X < window.innerWidth * MAP_SIZE_Y){
        MAP_HTML.style.width = `${100 * ratio}vh`;
        MAP_HTML.style.height = "100vh";

    } else {
        MAP_HTML.style.width = "100vw";
        MAP_HTML.style.height = `${100 / ratio}vw`;
    }
    mapCoordinates = MAP_HTML.getBoundingClientRect();
    mapSizePx={xMax: mapCoordinates.right, xMin:mapCoordinates.left, yMin:mapCoordinates.top, yMax:mapCoordinates.bottom};
}

window.addEventListener("resize", updateMapSize)