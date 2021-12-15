class Predator {

    constructor() {
        this.pos = {
            x: floor(random(0, width+1)),
            y: floor(random(0, height+1))
        };
        this.color = [10, 10, 10]; 
        this.range = 4;
        this.speed = 2;       
    }

    act() {
        let target = this.closestTrimp();
        if (this.inRange(target)) {
            this.kill(target);
            let target = this.closestTrimp();
        }
        this.moveTowards(target);
        this.show();
    }

    moveTowards(target) {
             if (target.pos.x > this.pos.x && this.pos.x <= width - this.speed) this.pos.x+=this.speed;
        else if (target.pos.x < this.pos.x && this.pos.x > this.speed)          this.pos.x-=this.speed;
             if (target.pos.y > this.pos.y && this.pos.y <= height - this.speed)this.pos.y+=this.speed;
        else if (target.pos.y < this.pos.y && this.pos.y > this.speed)          this.pos.y-=this.speed;
    }

    closestTrimp() {
        return trimpods.reduce((p, c) => abs(p.pos.x - this.pos.x) + abs(p.pos.y - this.pos.y) > abs(c.pos.x - this.pos.x) + abs(c.pos.y - this.pos.y) ? p : c);
    }

    show() {
        stroke(255, 0, 0);
        fill(this.color);
        rect(this.pos.x, this.pos.y, 2, 2);
    }

    inRange(target) {
        return abs(target.pos.x - this.pos.x) + abs(target.pos.y - this.pos.y) <= this.range
    }
}