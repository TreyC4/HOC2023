class Trimp {
  
    constructor(obj) {
      const keys = Object.keys(obj);
      this.p_color = obj.p_color || [random(0, 255), random(0, 255), random(0, 255)];
      this.s_color = obj.s_color || [random(0, 255), random(0, 255), random(0, 255)];
      this.pos = {
        x: obj.x || floor(random(0, width+1)),
        y: obj.y || floor(random(0, height+1))
      };
      this.begin = this.pos;
      this.state = 0;
      if (obj && keys.includes('brain'))this.brain = obj.brain;
      else {
        this.brain = new Network(0);
        this.brain.fromLayers(10, 9, 8);
      }
    }
    
    act() {
      const popDensity = this.popDensity();
      const predator = this.closestPredator();
      const output = this.brain.ffor([this.pos.x / width, this.pos.y / height, random(), popDensity.length / 8, (height - this.pos.y) / height, (width - this.pos.x) / width, parseInt(this.p_color.reduce((p, c) => p + c + "")) / 255255255, parseInt(this.closestTrimp().p_color.reduce((p, c) => p + c + "")) / 255255255, predator.pos.x / width, predator.pos.y / height]); 
      if (!output[6]) {
        if (output[4])output[floor(random(0, 4))] = 1;
        this.state = 0;
        if (output[0] && this.pos.x !== width && trimpods.filter(trimp => trimp.pos.x - this.pos.x > 5 && abs(trimp.pos.y - this.pos.y) < 3).length == 0) {
          this.state = 1;
          this.pos.x++;
        } else if (output[1] && this.pos.x !== 0 && trimpods.filter(trimp => this.pos.x - trimp.pos.x > 5 && abs(trimp.pos.y - this.pos.y) < 3).length == 0) {
          this.state = 1;
          this.pos.x--;
        } else if (output[2] && this.pos.y !== height && trimpods.filter(trimp => trimp.pos.y - this.pos.y > 5 && abs(trimp.pos.x - this.pos.x) < 3).length == 0) {
          this.state = 2;
          this.pos.y++;
        } else if (output[3] && this.pos.y !== 0 && trimpods.filter(trimp => this.pos.y - trimp.pos.y > 5 && abs(trimp.pos.x - this.pos.x) < 3).length == 0) {
          this.state = 2;
          this.pos.y--;
        }
        if (output[5] && kill && popDensity.length == 1 && !(popDensity[0].p_color[0] == this.p_color[0] && popDensity[0].p_color[1] == this.p_color[1] && popDensity[0].p_color[2] == this.p_color[2]) && !survive(popDensity[0]))trimpods.splice(trimpods.indexOf(popDensity[0]), 1);
        if (output[7])trimpods.splice(trimpods.indexOf(this), 1);
      }
      if (this.pos.x < 0)this.pos.x = 0;
      if (this.pos.x > width)this.pos.x = width;
      if (this.pos.y < 0)this.pos.y = 0;
      if (this.pos.y > height)this.pos.y = height;
    }
    
    closestPredator() {
      return predatods.reduce((p, c) => abs(p.pos.x - this.pos.x) + abs(p.pos.y - this.pos.y) < abs(c.pos.x - this.pos.x) + abs(c.pos.y - this.pos.y) ? p : c);
    }

    closestTrimp() {
      return trimpods.reduce((p, c) => abs(p.pos.x - this.pos.x) + abs(p.pos.y - this.pos.y) < abs(c.pos.x - this.pos.x) + abs(c.pos.y - this.pos.y) ? p : c);
    }

    popDensity() {
      return trimpods.filter(trimp => abs(this.pos.x - trimp.pos.x) + abs(this.pos.y - trimp.pos.y) == 2 );
    }
    
    show() {
      let image;
      if (this.state == 1)image = this.show_hor();
      else if (this.state == 2)image = this.show_vert();
      else image = this.show_idle();
      image.forEach(pixels => {
        stroke(pixels.color);
        pixels.pixels.forEach(pixel => point(...pixel));
      });
    }

    show_vert() {
      return [
        {
          color: this.p_color,
          pixels: [
            [this.pos.x, this.pos.y],
            [this.pos.x, this.pos.y+1],
            [this.pos.x, this.pos.y-1],
          ]
        }, 
        {
          color: this.s_color,
          pixels: [
            [this.pos.x-1, this.pos.y-1],
            [this.pos.x+1, this.pos.y-1],
            [this.pos.x-1, this.pos.y+1],
            [this.pos.x+1, this.pos.y+1]
          ]
        }
      ]
    }

    show_hor() {
      return [
        {
          color: this.p_color,
          pixels: [
            [this.pos.x, this.pos.y],
            [this.pos.x+1, this.pos.y],
            [this.pos.x-1, this.pos.y],
          ]
        }, 
        {
          color: this.s_color,
          pixels: [
            [this.pos.x-1, this.pos.y+1],
            [this.pos.x+1, this.pos.y+1]
          ]
        }
      ]
    }

    show_idle() {
      return [
        {
          color: this.p_color,
          pixels: [
            [this.pos.x, this.pos.y],
            [this.pos.x+1, this.pos.y]
          ]
        },
        {
          color: this.s_color,
          pixels: [
            [this.pos.x, this.pos.y+1],
            [this.pos.x+1, this.pos.y+1]
          ]
        }
      ]
    }

    replicate() {
      let brain = this.brain;
      let chance = false;
      chance = brain.weights_ih.mutate() ? true : chance;
      chance = brain.weights_ho.mutate() ? true : chance;
      chance = brain.bias_h.mutate() ? true : chance;
      chance = brain.bias_o.mutate() ? true : chance;
      return new Trimp({
        p_color: chance ? [random(0, 255), random(0, 255), random(0, 255)] : this.p_color,
        s_color: chance ? [random(0, 255), random(0, 255), random(0, 255)] : this.s_color,
        brain: brain,
      });
    }
  }