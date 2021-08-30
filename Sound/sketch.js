

function setup() {
  createCanvas(1200,600)
}
var rad
var theta
var phase = 0
//gaussian "envelope" for ripple
var damp
//coord for middle of ripple
var rippleCenterX
var rippleCenterY
//start time for compression wave
var clickTime = 0
//boolean for updating travelling wave
var rippling = false
//time elapsed since ripple started
var elapsedTime = 0

//one entry for each touch event...
var ripples = []
//Contains [rippleCenterX,rippleCenterY,clickTime]

function draw() {
	background(0)
	noStroke()
	fill(255)

	for(i=0;i<ripples.length;i++){
		if((millis()-ripples[i][2])>5000){
			ripples.splice(i,1)
		}
	}


	for(i=0;i<110;i++){
		for(j=0;j<50;j++){

			deltaX = 0
			deltaY = 0

			for(k=0;k<ripples.length;k++){
				elapsedTime = (millis()-ripples[k][2])/4
				rad = dist(40+i*10,40+j*10,ripples[k][0],ripples[k][1])
				damp = exp(-(.0001*(rad-elapsedTime)*(rad-elapsedTime)))
				deltaX += damp*10*sin((rad/17)+phase)
				deltaY += damp*10*sin((rad/17)+phase)	
			}
			ellipse(deltaX+40+i*10,deltaY+40+j*10,5,5)
		}
	}
	phase -= .2

	//text(ripples,100,100)
}
function touchStarted(){
	ripples.push([mouseX,mouseY,millis()])
}
function touchMoved() {
	return false
}