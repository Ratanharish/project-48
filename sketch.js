var player_running,player_standing
var thief
var rocks,helicopter,jungle,bullet,pebble,rope,rulesB
var tiger_sitting,tiger_running
var bridge
var backgroundS
var playButton,rulesButton
var gameState= RULES
var gameState=PLAY
var gameState=END

var score
var RULES=1
var PLAY=3
var END=4
var invisibleG
var player
var reset
var white

function preload(){
 playerRunning= loadAnimation("a/p1.png","a/p2.png","a/p3.png","a/p4.png","a/p51.png","a/p6.png","a/p7.png",
 "a/p8.png","a/p9.png","a/p10.png","a/p11.png","a/p12.png","a/p13.png","a/p14.png","a/p15.png","a/p16.png",
 "a/p17.png","a/p18.png","a/p19.png","a/p20.png","a/p21.png","a/p22.png","a/p23.png","a/p24.png")


 tigerSitting= loadImage("assets/tiger_sitting.png")
 tigerRunning=loadImage("assets/tiger_running.png")

stealer=loadImage("assets/robber.png")
stealer_R=loadAnimation("assets/robber_1.png","assets/robber_2.png","assets/robber_3.png",
"assets/robber_4.png","assets/robber_5.png","assets/robber_6.png")

 
 rocksI=loadImage("assets/rocks.png")
 helicopterI=loadImage("assets/helicopter.png")
 
 playB=loadImage("assets/play_button.png")
 resetB=loadImage("assets/reset.png")
 pebbleI=loadImage("assets/pebble.png")
 rulesI=loadImage("assets/rules.png")
 
 rulesBI=loadImage("assets/rulesB.jpg")
 
 backgroundS=loadImage("assets/jungle1.png")
whiteB1=loadImage("assets/whiteB.jpg")
}


function setup() {
  createCanvas(1400,650);

 background1=createSprite(700,325,3000,650)
 background1.addImage(backgroundS)
 background1.x=background1.width/3

rulesB=createSprite(700,325)
rulesB.addImage(rulesBI)
rulesB.scale=0.3
rulesB.visible=false

white=createSprite(700,325)
white.addImage(whiteB1)
white.scale=5
white.visible=false

  player=createSprite(600, 400 );
  player.addAnimation("running",playerRunning)
  player.scale= 0.4

  helicopter=createSprite(1100,520)
  helicopter.addImage(helicopterI)
  helicopter.scale=0.8
  helicopter.visible=false

  thief=createSprite(200,450)
  thief.addImage("standing",stealer)
  thief.addAnimation("running",stealer_R)
  thief.scale= 0.45

  
  playButton=createSprite(1200,120)
  playButton.addImage(playB)
  playButton.scale=0.3

rulesButton=createSprite(1200,220)
rulesButton.addImage(rulesI)
rulesButton.scale=0.3

invisibleG=createSprite(500,640,2000,10)
invisibleG.visible = true

 rocksGroup= new Group()
 player.debug= true
 player.setCollider("circle",0,200,130)
score=0
 
}

function draw(){
  background(0)
  


if (gameState== PLAY){
 
  score=score+Math.round(getFrameRate()/60)
  SpawnRocks()
  if(keyDown("s")){
    pebble=createSprite(player.position.x,player.position.y)
    pebble.addImage(pebbleI)
    pebble.scale=0.1
    pebble.velocityX=5

    pebble.depth=player.depth
    player.depth=player.depth+1
    
  }
  if(keyDown("space")){
    player.velocityY=-17
    
  }
}
 if(mousePressedOver(rulesButton)){
 
    background1.visible=true
    thief.visible=false
    player.visible=false
    playButton.visible=false
    rulesButton.visible=false
    rulesB.visible=true
    white.visible=true
    
    white.depth= rulesB.depth
    rulesB.depth=rulesB.depth+1
   
 }
   if(keyDown("x")){
  rulesB.visible=false
  thief.visible=true
  player.visible=true
  playButton.visible=true
  rulesButton.visible=true
  white.visible=false
 }

  if(mousePressedOver(playButton)){
    thief.changeAnimation("running",stealer_R)
    gameState=PLAY
    background1.velocityX=-3
    playButton.visible=false
    rulesButton.visible=false
   
 
  }
  if(background1.x<100){
    background1.x=background1.width/3

  } 
  
  


  
  if(rocksGroup.isTouching(player)){
     gameState=END
     Gameover()
  
  }
  if(score==2000){
    helicopter.visible=true
    text("you won",700,325)

  }
 

  
  player.velocityY=player.velocityY+0.8
  player.collide(invisibleG)

drawSprites();
 
fill("black")
textSize(50)
text("Score:"+score,100,120)
}

 function SpawnRocks(){
if (frameCount% 350===0){
    rocks=createSprite(1200,600)
    rocks.addImage(rocksI)
    rocks.scale=0.15
    rocks.velocityX=-9
    rocks.lifetime=800
    
    rocksGroup.add(rocks)
  }
}

function Gameover(){
   swal({
    title: `Game Over`,
    text: "Oh no, you lost the artifact....!!!",
    text:"YOUR SCORE IS:   "+score,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  })
  
   
  background1.velocityX=0
  rocks.velocityX=0

}

