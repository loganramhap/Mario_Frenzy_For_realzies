package MarioTest
import org.scalatest._
import MarioFunctions._
class TestFall extends FunSuite {
  test("mario will return to spawn"){
    val firstFlag: Flag = new Flag(40, 90)
    val mario: Player = new Player(0, 90)
    game.setCheckPoint(mario, firstFlag)
    game.fall(mario)
    assert(game.overlapBoundary(mario))
    assert(mario.spawn == List(firstFlag.x, firstFlag.y))
  }
}
