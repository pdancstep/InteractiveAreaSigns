function MakeAtom(xCoord,yCoord) {
  this.x = margin+stepSize*xCoord+stepSize/2
  this.y = margin+stepSize*yCoord+stepSize/2

  this.temperature = map(heatMap[xCoord][yCoord],50,300,0,5)


  this.deltaX = random(-1,1)
  this.deltaY = random(-1,1)

  this.vx = random(-1,1)
  this.vy = random(-1,1)



  this.beingPulled = false

  this.pullX
  this.pullY
  this.proximity



  this.update = function(){

      if(pulling){
        this.proximity = dist(this.x,this.y, outerCircleX, outerCircleY)/40
        if(this.proximity<1){
          this.beingPulled = true
        }else{
          this.beingPulled = false
        }
      } 

      if(this.beingPulled){
        this.deltaX = (mouseX-this.x)*(this.proximity*this.proximity*this.proximity*this.proximity)
        this.deltaY = (mouseY-this.y)*(this.proximity*this.proximity*this.proximity*this.proximity)
      }else{
        this.temperature = map(heatMap[xCoord][yCoord],50,300,.2,10)

        this.vx = random(-this.temperature,this.temperature)-this.deltaX*damp
        this.vy = random(-this.temperature,this.temperature)-this.deltaY*damp

        this.deltaX += this.vx
        this.deltaY += this.vy
      }   

  }

  this.display = function(){
    noStroke()
    fill(255)
    ellipse(this.x+this.deltaX,this.y+this.deltaY,5,5)
  }

}

