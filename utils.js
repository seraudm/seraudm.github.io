function convertGameUnitToPx(coordinate){
    return (mapSizePx.xMax - mapSizePx.xMin) * coordinate / MAP_SIZE;
}


function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = new Vector(mapSizePx.xMin + convertGameUnitToPx(positionGameUnit.x), mapSizePx.yMin + convertGameUnitToPx(positionGameUnit.y));
    return positionPx;
}




function isValid(position){
    let wall = new Wall(position);
    return (!MAP[wall.line][wall.column]);
}


// Return the intersection with the first wall, null if there is no wall in the trajectory
function getIntersectionWithWall(currentPosition, nextPosition){
    let currentWall = new Wall(currentPosition);
    let nextWall = new Wall(nextPosition);
    
    if (currentWall.column < nextWall.column){
        return "left";
    } else if(currentWall.column > nextWall.column){
        return "right";
    } else if (currentWall.line < nextWall.line){
        return "top";
    } else {
        return "bottom";
    }
}