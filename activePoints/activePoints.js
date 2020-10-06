window.addEventListener('load', main);

function main(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var maxPoints = 250;
    var canvasBackground = "rgb(0,0,0)";
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var pointColor = "rgba(20,150,250,0.8)";
    var points = [];
    var lineColor = "rgba(200,200,250,";
    var radius = 6;  
    var maxSpeed = 5;
    var maxDistanceLimit = 100;

    //draws all points
    for(var i = 0; i < maxPoints; i++){
        points.push({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            dx: (((Math.random() * maxSpeed)) +1) *((Math.random() < 0.5) ? 0.1 : -0.1),
            dy: (((Math.random() * maxSpeed)) +1) *((Math.random() < 0.5) ? 0.1 : -0.1),
        }); 
    }
    
    function distanceTo(x1,y1,x2,y2){
        return Math.sqrt( (x1-x2)**2 + (y1-y2)**2 );
    }
    function drawAllLines(){
        
        for(var i = 0; i<points.length; i++){
            var currentPoint = points[i];
            var nearestPoints = [];
            for(var j = 0; j<points.length; j++){
                var newPoint = points[j];
                var distance = distanceTo(currentPoint.x, currentPoint.y, newPoint.x,                        newPoint.y);
                //skip this point if it is too far
                if(distance > maxDistanceLimit){
                   continue;
                }
                //set opacity of line
                var opacity = 1;
                if(distance > maxDistanceLimit -5){
                   opacity = 0.05;
                }
                else if(distance > maxDistanceLimit - 10){
                    opacity = 0.1;
                }
                else if(distance > maxDistanceLimit - 15){
                    opacity = 0.15;
                }
                else if(distance > maxDistanceLimit - 20){
                    opacity = 0.2;
                }
                else if(distance > maxDistanceLimit - 30){
                    opacity = 0.25;
                }
                else if(distance > maxDistanceLimit - 35){
                    opacity = 0.3;
                }
                else if(distance > maxDistanceLimit - 40){
                    opacity = 0.35;
                }
                else{
                    opacity = 0.4;
                }
                nearestPoints.push({
                    distance: distance,
                    index: j,
                    opacity: opacity,
                });
            }
            nearestPoints.sort(compare);
            nearestPoints = nearestPoints.slice(0,4);
            //draws the three nearest line
            for(var k =0; k < nearestPoints.length; k++){
                drawLine(currentPoint.x, currentPoint.y, points[nearestPoints[k].index].x,              points[nearestPoints[k].index].y, nearestPoints[k].opacity);
            }
        }
    }
    
    function compare(a,b){
        if(a.distance < b.distance){
           return -1;
        }
        if(a.distance > b.distance){
            return 1;
        }
        return 0;
    }
    
    function drawLine(x1,y1,x2,y2,opacity){
        ctx.strokeStyle =  lineColor + opacity + ")";
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();  
    }
    
    function moveAllPoint(){
        for(var i = 0; i < points.length; i++){
            //moves the points
            points[i].x += points[i].dx;
            points[i].y += points[i].dy;
            //handles when point leaves canvas
            if(points[i].x > canvasWidth){
               points[i].x = 0;
            }
            if(points[i].y > canvasHeight){
               points[i].y = 0;
            }
            if(points[i].x < 0){
               points[i].x = canvasWidth;
            }
            if(points[i].y < 0){
               points[i].y = canvasHeight;
            }
        }
        drawAllPoints();
        drawAllLines();
    }
    function drawBackground(){
        ctx.fillStyle=canvasBackground;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }
    function drawAllPoints(){  
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        drawBackground();
        ctx.fillStyle=pointColor;
        ctx.beginPath();
        for(var i=0; i< points.length; i++){
            var currentPoint = points[i];
            ctx.moveTo(currentPoint.x, currentPoint.y);
            ctx.arc(currentPoint.x, currentPoint.y, radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
    }
    function resizeCanvas(){
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    }
    
    
    //initialize size of canvas
    resizeCanvas();
    //draws all the points
    drawAllPoints();
    //resizes canvas on window resize
    window.addEventListener('resize', resizeCanvas);
    var moveInterval = setInterval(moveAllPoint, 1000/30);
}

