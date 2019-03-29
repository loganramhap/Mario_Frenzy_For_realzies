package whiplash.phaser;

import ash.tools.ListIteratingSystem;
import ash.core.Engine;
import ash.core.Node;
import phaser.Game;

class TilemapLayerNode extends Node<TilemapLayerNode> {
    public var tilemapLayer:TilemapLayer;
}

class TilemapLayerSystem extends ListIteratingSystem<TilemapLayerNode> {
    private var game:Game;

    public function new(game) {
        super(TilemapLayerNode, updateNode, onNodeAdded, onNodeRemoved);
        this.game = game;
    }

    private function updateNode(node:TilemapLayerNode, dt:Float):Void {
    }

    private function onNodeAdded(node:TilemapLayerNode) {
        node.tilemapLayer.revive();
    }

    private function onNodeRemoved(node:TilemapLayerNode) {
        node.tilemapLayer.kill();
    }
}
