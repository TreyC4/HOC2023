class Cheese {
    constructor(obj) {
        this.pos = {
            x: obj.x || floor(random(0, width+1)),
            y: obj.y || floor(random(0, height+1))
        };
    }

    show() {
        stroke(240, 247, 25);
        point(this.pos.x, this.pos.y);
    }
}