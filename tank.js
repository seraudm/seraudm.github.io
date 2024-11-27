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