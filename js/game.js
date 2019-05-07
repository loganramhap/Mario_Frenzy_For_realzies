var Game = new Phaser.Game(
  256,
  240,
  Phaser.CANVAS,
  "",
  {
    preload: preload,
    create: create,
    update: update
  },
  false,
  false
);

//Game.state.add('Game', Game);
//Game.state.start('Game');


function preload() {
  var array = [["tiles", "assets/tiles_dctsfk.png", 16, 16],["goomba", "pngs/goomba_nmbtds.png", 16, 16],["coin", "pngs/coin_iormvy.png", 16, 16],["mario", "pngs/mario_wjlfy5.png", 16, 16]];
  spritesheetLoader("tiles", "assets/tiles_dctsfk.png", 16, 16);
  spritesheetLoader("goomba", "assets/goomba_nmbtds.png", 16, 16);
  spritesheetLoader("coin", "assets/coin_iormvy.png", 16, 16);
  spritesheetLoader("mario", "assets/mario_wjlfy5.png", 16, 16);
  Game.load.tilemap("world1-1", "https://api.myjson.com/bins/3kk2g", null, Phaser.Tilemap.TILED_JSON);
}

function spritesheetLoader(name, filepath, length, width){
  Game.load.spritesheet(name, filepath, length, width);
}
 function addNewPlayer(id, x ,y) {
    Game.playerMap[id] = Game.add.sprite(x,y,'mario');
    //Game.playerMap[id].tint = 0xff00ff;
}
function create() {
  Game.stage.disableVisibilityChange = true;
  Game.playerMap = {};
  var score = 0;
  Phaser.Canvas.setImageRenderingBicubic(Game.canvas);
  Game.scale.pageAlignHorizontally = true;
  Game.scale.pageAlignVertically = true;
  Game.physics.startSystem(Phaser.Physics.ARCADE);
  Game.stage.backgroundColor = "#5c94fc";

  map = Game.add.tilemap("world1-1");
  map.addTilesetImage("tiles", "tiles");
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

  player = Game.add.sprite(16, Game.world.height - 40, "mario");
  Game.physics.arcade.enable(player);
  player.body.gravity.y = 370;
  player.body.collideWorldBounds = true;
  player.goesRight = true;

  Game.camera.follow(player);

  cursors = Game.input.keyboard.createCursorKeys();
//  cursors.events.onInputUp.add(Game.getCoordinates, this);
  Client.askNewPlayer();

}

function update() {
  Game.physics.arcade.collide(player, layer);
  Game.physics.arcade.collide(goombas, layer);
  Game.physics.arcade.overlap(player, goombas, goombaOverlap);
  Game.physics.arcade.overlap(player, coins, coinOverlap);

  if (player.body.enable) {
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
      player.body.velocity.x = -100;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 100;
    }
    if (cursors.up.isDown && player.body.onFloor()) {
      player.body.velocity.y = -190;
    }
  }
  Client.sendClick(player.x,player.y);
}

function coinOverlap(player, coin) {
  coin.kill();
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
    Game.add.text(Game.world.centerX, Game.world.centerY, "You Died");
    Game.paused = true;
    return false;
  }
}





 function movePlayer(id, x, y) {
  if (player.body.enable) {
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
      player.body.velocity.x = -100;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 100;
    }
    if (cursors.up.isDown && player.body.onFloor()) {
      player.body.velocity.y = -190;
    }
  }
}


function removePlayer(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
}
