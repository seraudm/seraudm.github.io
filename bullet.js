let listBullets = [];
let numberBullets = 0;
const BulletDefaultSpeed = 5;

class Bullet {
    constructor (X,Y, angle, color, speed=BulletDefaultSpeed){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.nbBounces = 0;
        this.speed = speed;
        this.id = "bullet" + numberBullets;
        this.color = color;
        numberBullets ++;
    }

    remove(){
        const bulletHtml = document.getElementById(this.id);
        bulletHtml.remove();
        listBullets.splice(listBullets.indexOf(this), 1);
    }
}

function updateBulletsPosition(){
    for (bullet of listBullets){
        bullet.position.x += Math.sin(bullet.angle*Math.PI/180) * bullet.speed;
        bullet.position.y -= Math.cos(bullet.angle*Math.PI/180) * bullet.speed;

        if(bullet.position.x<0 || bullet.position.x>mapSize.xMax || bullet.position.y<0 || bullet.position.y>mapSize.yMax){
            bullet.remove();
        }

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

function addBullet(bullet){
    listBullets.push(bullet);
}