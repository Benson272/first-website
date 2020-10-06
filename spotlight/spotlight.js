

window.onload = function(){

	var canvas = document.getElementById("canvas");
	var canvasCtx = canvas.getContext('2d');
	var canvasAnswer = document.getElementById("canvasAnswer");
	var canvasAnswerCtx = canvasAnswer.getContext('2d');
	
	//------------------------Draw the Black Screen------------------//
	function drawBlack (){
		var W = window.innerWidth;
		var H = window.innerHeight - 168;
		canvas.width = W;
		canvas.height = H;
		canvasCtx.fillStyle ="black";
		canvasCtx.fillRect(0,0,W,H);
	};
	
	
	//------------------------Draw the answer screen---------------//
	
	function drawAnswer (){
		var W = window.innerWidth;
		var H = window.innerHeight - 168;
		canvasAnswer.width = W;
		canvasAnswer.height = H;
		canvasAnswerCtx.fillStyle ="silver";
		canvasAnswerCtx.fillRect(0,0,W,H);
		canvasAnswerCtx.font = "20px Monospace"
		canvasAnswerCtx.fillStyle = "black";
		canvasAnswerCtx.fillText("0123",125,250);
	};
	
	function drawBoth(){
		drawBlack();
		drawAnswer();
	}
	
	drawBoth();
	window.addEventListener("resize",drawBoth);
	
	//-------------------------Toogle buttons-----------------------//
	/*var blackBtn = document.getElementById("blackBtn");
	var grayBtn = document.getElementById("grayBtn");
	
	function toggleBlack (){
		var b = document.getElementById('canvas');
		if(b.style.visibility === "visible"){
			b.style.visibility = "hidden";
			console.log("gone");
		}
		else{
			b.style.visibility = "visible";
			console.log("back");
		}
	}

	function toggleGray () {
		var g = document.getElementById('canvasAnswer');
		if(g.style.visibility === "visible"){
			g.style.visibility = "hidden";
			console.log("gone");
		}
		else{
			g.style.visibility = "visible";
			console.log("back");
		}
	}
	
	blackBtn.addEventListener ('click', toggleBlack);
	grayBtn.addEventListener ('click', toggleGray);*/
	
	//------------------------ getting mouse Pos----------------------//
	
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
	
	window.addEventListener('mousemove',function(evt){mousePos(evt)})
	
	//------------------------ Activate Black spotlight ----------------------------//
	
	
	function clearCircle(context,x,y,radius) {
		context.save();
		context.beginPath();
		context.arc(x, y, radius, 0, 2*Math.PI, true);
		context.clip();
		context.clearRect(x-radius,y-radius,radius*2,radius*2);
		context.restore();
	}
	
	function drawCircle (context,color,x,y,radius) {
		context.fillStyle = color;
		context.beginPath();
		context.arc(x,y,radius,0,2*Math.PI,true);
		context.fill();
	}
	
	function mouseHold (){
		var hold = setInterval(function(){drawBlack();clearCircle(canvasCtx,mousePosition.x,mousePosition.y,12)},10);
		window.hold = hold;
	}
	
	function mouseRelease (){
		clearInterval(hold);
		drawBlack();
	}
	
	window.addEventListener('mousedown', mouseHold);
	window.addEventListener('mouseup',mouseRelease);

	
	//-------------------------Activate Gray spotlight----------------------//
	
	function holdGray(){
		drawBlack();
		drawAnswer();
		clearCircle(canvasCtx,mousePosition.x,mousePosition.y,12);
		clearCircle(canvasAnswerCtx,mousePosition.x,mousePosition.y,12);
	}

	function mouseHoldGray(event) {
		var x = event.keyCode || event.which;
		if (x == 83) {
			holdGray();
		}
	}
	
	function mouseReleaseGray(event) {
		var x = event.keyCode || event.which;
		if (x == 83) {
			drawBlack();
			drawAnswer();
		}
	}
	
	window.addEventListener('keydown',function(){mouseHoldGray(event)})
	window.addEventListener('keyup',function(){mouseReleaseGray(event)})
	
	
	
	

	
	
	
	
	
};