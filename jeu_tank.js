//const tank = document.getElementById('tank');
const game = document.getElementById('game');
let listKeysPressed = new Map();
listKeysPressed.set("z",false);
listKeysPressed.set("q",false);
listKeysPressed.set("s",false);
listKeysPressed.set("d",false);



function tick(){
    console.log(listKeysPressed.get("z"));
    updateBulletsPosition();
    drawBullets();
    drawTanks();
}

setInterval(tick, 20);
// Mise à jour de la position du tank
function updateTankPosition() {
    tank.style.left = `${position.x}px`;
    tank.style.top = `${position.y}px`;
    tank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
}


// Gestion des touches pour tirer

// Mise a jour des touches pressées
document.addEventListener("keydown", (e) => {
    listKeysPressed.set(e.key, true);
});

document.addEventListener("keyup", (e) => {
    if (listKeysPressed.has(e.key)){
        listKeysPressed.set(e.key, false);
    }
});