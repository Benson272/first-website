

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var circle = document.getElementById("circle");
    var startBtn = document.getElementById("start");
    var sizeBtn = document.getElementById("changeSize");
    var speedBtn = document.getElementById("changeSpeed");
    var testBtn = document.getElementById("test");
    
    var score = 0;
    var circleSize = 90; // diameter of circle
    var circleSpeed = 1000; // time until circle location changes in ms
    var W = window.innerWidth;
    var H = window.innerHeight;
    var x = 0;
    var y = 150;
    var time = 0;
    var FPS = 10; // the bigger the FPS the choppier
    var active = false;
    
    function makeBackground(){
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        ctx.fillStyle = "rgba(200,200,200,1)";
        ctx.fillRect(0,0,W,H);
    };
    
    makeBackground();
    window.addEventListener("resize", makeBackground);
    
    function changeSize(){ // changes the size of the circle
        circleSize = prompt("What do you want the diameter of the circle to be. Default is 90 pixel");
        if(isNaN(circleSize)){
            alert("not a valid response (numbers only)");
            changeSize();
        }
        console.log(circleSize);
        redrawCircle();
    }
    
    function changeSpeed(){ // changes the time it takes to move circle
        circleSpeed = prompt("How much time do you want to click the circle before it moves. Default is 1000 millisecond (1000 milliseconds = 1 second)");
        if(isNaN(circleSpeed)){
            alert("not a valid response (numbers only)");
            changeSpeed();
        }
        redrawCircle();
    }
    
    function startGame(){
        if(active){
           return;
        }
        setInterval(increaseTimer, FPS); // the bigger the FPS the choppier
        setInterval(drawRings, FPS);
    };
    
    function redrawCircle(){
        x = 0;
        y = 150;
        circle.style.top = y+"px";
        circle.style.left = x+"px";
        circle.style.width = circleSize+"px";
        circle.style.height = circleSize+"px";
        time=0;
    };
    
    
    
    function moveCircle(){
        x = Math.floor((Math.random()*((W-1.5*circleSize)-30))+circleSize/2); // sets x value of middle of circle
        y = Math.floor((Math.random()*((H-1.5*circleSize)-30))+circleSize/2); // sets y value of middle of circle
        circle.style.top = y+"px";
        circle.style.left = x+"px";
        console.log("x: " + x);
        console.log("y: " + y);
    };
    
    function drawCircle(xPos,yPos,radius){
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(255,0,0,0.5)";
        ctx.arc(xPos,yPos,radius,0,360);  
        ctx.stroke();
        
    }
    
    function drawRings(){
        ctx.fillStyle ="rgba(200,200,200,1)";
        ctx.fillRect(0,0,W,H);
        drawCircle(x+circleSize/2+5,y+circleSize/2+5,(circleSize*1.5)-(time/circleSpeed)*circleSize);//time/circle speed is the multiplier for circle size
        console.log(time/circleSpeed);
    }
    
    function increaseTimer(){
        time += FPS; // the bigger the FPS the choppier
        if(time == circleSpeed){
            moveCircle();
            time = 0;
        };
        active = true;
    };
    
    
    
    startBtn.addEventListener("click",startGame);
    sizeBtn.addEventListener("click",changeSize);
    speedBtn.addEventListener("click",changeSpeed);
    
    function clickCircle(){
        
    };
    
    
    
    
    function testFunction(){
        moveCircle();
    }
    testBtn.addEventListener("click", testFunction);
    
};