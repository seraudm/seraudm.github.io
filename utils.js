function distance(p1, p2){
    let d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    return d;
}

function convertGameUnitToPx(coordinate){
    return (MAP_SIZE_PX.xMax - MAP_SIZE_PX.xMin) * coordinate / 1000;
}

// Decoupage de la zone de jeu en une grille de coordonnees de 1000 cases
function convertPositionGameUnitToPx(positionGameUnit){
    positionPx = {x: MAP_SIZE_PX.xMin + convertGameUnitToPx(positionGameUnit.x), y: MAP_SIZE_PX.yMin + convertGameUnitToPx(positionGameUnit.y)};
    return positionPx;
}



function transformation_petite_grande(position) {
    let abs = position.x * 1000 / 20;
    let ord = position.y * 1000 / 20;
    let new_position = { x: abs, y: ord };
    return new_position;
}

function transformation_grande_petite(position) {
    let abs = position.x * MAP_SIZE /1000;
    let ord = position.y * MAP_SIZE / 1000;
    let new_position = { x: abs, y: ord };
    return new_position;
}