var ground,ground1,thief,bullet,people,police,currency,Go,GoImage,laser,thiefS,copS,bb,t,c;
var policeGroup,peopleGroup,bulletGroup,laserGroup;
var gamestate="play"
function preload(){
ground1= loadImage("background.jpg"); 
GoImage= loadImage("go.png"); 
thiefS=loadSound("thief.mp3");
copS=loadSound("cops/cevilians.mp3");
bb=loadSound("shoot.mp3");
t=loadImage("thief.png")
c=loadImage("police.png")
}
function setup() {
  createCanvas( innerWidth, innerHeight );
  ground = createSprite( 800,400,800,20);
  ground.addImage ("road",ground1)
 ground.scale=3;
ground.velocityY=+3;
bulletGroup=new Group();
policeGroup=new Group();
peopleGroup=new Group();
laserGroup= new Group();
currency=0
Go=createSprite(innerWidth/2, innerHeight/2);
Go.addImage("GO",GoImage);
Go.scale=0.68
thief=createSprite(innerWidth/2,innerHeight-50,50,100)
thief.addImage("thief",t)
thief.scale=0.5;
}

function draw() {
  background(215,255,255);  
  if(gamestate==="play"){
    Go.visible=false;
  if (keyDown ("left") ) {
thief.x-=50
  }
  if (keyDown ("right") ) {
    thief.x+=50
      }
      if (keyDown ("space") ) {
        shoot();
        bb.play();
          }
   Cops();
   civil()
   if(bulletGroup.isTouching(peopleGroup)){
bullet.remove()
people.remove()
copS.play();
currency+=Math.round(random(5,10))
   }
   if(bulletGroup.isTouching(policeGroup)){
    bullet.remove()
    police.remove()
    copS.play()
   }   
   if(laserGroup.isTouching(thief)){
    bullet.remove()
    thief.remove()
    gamestate="end"
    thiefS.play();
   }   
   thief.visible=true;
   if(policeGroup.isTouching(thief)){
     police.remove()
     thief.visible=false;
     gamestate="end"
     thiefS.play();
   }
   }

   else if(gamestate==="end"){
    background(0);
    Go.visible= true;
    policeGroup.destroyEach()
    peopleGroup.destroyEach()
    bulletGroup.destroyEach()
   }
  //if(ground.y>800){
   // ground.y = ground.height/2;
    //ground.velocityY=+3;
  //}

  drawSprites();
  textSize(24);
  if(gamestate==="play"){
  fill("green")
text("Cash:"+currency,innerWidth-160,40);}
if(gamestate==="end"){
  textSize(36);
  
  textFont("chiller")
  fill("white")
text("Cash:"+currency,innerWidth/2-50,innerHeight-100);

  }}
function shoot(){
  if(frameCount % 4  === 0) {
   bullet= createSprite(thief.x,thief.y-50,8,10);
  bullet.velocityY=-10
bullet.lifetime=81;
bulletGroup.add(bullet);
  }
}

function Cops(){
  if(frameCount % 175 ===0) {
       police= createSprite(10,-10,50,100)
      police.x= Math.round(random (10,innerWidth-10)) 
      police.addImage("police",c);
      police.scale=0.5
      police.velocityY=5+(currency/30)
      police.shapeColor="blue"
      police.lifetime=165;
      policeGroup.add(police);
    
      if((thief.x-8)<police.x || (thief.x+8)>police.x|| thief.x===police.x){
        
        laser =createSprite(police.x,police.y,8,10)
        laser.velocityY=10+2*(currency/30)
        laser.lifetime=81;
        laserGroup.add(laser);
      }
  }
}
function civil(){
  if(frameCount % 111 ===0) {
       people= createSprite(10,-10,50,100)
      people.x= Math.round(random (10,innerWidth-10)) 
      people.velocityY=5+(currency/30)
      people.shapeColor="red"
      people.lifetime=93;
      peopleGroup.add(people);
  }
}