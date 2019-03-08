package MarioTest
import org.scalatest._
import MarioFunctions._
class TestFlag extends FunSuite{
  test("Mario spawn will change to flag position"){
    val mario: Player = new Player(0, 90)
    val firstFlag: Flag = new Flag(40, 90)

    game.moveRight(mario)
    game.moveRight(mario)
    game.moveRight(mario)
    game.moveRight(mario)
    assert(game.overlapsFlag(mario, firstFlag))
    assert(mario.spawn == List(firstFlag.x, firstFlag.y))
  }
}
