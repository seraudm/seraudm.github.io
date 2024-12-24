class Segment{

    constructor (a, b){
        this.a = a;
        this.b = b;
    }

    // Return the intersection with an other segment, null if they don't intersect
    intersect(segment){
        let ab = this.b.sub(this.a);
        let cd = segment.b.sub(segment.a);
        if (ab.isCollinear(cd)){
            return null;
        } else {
            let ac = segment.a.sub(this.a);
            let ca = ac.times(-1);

            let t = ac.crossProduct(cd) / ab.crossProduct(cd);
            let s = ca.crossProduct(ab) / cd.crossProduct(ab);
            if (0<=t && t<=1 && 0<=s && s<=1){
                let i = this.a.sum(ab.times(t));
                return i;
            } else {
                return null;
            }
        }
    }
}