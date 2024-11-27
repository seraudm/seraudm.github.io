let listBullets = [];
let numberBullets = 0;
const BulletDefaultSpeed = 5;

class Bullet {
    constructor (X,Y, angle, color){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.nbBounces = 0;
        this.speed = BulletDefaultSpeed;
        this.id = "bullet" + numberBullets;
        this.color = color;
        numberBullets ++;
    }
}

function updateBulletsPosition(){
    for (bullet of listBullets){
        bullet.position.x += Math.sin(bullet.angle*Math.PI/180) * bullet.speed;
        bullet.position.y -= Math.cos(bullet.angle*Math.PI/180) * bullet.speed;
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
            bulletHtml.style.backgroundColor = bullet.color;

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