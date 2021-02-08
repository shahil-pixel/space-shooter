
var player,enemy;
var gamestate = "play";
var ebulletGroup,enemyGroup,pbulletGroup;
var lives = 5;

function preload(){
  backgroundImg = loadImage("background.png");
  rocketImg = loadImage("rocket.png");
  enemyImg = loadImage("enemy.png");
  pbul = loadImage("pbullet.jpg");
  ebul = loadImage("ebullet.png");
}

function setup() {
  createCanvas(600, 600);
  
player = createSprite(300,540,50,50);
player.addImage(rocketImg);
player.scale = 0.5
  
ebulletGroup = new Group();

enemyGroup = new Group();

pbulletGroup = new Group();
player.setCollider("circle",0,0,30)

//player.debug=true

}

function draw() {
  background(backgroundImg);
  if(gamestate === "play"){
  if(keyDown(RIGHT_ARROW)){
    player.x += 10
  }
  
  if(keyDown(LEFT_ARROW)){
    player.x -= 10
    }
    
  if(keyWentDown("SPACE")){
     Pbullets()
  }
  Enemy()
  Ebullets()

  

  if(ebulletGroup.collide(player)){
  lives = lives - 1
  ebulletGroup.destroyEach()
  }
 // if(enemyGroup.y > 600){
  ///  lives = lives - 1
   // }
  if(pbulletGroup.isTouching(enemyGroup)){
  enemyGroup.destroyEach()
  }
  
  if(lives === 0){
  gamestate = "end";
  }
}
else if(gamestate = "end"){
  textSize(50)
  fill("white")
  text("Game Over",200,300)

  enemyGroup.visible = false
  ebulletGroup.visible = false
  player.visible = false
  pbulletGroup.visible = false
}



  drawSprites();
  textSize(18)
  fill("white")
  text("lives = "+ lives,510,30)
  
}

function Pbullets(){
  var Pbullet = createSprite(100,360,15,15);
  Pbullet.addImage(pbul);
  Pbullet.y = 488;
  Pbullet.x = player.x;
  Pbullet.velocityY = Math.round(random(-5,-8));

 pbulletGroup.add(Pbullet);
}

function Ebullets(){
  if(frameCount %150===0){
  var Ebullet = createSprite(100,90,15,15);
  Ebullet.addImage(ebul);
   Ebullet.scale = 0.2;
  
  Ebullet.y = enemy.y + 70;
  
  Ebullet.x = enemy.x;
  
  Ebullet.velocityY = 5;
  
  ebulletGroup.add(Ebullet);
}
}
 
  



function Enemy(){

  if(frameCount %150===0){
    enemy = createSprite(300,100,50,50);
    enemy.addImage(enemyImg)
    enemy.scale = 0.5

    enemy.x = Math.round(random(50,550));
    
    enemy.velocityY = +2;

    enemyGroup.add(enemy)
    
  }
   
}