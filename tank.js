let listTanks = [];


class Tank{
    static DEFAULT_SPEED = 3; // Unit: GameUnit/s
    static DEFAULT_ANGLE_SPEED_DEG = 90; // Unit: deg/s
    static DEFAULT_ANGLE_SPEED = Tank.DEFAULT_ANGLE_SPEED_DEG*Math.PI/180; // Unit: rad/s
    static DEFAULT_SHOOTING_COOLDOWN = 0.75 // Unit: s
    static DEFAULT_SIZE = 0.9; //Unit: GameUnit CAREFULL THIS THE DIAMETER
    static NUMBER_CHECKING_POINTS = 32;
    static numberTanks = 0;
    
    constructor (position, angle, color, moveForward, moveBackward, turnLeft, turnRight, shoot, size=Tank.DEFAULT_SIZE, shootingCooldown=Tank.DEFAULT_SHOOTING_COOLDOWN){
        
        this.keybinds = {moveForward: moveForward, moveBackward: moveBackward, turnLeft: turnLeft, turnRight: turnRight, shoot: shoot};
        this.created = false;
        this.angle = angle;
        this.position = position;
        this.color = color;
        this.angleSpeed = Tank.DEFAULT_ANGLE_SPEED;
        
        this.id = `tank${Tank.numberTanks}`;
        
        this.speed = Tank.DEFAULT_SPEED;
        
        this.shootingCooldown = shootingCooldown;
        this.cooldown = 0;
        this.size=size;
        Tank.numberTanks ++;
        this.isShooting = false;
        this.wasShootingKeyReleased = true;

        this.SHOOTING_SOUND = new Audio("audio/tir_tank.mp3");
    }

    shoot(dt) {
        this.isShooting = false;
        this.cooldown = Math.max(0, this.cooldown - dt);
        let bulletPositon = new Vector(this.position.x + this.size*Math.sin(this.angle), this.position.y - this.size*Math.cos(this.angle));

        if (!listKeysPressed.get(this.keybinds.shoot)){
            this.wasShootingKeyReleased = true;
        }

        if (listKeysPressed.get(this.keybinds.shoot) && this.cooldown == 0 && isValid(bulletPositon) && this.wasShootingKeyReleased){
            let bullet = new Bullet(bulletPositon, this.angle, this.color)
            addBullet(bullet);
            this.cooldown = this.shootingCooldown;
            this.isShooting = true;
            this.wasShootingKeyReleased = false;
        }
    }

    updatePosition(dt){
        // Calculate next position
        let nextPosition = this.position.copy();

        if (listKeysPressed.get(this.keybinds.moveForward)){
            nextPosition.x += Math.sin(this.angle) * this.speed *dt;
            nextPosition.y -= Math.cos(this.angle) * this.speed *dt;
        }
        if (listKeysPressed.get(this.keybinds.moveBackward)){
            nextPosition.x -= Math.sin(this.angle) * this.speed *dt;
            nextPosition.y += Math.cos(this.angle) * this.speed *dt;
        }

        // Verify the validity of the next postion, using NUMBER_CHECKING_POINT checking points around the tank and the center
        let initialSpeedVector = nextPosition.sub(this.position);
        let speedVector = initialSpeedVector;
        let orientation = null; // To make a projection of the speed vector either horizontal or vertical and know if there has been an intersection
        
        for (let i=0; i<Tank.NUMBER_CHECKING_POINTS; i++){
            let nextCheckingPoint = nextPosition.copy();
            let currentCheckingPoint = this.position.copy();

            nextCheckingPoint.y += Math.cos(i * 2*Math.PI/Tank.NUMBER_CHECKING_POINTS) * this.size/2;
            nextCheckingPoint.x += Math.sin(i * 2*Math.PI/Tank.NUMBER_CHECKING_POINTS) * this.size/2;
            
            currentCheckingPoint.y += Math.cos(i * 2*Math.PI/Tank.NUMBER_CHECKING_POINTS) * this.size/2;
            currentCheckingPoint.x += Math.sin(i * 2*Math.PI/Tank.NUMBER_CHECKING_POINTS) * this.size/2;

            let intersectionWithWall = getIntersectionWithWall(currentCheckingPoint, nextCheckingPoint);

            if (intersectionWithWall != null){
                // Update the orientation, if it's different from the previous one, the value is "both"
                let checkingOrientation = intersectionWithWall.getOrientation();
                if (orientation == null){
                    orientation = checkingOrientation;
                } else if (checkingOrientation != orientation){
                    orientation = "both";
                }

                // Keep the speed vector with the lower norm
                let checkingVector = intersectionWithWall.sub(currentCheckingPoint);
                if (checkingVector.norm() < speedVector.norm()){
                    speedVector = checkingVector;
                }
            }


        }

        if (orientation == null){
            this.position = this.position.sum(speedVector);
        } else {
            speedVector = speedVector.times((speedVector.norm()-EPSILON)/speedVector.norm()); // Allow the tank to remain EPSILON GameUnits from the wall 
            if (orientation == "vertical"){
            speedVector.y = initialSpeedVector.y; // Restablish the initial vertical velocity
            } else if (orientation == "horizontal"){
            speedVector.x = initialSpeedVector.x; // Restablish the initial horizontal velocity
            }
            this.position = this.position.sum(speedVector);
        }

        this.updateAngle(dt);
    }

    updateAngle(dt){
        if (listKeysPressed.get(this.keybinds.turnLeft)){
            this.angle = (this.angle - this.angleSpeed *dt) % (2 * Math.PI);
        }
        if (listKeysPressed.get(this.keybinds.turnRight)){
            this.angle = (this.angle + this.angleSpeed *dt) % (2 * Math.PI);
        }
    }

    draw(){
        let positionPx = convertPositionGameUnitToPx(this.position);
        let sizePx= convertGameUnitToPx(this.size);
        if (!(this.created)){
            this.created = true;
            const tankHtml = document.createElement("div");
            const chassisHtml = document.createElement("div");
            const canonHtml  = document.createElement("div");
            const turretHtml = document.createElement("div");
            const leftCaterpillarHtml = document.createElement("div");
            const rightCaterpillarHtml = document.createElement("div");
            const endCanonHtml = document.createElement("div");

            endCanonHtml.className = "endCanon";
            leftCaterpillarHtml.className = "caterpillar leftCaterpillar";
            rightCaterpillarHtml.className = "caterpillar rightCaterpillar";

            turretHtml.className = "turret";
            chassisHtml.className = "chassis";
            turretHtml.style.backgroundColor = this.color;
            
            canonHtml.className = "canon";
            tankHtml.className = "tank";
            tankHtml.id = this.id;

            tankHtml.style.left = `${positionPx.x}px`;
            tankHtml.style.top = `${positionPx.y}px`;
            chassisHtml.style.backgroundColor = this.color;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;
            tankHtml.style.height = `${sizePx}px`;
            tankHtml.style.width = `${sizePx}px`;
            GAME.appendChild(tankHtml);
            tankHtml.appendChild(leftCaterpillarHtml);
            tankHtml.appendChild(rightCaterpillarHtml);

            tankHtml.appendChild(chassisHtml);
            tankHtml.appendChild(canonHtml);
            tankHtml.appendChild(turretHtml);
            canonHtml.appendChild(endCanonHtml);
        } else {
            const tankHtml = document.getElementById(this.id);

            tankHtml.style.left = `${positionPx.x}px`;
            tankHtml.style.top = `${positionPx.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;
            tankHtml.style.height = `${sizePx}px`;
            tankHtml.style.width = `${sizePx}px`;

            const canonHtml = tankHtml.getElementsByClassName("canon")[0];


            if (this.isShooting){
                canonHtml.style.animationDuration = ""; // To reset the animation
                canonHtml.style.animationName = "";

                void canonHtml.offsetWidth; // To trigger the element so the reset is taken into account

                canonHtml.style.animationDuration = `${this.shootingCooldown}s`; // To set up the animation, the faster the tank can shoot the faster the animation is
                canonHtml.style.animationName = "canonAnimation";

                this.SHOOTING_SOUND.currentTime = 0;
                this.SHOOTING_SOUND.play();
            }


        }
    }

    remove(){
        if (this.created){
            const tankHtml = document.getElementById(this.id);
            tankHtml.remove();
        }
        listTanks.splice(listTanks.indexOf(this), 1);
        this.removed = true;
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