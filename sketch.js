var database;
var dog,sadDog,happyDog;
var feedbtn , addbtn ;
var lastFed , fedTime ; 
var form;
var foodObj;
var food;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();


  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedbtn=createButton('Feed The Dog');
  feedbtn.position(700,95);
  feedbtn.mousePressed(feedDog);

  addbtn=createButton('Add Food');
  addbtn.position(800,95);
  addbtn.mousePressed(addFoods);

  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });



}

function draw() {
  background("green");
  foodObj.display();





  textSize(20);
  fill("blue");
  text("Pet's Name: Bishop" ,700 , 70);
  
  textSize(20);
  if(lastFed>=12){
    text('Last Feed : '+lastFed%12 + ' PM' , 100 , 30);
  }
  else if(lastFed==0){
    text('Last Feed  : 12 AM' , 100 , 30);
  }
  else{
    text('Last Feed : '+lastFed + ' AM' , 100 , 30);
  }


drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.deductFood());
  }
  database.ref('/').update({
    FeedTime:hour()
  });
 
  
 }

 function addFoods(){
  dog.addImage(sadDog);
   foodObj.foodstock++;
   database.ref('/').update({
     getFoodStock:foodObj.foodstock
   });
 }

 





  

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock