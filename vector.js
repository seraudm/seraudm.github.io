class Vector{

    constructor (x, y){
        this.x = x;
        this.y = y;
    }

    copy(){
        return new Vector(this.x, this.y);
    }

    sub(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    sum(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }

    scalarProduct(v){
        return this.x * v.x + this.y * v.y;
    }

    crossProduct(v){
        return this.x * v.y - this.y * v.x;
    }

    isCollinear(v){
        return this.crossProduct(v) == 0;
    }

    isOrthogonal(v){
        return this.scalarProduct(v) == 0;
    }

    times(p){
        return new Vector(this.x * p, this.y * p);
    }

    norm(){
        let n = Math.sqrt((this.x)**2 + (this.y)**2);
        return n;
    }
}