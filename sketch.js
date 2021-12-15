let trimpods = [], cheeses = [], time = 0;

const population = 2000;
const Totaltime = 1000;
const fps = 1000000;
const kill = true;
const mutationChance = 0.001;
let epoch = 0;

function setup() {
  createCanvas(292, 178);
  frameRate(fps);
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({}));
}
 
 function draw() {
  background(0);
  stroke(50, 0, 0);
  fill(50, 0, 0);
  rect(10, 10, 272, 158);
  stroke(0, 50, 0);
  fill(0, 50, 0);
  rect(0, 0, width, 10);
  rect(0, 168, width, 10);
  rect(0, 0, 10, height);
  rect(282, 0, width, height);
  trimpods.forEach(trimp => {
    trimp.show();
    trimp.act();
  });
  time++;
  if (time >= Totaltime) {
    let victors = trimpods.filter(trimp => survive(trimp));
    epoch++;
    if (victors.length == 0) {
      frameRate(0);
      background(255, 0, 0);
      alert('The losers all died haha');
    } else {
      trimpods = [];
      console.log("Epoch: " + epoch + "\nSurvival Rate: " + Math.round(victors.length / population * 100000) / 1000 + "%");
      let count = 0;
      while(trimpods.length < population) {
        if (count >= victors.length)count = 0;
        trimpods.push(victors[count].replicate());
        count++;
      }
      time = 0;
    }
  }
}

//const survive = trimp => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y;
//const survive = (trimp) => trimp.pos.x > width / 1.5 && trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y;
 /*const survive = trimp => {
  if (epoch > 10) return trimp.closestTrimp().color == trimp.color;
  return round(random());
}*/
const survive = trimp => !(trimp.pos.x == trimp.begin.x && trimp.pos.y == trimp.begin.y) && (trimp.pos.x >= 282 || trimp.pos.x <= 10 || trimp.pos.y >= 168 || trimp.pos.y <= 10);