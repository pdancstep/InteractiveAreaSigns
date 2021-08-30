function setup() {
  createCanvas(1000,1300)
  myBall1 = new MakeBall(100,100)
  myBall2 = new MakeBall(100,200)
  myBall3 = new MakeBall(200,100)
  myBall4 = new MakeBall(200,200)

}


tracerLength = 40

function draw() {
	background(0)


  myBall1.update()
  myBall2.update()
  myBall3.update()
  myBall4.update()


  myBall1.display()
  myBall2.display()
  myBall3.display()
  myBall4.display()



}


function touchStarted(){
  myBall1.overMe()
  myBall2.overMe()
  myBall3.overMe()
  myBall4.overMe()

}

function touchMoved(){
  return false
}

function touchEnded(){
  myBall1.dragging = false
  myBall2.dragging = false
  myBall3.dragging = false
  myBall4.dragging = false
}
