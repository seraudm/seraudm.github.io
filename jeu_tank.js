//const tank = document.getElementById('tank');
const game = document.getElementById('game');
let listKeysPressed = new Map();
listKeysPressed.set("z",false);
listKeysPressed.set("q",false);
listKeysPressed.set("s",false);
listKeysPressed.set("d",false);
listKeysPressed.set(" ",false);




function tick(){
    updateTanksPosition();
    updateBulletsPosition();
    shootTanks();
    drawBullets();
    drawTanks();
}

setInterval(tick, 20);


// Mise a jour des touches pressées
document.addEventListener("keydown", (e) => {
    listKeysPressed.set(e.key, true);
});

document.addEventListener("keyup", (e) => {
    if (listKeysPressed.has(e.key)){
        listKeysPressed.set(e.key, false);
    }
});