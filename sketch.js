
var monkey , monkey_running,ground,ground_moving
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState="play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  ground_moving=loadImage("ground.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
monkey=createSprite(50,250,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(400,450,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 console.log(ground.x)
  
  obstaclesGroup=new Group();
  foodGroup=new Group();
  
var survivalTime=0;
  var score=0;
}


function draw() {
  background("white")
  if(gameState==="play"){
    stroke("blue");
  textSize(20);
  fill("blue");
  text("Score:"+score,400,50)
 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50)
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  monkey.velocityY=monkey.velocityY+0.5
  
  if(keyDown("space")&&monkey.y>350){
    monkey.velocityY=-15
  }
  
  monkey.collide(ground);
  
  spawnObstacles()
  spawnFood()
    if(obstaclesGroup.isTouching(monkey)){
      gameState="end"
      obstaclesGroup.destroyEach();
      foodGroup.destroyEach()
      
    }
  }
  else if(gameState==="end"){
    background("black");
    textSize(20);
    text("GAME OVER",150,300)
    ground.visible=false;
    monkey.visible=false;
    
  }
  drawSprites()
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle=createSprite(400,420,40,40)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.25
    obstacle.velocityX=-4;
    obstacle.lifetime=134;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnFood(){
  if(frameCount%80===0){
    var banana=createSprite(400,200,40,40)
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.y=Math.round(random(120,200))
    banana.velocityX=-4;
    banana.lifetime=134
    
    foodGroup.add(banana);
   
  }
}


