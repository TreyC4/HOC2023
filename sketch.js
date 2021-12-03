/*let trimpods = [], cheeses = [], time = 0;

const population = 1500;
const Totaltime = 500;
const fps = 10000;
const kill = false;
const cheeseAmount = 1000;

function setup() {
  createCanvas(355, 178);
  frameRate(fps);
  for (let i = 0; i < cheeseAmount; i++)cheeses.push(new Cheese());
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({max_conn: 1}));
}
 
function draw() {
  background(15, 0, 0);
  fill(0, 15, 0);
  stroke(0, 15, 0);
  rect(0, 0, width / 6, height);
  cheeses.forEach(cheese => cheese.show());
  trimpods.forEach(trimp => {
    trimp.show();
    trimp.act();
  });
  time+=1;
  if (time >= Totaltime) {
    let victors = trimpods.filter(trimp => survive(trimp));
    if (victors.length == 0) {
      frameRate(0);
      background(255, 0, 0);
    } else {
      let newTrimpods = [];
      const amount = round(population / victors.length);
      trimpods = victors.forEach(trimp => {
        for(let i = 0; i < amount; i++)newTrimpods.push(trimp.replicate());
      });
      trimpods = newTrimpods;
      time = 0;
    }
  }
}

//const survive = (trimp) => trimp.pos.x > width - (width / 10) && trimp.pos.x < width + (width / 10);
/*const survive = trimp => {
    const dist = abs(trimp.pos.x - mouseX) + abs(trimp.pos.y - mouseY);
    console.log(dist);
    return dist < 20;
}
//const survive = trimp => {
    //return trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y;
//}
const survive = trimp => trimp.cheese > 0;*/
let cheese, trimp, trimpods, cheeses;
function setup() {
  createCanvas(355, 178);
  cheese = new Cheese(40, 40)
  console.log(cheese.pos)
  trimp = new Trimp({x: 40, y: 40})
  trimpods = [trimp]
  cheeses = [cheese]
  console.log(trimp.pos)
}

function draw() {
  trimp.show()
  cheese.show();
  trimp.act();
}