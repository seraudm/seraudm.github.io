const game = document.getElementById('game');
const mapSize={xMax: window.innerWidth, yMax: window.innerHeight};

let listKeysPressed = new Map();
listKeysPressed.set("z",false);
listKeysPressed.set("q",false);
listKeysPressed.set("s",false);
listKeysPressed.set("d",false);
listKeysPressed.set(" ",false);

let currentTime= Date.now();

function main(){
    addTank(new Tank(100,100,0,"rgb(255,0,0)","z","s","q","d"," "))
}

main();

function tick(){
    let nextTime = Date.now();
    let dt = (nextTime - currentTime) * 100; //Delta between two ticks in s
    currentTime = nextTime;

    updateTanksPosition(dt);
    updateBulletsPosition(dt);
    shootTanks(dt);
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

