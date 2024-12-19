function distance(p1, p2){
    let d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    return d;
}

function convertGameUnitToPx(coordinate){
    return (mapSizePx.xMax - mapSizePx.xMin) * coordinate / 1000;
}

// Decoupage de la zone de jeu en une grille de coordonnees de 1000 cases
function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = {x: mapSizePx.xMin + convertGameUnitToPx(positionGameUnit.x), y: mapSizePx.yMin + convertGameUnitToPx(positionGameUnit.y)};
    return positionPx;
}



function convertPositionGameUnitToWall(position) {
    let abs = Math.floor(position.x * MAP_SIZE / 1000);
    let ord = Math.floor(position.y * MAP_SIZE / 1000);
    let new_position = { x: abs, y: ord };
    return new_position;
}

function convertPositionWallToGameUnit(position) {
    let abs = position.x * 1000 / (MAP_SIZE);
    let ord = position.y * 1000 / (MAP_SIZE);
    let new_position = { x: abs, y: ord };
    return new_position;
}

function isValid(position){
    let positionWall = convertPositionGameUnitToWall(position);
    return (!MAP[positionWall.y][positionWall.x]);
}

function getSideOfTheWall(currentPosition, nextPosition){
    let currentPositionWall = convertPositionGameUnitToWall(currentPosition);
    console.log(currentPositionWall);
    let nextPositionWall = convertPositionGameUnitToWall(nextPosition);
    console.log(nextPositionWall);
    if (currentPositionWall.x < nextPositionWall.x){
        return "left";
    } else if(currentPositionWall.x > nextPositionWall.x){
        return "right";
    } else if (currentPositionWall.y < nextPositionWall.y){
        return "top";
    } else {
        return "bottom";
    }
}