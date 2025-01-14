class Vector{

    constructor (x, y){
        this.x = x;
        this.y = y;
    }
    
    getOrientation(){
        let xd= this.x - Math.floor(this.x);
        let yd= this.y - Math.floor(this.y);
        let product = (1 - (xd +yd)) * (yd -xd);
        if (product>0){
            return "vertical";
        } else {
            return "horizontal";
        }
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