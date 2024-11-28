let listTanks = [];
let numberTanks = 0;
const TankDefaultSpeed = 2;


class Tank{
    constructor (X,Y, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot){
        this.keybinds = {moveForward: moveForward, moveBackward: moveBackward, turnLeft: turnLeft, turnRight: turnRight, shoot: shoot};
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.color = color;

        this.id = "tank" + numberTanks;
        numberTanks ++;

        this.speed = TankDefaultSpeed;

        this.lastTickShooting = -30;

    }

    shoot() {
        addBullet(this.position.x + 50*Math.sin(this.angle*Math.PI/180), this.position.y - 50*Math.cos(this.angle*Math.PI/180), this.angle, this.color);
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

function addTank(x, y, angle, color){
    listTanks.push(new Tank(x, y, angle, color));
}

function updateTanksPosition(){
    for (tank of listTanks){
        if (listKeysPressed.get(tank.keybinds.moveForward)){
            tank.position.x += Math.sin(tank.angle*Math.PI/180) * tank.speed;
            tank.position.y -= Math.cos(tank.angle*Math.PI/180) * tank.speed;
        }
        if (listKeysPressed.get(tank.keybinds.moveBackward)){
            tank.position.x -= Math.sin(tank.angle*Math.PI/180) * tank.speed;
            tank.position.y += Math.cos(tank.angle*Math.PI/180) * tank.speed;
        }
        if (listKeysPressed.get(tank.keybinds.turnLeft)){
            tank.angle -= 2;
        }
        if (listKeysPressed.get(tank.keybinds.turnRight)){
            tank.angle += 2;
        }
    }
}

function shootTanks(){
    for (tank of listTanks){
        if (listKeysPressed.get(tank.keybinds.shoot) && (currentTickNumber-tank.lastTickShooting)>=30){
            tank.shoot();
            tank.lastTickShooting = currentTickNumber;
        }
    }
}