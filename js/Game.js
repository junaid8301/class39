class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      car1 = createSprite(displayWidth/4,displayHeight-100,50,50);
      car2 = createSprite(displayWidth/3,displayHeight-100,50,50);
      car3 = createSprite(displayWidth/2,displayHeight-100,50,50);
      car4 = createSprite(displayWidth/1.5,displayHeight-100,50,50);

      cars = [car1,car2,car3,car4]
    }

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    drawSprites();
    if(allPlayers !== undefined){
     var i = 0;
     var y;

      /*var display_position = 130;
      for(var plr in allPlayers){
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)*/
        for(var plr in allPlayers){
        
        y = displayHeight - allPlayers[plr].distance
        cars[i].y = y
        if(i+1===player.index){
          camera.position.y = cars[i].y
          cars[i].shapeColor = "red"
        }
        i = i+1;
        }


    
      
      }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
