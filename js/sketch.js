//Credit to The Code Train for the awesome algorithm

let cols;
let rows;
let current; // = new float[cols][rows];
let previous; // = new float[cols][rows];
let reds = 255;
let greens = 0;
let blues = 0;
let mode = "red";

let dampening = 0.999;

function setup() {
  angleMode(DEGREES);
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  cols = width;
  rows = height;
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  frameRate(60);
}

function mouseDragged() {
  previous[mouseX][mouseY] = random(500, 1500);
}

function draw() {

  background(0);
  loadPixels();

  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      current[i][j] =
        (previous[i - 1][j] +
          previous[i + 1][j] +
          previous[i][j - 1] +
          previous[i][j + 1]) /
          2 -
        current[i][j];
      current[i][j] = current[i][j] * dampening;
      // Unlike in Processing, the pixels array in p5.js has 4 entries
      // for each pixel, so we have to multiply the index by 4 and then
      // set the entries for each color component separately.
      let index = (i + j * cols) * 4;
      pixels[index + 0] = current[i][j];
      pixels[index + 1] = current[i][j];
      pixels[index + 2] = current[i][j];
    }

  }
  updatePixels();

  let temp = previous;
  previous = current;
  current = temp;

  if(mode == "red") {
    if(reds > 20) {
        reds -= 0.1;
    }
    if(blues < 220) {
        blues += 0.1;
    }

    if(greens < 150) {
        greens += 0.5;
    }

    if(reds <= 20 && blues >= 220 && greens >= 150) {
        mode = "blue";
    }

  } else if(mode == "blue") {
    if(reds < 200) {
        reds += 0.1;
    }
    if(blues > 50) {
        blues -= 0.1;
    }

    if(greens > 50) {
        greens -= 0.5;
    }

    if(reds >= 200 && blues <= 50 && greens <= 50) {
        mode = "red";
    }
  }

  fill(reds, greens, blues, 160);
  rect(0, 0, windowWidth, windowHeight);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    cols = width;
    rows = height;
}