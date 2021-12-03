class Cheese {
    constructor(x, y) {
        this.pos = {
            x: x || floor(random(0, width+1)),
            y: y || floor(random(0, height+1))
        };
    }

    show() {
        stroke(251,219,101);
        point(this.pos.x, this.pos.y); 
    }
}