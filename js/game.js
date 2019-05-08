// var Game = new Phaser.Game(
//   1024,
//   240,
//   Phaser.CANVAS,
//   "",
//   {
//     preload: preload,
//     create: create,
//     update: update
//   },
//   false,
//   false
// );

var Game = {};

var playerX = 16;
var playerY = 200;

Game.preload = function(){
  var array = [["tiles", "assets/tiles_dctsfk.png", 16, 16],["goomba", "pngs/goomba_nmbtds.png", 16, 16],["coin", "pngs/coin_iormvy.png", 16, 16],["mario", "pngs/mario_wjlfy5.png", 16, 16]];
  spritesheetLoader("tiles", "assets/tiles_dctsfk.png", 16, 16);
  spritesheetLoader("goomba", "assets/goomba_nmbtds.png", 16, 16);
  spritesheetLoader("coin", "assets/coin_iormvy.png", 16, 16);
  spritesheetLoader("mario", "assets/mario_wjlfy5.png", 16, 16);
  Game.load.tilemap("world1-1", "https://api.myjson.com/bins/3kk2g", null, Phaser.Tilemap.TILED_JSON);
}

Game.create = function(){
  var x = 0;
  var text;
  var totalCoins = 84;
  var ID = 0;



  Game.playerMap = {};
  Game.coinMap = {};
  Game.stage.disableVisibilityChange = true;

  var score = 0;
//  Phaser.Canvas.setImageRenderingBicubic(Game.canvas);
  Game.scale.pageAlignHorizontally = true;
  Game.scale.pageAlignVertically = true;
  Game.physics.startSystem(Phaser.Physics.ARCADE);
  Game.stage.backgroundColor = "#5c94fc";

  map = Game.add.tilemap("world1-1");
  map.addTilesetImage("tiles", "tiles");
  //Client.askNewPlayer();
  console.log(map);
  map.setCollisionBetween(3, 12, true, "solid");
  map.createLayer("background");
  layer = map.createLayer("solid");
  layer.resizeWorld();

  coins = Game.add.group();
  coins.enableBody = true;
  map.createFromTiles(2, null, "coin", "stuff", coins);
  coins.callAll("animations.add", "animations", "spin", [0, 0, 3, 1], 4, true);
  coins.callAll("animations.play", "animations", "spin");

  goombas = Game.add.group();
  goombas.enableBody = true;

  map.createFromTiles(1, null, "goomba", "stuff", goombas);
  goombas.setAll("body.bounce.x", 1);
  goombas.setAll("body.velocity.x", -20);
  goombas.setAll("body.gravity.y", 500);
  // goombas.body.collideWorldBounds = true;
  // player = Game.add.sprite(16, Game.world.height - 40, "mario");
  // Game.physics.arcade.enable(player);
  // player.body.gravity.y = 370;
  // player.body.collideWorldBounds = true;
  // player.goesRight = true;
  //
  // Game.camera.follow(player);

  //cursors = Game.input.keyboard.createCursorKeys();
//  cursors.events.onInputUp.add(Game.getCoordinates, this);
  text = this.add.text(Game.camera.x + 20, Game.camera.y + 20, x);
  console.log("Map Created");
  //if(cursors.left.isDown() || cursors.right.isDown() || cursors.up.isDown()){
  //  Client.sendClick(this.playerX, this.playerY);
  //}
  layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
  layer.events.onInputUp.add(Game.getCoordinates, this);
  Client.askNewPlayer();
}
//Game.state.add('Game', Game);
//Game.state.start('Game');


// function preload() {
//   var array = [["tiles", "assets/tiles_dctsfk.png", 16, 16],["goomba", "pngs/goomba_nmbtds.png", 16, 16],["coin", "pngs/coin_iormvy.png", 16, 16],["mario", "pngs/mario_wjlfy5.png", 16, 16]];
//   spritesheetLoader("tiles", "assets/tiles_dctsfk.png", 16, 16);
//   spritesheetLoader("goomba", "assets/goomba_nmbtds.png", 16, 16);
//   spritesheetLoader("coin", "assets/coin_iormvy.png", 16, 16);
//   spritesheetLoader("mario", "assets/mario_wjlfy5.png", 16, 16);
//   Game.load.tilemap("world1-1", "https://api.myjson.com/bins/3kk2g", null, Phaser.Tilemap.TILED_JSON);
// }

function spritesheetLoader(name, filepath, length, width){
  Game.load.spritesheet(name, filepath, length, width);
}
Game.addNewPlayer = function(id, x ,y) {
    Game.playerMap[id] =Game.add.sprite(playerX, playerY, "mario");
    //Game.playerMap[id] =Game
    Game.physics.arcade.enable(Game.playerMap[id]);
    Game.playerMap[id].body.gravity.y = 370;
    Game.playerMap[id].body.collideWorldBounds = true;
    Game.playerMap[id].goesRight = true;
    Game.camera.follow(Game.playerMap[id]);
    map.setCollisionBetween(Game.playerMap[id], 12, true, "solid");
    this.ID = id;
    console.log("Player Created with ID: " + this.ID);
    Game.coinMap[this.ID] = 0;

    //Game.playerMap[id].tint = 0xff00ff;
}
// function create() {
//   Game.stage.disableVisibilityChange = true;
//
//   var score = 0;
//   Phaser.Canvas.setImageRenderingBicubic(Game.canvas);
//   Game.scale.pageAlignHorizontally = true;
//   Game.scale.pageAlignVertically = true;
//   Game.physics.startSystem(Phaser.Physics.ARCADE);
//   Game.stage.backgroundColor = "#5c94fc";
//
//   map = Game.add.tilemap("world1-1");
//   map.addTilesetImage("tiles", "tiles");
//   Client.askNewPlayer();
//   console.log(map);
//   map.setCollisionBetween(3, 12, true, "solid");
//   map.createLayer("background");
//   layer = map.createLayer("solid");
//   layer.resizeWorld();
//
//   coins = Game.add.group();
//   coins.enableBody = true;
//   map.createFromTiles(2, null, "coin", "stuff", coins);
//   coins.callAll("animations.add", "animations", "spin", [0, 0, 3, 1], 4, true);
//   coins.callAll("animations.play", "animations", "spin");
//
//   goombas = Game.add.group();
//   goombas.enableBody = true;
//   map.createFromTiles(1, null, "goomba", "stuff", goombas);
//   goombas.setAll("body.bounce.x", 1);
//   goombas.setAll("body.velocity.x", -20);
//   goombas.setAll("body.gravity.y", 500);
//
//   // player = Game.add.sprite(16, Game.world.height - 40, "mario");
//   // Game.physics.arcade.enable(player);
//   // player.body.gravity.y = 370;
//   // player.body.collideWorldBounds = true;
//   // player.goesRight = true;
//   //
//   // Game.camera.follow(player);
//
//   cursors = Game.input.keyboard.createCursorKeys();
// //  cursors.events.onInputUp.add(Game.getCoordinates, this);
//   text = this.add.text(Game.camera.x + 20, Game.camera.y + 20, x);
//   console.log("Map Created");
// }

// function update() {
//   Game.physics.arcade.collide(Game.playerMap[this.ID], layer);
//   Game.physics.arcade.collide(goombas, layer);
//   Game.physics.arcade.overlap(Game.playerMap[this.ID], goombas, goombaOverlap);
//   Game.physics.arcade.overlap(Game.playerMap[this.ID], coins, coinOverlap);
//   console.log("Collisions and Overlaps Checked");
//   // if (player.body.enable) {
//   //   player.body.velocity.x = 0;
//   //   if (cursors.left.isDown) {
//   //     player.body.velocity.x = -100;
//   //   } else if (cursors.right.isDown) {
//   //     player.body.velocity.x = 100;
//   //   }
//   //   if (cursors.up.isDown && player.body.onFloor()) {
//   //     player.body.velocity.y = -190;
//   //   }
//   // }
//
//
//   text.x = Game.camera.x + 20;
//   text.y = Game.camera.y + 20;
//   Client.sendClick(this.playerX, this.playerY);
// }

function coinOverlap(player, coin) {
  x++;

  coin.kill();
  Game.coinMap[this.ID]++;
  text.setText(Game.coinMap[this.ID].toString());
  totalCoins--;
  if(totalCoins <= 0){
    Game.paused = true;
    Game.add.text(Game.camera.x + 512, Game.camera.y + 120, "You Win!");
  }
  return "coin_removed"
}

function goombaOverlap(player, goomba) {
  if (player.body.touching.down) {
    goomba.body.enable = false;
    player.body.velocity.y = -100;
    goomba.kill();
    return true;
  } else {
    player.body.enable = false;
    Game.add.text(Game.camera.x + 512, Game.camera.y + 120, "You Died");
    Game.paused = true;
    return false;
  }
}





Game.movePlayer= function(id, x, y) {

  // if (Game.playerMap[this.ID].player.body.enable) {
  //   Game.playerMap[this.ID].body.velocity.x = 0;
  //   if (cursors.left.isDown) {
  //     Game.playerMap[this.ID].body.velocity.x = -100;
  //   } else if (cursors.right.isDown) {
  //     Game.playerMap[this.ID].body.velocity.x = 100;
  //   }
  //   if (cursors.up.isDown && Game.playerMap[this.ID].body.onFloor()) {
  //     Game.playerMap[this.ID].body.velocity.y = -190;
  //   }
  // }
  // if (Game.playerMap[id].body.enable) {
  //   Game.playerMap[id].body.velocity.x = 0;
  //   if (cursors.left.isDown) {
  //     Game.playerMap[id].body.velocity.x = -100;
  //   } else if (cursors.right.isDown) {
  //     Game.playerMap[id].body.velocity.x = 100;
  //   }
  //   if (cursors.up.isDown && Game.playerMap[id].body.onFloor()) {
  //     Game.playerMap[id].body.velocity.y = -190;
  //   }
  // }
  // this.playerX = Game.playerMap[id].x;
  // this.playerY = Game.playerMap[id].y;

  var player = Game.playerMap[id];
  var distance = Phaser.Math.distance(player.x,player.y,x,y);
  var tween = game.add.tween(player);
  var duration = distance*10;
  tween.to({x:x,y:y}, duration);
  tween.start();
}

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
}
