class Trimp {
  
    constructor(obj) {
      const keys = Object.keys(obj);
      this.color = keys.includes('color') ? obj.color : [random(0, 255), random(0, 255), random(0, 255)];
      this.pos = {
        x: floor(random(0, width+1)),
        y: floor(random(0, height+1))
      };
      if (keys.includes('max_conn')) {
        this.genome = Trimp.genRandGenome(floor(random(0, obj.max_conn + 1)));
        this.brain = new Network(keys.includes('lr') ? obj.lr : 0.1)
        this.brain.fromGenome(this.genome);
      }
    }
    
    setGen(genome, lr) {
      this.genome = genome;
      this.brain = new Network(lr);
      this.brain.fromGenome(this.genome);
    }
    
    act() {
      const popDensity = this.popDensity(); 
      //const output = this.brain.ffor([this.pos.x / width, this.pos.y / height, random(), popDensity.length / trimpods.length, (height - this.pos.y) / height, (width - this.pos.x) / width, parseInt(this.closestTrimp().color.reduce((p, c) => "" + p + c)), parseInt(this.color.reduce((p, c) => "" + p + c)) / 255255255]);
      const output = this.brain.ffor([this.pos.x / width, this.pos.y / height, random(), popDensity.length / trimpods.length, (height - this.pos.y) / height, (width - this.pos.x) / width, mouseX / width, mouseY / height]);
      if (!output[6]) {
        if (output[4])output[floor(random(0, 4))] = 1;
        if (output[0] && this.pos.x !== width && trimpods.filter(trimp => trimp.pos.x == this.pos.x+1 && trimp.pos.y == this.pos.y).length == 0)this.pos.x++;
        if (output[1] && this.pos.x !== 0 && trimpods.filter(trimp => trimp.pos.x == this.pos.x-1 && trimp.pos.y == this.pos.y).length == 0)this.pos.x--;
        if (output[2] && this.pos.y !== height && trimpods.filter(trimp => trimp.pos.y == this.pos.y+1 && trimp.pos.x == this.pos.x).length == 0)this.pos.y++;
        if (output[3] && this.pos.y !== 0 && trimpods.filter(trimp => trimp.pos.y == this.pos.y-1 && trimp.pos.x == this.pos.x).length == 0)this.pos.y--;
        if (output[5] && kill && popDensity.length == 1)trimpods.splice(trimpods.indexOf(popDensity[0]), 1);
        if (output[7])trimpods.splice(trimpods.indexOf(this), 1);
      }
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
    
    static genRandGenome(amount) {
      let res = [];
        for (let i = 0; i < amount; i++)res.push("" + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()));
      res = Trimp.unArr(res);
      let biases = [], bAmount = floor(random(0, 17));
      for (let i = 0; i < bAmount; i++)biases.push("" + round(random()) + round(random()) + round(random()) + round(random()));
      biases = Trimp.unArr(biases);
      biases = biases.map(bias => parseInt(bias + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()), 2).toString(16)).join('i');
      return [res.map(gen => parseInt(gen + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()) + round(random()), 2).toString(16)).join('g')].concat(biases).join('h');
    }
    
    static unArr(arr)  {
      var a = [];
      for (var i=0, l=arr.length; i<l; i++)
          if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
              a.push(arr[i]);
      return a;
    }
    
    replicate() {
      const hex = ['a', 'b', 'c', 'd', 'e', 'f'];
      const genome = this.genome.split('').map(gen => {
        const result = random() < 0.002 && gen !== 'h' && gen !== 'i' && gen !== 'g' ? (isNaN(gen) ? String.fromCharCode(gen.charCodeAt(0)) + round(random) : (parseInt(gen) + floor(round(-1, 2))).toString()) : gen;
        if (parseInt(result) > 9)return '9';
        if (parseInt(result) < 0)return '0';
        if (!hex.includes(result) && gen != result)return hex[floor(random(0, hex.length))];
        return result;
      }).join('');
      const trimp = new Trimp({
        color: this.color
      })
      trimp.setGen(genome, 0.1);
      return trimp;
    }
  
  }