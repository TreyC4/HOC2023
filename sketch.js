let trimpods = [], time = 0;

const population = 1000;
const Totaltime = 5;
const fps = 120;
const kill = true;

function setup() {
  frameRate(fps);
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({max_conn: 2}));
}
 
function draw() {
  background(0);
  trimpods.forEach(trimp => {
    trimp.show();
    trimp.act();
  });
  time+=1/fps;
  if (time >= Totaltime) {
    let count = trimpods.filter(trimp => survive(trimp)).length;
    let victors = trimpods.filter(trimp => survive(trimp));
    if (victors.length == 0) {
      frameRate(0);
      background(255, 0, 0);
    } else {
      let newTrimpods = []
      trimpods = victors.forEach(trimp => {
        for(let i = 0; i < population / count; i++)newTrimpods.push(trimp.replicate());
      });
      trimpods = newTrimpods;
      time = 0;
    }
  }
}

//const survive = (trimp) => trimp.pos.x > width - (width / 10) && trimp.pos.x < width + (width / 10);
const survive = trimp => abs(trimp.pos.x - mouseX) + abs(trimp.pos.y - mouseY) < (width + height) / 40;