function distance(p1, p2){
    let d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    return d;
}

function convertGameUnitToPx(coordinate){
    return (mapSizePx.xMax - mapSizePx.xMin) * coordinate / MAP_SIZE;
}

function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = new Vector(mapSizePx.xMin + convertGameUnitToPx(positionGameUnit.x), mapSizePx.yMin + convertGameUnitToPx(positionGameUnit.y));
    return positionPx;
}



function convertPositionGameUnitToIndexWall(position) {
    let line = Math.floor(position.y);
    let column = Math.floor(position.x);
    let indexWall = { line: line, column: column};
    return indexWall;
}

function isValid(position){
    let indexWall = convertPositionGameUnitToIndexWall(position);
    return (!MAP[indexWall.line][indexWall.column]);
}

function getSideOfTheWall(currentPosition, nextPosition){
    let currentIndexWall = convertPositionGameUnitToIndexWall(currentPosition);
    let nextIndexWall = convertPositionGameUnitToIndexWall(nextPosition);
    
    if (currentIndexWall.column < nextIndexWall.column){
        return "left";
    } else if(currentIndexWall.column > nextIndexWall.column){
        return "right";
    } else if (currentIndexWall.line < nextIndexWall.line){
        return "top";
    } else {
        return "bottom";
    }
}