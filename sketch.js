let trimpods = [], cheezits = [];

const population = 250;
const fods = 250;
const fps = 1000000;
let frames = 0;
const kill = false;
const mutationChance = 0.01;

function setup() {
  createCanvas(200, 200);
  frameRate(fps);
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({}));
  for (let i = 0; i < fods; i++)cheezits.push(new Cheese({}));
}
 
function draw() {
  background(0);
  if (trimpods.length < population)trimpods.push(trimpods.sort((a, b) => b.hunger - a.hunger)[floor(random(0, population / 50 + 1))].replicate());
  if (cheezits.length < fods)cheezits.push(new Cheese({}));
  trimpods.forEach(trimp => {
    trimp.show();
    trimp.act();
  });
  cheezits.forEach(cheese => cheese.show());
  if (frames % 250 == 0)console.log("Frame " + frames);
  frames++;
}