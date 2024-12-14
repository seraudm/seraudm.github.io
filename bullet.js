let listBullets = [];

class Bullet {
    static DEFAULT_SPEED = 200; // Unit: px/s
    static numberBullets = 0;

    constructor (X,Y, angle, color, speed=Bullet.DEFAULT_SPEED){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.nbBounces = 0;
        this.speed = speed;
        this.id = `bullet${Bullet.numberBullets}`;
        this.color = color;
        Bullet.numberBullets ++;
    }

    remove(){
        const bulletHtml = document.getElementById(this.id);
        bulletHtml.remove();
        listBullets.splice(listBullets.indexOf(this), 1);
    }

    updatePosition(dt){
        this.position.x += Math.sin(this.angle) * this.speed *dt;
        this.position.y -= Math.cos(this.angle) * this.speed *dt;

        if(this.position.x<0 || this.position.x>mapSize.xMax || this.position.y<0 || this.position.y>mapSize.yMax){
            this.remove();
        }
    }

    draw(){
        if (!(this.created)){
            this.created = true;
            const bulletHtml = document.createElement("div");

            bulletHtml.className = "bullet";
            bulletHtml.id = this.id;

            bulletHtml.style.left = `${this.position.x}px`;
            bulletHtml.style.top = `${this.position.y}px`;
            bulletHtml.style.backgroundColor = this.color;

            game.appendChild(bulletHtml);
        } else {
            const bulletHtml = document.getElementById(this.id);

            bulletHtml.style.left = `${this.position.x}px`;
            bulletHtml.style.top = `${this.position.y}px`;
            
        }
    }

}

function updateBulletsPosition(dt){
    for (bullet of listBullets){
        bullet.updatePosition(dt);
    }
}

function drawBullets(){
    for (bullet of listBullets){
        bullet.draw();
    }
}

function addBullet(bullet){
    listBullets.push(bullet);
}