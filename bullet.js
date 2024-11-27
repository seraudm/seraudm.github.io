let listBullets = [];
let numberBullets = 0;
const bulletDefaultSpeed = 1;

class bullet {
    constructor (X,Y, angle){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.nbBounces = 0;
        this.speed = bulletDefaultSpeed;
        this.id = "bullet" + numberBullets;
        numberBullets ++;
    }
}