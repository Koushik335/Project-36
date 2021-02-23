class Food{
    constructor(){
        this.image = loadImage("Images/Milk.png");
        this.foodstock = 0;
    }
    getFoodStock(){
        var getFoodStockRef = database.ref('Food/getFoodStock');
        getFoodStockRef.on("value",function(data){
            getFoodStock = data.val();
        });
    }
    updateFoodStock(){
        database.ref('/').update({
            getFoodStock : this.foodstock
        });
    }
    deductFood(){
    this.foodstock = this.foodstock-1;
    database.ref('/').update({
        getFoodStock:this.foodstock
    });
  }
    
    display(){
       var x = 80 , y = 100;
       
       imageMode(CENTER);
       image(this.image,720,220,50,50);

       if(this.foodstock!=0){
           for(var i = 0;i<this.foodstock;i++){
               if(i%10==0){
                   x=80;
                   y=y+50;
               }
               image(this.image,x,y,50,50);
               x = x+30;
           }
       }
    }
}
