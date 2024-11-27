let listBullets = [];
let numberBullets = 0;
const bulletDefaultSpeed = 1;

class Bullet {
    constructor (X,Y, angle, color){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.nbBounces = 0;
        this.speed = bulletDefaultSpeed;
        this.id = "bullet" + numberBullets;
        this.color = color;
        numberBullets ++;
    }
}

function drawBullets(){
    for (bullet of listBullets){
        if (!(bullet.created)){
            bullet.created = true;
            const bulletHtml = document.createElement("div");

            bulletHtml.className = "bullet";
            bulletHtml.id = bullet.id;

            bulletHtml.style.left = `${bullet.position.x}px`;
            bulletHtml.style.top = `${bullet.position.y}px`;
            bulletHtml.style.borderColor = bullet.color;

            game.appendChild(bulletHtml);
        } else {
            const bulletHtml = document.getElementById(bullet.id);

            bulletHtml.style.left = `${bullet.position.x}px`;
            bulletHtml.style.top = `${bullet.position.y}px`;
            
        }

    }
}

function addBullet(x, y, angle, color){
    listBullets.push(new Bullet(x, y, angle, color));
}