package MarioFunctions

import javafx.event.{ActionEvent, EventHandler}
import javafx.scene.input.KeyCode
object game{
  val spawn: List[Int] = List(0, 90)
  val plant: Enemy = new Enemy(10, 90)
/*
  def main(args: Array[String]): Unit = {
    while(gameState){
      update(a: Player)
  }
*/
  def moveRight(initial: Player): Unit = {
      initial.xPos += 10
  }

  def overlapsEnemy(a: Player, b: Enemy): Boolean = {
    val bool: Boolean = a.xPos == b.xPos & a.yPos == b.yPos
    respawn(a)
    bool
  }
  def overlapsFlag(a: Player, b: Flag): Boolean = {
    val x: Boolean = a.xPos == b.x & a.yPos == b.y
    setCheckPoint(a, b)
    x
  }
  def overlapBoundary(a: Player): Boolean = {
    val bound: Boolean = a.yPos >= 100
    respawn(a)
    bound
  }

  def respawn(a: Player): Unit = { //sends player back to spawn
    a.xPos = spawn.head
    a.yPos = spawn(1)
  }
  def setCheckPoint(a: Player, b: Flag){
    a.spawn = List(b.x, b.y)
  }
  def fall(a: Player): Unit ={
    a.yPos += 10

  }

  /*
  def keyPressed(keyCode: KeyCode): Unit = {
    keyCode.getName match {
      case "W" => mario.yPos -= 10
      case "A" => mario.xPos -= 10
      case "S" => mario.xPos += 10
      case "D" => mario.xPos += 10
    }
  }
  */



}