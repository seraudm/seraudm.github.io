let listBullets = [];

class Bullet {
    static DEFAULT_SPEED = 300; // Unit: px/s
    static DEFAULT_SIZE = 10; // Unit: px
    static numberBullets = 0;

    constructor (X,Y, angle, color, speed=Bullet.DEFAULT_SPEED, size=Bullet.DEFAULT_SIZE){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.nbBounces = 0;
        this.speed = speed;
        this.id = `bullet${Bullet.numberBullets}`;
        this.color = color;
        this.size = size;
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

        if(this.position.x<0 || this.position.x>MAP_SIZE.xMax || this.position.y<0 || this.position.y>MAP_SIZE.yMax){
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
            bulletHtml.style.height = `${this.size}px`;
            bulletHtml.style.width = `${this.size}px`;

            GAME.appendChild(bulletHtml);
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