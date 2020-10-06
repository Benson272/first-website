
window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var H = 800;
    var W = 800;
    canvas.width = W;
    canvas.height = H;
    var points=[];
    var maxPoints = 8;
    var radius = 1;
    var separation = 50;
    var color = "white";
    
    //Draw Background
    ctx.fillRect(0,0,W,H)
    
    
    //Create points of top side
    function createTop(){
        for(var i = 0; i<maxPoints;i++){
            points.push({
                x : separation*i + 100,
                y : 100,
                r : radius,
            })
            console.log(points[i]);
        }     
    }
    
    //Create points of right side
    function createRight(){
        for (var i=0;i<maxPoints;i++){
            points.push({
                x: separation*(maxPoints-1) + 100,
                y: separation*i + 100,
                r: radius,
            })
            console.log(points[(i+maxPoints)]); //use i + max points because i would just read the first set from the previous for statement
        }
    }
    
    
    //Create points of bottom side
    function createBottom(){
        for (var i=0;i<maxPoints;i++){
            points.push({
                x:(separation*(maxPoints-1))+100 - separation*i,
                y:separation*(maxPoints-1) + 100,
                r:radius, 
            })
            console.log(points[(i+2*maxPoints)]);
        }
    }
    
    
    //Create points of left side
    function createLeft(){
        for (var i= 0; i<maxPoints;i++){
            points.push({
                x: 100,
                y: (separation*(maxPoints-1))+100 - separation*i,
                r:radius,
            })
            console.log(points[i+3*maxPoints]);
        }
    }
    
    
    //Draw Points function
    function drawPoints(x,y,r,color,){
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2,true);
        ctx.fill();
    }
    
    //Draw all points
    function drawAllPoints(){
        for (var i=0;i<maxPoints*4;i++){
            var p = points[i];
            drawPoints(p.x,p.y,radius,color);
        }
    }

    
    
    //Function for drawing lines
    function drawLines(p1x,p1y,p2x,p2y,color){
        ctx.beginPath();
        ctx.moveTo(p1x,p1y);
        ctx.lineTo(p2x,p2y);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    
    //Draw all lines
    function drawAllLines(){
         for (var i=0;i<maxPoints*4;i++){
            var p = points[i];
            for(var j=0;j<maxPoints*4;j++){
                var e = points[j];
                drawLines(p.x,p.y,e.x,e.y,color);
            }
        }
    }

    //Draw everything
    function drawEverything (){
        createTop();
        createRight();
        createBottom();
        createLeft();
        drawAllPoints();
        drawAllLines();
    }
    drawEverything();
    
    //Clear canvas
    function clearCanvas(){
        ctx.clearRect(0,0,W,H);
        ctx.fillStyle="black";
        ctx.fillRect(0,0,W,H);
        points.length = 0;
    }
    
    
    //Changing max pints
    var minusPts = document.getElementById("minusPts");
    var plusPts = document.getElementById("plusPts");
    var numPts = document.getElementById("numPoints")
    
    function decreasePts (){
        if (maxPoints > 0){
           clearCanvas();
            maxPoints -=1;
            console.log(maxPoints)
            drawEverything();
            numPts.innerHTML = maxPoints; 
        }
        
    }
    
    function increasePts(){
        clearCanvas();
        maxPoints +=1;
        console.log(maxPoints)
        drawEverything();
        numPts.innerHTML = maxPoints;
    }
    
    minusPts.addEventListener("mousedown", decreasePts);
    plusPts.addEventListener("mousedown",increasePts);
    
    
    //Changing Separation
    var minusSeparation = document.getElementById("minusSeparation");
    var plusSeparation = document.getElementById("plusSeparation");
    var numSeparation = document.getElementById("numSeparation");
    
    function decreaseSeparation(){
        if(separation > 0){
            clearCanvas();
            separation -=10;
            console.log(separation)
            drawEverything();
            numSeparation.innerHTML = separation;
        }
        
    }
    
    function increaseSeparation(){
        clearCanvas();
        separation +=10;
        console.log(separation)
        drawEverything();
        numSeparation.innerHTML = separation;
    }
    
    minusSeparation.addEventListener("mousedown", decreaseSeparation);
    plusSeparation.addEventListener("mousedown", increaseSeparation)
    
    
    
    
    //--------------------------------------------------- 2nd canvas
    
    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext('2d');
    var p1=[];
    var p2=[];
    var p3=[];
    var p4=[];
    var maxPoints2 = 8;
    var separation2 = 50;
    var radius2 = 1;
    
    function drawBackground2(){
        ctx2.fillStyle="black"
        ctx2.fillRect(0,0,W,H);
    }
    
    function createTop2(){
        for(var i = 0; i<maxPoints2; i++){
            p1.push({
                x:W/2,
                y:H/2 - separation2*i,
                r:radius2,
            })
            console.log(p1[i]);
        }
    }
    
    function createRight2(){
        for(var i = 0; i<maxPoints2; i++){
            p2.push({
                x:W/2 + separation2*i,
                y:H/2,
                r:radius2,
            })
            console.log(p2[i]);
        }
    }
    
    function createBottom2(){
        for(var i = 0; i<maxPoints2; i++){
            p3.push({
                x:W/2,
                y:H/2 + separation2*i,
                r:radius2,
            })
            console.log(p3[i]);
        }
    }
    
    function createLeft2(){
        for(var i = 0; i<maxPoints2; i++){
            p4.push({
                x:W/2 - separation2*i,
                y:H/2,
                r:radius2,
            })
            console.log(p4[i]);
        }
    }
    
    function drawPoints2(x,y,r,color,){
        ctx2.fillStyle = color;
        ctx2.beginPath();
        ctx2.arc(x,y,r,0,Math.PI*2,true);
        ctx2.fill();
    }
    
    function drawAllPoints2(){
        for (var i=0;i<maxPoints2;i++){
            var p = p1[i];
            var q = p2[i];
            var r = p3[i];
            var s = p4[i];
            drawPoints2(p.x,p.y,p.r,color);
            drawPoints2(q.x,q.y,q.r,color);
            drawPoints2(r.x,r.y,r.r,color);
            drawPoints2(s.x,s.y,s.r,color);
        }
    }
    
    function drawLines2(p1x,p1y,p2x,p2y,color){
        ctx2.beginPath();
        ctx2.moveTo(p1x,p1y);
        ctx2.lineTo(p2x,p2y);
        ctx2.strokeStyle = color;
        ctx2.stroke();
    }
    
    
    function drawAllLines2(){
        for(var i=0; i<maxPoints2-1;i++){
            var p = p1[(maxPoints2-1-i)];
            var e = p2[(i+1)];
            drawLines2(p.x,p.y,e.x,e.y,color);
        }
        for(var i=0; i<maxPoints2-1;i++){
            var p = p2[(maxPoints2-1-i)];
            var e = p3[(i+1)];
            drawLines2(p.x,p.y,e.x,e.y,color);
        }
        for(var i=0; i<maxPoints2-1;i++){
            var p = p3[(maxPoints2-1-i)];
            var e = p4[(i+1)];
            drawLines2(p.x,p.y,e.x,e.y,color);
        }
        for(var i=0; i<maxPoints2-1;i++){
            var p = p4[(maxPoints2-1-i)];
            var e = p1[(i+1)];
            drawLines2(p.x,p.y,e.x,e.y,color);
        }
        
        ctx2.beginPath();
        ctx2.moveTo(W/2,H/2);
        ctx2.lineTo(W/2,H/2 - (maxPoints2-1)*separation2);
        ctx2.strokeStyle = color;
        ctx2.stroke();
        
        ctx2.beginPath();
        ctx2.moveTo(W/2,H/2);
        ctx2.lineTo(W/2,H/2 + (maxPoints2-1)*separation2);
        ctx2.strokeStyle = color;
        ctx2.stroke();
        
        ctx2.beginPath();
        ctx2.moveTo(W/2,H/2);
        ctx2.lineTo(W/2 - (maxPoints2-1)*separation2,H/2);
        ctx2.strokeStyle = color;
        ctx2.stroke();
        
        ctx2.beginPath();
        ctx2.moveTo(W/2,H/2);
        ctx2.lineTo(W/2 + (maxPoints2-1)*separation2,H/2);
        ctx2.strokeStyle = color;
        ctx2.stroke();
    }
    
    function clearCanvas2(){
        ctx2.clearRect(0,0,W,H);
        ctx2.fillStyle="black";
        ctx2.fillRect(0,0,W,H);
    }
    
    
    
    function drawEverything2 (){
        p1.length =0;
        p2.length =0;
        p3.length =0;
        p4.length =0;
        drawBackground2();
        createTop2();
        createRight2();
        createBottom2();
        createLeft2();
        drawAllPoints2();
        drawAllLines2();
    }
    drawEverything2();
    
    // Changing maxpoints2
    var minusPts2 = document.getElementById("minusPts2");
    var plusPts2  = document.getElementById("plusPts2");
    var numPts2 = document.getElementById("numPoints2");
    
    function decreasePts2 (){
        if(maxPoints2 > 0){
            clearCanvas2();
            maxPoints2 -= 1;
            drawEverything2();
            numPts2.innerHTML = maxPoints2;
        }
    }
    
    function increasePts2(){
        clearCanvas2();
        maxPoints2 += 1;
        drawEverything2();
        numPts2.innerHTML = maxPoints2;
    }
    
    minusPts2.addEventListener("mousedown", decreasePts2);
    plusPts2.addEventListener("mousedown", increasePts2);
    
    
    //Changing Separation
    var minusSeparation2 = document.getElementById("minusSeparation2");
    var plusSeparation2 = document.getElementById("plusSeparation2");
    var numSeparation2 = document.getElementById("numSeparation2");
    
    function decreaseSeparation2(){
        clearCanvas2();
        separation2 -= 10;
        drawEverything2();
        numSeparation2.innerHTML = separation2;
    }
    
    function increaseSeparation2(){
        clearCanvas2();
        separation2 += 10;
        drawEverything2();
        numSeparation2.innerHTML = separation2;
    }
    
    plusSeparation2.addEventListener("mousedown", increaseSeparation2);
    minusSeparation2.addEventListener("mousedown", decreaseSeparation2);
    
    
    
    
};