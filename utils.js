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

function getImData(mapID){
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    let img = document.getElementById(mapID);

    let width = img.width;
    let height = img.height;

    canvas.width = width
    canvas.height = height;
    context.drawImage(img, 0, 0 );

    let myData = context.getImageData(0, 0, img.width, img.height);
    return myData;
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

function getGameMapData(mapID){
    let imData = getImData(mapID);

    let map = [];
    for (line = 0; line < imData.height; line ++){
        map.push([]);
        for (column = 0; column < imData.width; column ++){
            let colour = new Colour(
                imData.data[(line * imData.width + column)*4],
                imData.data[(line * imData.width + column)*4 + 1],
                imData.data[(line * imData.width + column)*4 + 2],
                imData.data[(line * imData.width + column)*4 + 3]
            );
            map[line].push(getIndexColour(colour));
        }
    }

    return map;
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