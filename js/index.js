var game = new Phaser.Game(
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

function preload() {
  var array = [["tiles", "pngs/tiles_dctsfk.png", 16, 16],["goomba", "pngs/goomba_nmbtds.png", 16, 16],["coin", "pngs/coin_iormvy.png", 16, 16],["mario", "pngs/mario_wjlfy5.png", 16, 16]];
  spritesheetLoader("tiles", "pngs/tiles_dctsfk.png", 16, 16);
  spritesheetLoader("goomba", "pngs/goomba_nmbtds.png", 16, 16);
  spritesheetLoader("coin", "pngs/coin_iormvy.png", 16, 16);
  spritesheetLoader("mario", "pngs/mario_wjlfy5.png", 16, 16);
  game.load.tilemap("world1-1", "https://api.myjson.com/bins/3kk2g", null, Phaser.Tilemap.TILED_JSON);
}

function spritesheetLoader(name, filepath, length, width){
  game.load.spritesheet(name, filepath, length, width);
}

function create() {
  var score = 0;
  Phaser.Canvas.setImageRenderingBicubic(game.canvas);
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = "#5c94fc";

  map = game.add.tilemap("world1-1");
  map.addTilesetImage("tiles", "tiles");
  map.setCollisionBetween(3, 12, true, "solid");
  map.createLayer("background");
  layer = map.createLayer("solid");
  layer.resizeWorld();

  coins = game.add.group();
  coins.enableBody = true;
  map.createFromTiles(2, null, "coin", "stuff", coins);
  coins.callAll("animations.add", "animations", "spin", [0, 0, 3, 1], 4, true);
  coins.callAll("animations.play", "animations", "spin");

  goombas = game.add.group();
  goombas.enableBody = true;
  map.createFromTiles(1, null, "goomba", "stuff", goombas);
  goombas.setAll("body.bounce.x", 1);
  goombas.setAll("body.velocity.x", -20);
  goombas.setAll("body.gravity.y", 500);

  player = game.add.sprite(16, game.world.height - 40, "mario");
  game.physics.arcade.enable(player);
  player.body.gravity.y = 370;
  player.body.collideWorldBounds = true;
  player.goesRight = true;

  game.camera.follow(player);

  cursors = game.input.keyboard.createCursorKeys();

  testCases();
}

function update() {
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(goombas, layer);
  game.physics.arcade.overlap(player, goombas, goombaOverlap);
  game.physics.arcade.overlap(player, coins, coinOverlap);

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
    game.add.text(game.world.centerX, game.world.centerY, "You Died");
    game.paused = true;
    return false;
  }
}

function testCases(){
  expect(goombaOverlap(player, goomba)).to.be(true);
  expect(coinOverlap(player, coin)).to.be("coin_removed");
  cursors.right.isDown = true;
  expect(player.velocity.x).to.be(90);
  cursors.right.isDown = false;

}
