class Colour {
    constructor (r, g, b, a=255){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    distance (color){
        return Math.sqrt((this.r - color.r)**2 + (this.g - color.g)**2 + (this.b - color.b)**2 + (this.a - color.a)**2);
    }
}