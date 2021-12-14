let trimpods = [], cheeses = [], time = 0;

const population = 1000;
const Totaltime = 500;
const fps = 1000000;
const kill = false;
const mutationChance = 0.01;
let epoch = 0;

function setup() {
  createCanvas(355, 178);
  frameRate(fps);
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({}));
}
 
 function draw() {
  background(0);
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
const survive = trimp => {
  if (epoch > 10) return trimp.closestTrimp().color == trimp.color;
  return round(random());
}