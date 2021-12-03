/*let trimpods = [], cheeses = [], time = 0;

<<<<<<< HEAD
const population = 1500;
const Totaltime = 500;
const fps = 10000;
const kill = false;
const cheeseAmount = 1000;

function setup() {
  createCanvas(355, 178);
=======
const population = 500;
const Totaltime = 200;
const fps = 200;
const kill = false;

function setup() {
  createCanvas(220, 110)
>>>>>>> ed920737d19e94cbe0a2cebee9e8bc944728c065
  frameRate(fps);
  for (let i = 0; i < cheeseAmount; i++)cheeses.push(new Cheese());
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({max_conn: 1}));
}
 
<<<<<<< HEAD
function draw() {
  background(15, 0, 0);
  fill(0, 15, 0);
  stroke(0, 15, 0);
  rect(0, 0, width / 6, height);
  cheeses.forEach(cheese => cheese.show());
=======
 function draw() {
  background(0);
>>>>>>> ed920737d19e94cbe0a2cebee9e8bc944728c065
  trimpods.forEach(trimp => {
    trimp.show();
    trimp.act();
  });
  time+=1;
  if (time >= Totaltime) {
<<<<<<< HEAD
    let victors = trimpods.filter(trimp => survive(trimp));
=======
    let victors = trimpods.filter( trimp =>  survive(trimp));
>>>>>>> ed920737d19e94cbe0a2cebee9e8bc944728c065
    if (victors.length == 0) {
      frameRate(0);
      background(255, 0, 0);
    } else {
      let newTrimpods = [];
      const amount = round(population / victors.length);
      trimpods = victors.forEach(trimp => {
<<<<<<< HEAD
        for(let i = 0; i < amount; i++)newTrimpods.push(trimp.replicate());
=======
        for(let i = 0; i < population / victors.length; i++)newTrimpods.push(trimp.replicate());
>>>>>>> ed920737d19e94cbe0a2cebee9e8bc944728c065
      });
      trimpods = newTrimpods;
      time = 0;
    }
  }
}

<<<<<<< HEAD
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
=======
//const survive = (trimp) => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y;
//const survive =  trimp =>  trimp.pos.x > width / 1.5 && trimp.pos.x < width / 1.25 && abs(trimp.pos.x - trimp.begin.x) > 10 && abs(trimp.pos.y - trimp.begin.y) > 10 && abs(trimp.pos.y - height) > 20 && trimp.pos.y > 20e;
//const survive = trimp => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin && (trimp.pos.x < 40 || trimp.pos.x > 180) && (trimp)
const survive = trimp => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y && trimp.pos.x > width / 2.5 && trimp.pos.x < width / 1.5
>>>>>>> ed920737d19e94cbe0a2cebee9e8bc944728c065
