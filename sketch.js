var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
 score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Restart, RestartImage, GameOver, GameOverImage; 
 

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  RestartImage = loadImage("restart.png");
  GameOverImage = loadImage("gameOver.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Trex_Collided", trex_collided);
  trex.scale = 0.7;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
 
  
  Restart = createSprite(300, 140);
  GameOver = createSprite(300, 100);
  
  Restart.addImage(RestartImage);
  GameOver.addImage(GameOverImage);
  Restart.scale = 0.6;
  GameOver.scale=0.6;
  Restart.visible = false;
  GameOver.visible = false;
  
  trex.setCollider("circle",0,0,30);
}

function draw() {
  background(180);
  
 text("Score: "+ score, 500,50);
  
  
  trex.collide(invisibleGround);

  if(gameState === PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     score = score + Math.round(getFrameRate()/60);
  
  
  ground.velocityX = -5;
     
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 149){
      trex.velocityY = -15 ;
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    console.log(trex.y);
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
     
      gameState = END;
     
    }
  }
  
  else if(gameState === END) {
    GameOver.visible = true;
    Restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("Trex_Collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }
 
  if(mousePressedOver(Restart)) {
    reset();
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
    
    clouds.scale = 0.8;
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -5;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.58;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  GameOver.visible = false;
  Restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  count = 0;
}
