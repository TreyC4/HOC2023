class Trimp {
  
    constructor(obj) {
      const keys = Object.keys(obj);
      this.color = obj.color || [random(0, 255), random(0, 255), random(0, 255)];
      const x = floor(random(0, width+1)), y = floor(random(0, height+1));
      this.pos = {
        x: obj.x || x,
        y: obj.y || y
      };
      this.begin = {
        x: obj.x || x,
        y: obj.y || y
      };
      if (obj && keys.includes('brain'))this.brain = obj.brain;
      else {
        this.brain = new Network(0);
        this.brain.fromLayers(8, 8, 8);
      }
    }
    
    act() {
      const popDensity = this.popDensity(); 
      const output = this.brain.ffor([this.pos.x / width, this.pos.y / height, random(), popDensity.length / 8, (height - this.pos.y) / height, (width - this.pos.x) / width, parseInt(this.color.reduce((p, c) => p + c + "")) / 255255255, parseInt(this.closestTrimp().color.reduce((p, c) => p + c + "")) / 255255255]);
      if (!output[6]) {
        if (output[4])output[floor(random(0, 4))] = 1;
        if (output[0] && this.pos.x !== width && trimpods.filter(trimp => trimp.pos.x == this.pos.x+1 && trimp.pos.y == this.pos.y).length == 0)this.pos.x++;
        if (output[1] && this.pos.x !== 0 && trimpods.filter(trimp => trimp.pos.x == this.pos.x-1 && trimp.pos.y == this.pos.y).length == 0)this.pos.x--;
        if (output[2] && this.pos.y !== height && trimpods.filter(trimp => trimp.pos.y == this.pos.y+1 && trimp.pos.x == this.pos.x).length == 0)this.pos.y++;
        if (output[3] && this.pos.y !== 0 && trimpods.filter(trimp => trimp.pos.y == this.pos.y-1 && trimp.pos.x == this.pos.x).length == 0)this.pos.y--;
        if (output[5] && kill && popDensity.length == 1)trimpods.splice(trimpods.indexOf(popDensity[0]), 1);
        if (output[7])trimpods.splice(trimpods.indexOf(this), 1);
      }
      if (this.pos.x < 0)this.pos.x = 0;
      if (this.pos.x > width)this.pos.x = width;
      if (this.pos.y < 0)this.pos.y = 0;
      if (this.pos.y > height)this.pos.y = height;
    }
    
    closestTrimp() {
      return trimpods.reduce((p, c) => abs(p.pos.x - this.pos.x) + abs(p.pos.y - this.pos.y) > abs(c.pos.x - this.pos.x) + abs(c.pos.y - this.pos.y) ? p : c);
    }

    popDensity() {
      return trimpods.filter(trimp => abs(this.pos.x - trimp.pos.x) + abs(this.pos.y - trimp.pos.y) == 2 );
    }
    
    show() {
      stroke(this.color);
      point(this.pos.x, this.pos.y);
    }

    replicate() {
      let brain = this.brain;
      let chance = false;
      chance = brain.weights_ih.mutate() ? true : chance;
      chance = brain.weights_ho.mutate() ? true : chance;
      chance = brain.bias_h.mutate() ? true : chance;
      chance = brain.bias_o.mutate() ? true : chance;
      return new Trimp({
        color: chance ? [random(0, 255), random(0, 255), random(0, 255)] : this.color,
        brain: brain,
      });
    }
  }