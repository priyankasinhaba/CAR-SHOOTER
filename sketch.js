var Splashscreen
var car
var playbutton,
aboutbutton,
obstacle1,
obstacle2,
obstacle3, obstacle4;
var Gamestate = "wait";
var score=0;

function preload(){
Splashscreen = loadImage("assets/splash.gif");
obstacle1 = loadImage("assets/obstacle1.png")
obstacle2 = loadImage("assets/obstacle2.png")
obstacle3 = loadImage("assets/obstacle3.png")
obstacle4 = loadImage("assets/obstacle4.png")
roadbg = loadImage("assets/road.jpg")
carImg = loadImage("assets/car1.png")
laserImg = loadImage("assets/laser.png")

laserSound = loadSound("laserSound.mp3")
explosionSound = loadSound("explosionSound.mp3")
backgroundSound = loadSound("backgroundSound.mp3")

}

function setup(){

createCanvas(500,500);
playbutton = createImg("assets/playgrey.png");
aboutbutton = createImg("assets/info.png");
playbutton.position(400,400);
playbutton.size(70,70)
playbutton.hide();
aboutbutton.position(50,400);
aboutbutton.size(70,70)
aboutbutton.hide();
//score=0;
  enemygroup=new Group();
  laserGroup=new Group();
}


function draw(){
   

if(Gamestate === "wait"){
background(Splashscreen);
score =0;
//car.visible = false;
playbutton.show();
aboutbutton.show();
//score.visible=false;
}
playbutton.mousePressed(()=>{

playbutton.hide();
aboutbutton.hide();
Gamestate="hold";

})

aboutbutton.mousePressed(()=>{

    playbutton.hide();
    aboutbutton.hide();
    Gamestate="about";
    
    })
if (Gamestate==="about"){
aboutgame();
}
if (Gamestate==="hold"){
    bg=createSprite(100,100,900,600);
    bg.addImage(roadbg);
    bg.scale=1.7;
    car=createSprite(200,400)
    car.addImage(carImg);
    car.scale = 0.5
    Gamestate="play";
}
if(Gamestate==="play"){
    car.visible=true;
   // car.debug = true;
    bg.velocityY=5;
    if(bg.y>1000){
        bg.y=height/2
    }

if(keyDown("LEFT_ARROW")){
if(car.x>25){
    car.x=car.x-10
}
}
if(keyDown("RIGHT_ARROW")){
    if(car.x<460){
        car.x=car.x+10
    }
    }
    if(keyDown("space")){
       spawnlaser();
       laser.x=car.x
       laserSound.play()
        }
spawnObstacles();
 
if (score === 100){
    // bg.velocityY=0;
    // Player.visible = false;
    Gamestate = "win"
 
}


for (var i = 0; i < enemygroup.length; i++) {
    if (laserGroup.isTouching(enemygroup.get(i))) {
        explosionSound.play();
        score += 5;
        enemygroup.get(i).remove()
        laserGroup.destroyEach()
        
    }
}


for (var i = 0; i < enemygroup.length; i++) {
    if (car.isTouching(enemygroup.get(i))) {
        car.destroy();
         Gamestate="lost"
        
    }
}



    }
   
     
     
drawSprites()
textSize(20);
fill("red")
text("Score: "+ score, 10,40); 
if(Gamestate==="lost"){
bg.velocityY=0
swal({
title:"YOU LOST!",
text:"YOU GOT HIT BY THE OBSTACLE , TRY AGAIN",
textAllign:"center",
confirmButtonText:"Let's Play again ",
confirmButtonColor:"red",
},
function ()  {
    Gamestate = "wait"
})

}
if(Gamestate==="win"){
    bg.velocityY=0
    swal({
    title:"YOU HAVE WON!",
    text:"Congratulations!!!!! Your destroyed all the obstacles on the way",
    textAllign:"center",
    confirmButtonText:"Let's Play again ",
    confirmButtonColor:"red",
    },
    function ()  {
        Gamestate = "wait"
    })
    
    }

}
function aboutgame(){

swal({
title:"How To Play",
text:"control the car , using the arrow keys .",
textAllign:"center",
confirmButtonText:"Let's Play ",
confirmButtonColor:"red",

},
   function ()  {
        Gamestate = "wait"
    }
)
}


 function spawnObstacles(){
if(frameCount%60===0){
enemy = createSprite(random(50,400),100,10,40);
enemy.velocityY=2;
var rand = Math.round(random(1,4))
switch(rand){
case 1:enemy.addImage(obstacle1)
break;
case 2:enemy.addImage(obstacle2)
break;
case 3:enemy.addImage(obstacle3)
break;
case 4:enemy.addImage(obstacle4)
break;
default: break;
}
//enemy.debug = true;
enemy.lifetime = 120;
enemygroup.add(enemy)
enemy.scale=0.2
}

 }
 function spawnlaser(){
laser = createSprite(500,500);
laser.addImage(laserImg);
laser.y = 340;
laser.velocityY=-5;
laserGroup.add(laser);
 laser.scale=0.05
 }