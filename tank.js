let listTanks = [];


class Tank{
    static DEFAULT_SPEED = 100; // Unit: px/s
    static DEFAULT_ANGLE_SPEED_DEG = 90; // Unit: deg/s
    static DEFAULT_ANGLE_SPEED = Tank.DEFAULT_ANGLE_SPEED_DEG*Math.PI/180; // Unit: rad/s
    static DEFAULT_SHOOTING_COOLDOWN = 1; // Unit: s
    static DEFAULT_SIZE = 50;
    static numberTanks = 0;

    constructor (X,Y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size=Tank.DEFAULT_SIZE){
        this.keybinds = {moveForward: moveForward, moveBackward: moveBackward, turnLeft: turnLeft, turnRight: turnRight, shoot: shoot};
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.color = color;
        this.angleSpeed = Tank.DEFAULT_ANGLE_SPEED;

        this.id = `tank${Tank.numberTanks}`;

        this.speed = Tank.DEFAULT_SPEED;

        this.cooldown = 0;
        this.size=size;

        Tank.numberTanks ++;

    }

    shoot(dt) {

        this.cooldown = Math.max(0, this.cooldown - dt);

        if (listKeysPressed.get(this.keybinds.shoot) && this.cooldown == 0){
            let bullet = new Bullet(this.position.x + this.size*Math.sin(this.angle), this.position.y - this.size*Math.cos(this.angle), this.angle, this.color)
            addBullet(bullet);
            this.cooldown = Tank.DEFAULT_SHOOTING_COOLDOWN;
        }
    }

    updatePosition(dt){
        if (listKeysPressed.get(this.keybinds.moveForward)){
            this.position.x += Math.sin(this.angle) * this.speed *dt;
            this.position.y -= Math.cos(this.angle) * this.speed *dt;
        }
        if (listKeysPressed.get(this.keybinds.moveBackward)){
            this.position.x -= Math.sin(this.angle) * this.speed *dt;
            this.position.y += Math.cos(this.angle) * this.speed *dt;
        }
        if (listKeysPressed.get(this.keybinds.turnLeft)){
            this.angle -= this.angleSpeed *dt;
        }
        if (listKeysPressed.get(this.keybinds.turnRight)){
            this.angle += this.angleSpeed *dt;
        }
    }

    draw(){
        if (!(this.created)){
            this.created = true;
            const tankHtml = document.createElement("div");
            const canonHtml  = document.createElement("div");

            canonHtml.className = "canon";
            tankHtml.className = "tank";
            tankHtml.id = this.id;

            tankHtml.style.left = `${this.position.x}px`;
            tankHtml.style.top = `${this.position.y}px`;
            tankHtml.style.backgroundColor = this.color;
            tankHtml.style.height = `${this.size}px`;
            tankHtml.style.width = `${this.size}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;

            GAME.appendChild(tankHtml);
            tankHtml.appendChild(canonHtml);
        } else {
            const tankHtml = document.getElementById(this.id);

            tankHtml.style.left = `${this.position.x}px`;
            tankHtml.style.top = `${this.position.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;

            
        }
    }

    remove(){
        const tankHtml = document.getElementById(this.id);
        tankHtml.remove();
        listTanks.splice(listTanks.indexOf(this), 1);
    }

}



function drawTanks(){
    for (tank of listTanks){
        tank.draw();
    }
}


function addTank(tank){
    listTanks.push(tank);
}

function updateTanksPosition(dt){
    for (tank of listTanks){
        tank.updatePosition(dt);
    }
}

function shootTanks(dt){
    for (tank of listTanks){
        tank.shoot(dt);
    }
}