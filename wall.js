class Wall{

    constructor (v){
        this.line = Math.floor(v.y);
        this.column = Math.floor(v.x);
    }

    getTopSegment(){
        let a = new Vector(this.column, this.line);
        let b = new Vector(this.column+1, this.line)
        return new Segment(a,b);
    }
}