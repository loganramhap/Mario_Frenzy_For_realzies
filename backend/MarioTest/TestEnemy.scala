package MarioTest
import org.scalatest._
import MarioFunctions._
class TestEnemy extends FunSuite{
  test("Mario will be sent back to spawn"){
    val mario: Player = new Player(0, 90)
    val plant: Enemy = new Enemy(30, 90)
    game.moveRight(mario)
    game.moveRight(mario)
    game.moveRight(mario)

    assert(game.overlapsEnemy(mario, plant))
    assert(mario.spawn == List(0, 90))
  }
}
