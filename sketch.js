let trimpods = [], time = 0;

const population = 500;
const Totaltime = 200;
const fps = 200;
const kill = false;

function setup() {
  createCanvas(220, 110)
  frameRate(fps);
  for (let i = 0; i < population; i++)trimpods.push(new Trimp({max_conn: 2}));
}
 
 function draw() {
  background(0);
  trimpods.forEach(trimp => {
    trimp.show();
    trimp.act();
  });
  time+=1;
  if (time >= Totaltime) {
    let victors = trimpods.filter( trimp =>  survive(trimp));
    if (victors.length == 0) {
      frameRate(0);
      background(255, 0, 0);
    } else {
      let newTrimpods = []
      trimpods = victors.forEach(trimp => {
        for(let i = 0; i < population / victors.length; i++)newTrimpods.push(trimp.replicate());
      });
      trimpods = newTrimpods;
      time = 0;
    }
  }
}

//const survive = (trimp) => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y;
//const survive =  trimp =>  trimp.pos.x > width / 1.5 && trimp.pos.x < width / 1.25 && abs(trimp.pos.x - trimp.begin.x) > 10 && abs(trimp.pos.y - trimp.begin.y) > 10 && abs(trimp.pos.y - height) > 20 && trimp.pos.y > 20e;
//const survive = trimp => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin && (trimp.pos.x < 40 || trimp.pos.x > 180) && (trimp)
const survive = trimp => trimp.pos.x !== trimp.begin.x && trimp.pos.y !== trimp.begin.y && trimp.pos.x > width / 2.5 && trimp.pos.x < width / 1.5