function convertGameUnitToPx(coordinate){
    return (GAME_MAP.sizePx.xMax - GAME_MAP.sizePx.xMin) * coordinate / GAME_MAP.SIZE_X;
}


function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = new Vector(GAME_MAP.sizePx.xMin + convertGameUnitToPx(positionGameUnit.x), GAME_MAP.sizePx.yMin + convertGameUnitToPx(positionGameUnit.y));
    return positionPx;
}




function isValid(position){
    let wall = new Cell(position);
    return (!wall.isWall());
}


// Return the intersection with the first wall, null if there is no wall in the trajectory
function getIntersectionWithWall(currentPosition, nextPosition){
    let currentWall = new Cell(currentPosition);
    let lastWall = new Cell(nextPosition);
    let trajectory = new Segment(currentPosition, nextPosition);
    let intersectionWithWall = null;
    let ignore = null;

    while (!currentWall.equals(lastWall) && intersectionWithWall == null){
        let tuple = currentWall.getIntersection(trajectory, ignore);
        let intersectionPoint = tuple[0];
        let side = tuple[1];

        if (side == "left"){
            currentWall = currentWall.getLeftCell();
            ignore = "right";
        } else if (side == "right"){
            currentWall = currentWall.getRightCell();
            ignore = "left";
        } else if (side == "top"){
            currentWall = currentWall.getTopCell();
            ignore = "bottom";
        } else {
            currentWall = currentWall.getBottomCell();
            ignore = "top";
        }

        if (currentWall.isWall()){
            intersectionWithWall = intersectionPoint;
        }        

    }

    return intersectionWithWall;
}

function getIndexColour(colour){
    let index = null;
    let distance = Infinity;
    for (let i=0; i<CELLS_COLOURS.length; i++){
        let currentDistance = colour.distance(CELLS_COLOURS[i]);
        if (currentDistance < distance){
            index = i;
            distance = currentDistance;
        }
    }

    return index;
}


function collisionsBulletsTanks(){
    let indexTank = 0;
    while (indexTank<listTanks.length) {
        const tank = listTanks[indexTank];
        let isTankDeleted = false;
        let indexBullet = 0;

        while (indexBullet<listBullets.length && !(isTankDeleted)) {
            const bullet = listBullets[indexBullet];
            if ( (bullet.position.sub(tank.position)).norm() < (bullet.size + tank.size)/2){
                tank.remove();
                bullet.remove();
                isTankDeleted = true;
            }
            indexBullet ++;
        }
        
        if (!isTankDeleted){
            indexTank ++;
        }
    }
}