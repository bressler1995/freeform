let mycanvas;
let ellipserecord = [];
let mysize = 20;
let clear_opt, save_opt;

function preload() {

}

function setup() {
    mycanvas = createCanvas(400, 400);
    clear_opt = select('#clear_opt');
    clear_opt.mousePressed(clearEverything);
    save_opt = select('#save_opt');
    save_opt.mousePressed(saveEverything)
}

function draw() {
    background(255);
    fill(0);
    for(i=0; i<ellipserecord.length; i++) {
        ellipse(ellipserecord[i].ellipsex, ellipserecord[i].ellipsey, ellipserecord[i].ellipsesize, ellipserecord[i].ellipsesize);
    }
}

function mouseDragged() {
    console.log("X: " + mouseX + ", Y: " + mouseY);
    ellipserecord.push({ellipsex:mouseX, ellipsey:mouseY, ellipsesize:20});
}

function clearEverything() {
    ellipserecord = [];
}

function saveEverything() {
    saveCanvas(mycanvas, 'myWorkOfArt', 'jpg');
}