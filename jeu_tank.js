const tank = document.getElementById('tank');
const game = document.getElementById('game');
const tankSpeed = 10;
let position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let angle = 0;
//setInterval(updateBallePosition, 1000);
// Mise à jour de la position des balles
function updateBulletsPosition(){
    const listBalles = document.getElementsByClassName("balle");
    for (balle of listBalles){
        let xballe = balle.xballe * 1;
        let yballe = balle.yballe * 1;
        let angle = balle.angle * 1;

        yballe -= Math.cos(angle*Math.PI / 180);
        xballe += Math.sin(angle*Math.PI / 180);

        balle.style.left= `${xballe}px`;
        balle.style.left= `${yballe}px`;

    }
}

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

document.addEventListener("click", Tir)


function Tir(){
    console.log("tir");
    const balle = document.createElement("div");
    balle.className = "balle";

    let xballe= position.x + 60*Math.sin(angle*Math.PI/180);
    let yballe= position.y - 60*Math.cos(angle*Math.PI/180);;


    balle.style.left = `${xballe}px`;
    balle.style.top = `${yballe}px`;


    balle.setAttribute("angle", angle);
    balle.setAttribute("xBalle", xballe);
    balle.setAttribute("yballe", yballe);

    balle.style.transform = `translate(-50%, -50%)`;
    game.appendChild(balle);
}

// Initialiser la position
updateTankPosition();