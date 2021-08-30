

var myAtoms = []


//heat map will be a cartesian array of values..
var heatMap = []
var horizDelta = []
var vertDelta = []

var margin = 50
var gridSize = 40
var stepSize 


var pulling = false

var outerCircleX = 0
var outerCircleY = 0
var circleShiftX
var circleShiftY




function setup() {
	createCanvas(600, 600)

	stepSize = (width-(2*margin))/gridSize


	//make coordinates for each cell
	for(i=0;i<gridSize;i++){
		heatMap[i]=[]
		for(j=0;j<gridSize;j++){
			heatMap[i][j]=50
		}
	}

	for(i=0;i<gridSize;i++){
		horizDelta[i]=[]
		for(j=0;j<gridSize-1;j++){
			horizDelta[i][j]=0
		}
	}

	for(i=0;i<gridSize-1;i++){
		vertDelta[i]=[]
		for(j=0;j<gridSize;j++){
			vertDelta[i][j]=0
		}
	}


	for(i=0;i<gridSize;i++){
		for(j=0;j<gridSize;j++){
			myAtoms.push(new MakeAtom(i,j))
		}
	}


	
}

//var temperature
//damp determines how "sticky" the dots are to their gridpoints // how FAST the jiggling is...
//prev:.3
var damp = .2

//good range, .005-.8ish, how fast hotspots DIFFUSE
//prev:.03
var spread = .15

function draw() {
	background(0)


		//set horizontal deltas...
	for(i=0;i<gridSize;i++){
		for(j=0;j<gridSize-1;j++){
			horizDelta[i][j]=(heatMap[i][j]-heatMap[i][j+1])*spread
		}
	}
	//set vertical deltas...
	for(i=0;i<gridSize-1;i++){
		for(j=0;j<gridSize;j++){
			vertDelta[i][j]=(heatMap[i][j]-heatMap[i+1][j])*spread
		}
	}


	//update heat map
	for(i=1;i<gridSize-2;i++){
		for(j=1;j<gridSize-2;j++){
			heatMap[i][j]=heatMap[i][j]+horizDelta[i][j-1]+vertDelta[i-1][j]-vertDelta[i][j]-horizDelta[i][j]
		}
	}


	if(heatingElement&&(myCoordinateX>0&&myCoordinateX<gridSize-2)&&(myCoordinateY>0&&myCoordinateY<gridSize-2)){


		//absolute
		
		heatMap[myCoordinateX][myCoordinateY] = 800


		//heatMap[myCoordinateX][myCoordinateY] = (heatMap[myCoordinateX][myCoordinateY])*.7*abs(mouseX-pmouseX)

		//heatMap[myCoordinateX-1][myCoordinateY] = (heatMap[myCoordinateX-1][myCoordinateY])+4
		//heatMap[myCoordinateX+1][myCoordinateY] = (heatMap[myCoordinateX+1][myCoordinateY])+4
		//heatMap[myCoordinateX][myCoordinateY-1] = (heatMap[myCoordinateX][myCoordinateY-1])+4
		//heatMap[myCoordinateX][myCoordinateY+1] = (heatMap[myCoordinateX][myCoordinateY+1])+4

		//heatMap[myCoordinateX-1][myCoordinateY-1] = (heatMap[myCoordinateX-1][myCoordinateY-1])+2
		//heatMap[myCoordinateX-1][myCoordinateY+1] = (heatMap[myCoordinateX-1][myCoordinateY+1])+2
		//heatMap[myCoordinateX+1][myCoordinateY-1] = (heatMap[myCoordinateX+1][myCoordinateY-1])+2
		//heatMap[myCoordinateX+1][myCoordinateY+1] = (heatMap[myCoordinateX+1][myCoordinateY+1])+2

	}



	for(i=0;i<myAtoms.length;i++){
		myAtoms[i].update()
		myAtoms[i].display()
	}


	//connect atoms with lines...
	strokeWeight(.5)
	for(i=0;i<myAtoms.length-1;i++){
		stroke(255)
		if(i%gridSize!=(gridSize-1)){
			line(myAtoms[i].x+myAtoms[i].deltaX, myAtoms[i].y+myAtoms[i].deltaY, myAtoms[i+1].x+myAtoms[i+1].deltaX, myAtoms[i+1].y+myAtoms[i+1].deltaY)
			if(i<myAtoms.length-gridSize){
				line(myAtoms[i].x+myAtoms[i].deltaX, myAtoms[i].y+myAtoms[i].deltaY, myAtoms[i+gridSize].x+myAtoms[i+gridSize].deltaX, myAtoms[i+gridSize].y+myAtoms[i+gridSize].deltaY)
			}
		}
	}

/*

	//dispaly heatmap grid
	for(i=0;i<gridSize;i++){
		for(j=0;j<gridSize;j++){
			fill(heatMap[i][j])
			//rect(margin+stepSize*i,margin+stepSize*j,.9*stepSize,.9*stepSize)
		}

	}

*/
	//display trailing circles for "pull" functionality
	//noFill()
	//stroke(0,0,255)
	//ellipse(mouseX,mouseY,50,50)
	if(dist(mouseX,mouseY,outerCircleX,outerCircleY)>50){
		circleShiftX = mouseX-outerCircleX
		circleShiftY = mouseY-outerCircleY

		outerCircleX += circleShiftX/10
		outerCircleY += circleShiftY/10
	}
	//ellipse(outerCircleX,outerCircleY,150,150)

	

}


var myCoordinateX = 0
var myCoordinateY = 0
var heatingElement = false

function touchStarted() {
	heatingElement = true

	myCoordinateX = floor(map(mouseX,margin,width-margin,0,gridSize))
	myCoordinateY = floor(map(mouseY,margin,height-margin,0,gridSize))


	pulling = true

	outerCircleX = mouseX
	outerCircleY = mouseY
	

}

function touchMoved() {

	myCoordinateX = floor(map(mouseX,margin,width-margin,0,gridSize))
	myCoordinateY = floor(map(mouseY,margin,height-margin,0,gridSize))

	return false
}

function touchEnded() {
	heatingElement = false
	pulling = false
	for(i=0;i<myAtoms.length;i++){
		myAtoms[i].beingPulled = false
	}

}