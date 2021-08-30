function MakeBall(xPos,yPos) {
  this.x = xPos;
  this.y = yPos;

  this.dragging = false

  this.tracer = []
  this.transparency
  

  this.avgX
  this.avgY




//clean up these conditions (the -25 is because the slider track starts at zero, but the thumb sticks out into -25)
  this.overMe = function() {
    if(mouseX > (this.x-25) && mouseX < (this.x+25) && mouseY > (this.y-25) && mouseY <(this.y+25)){
      this.dragging = true
    }
  }


  this.update = function() {
    
    if(this.dragging){
      this.x = mouseX
      this.y = mouseY
    }

    if(this.tracer.length<tracerLength){
      this.tracer.push([this.x,this.y])
    }else{
      this.tracer.splice(0,1)
      this.tracer.push([this.x,this.y])
    }

  }


  this.display = function() {
  strokeWeight(2)

  for(i=0;i<(this.tracer.length-3);i++){
    this.transparency = map(i,0,tracerLength-3,0,255)
    noFill()
    stroke(255,this.transparency)
    
    this.avgX = (this.tracer[i][0]+this.tracer[i+1][0]+this.tracer[i+2][0])/3
    this.avgY = (this.tracer[i][1]+this.tracer[i+1][1]+this.tracer[i+2][1])/3

    ellipse(this.avgX,this.avgY,50,50)
  }

    fill(0)
    ellipse(this.x,this.y,50,50)
  }


}