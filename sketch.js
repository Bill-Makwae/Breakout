/* This is the start of a simple p5.js sketch using p5-matter.
 Use this as a template for creating your own sketches! */

var ball;
var paddle;
var paddle2;
var paddle3;
var floor;
var blocks;
var blockSize;

const colors = ["Crimson", "Brown", "BlanchedAlmond", "Chocolate"]

function setup() {
  // put setup code here.
  var canvas = createCanvas(windowWidth-20, windowHeight-20);
  matter.init();

  
  matter.mouseInteraction(canvas);
  
  canvasMouse = Matter.Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  //the size of the blocks is set to 10 percent of the height of the window
  blockSize = Math.floor(width*0.1)
  const blockRows = Math.floor(height*0.25)
  blocks = [];
  // this could be cleaned up a bit, but the 20 is the height of 
  // of the blocks, and they fit within 20% of the height of the
  //canvas
  for (let i = 0; i < (width/blockSize); i++){
    for (let j = 1; j * 20 < (blockRows); j++){
      let b = matter.makeBarrier(i*blockSize, j*20, blockSize, 20);
      b.body.isBreakable = true;
      b.color = colors[Math.floor(Math.random() * colors.length)];
      blocks.push(b);
    }
  }

  //The paddle has to be shaped differently in order to change the 
  //way the game is played.
  
  
  
  
  paddle = matter.makeBarrier(width/2, height*0.9, 2*blockSize, 40);
  paddle.body.restitution = 1.0;
  
  paddle.move = function(){
    let mx = constrain(mouseX, 0, width);
    let my = constrain(mouseY, 0.4*height, height)
    this.setPosition(mx, my);
  };
  paddle.color = "Aqua";

  // paddle2 = matter.makeBlock((width/2)+30, height*0.9, 2*blockSize, 40);
  // paddle.body.inertia = Infinity;
  // paddle2.body.angle = 45;
  // paddle2.color = "Aqua";

  // matter.connect(paddle, paddle2);


  ///This is creating the game ball
  ball = createBall();
  
  // ball = matter.makeBall(width / 2, 40, 80);
  // ball.body.restitution = 1.0;
  // floor = matter.makeBarrier(width / 2, height, width, 50);
  // floor.body.restitution = 1.0;
  runCollisions();
  
}

function draw() {
  // put the drawing code here
  background(255);

  blocks.forEach(element => {
    fill(element.color);
    element.show();
  });

  fill(paddle.color);
  paddle.move();
  paddle.show();
  



  fill(ball.color);
  ball.show();
  if(ball.isOffCanvas()){
    matter.forget(ball);
    ball = createBall();
    
  }
  



  // fill(127);
  // floor.show();

  // fill(255);
  // ball.show();
}

function createBall(){
  let ballT = matter.makeBall(width / 2, height/2, blockSize/2);
  ballT.body.restitution = 1.0;
  ballT.body.frictionAir = 0;
  ballT.body.frictionStatic = 0;
  ballT.color = "Blue";
  ballT.velocity = (30, 0);
  return ballT;

}

function runCollisions(){
  Matter.Events.on(engine, 'collisionActive', function(event) {
    var pairs = event.pairs;

    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if (pair.bodyA.label != "Circle Body"){
          console.log(pair.bodyA)
         
        }
        if (pair.bodyB.label != "Circle Body"){
          
        }
    }
  });
}