

window.onload = function(){
	//----------Setting up canvas----------//
	var canvas = document.getElementById('canvasCursor');
	var ctx = canvas.getContext('2d');
	function drawBackground(){
		var W = window.innerWidth;
		var H = window.innerHeight;
		canvas.width = W;
		canvas.height = H;
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,W,H);	
	};
	drawBackground();
	window.addEventListener('resize',drawBackground);
	
	//----------Getting mouse position----------//
	var mousePosition;
	function mousePos(evt){
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		mousePosition = {
			x:mouseX,
			y:mouseY
		};
	};
	
	window.addEventListener('mousemove',function(evt){mousePos(evt)});
	
	//----------Creating points----------//
	var points = [];
	var maxPoints = 10;
	for (var i=0;i<maxPoints;i++){
		points.push({
			x:Math.floor(Math.random()*(201)-100),//max 100 min -100
			y:Math.floor(Math.random()*(201)-100),
			r:5,
		})
	}
	
	for (var i=0;i<maxPoints;i++){
		points[i] = ({
			x:points[i].x,
			y:points[i].y,
			r:5,
			destinationX:points[i].x,
			destinationY:points[i].y,
		})
	}
	
	function drawCircles(){
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		ctx.fillStyle = 'rgba(156,217,249,0.8)';
		ctx.beginPath();
		for(var i=0;i<maxPoints;i++){
			var p = points[i];
			var xFromMouse = mousePosition.x + p.x;
			var yFromMouse = mousePosition.y + p.y;
			ctx.moveTo(xFromMouse,yFromMouse);
			ctx.arc(xFromMouse,yFromMouse,p.r,0,Math.PI*2,true);
		}
		ctx.fill();
	};
	
	//setInterval(drawCircles,1000/30);

	
	//----------move points----------//
	
	var active = [];
	
	for (var i=0; i<maxPoints; i++){
		active[i] = false
	}
	
	function genDestination(){
		if(active[0] == true &&active[1] == true &&active[2] == true &&active[3] == true &&active[4] == true &&active[5] == true &&active[6] == true &&active[7] == true &&active[8] == true){
			return
		}
		else{
			var random;
			do{
				random = Math.floor(Math.random()*(maxPoints))
				
			} while (points[random].x != points[random].destinationX && points[random].y != points[random].destinationY);
			
			var p = points[random];
			var numBetweenX = Math.floor(Math.random()*(201)-100);
			var numBetweenY = Math.floor(Math.random()*(201)-100);
			p.destinationX = numBetweenX;
			p.destinationY = numBetweenY;
			active[random] = true;
			
		}
	}
	
	function movePoint(){
		for(var i=0;i<maxPoints;i++){
			var p = points[i];
				
				var xDistance = Math.abs(p.x-p.destinationX);
				var yDistance = Math.abs(p.y-p.destinationY);
				var totalDistance = Math.sqrt((xDistance*2)+(yDistance*2));
				var moveSpeed = 15;
				var proximity = 0.9;
			
				if(p.x < p.destinationX){
					p.x +=(xDistance/moveSpeed);
					
					if(p.x > (p.destinationX-proximity) && p.x < (p.destinationX+proximity)){ //if point close enough to destination, move point to destination
					p.x = p.destinationX;
					}
					
				}
				else if(p.x > p.destinationX){
					p.x -=(xDistance/moveSpeed);
					
					if(p.x> (p.destinationX-proximity) && p.x < (p.destinationX+proximity)){
					p.x = p.destinationX;
					}
					
				}
				
				if(p.y < p.destinationY){
					p.y +=(yDistance/moveSpeed);
					
					if(p.y> (p.destinationY-proximity) && p.y < (p.destinationY+proximity)){
						p.y = p.destinationY;
					}
				
				}
				else if(p.y > p.destinationY){
					p.y -=(yDistance/moveSpeed);
					
					if(p.y> (p.destinationY-proximity) && p.y < (p.destinationY+proximity)){
						p.y = p.destinationY;
					}
					
				}
				if(p.x == p.destinationX && p.y == p.destinationY){
					active[i] = false
				}
				
		}		
	};
	
	var delay = false
	function movePointDelay(){
		if(delay){
			return
		}
		else{
			delay = true
			setTimeout(movePoint,200)
			setTimeout(function(){delay = false},1000/40)
		}
	};
	
	var frequency = 500
	setInterval(genDestination,frequency);
	setInterval(genDestination,frequency);
	setInterval(genDestination,frequency);
	setInterval(genDestination,frequency);
	window.addEventListener('mousemove',movePointDelay);

	setInterval(movePoint,1000/40);
	
	//----------Finding and drawing lines----------//
	function findNearest(p,j){
		var xDistance = Math.abs(p.x-j.x);
		var yDistance = Math.abs(p.y-j.y);
		var totalDistance = Math.sqrt((xDistance*2)+(yDistance*2));
		return totalDistance
	};
	
	function createLines(p) {
       /* for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,0.5)';
            ctx.stroke();
        }*/
		
		for (var z =0; z<5; z++){
			ctx.beginPath();
			ctx.moveTo(p.x+mousePosition.x,p.y+mousePosition.y);
			ctx.lineTo(p.closest[z].x+mousePosition.x,p.closest[z].y+mousePosition.y);
			ctx.strokeStyle = 'rgba(156,217,249,0.3)';
			ctx.stroke();
			
		}
		
    }
	
	
	function drawLines(){
		for (var i=0;i<maxPoints;i++){
			var p = points[i];
			var closest= [];
				for(var j= 0; j<maxPoints;j++){
					var p2 = points[j];
					if(p!=p2){
						var placed = false
						for(var k =0; k<5;k++){
							if(!placed){
								if(closest[k]==undefined){
									closest[k] = p2;
									placed=true;
								}
							}
						}
						for(var k = 0; k < 5; k++) {
							if(!placed) {
								if(findNearest(p, p2) < findNearest(p, closest[k])) {
									closest[k] = p2;
									placed = true;
								}
							}
						}
					}
				}
			p.closest = closest;
			//console.log(p.closest[0].x);refrencing the first closest's x position
			createLines(p);
		}
		
		
	};
	
	//setInterval(drawLines,1000/30)
	
	function drawboth(){
		drawCircles();
		drawLines();
		
	};
	
	setInterval(drawboth,1000/30)
	
	
	/*function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
	
	for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
	function drawLines(p) {
        
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }
	setInterval(function(){drawLines(points[i])},1);*/
	
	
	
	
	
	
	
	
	
	
	
};
