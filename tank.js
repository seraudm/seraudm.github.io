let listTanks = [];
let numberTanks = 0;
const TankDefaultSpeed = 2;


class Tank{
    constructor (X,Y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size){
        this.keybinds = {moveForward: moveForward, moveBackward: moveBackward, turnLeft: turnLeft, turnRight: turnRight, shoot: shoot};
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.color = color;

        this.id = `tank${numberTanks}`;
        numberTanks ++;

        this.speed = TankDefaultSpeed;

        this.lastTickShooting = -30;
        this.size=size;

    }

    shoot() {
        if (listKeysPressed.get(this.keybinds.shoot) && (currentTickNumber-this.lastTickShooting)>=30){
            let bullet = new Bullet(this.position.x + this.size*Math.sin(this.angle*Math.PI/180), this.position.y - this.size*Math.cos(this.angle*Math.PI/180), this.angle, this.color)

            addBullet(bullet);
            this.lastTickShooting = currentTickNumber;
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
}



function drawTanks(){
    for (tank of listTanks){
        if (!(tank.created)){
            tank.created = true;
            const tankHtml = document.createElement("div");
            const canonHtml  = document.createElement("div");

            canonHtml.className = "canon";
            tankHtml.className = "tank";
            tankHtml.id = tank.id;

            tankHtml.style.left = `${tank.position.x}px`;
            tankHtml.style.top = `${tank.position.y}px`;
            tankHtml.style.backgroundColor = tank.color;
            tankHtml.style.height = `${tank.size}px`;
            tankHtml.style.width = `${tank.size}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${tank.angle}deg)`;

            game.appendChild(tankHtml);
            tankHtml.appendChild(canonHtml);
        } else {
            const tankHtml = document.getElementById(tank.id);

            tankHtml.style.left = `${tank.position.x}px`;
            tankHtml.style.top = `${tank.position.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${tank.angle}deg)`;

            
        }

    }
}

function addTank(x, y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size=50){
    listTanks.push(new Tank(x, y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size));
}

function updateTanksPosition(){
    for (tank of listTanks){
        tank.updatePosition();
    }
}

function shootTanks(){
    for (tank of listTanks){
        tank.shoot();
    }
}