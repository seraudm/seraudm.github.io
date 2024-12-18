const GAME = document.getElementById('game');
const MAP_SIZE={xMax: window.innerWidth, yMax: window.innerHeight};

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

function main(){
    addTank(new Tank(100,100,0,"rgb(255,0,0)","z","s","q","d"," "));
    addTank(new Tank(400,400,0,"rgb(0,255,0)","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","0"));
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

