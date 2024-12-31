const GAME = document.getElementById('game');
const EPSILON = 10**(-5);
const CELLS_COLOURS = [new Colour(255, 255, 255, 255), new Colour(0, 0, 0, 255), new Colour(255, 0, 0, 255), new Colour(0, 0, 255, 255)];

const GAME_MAP = GameMap.getMapByID("lake");

const MUSIC = new Audio();
MUSIC.loop = true;
MUSIC.addEventListener("loadeddata", () => MUSIC.play());
MUSIC.src = "audio/musique.mp3";
MUSIC.load();


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

function main(){
    GAME_MAP.load();
    Tank.addTank(new Tank(GAME_MAP.spawns[0], 0,"rgb(255,0,0)","z","s","q","d"," "));
    Tank.addTank(new Tank(GAME_MAP.spawns[1],0,"rgb(255, 238, 0)","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","0"));
}

main();

function tick(){
    let nextTime = Date.now();
    let dt = (nextTime - currentTime)/1000; //Delta between two ticks in s
    currentTime = nextTime;
    
    Tank.updateTanksPosition(dt);
    Bullet.updateBulletsPosition(dt);
    Tank.shootTanks(dt);
    collisionsBulletsTanks();
    collisionsBulletsBullets();
    Bullet.drawBullets();
    Tank.drawTanks();
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


function resizeMap(){
    GAME_MAP.updateSize();
}

window.addEventListener("resize", resizeMap);