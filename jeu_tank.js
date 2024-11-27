//const tank = document.getElementById('tank');
const game = document.getElementById('game');


function tick(){
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

// Gestion des touches pour déplacer le tank
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': // Avancer
            position.y -= Math.cos(angle*Math.PI / 180)*tankSpeed;
            position.x += Math.sin(angle*Math.PI / 180)*tankSpeed;
            break;
        case 'ArrowDown': // Reculer
            position.y += Math.cos(angle*Math.PI / 180)*tankSpeed;
            position.x -= Math.sin(angle*Math.PI / 180)*tankSpeed;
            break;
        case 'ArrowLeft': // Tourner à gauche
            angle -= 5;
            break;
        case 'ArrowRight': // Tourner à droite
            angle += 5;
            break;
    }
    // Empêche le tank de sortir de l'écran
    position.x = Math.max(25, Math.min(window.innerWidth - 25, position.x));
    position.y = Math.max(25, Math.min(window.innerHeight - 25, position.y));
    updateTankPosition();
});

// Gestion des touches pour tirer

document.addEventListener("keydown", Tir)
