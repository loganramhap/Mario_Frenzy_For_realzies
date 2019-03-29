package game;

import js.Lib;
import js.jquery.*;
import js.Browser.document;
import js.Browser.window;
import phaser.Game;
import phaser.Phaser;
import ash.core.Entity;
import ash.core.Engine;
import ash.core.Node;
import whiplash.*;
import whiplash.math.*;
import whiplash.phaser.*;
import whiplash.common.components.Active;

class Game {
    var engine:ash.core.Engine;

    public function new() {
        new JQuery(window).on("load", function() {
            whiplash.Lib.init(320, 240, ".root", {preload:preload, create:create, update:update, render:render});
            engine = whiplash.Lib.ashEngine;
        });
    }

    function preload():Void {
        AudioManager.preload(whiplash.Lib.phaserGame);
        Factory.preload(whiplash.Lib.phaserGame);
    }

    function create():Void {
        var game = whiplash.Lib.phaserGame;
        game.stage.smoothed = false;
        game.stage.disableVisibilityChange = true;
        AudioManager.init(game);
        Factory.init(game);
        whiplash.Input.setup(document.querySelector(".hud"));
        game.world.setBounds(0, 0, 760, 14*15 - 3);
        game.physics.startSystem(phaser.Physics.ARCADE);
        game.time.desiredFps = 60;
        game.physics.arcade.gravity.y = 800;

        var e = Factory.createSky();
        engine.addEntity(e);
        var e = Factory.createLevel();
        engine.addEntity(e);
        var e = Factory.createPlayer();
        engine.addEntity(e);

        var es = Factory.createBlocks(untyped $global.window.message || "debugging\n[session]");
        for(e in es) {
            engine.addEntity(e);
        }

        engine.addSystem(new QuestionSystem(), 1);
        engine.addSystem(new ShakeSystem(), 1);
        engine.addSystem(new ControlSystem(), 2);

        AudioManager.playMusic("overworld");

        untyped $global.resizeCanvas();
    }


    function update():Void {
        var dt = whiplash.Lib.getDeltaTime() / 1000;
        engine.update(dt);
    }

    function render():Void {
        engine.getSystem(ControlSystem).render();
    }

    static function main():Void {
        new Game();
    }
}
