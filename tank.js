let listTanks = [];


class Tank{
    static TANK_DEFAULT_SPEED = 2;
    static numberTanks = 0;

    constructor (X,Y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size=50){
        this.keybinds = {moveForward: moveForward, moveBackward: moveBackward, turnLeft: turnLeft, turnRight: turnRight, shoot: shoot};
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.color = color;

        this.id = `tank${Tank.numberTanks}`;

        this.speed = Tank.TANK_DEFAULT_SPEED;

        this.lastTickShooting = -30;
        this.size=size;

        Tank.numberTanks ++;

    }

    shoot() {
        if (listKeysPressed.get(this.keybinds.shoot)){
            let bullet = new Bullet(this.position.x + this.size*Math.sin(this.angle*Math.PI/180), this.position.y - this.size*Math.cos(this.angle*Math.PI/180), this.angle, this.color)

            addBullet(bullet);
        }
    }

    updatePosition(){
        if (listKeysPressed.get(this.keybinds.moveForward)){
            this.position.x += Math.sin(this.angle*Math.PI/180) * this.speed;
            this.position.y -= Math.cos(this.angle*Math.PI/180) * this.speed;
        }
        if (listKeysPressed.get(this.keybinds.moveBackward)){
            this.position.x -= Math.sin(this.angle*Math.PI/180) * this.speed;
            this.position.y += Math.cos(this.angle*Math.PI/180) * this.speed;
        }
        if (listKeysPressed.get(this.keybinds.turnLeft)){
            this.angle -= 2;
        }
        if (listKeysPressed.get(this.keybinds.turnRight)){
            this.angle += 2;
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

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;

            game.appendChild(tankHtml);
            tankHtml.appendChild(canonHtml);
        } else {
            const tankHtml = document.getElementById(this.id);

            tankHtml.style.left = `${this.position.x}px`;
            tankHtml.style.top = `${this.position.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;

            
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
        tank.updatePosition();
    }
}

function shootTanks(dt){
    for (tank of listTanks){
        tank.shoot();
    }
}