let listTanks = [];


class Tank{
    static DEFAULT_SPEED = 150; // Unit: GameUnit/s
    static DEFAULT_ANGLE_SPEED_DEG = 90; // Unit: deg/s
    static DEFAULT_ANGLE_SPEED = Tank.DEFAULT_ANGLE_SPEED_DEG*Math.PI/180; // Unit: rad/s
    static DEFAULT_SHOOTING_COOLDOWN = 0.75 // Unit: s
    static DEFAULT_SIZE = 60; //Unit: GameUnit CAREFULL THIS THE DIAMETER
    static NUMBER_CHECKING_POINTS = 32;
    static numberTanks = 0;

    constructor (X,Y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size=Tank.DEFAULT_SIZE, shootingCooldown=Tank.DEFAULT_SHOOTING_COOLDOWN){
        this.keybinds = {moveForward: moveForward, moveBackward: moveBackward, turnLeft: turnLeft, turnRight: turnRight, shoot: shoot};
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.color = color;
        this.angleSpeed = Tank.DEFAULT_ANGLE_SPEED;

        this.id = `tank${Tank.numberTanks}`;

        this.speed = Tank.DEFAULT_SPEED;

        this.shootingCooldown = shootingCooldown;
        this.cooldown = 0;
        this.size=size;
        this.removed = false;
        Tank.numberTanks ++;

    }

    shoot(dt) {

        this.cooldown = Math.max(0, this.cooldown - dt);
        let bulletPositon = {x:this.position.x + this.size*Math.sin(this.angle), y:this.position.y - this.size*Math.cos(this.angle)}
        if (listKeysPressed.get(this.keybinds.shoot) && this.cooldown == 0 && isValid(bulletPositon)){
            let bullet = new Bullet(bulletPositon, this.angle, this.color)
            addBullet(bullet);
            this.cooldown = this.shootingCooldown;
        }
    }

    updatePosition(dt){
        // Calculate next position
        let nextPosition = {x: this.position.x, y:this.position.y};

        if (listKeysPressed.get(this.keybinds.moveForward)){
            nextPosition.x += Math.sin(this.angle) * this.speed *dt;
            nextPosition.y -= Math.cos(this.angle) * this.speed *dt;
        }
        if (listKeysPressed.get(this.keybinds.moveBackward)){
            nextPosition.x -= Math.sin(this.angle) * this.speed *dt;
            nextPosition.y += Math.cos(this.angle) * this.speed *dt;
        }

        // Verify the validity of the next postion, using NUMBER_CHECKING_POINT checking points around the tank and the center
        let validity = isValid(nextPosition);
        
        for (let i=0; i<Tank.NUMBER_CHECKING_POINTS; i++){
            let checkingPoint = {x: nextPosition.x, y: nextPosition.y}; // Copie de nextPosition pour ne pas modifier sa valeur

            checkingPoint.x += Math.sin(this.angle + i * 2*Math.PI/Tank.NUMBER_CHECKING_POINTS) * this.size/2;
            checkingPoint.y += Math.cos(this.angle + i * 2*Math.PI/Tank.NUMBER_CHECKING_POINTS) * this.size/2;
            
            validity = validity && isValid(checkingPoint);
        }

        if (validity){
            this.position = nextPosition;
        }


        this.updateAngle(dt);
    }

    updateAngle(dt){
        if (listKeysPressed.get(this.keybinds.turnLeft)){
            this.angle -= this.angleSpeed *dt;
        }
        if (listKeysPressed.get(this.keybinds.turnRight)){
            this.angle += this.angleSpeed *dt;
        }
    }

    draw(){
        let positionPx = convertPositionGameUnitToPx(this.position);
        let sizePx= convertGameUnitToPx(this.size);
        if (!(this.created)){
            this.created = true;
            const tankHtml = document.createElement("div");
            const canonHtml  = document.createElement("div");
            canonHtml.className = "canon";
            tankHtml.className = "tank";
            tankHtml.id = this.id;

            tankHtml.style.left = `${positionPx.x}px`;
            tankHtml.style.top = `${positionPx.y}px`;
            tankHtml.style.backgroundColor = this.color;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;
            tankHtml.style.height = `${sizePx}px`;
            tankHtml.style.width = `${sizePx}px`;
            GAME.appendChild(tankHtml);
            tankHtml.appendChild(canonHtml);
        } else {
            const tankHtml = document.getElementById(this.id);

            tankHtml.style.left = `${positionPx.x}px`;
            tankHtml.style.top = `${positionPx.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;
            tankHtml.style.height = `${sizePx}px`;
            tankHtml.style.width = `${sizePx}px`;
        }
    }

    remove(){
        if (!this.removed){
            if (this.created){
                const tankHtml = document.getElementById(this.id);
                tankHtml.remove();
            }
            listTanks.splice(listTanks.indexOf(this), 1);
            this.removed = true;
        }
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