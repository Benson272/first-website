window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var W = 1000;
    var H = W*0.8;
    var centerX = W/2;
    var centerY = H/2;
    var radius = 200;
    var balls=[];
    var maxBall = 1;
    
    drawEverything();
    function drawEverything(){
        drawBackground();
        drawBound();
        createBalls();
        drawBalls();
    }
    
    //TRY WITH WHOLE NUMBER VELOCITY
    
    function drawBackground(){
        canvas.width = W;
        canvas.height = H;
        ctx.fillStyle="black";
        ctx.fillRect(0,0,W,H);
    }
    function circle(x,y,r,color,outline){
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2,true);
        ctx.fillStyle=color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle=outline;
        ctx.stroke();
    }
    function drawBound(){
        circle(centerX,centerY,200,"black","white");
    }
    
    function createBalls(){
        for(var i=0;i<maxBall;i++){
            balls.push({
            x:centerX+(Math.random() < 0.5 ? 1 : -1)* ((Math.random()*(radius/2))),
            y:centerY+(Math.random() < 0.5 ? 1 : -1)* ((Math.random()*(radius/2))),
            dx:(Math.random() < 0.5 ? 1 : -1) * ((Math.random()*3)+1),
            dy:(Math.random() < 0.5 ? 1 : -1) * ((Math.random()*3)+1),
            //r:Math.floor(Math.random()*3)+3,
            r:5,
            })
        }
        
    }
    function drawBalls(){
        for(var i=0;i<balls.length;i++){
            circle(balls[i].x,balls[i].y,balls[i].r,"white","white");
        }
    }
    
    function distance(x1,y1,x2,y2){
        var distance = Math.sqrt( ((y2-y1)**2) + ((x2-x1)**2) );
        return distance;
    }
    
    function moveBalls(){
        for(var i=0;i<balls.length;i++){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            drawBound();
            drawBalls();
            balls[i].x += balls[i].dx;
            balls[i].y += balls[i].dy;

            var distanceX = balls[i].x - centerX;
            var distanceY = balls[i].y - centerY;
            
            if(Math.sqrt(distanceX * distanceX + distanceY * distanceY) >= (radius - balls[i].r) ){
                
               var velocity = Math.sqrt(balls[i].dx * balls[i].dx + balls[i].dy * balls[i].dy);
                var angleCollision = Math.atan2(-distanceY, distanceX);
                var oldAngle = Math.atan2(-balls[i].dy, balls[i].dx);
                var newAngle = 2 * angleCollision - oldAngle;
                balls[i].dx = (-1 * velocity) * (Math.cos(newAngle));
                balls[i].dy = (velocity) * (Math.sin(newAngle));
                
            }
        }
    }
    setInterval(moveBalls,1000/60);
}





