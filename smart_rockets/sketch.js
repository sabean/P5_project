let rocket;
let population;
let lifeP;
var count = 0;
var target;
var lifespan = 400;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;
var maxforce = 0.2;

function setup() {
  createCanvas(400,300);
  population = new Population();
  lifeP = createP();
  target = createVector(width/2, 50);
}

function draw() {
  background(0);
  population.run();
  lifeP.html(count);
  count++;

  /*if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
  }*/
  if(population.motion()){
    population.evaluate();
    population.selection();
    count = 0;
  }
  fill(255);
  rect(100,150,200,10);

  ellipse(target.x, target.y, 16,16);
}