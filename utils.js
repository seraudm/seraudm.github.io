function distance(p1, p2){
    let d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    console.log(d);
    return d;
}

function convertGameUnitToPx(coordinate){
    return MAP_SIZE.xyMin + (MAP_SIZE.xyMax - MAP_SIZE.xyMin) * coordinate / 1000;
}

// Decoupage de la zone de jeu en une grille de coordonnees de 1000 cases
function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = {x: convertGameUnitToPx(positionGameUnit.x), y: convertGameUnitToPx(positionGameUnit.y)};
    return positionPx;
}