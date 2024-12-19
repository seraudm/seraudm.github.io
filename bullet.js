let listBullets = [];

class Bullet {
    static DEFAULT_SPEED = 400; // Unit: px/s
    static DEFAULT_SIZE = 10; // Unit: px
    static MAX_NUMBER_BOUNCES = 2;
    static numberBullets = 0;

    constructor (position, angle, color, speed=Bullet.DEFAULT_SPEED, size=Bullet.DEFAULT_SIZE){
        this.created = false;
        this.angle = angle;
        this.position = position;
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
        let nextPosition = {x: this.position.x, y:this.position.y};
        nextPosition.x += Math.sin(this.angle) * this.speed *dt;
        nextPosition.y -= Math.cos(this.angle) * this.speed *dt;

        if(isValid(nextPosition)){
            this.position = nextPosition;
        } else {
            if (this.nbBounces == Bullet.MAX_NUMBER_BOUNCES){
                this.remove();
            } else {
                let side = getSideOfTheWall(this.position, nextPosition);
                console.log(side);
                if (side == "right" || side =="left"){
                    this.angle = - this.angle;
                } else {
                    this.angle = Math.PI - this.angle;
                }
            }
            this.nbBounces ++;
        }
    }

    draw(){
        let positionPx = convertPositionGameUnitToPx(this.position);
        let sizePx = convertGameUnitToPx(this.size);    
        if (!(this.created)){
            this.created = true;
            const bulletHtml = document.createElement("div");

            bulletHtml.className = "bullet";
            bulletHtml.id = this.id;

            bulletHtml.style.left = `${positionPx.x}px`;
            bulletHtml.style.top = `${positionPx.y}px`;
            bulletHtml.style.backgroundColor = this.color;
            bulletHtml.style.height = `${sizePx}px`;
            bulletHtml.style.width = `${sizePx}px`;

            GAME.appendChild(bulletHtml);
        } else {
            const bulletHtml = document.getElementById(this.id);

            bulletHtml.style.left = `${positionPx.x}px`;
            bulletHtml.style.top = `${positionPx.y}px`;
            
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