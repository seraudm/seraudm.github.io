class Wall{

    constructor (v){
        this.line = Math.floor(v.y);
        this.column = Math.floor(v.x);
    }

    isWall(){
        return (0 <= this.line && 0 <= this.column && this.line < MAP_SIZE && this.column < MAP_SIZE && MAP[this.line][this.column]);
    }

    getTopSegment(){
        let a = new Vector(this.column, this.line);
        let b = new Vector(this.column+1, this.line)
        return new Segment(a,b);
    }

    getBottomSegment(){
        let a = new Vector(this.column, this.line+1);
        let b = new Vector(this.column+1, this.line+1)
        return new Segment(a,b);
    }

    getLeftSegment(){
        let a = new Vector(this.column, this.line);
        let b = new Vector(this.column, this.line+1)
        return new Segment(a,b);
    }

    getRightSegment(){
        let a = new Vector(this.column+1, this.line);
        let b = new Vector(this.column+1, this.line+1)
        return new Segment(a,b);
    }

    getTopWall(){
        return new Wall(new Vector(this.column, this.line-1));
    }

    getBottomWall(){
        return new Wall(new Vector(this.column, this.line+1));
    }

    getRightWall(){
        return new Wall(new Vector(this.column+1, this.line));
    }

    getLeftWall(){
        return new Wall(new Vector(this.column-1, this.line));
    }

    equals(wall){
        return wall.column == this.column && wall.line == this.line;
    }

    // Return the intersection between a segment and the side of the walls, ignore is used to ignore one side (can be equals to left, right, top or bottom)
    getIntersection(segment, ignore=null){
        let intersection = segment.getIntersection(this.getTopSegment());
        if (ignore != "top" && intersection != null){
            return [intersection,"top"];
        }
        intersection = segment.getIntersection(this.getBottomSegment());
        if (ignore != "bottom" && intersection != null){
            return [intersection,"bottom"];
        }
        intersection = segment.getIntersection(this.getRightSegment());
        if (ignore != "right" && intersection != null){
            return [intersection,"right"];
        }
        intersection = segment.getIntersection(this.getLeftSegment());
        if (ignore != "left" && intersection != null){
            return [intersection,"left"];
        }
        return [null,null];
    }
}