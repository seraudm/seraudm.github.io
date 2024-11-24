const tank = document.getElementById('tank');
const game = document.getElementById('game');
const tankSpeed = 10;
let position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let angle = 0;

// Mise à jour de la position des balles
function updateBulletsPosition(){
    const listBullets = game.getElementsByClassName("bullet");
    for (bullet of listBullets){

        let xbullet = bullet.xbullet * 1;
        let ybullet = bullet.ybullet * 1;
        let angle = bullet.angle * 1;
        
        ybullet -= Math.cos(angle*Math.PI / 180);
        xbullet += Math.sin(angle*Math.PI / 180);
        
        bullet.style.left= `${xbullet}px`;
        bullet.style.left= `${ybullet}px`;
        
    }
}

setInterval(updateBulletsPosition, 1000);
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
    const bullet = document.createElement("div");
    bullet.className = "bullet";

    let xbullet= position.x + 60*Math.sin(angle*Math.PI/180);
    let ybullet= position.y - 60*Math.cos(angle*Math.PI/180);;


    bullet.style.left = `${xbullet}px`;
    bullet.style.top = `${ybullet}px`;


    bullet.setAttribute("angle", angle);
    bullet.setAttribute("xbullet", xbullet);
    bullet.setAttribute("ybullet", ybullet);

    bullet.style.transform = `translate(-50%, -50%)`;
    game.appendChild(bullet);
}