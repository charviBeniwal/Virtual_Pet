//Create variables here
var dog, happyDog;
var database, foodS, foodStock;
var benji;

function preload(){
  dog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  
  createCanvas(500, 500);
   benji = createSprite(250,250,5,5);
  benji.addImage(dog);
  benji.scale = 0.1;
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    benji.addImage(happyDog);
  }

  if(keyWentUp(UP_ARROW)){
    benji.addImage(dog);
  }

  drawSprites();

  textSize(13);
  fill(0,0,0);
  text("food Stock: "+ foodS, 200,205);
  console.log(foodStock);
  text("Note: press the UP_ARROW key to feed Benji", 100, 485);
  
}

// Function to read values
function readStock(data){
  foodS = data.val();
}

// Function to write values
function writeStock(x){

  if(x <= 0){
    x=0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })

  
}

