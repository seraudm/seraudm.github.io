let listTanks = [];


class Tank{
    static DEFAULT_FORWARD_SPEED = 3; // Unit: GameUnit/s
    static DEFAULT_BACKWARD_SPEED = 1.5; // Unit: GameUnit/s
    static DEFAULT_ANGLE_SPEED_DEG = 90; // Unit: deg/s
    static DEFAULT_ANGLE_SPEED = Tank.DEFAULT_ANGLE_SPEED_DEG*Math.PI/180; // Unit: rad/s
    static DEFAULT_SHOOTING_COOLDOWN = 0.75 // Unit: s
    static DEFAULT_SIZE = 0.9; //Unit: GameUnit CAREFULL THIS THE DIAMETER
    static NUMBER_CHECKING_POINTS = 32;
    static numberTanks = 0;
    static OBSTACLE_CELLS = [1,3] // To know wich cells are considered as obstacle 
    
    static drawTanks(){
        for (const tank of listTanks){
            tank.draw();
        }
    }
    
    
    static addTank(tank){
        listTanks.push(tank);
    }
    
    static updateTanksPosition(dt){
        for (const tank of listTanks){
            tank.updatePosition(dt);
        }
    }
    
    static shootTanks(dt){
        for (const tank of listTanks){
            tank.shoot(dt);
        }
    }

    static clearTanks(){
        for (const tank of listTanks){
            tank.remove();
        }
    }

    constructor (position, angle, color, keybinds, size=Tank.DEFAULT_SIZE, shootingCooldown=Tank.DEFAULT_SHOOTING_COOLDOWN){
        
        this.keybinds = keybinds;
        this.created = false;
        this.angle = angle;
        this.position = position;
        this.color = color;
        this.angleSpeed = Tank.DEFAULT_ANGLE_SPEED;
        
        this.id = `tank${Tank.numberTanks}`;
        
        this.forwardSpeed = Tank.DEFAULT_FORWARD_SPEED;
        this.backwardSpeed = Tank.DEFAULT_BACKWARD_SPEED;

        
        this.shootingCooldown = shootingCooldown;
        this.cooldown = 0;
        this.size=size;
        Tank.numberTanks ++;
        this.isShooting = false;
        this.wasShootingKeyReleased = true;

        this.SHOOTING_SOUND = new Audio("audio/tir_tank.mp3");
        this.SHOOTING_SOUND.load();
    }

    shoot(dt) {
        this.isShooting = false;
        this.cooldown = Math.max(0, this.cooldown - dt);
        let bulletPositon = new Vector(this.position.x + this.size*Math.sin(this.angle), this.position.y - this.size*Math.cos(this.angle));

        if (!listKeysPressed.get(this.keybinds.shoot)){
            this.wasShootingKeyReleased = true;
        }

        if (listKeysPressed.get(this.keybinds.shoot) && this.cooldown == 0 && isValid(bulletPositon, Bullet.OBSTACLE_CELLS) && this.wasShootingKeyReleased){
            let bullet = new Bullet(bulletPositon, this.angle, this.color)
            Bullet.addBullet(bullet);
            this.cooldown = this.shootingCooldown;
            this.isShooting = true;
            this.wasShootingKeyReleased = false;
        }
    }

    updatePosition(dt){
        // Calculate next position
        let nextPosition = this.position.copy();

        if (listKeysPressed.get(this.keybinds.moveForward)){
            nextPosition.x += Math.sin(this.angle) * this.forwardSpeed *dt;
            nextPosition.y -= Math.cos(this.angle) * this.forwardSpeed *dt;
        }
        if (listKeysPressed.get(this.keybinds.moveBackward)){
            nextPosition.x -= Math.sin(this.angle) * this.backwardSpeed *dt;
            nextPosition.y += Math.cos(this.angle) * this.backwardSpeed *dt;
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

            let intersectionWithWall = getIntersectionWithWall(currentCheckingPoint, nextCheckingPoint, Tank.OBSTACLE_CELLS);

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

    createLeftCaterpillarHtml(){
        const leftCaterpillarHtml = document.createElement("div");

        leftCaterpillarHtml.className = "caterpillar leftCaterpillar";

        return leftCaterpillarHtml;
    }

    createRightCaterpillarHtml(){
        const rightCaterpillarHtml = document.createElement("div");

        rightCaterpillarHtml.className = "caterpillar rightCaterpillar";

        return rightCaterpillarHtml;
    }

    createEndCanonHtml(){
        const endCanonHtml = document.createElement("div");

        endCanonHtml.className = "endCanon";

        return endCanonHtml;
    }

    createTriangleHtml(width, angle, colour){
        const triangleHtml = document.createElement("div");

        triangleHtml.className = "triangle";
        triangleHtml.style.borderBottom = `${width}px solid ` + colour;
        triangleHtml.style.borderLeft = `${width/2}px solid transparent`;
        triangleHtml.style.borderRight = `${width/2}px solid transparent`;
        triangleHtml.style.transform = `translate(-50%,0) rotate(${angle}deg)`;

        return triangleHtml;
    }

    createExplosionHtml(sizePx){
        const explosionHtml = document.createElement("div");

        explosionHtml.className = "explosion";


        let widthBigTriangle = sizePx * 0.26;
        let widthSmallTriangle = 2 * widthBigTriangle /3

        explosionHtml.appendChild(this.createTriangleHtml(widthBigTriangle, 0, "rgb(255, 98, 0)"));
        explosionHtml.appendChild(this.createTriangleHtml(widthBigTriangle, 45, "rgb(255, 98, 0)"));
        explosionHtml.appendChild(this.createTriangleHtml(widthBigTriangle, -45, "rgb(255, 98, 0)"));
        explosionHtml.appendChild(this.createTriangleHtml(widthSmallTriangle, 0, "rgb(255, 234, 0)"));
        explosionHtml.appendChild(this.createTriangleHtml(widthSmallTriangle, 45, "rgb(255, 234, 0)"));
        explosionHtml.appendChild(this.createTriangleHtml(widthSmallTriangle, -45, "rgb(255, 234, 0)"));


        return explosionHtml;
    }

    createCanonHtml(sizePx){
        const canonHtml  = document.createElement("div");

        canonHtml.className = "canon";

        canonHtml.appendChild(this.createExplosionHtml(sizePx));
        canonHtml.appendChild(this. createEndCanonHtml());

        return canonHtml;
    }

    createTurretHtml(){
        const turretHtml = document.createElement("div");

        turretHtml.className = "turret";
        turretHtml.style.backgroundColor = this.color;

        return turretHtml;
    }

    createChassisHtml(sizePx){
        const chassisHtml = document.createElement("div");
        
        chassisHtml.className = "chassis";
        chassisHtml.style.backgroundColor = this.color;

        chassisHtml.appendChild(this.createCanonHtml(sizePx));
        chassisHtml.appendChild(this.createTurretHtml());

        return chassisHtml;
    }


    createTankHtml(sizePx, positionPx){
        const tankHtml = document.createElement("div");

        tankHtml.className = "tank";
        tankHtml.id = this.id;
        tankHtml.style.left = `${positionPx.x}px`;
        tankHtml.style.top = `${positionPx.y}px`;
        tankHtml.style.height = `${sizePx}px`;
        tankHtml.style.width = `${sizePx}px`;
        tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;

        tankHtml.appendChild(this.createLeftCaterpillarHtml());
        tankHtml.appendChild(this.createRightCaterpillarHtml());
        tankHtml.appendChild(this.createChassisHtml(sizePx));

        return tankHtml;
    }

    draw(){
        let positionPx = convertPositionGameUnitToPx(this.position);
        let sizePx= convertGameUnitToPx(this.size);
        if (!(this.created)){
            this.created = true;

            const tankHtml = this.createTankHtml(sizePx, positionPx);         

            GAME.appendChild(tankHtml);
        } else {
            const tankHtml = document.getElementById(this.id);

            tankHtml.style.left = `${positionPx.x}px`;
            tankHtml.style.top = `${positionPx.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${this.angle}rad)`;
            tankHtml.style.height = `${sizePx}px`;
            tankHtml.style.width = `${sizePx}px`;

            const canonHtml = tankHtml.getElementsByClassName("canon")[0];
            const explosionHtml = tankHtml.getElementsByClassName("explosion")[0];



            if (this.isShooting){
                canonHtml.style.animationDuration = ""; // To reset the animation
                canonHtml.style.animationName = "";

                void canonHtml.offsetWidth; // To trigger the element so the reset is taken into account

                canonHtml.style.animationDuration = `${this.shootingCooldown}s`; // To set up the animation, the faster the tank can shoot the faster the animation is
                canonHtml.style.animationName = "canonAnimation";

                explosionHtml.style.animationName = "";

                void explosionHtml.offsetWidth; // To trigger the element so the reset is taken into account

                explosionHtml.style.animationName = "explosionAnimation";

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