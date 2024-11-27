let listTanks = [];
let numberTanks = 0;

class Tank{
    constructor (X,Y, angle, color){
        this.created = false;
        this.angle = angle;
        this.position = {x: X, y:Y};
        this.color = color;
        this.id = "tank" + numberTanks;
        numberTanks ++;
    }
}



function drawTank(){
    for (tank of listTanks){
        if (!(tank.created)){
            tank.created = true;
            const tankHtml = document.createElement("div");
            const turretHtml  = document.createElement("div");

            turretHtml.className = "turret";
            tankHtml.className = "tank";
            tankHtml.id = tank.id;

            tankHtml.style.left = `${tank.position.x}px`;
            tankHtml.style.top = `${tank.position.y}px`;
            tankHtml.style.backgroundColor = tank.color;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${tank.angle}deg)`;

            game.appendChild(tankHtml);
            tankHtml.appendChild(turretHtml);
        } else {
            const tankHtml = document.getElementById(tank.id);

            tankHtml.style.left = `${tank.position.x}px`;
            tankHtml.style.top = `${tank.position.y}px`;

            tankHtml.style.transform = `translate(-50%, -50%) rotate(${tank.angle}deg)`;

            
        }

    }
}