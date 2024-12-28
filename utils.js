function convertGameUnitToPx(coordinate){
    return (mapSizePx.xMax - mapSizePx.xMin) * coordinate / MAP_SIZE_X;
}


function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = new Vector(mapSizePx.xMin + convertGameUnitToPx(positionGameUnit.x), mapSizePx.yMin + convertGameUnitToPx(positionGameUnit.y));
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
            currentWall = currentWall.getLeftWall();
            ignore = "right";
        } else if (side == "right"){
            currentWall = currentWall.getRightWall();
            ignore = "left";
        } else if (side == "top"){
            currentWall = currentWall.getTopWall();
            ignore = "bottom";
        } else {
            currentWall = currentWall.getBottomWall();
            ignore = "top";
        }

        if (currentWall.isWall()){
            intersectionWithWall = intersectionPoint;
        }        

    }

    return intersectionWithWall;
}