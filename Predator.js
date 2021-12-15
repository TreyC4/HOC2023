class Predator {

    constructor() {
        this.pos = {
            x: floor(random(0, width+1)),
            y: floor(random(0, height+1))
        };
        this.color = [10, 10, 10]; 
        this.range = 4;
        this.speed = 2; 
        this.lazy = 0;
        this.state = 0;      
    }

    act() {
        if (this.state !== this.lazy) {
            this.state++
        } else {
            const target = this.closestTrimp();
            if (this.inRange(target)) {
                this.kill(target);
                this.state = 0;
            } else {
                this.moveTowards(target);
            }
            stroke(255, 255, 255);
            circle(target.pos.x, target.pos.y, 5);
            target.show();
        }
        this.show();
    }

    moveTowards(target) {
             if (target.pos.x > this.pos.x && this.pos.x <= width - this.speed) this.pos.x+=this.speed;
        else if (target.pos.x < this.pos.x && this.pos.x > this.speed)          this.pos.x-=this.speed;
             if (target.pos.y > this.pos.y && this.pos.y <= height - this.speed)this.pos.y+=this.speed;
        else if (target.pos.y < this.pos.y && this.pos.y > this.speed)          this.pos.y-=this.speed;
    }

    closestTrimp() {
        return trimpods.reduce((p, c) => abs(p.pos.x - this.pos.x) + abs(p.pos.y - this.pos.y) < abs(c.pos.x - this.pos.x) + abs(c.pos.y - this.pos.y) ? p : c);
    }

    show() {
        stroke(255, 0, 0);
        fill(this.color);
        rect(this.pos.x, this.pos.y, 2, 2);
    }

    inRange(target) {
        const range = Math.sqrt(Math.pow(abs(target.pos.y - this.pos.y), 2) + Math.pow(abs(target.pos.x - this.pos.x), 2));
        return range <= this.range;
    }

    kill(target) {
        trimpods.splice(trimpods.indexOf(target), 1);
    }
}