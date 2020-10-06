

window.onload = function(){
	//----------Set up clock----------//
	var clock = document.getElementById('clock');
	var clockSecond = document.getElementById('clockSeconds');
	
	
	var getFullTime = function(){
		var date= new Date;
		var time;
		var hour = date.getHours();
		var minute  = date.getMinutes();
		if(minute < 10){
			minute = "0" + minute
		}
		time = hour + ":" + minute
		var second = date.getSeconds();
		if(second <10){
			second = "0" + second
		}
		if(hour > 12){
			hour = hour -12;
			clock.innerHTML = hour + " : " + minute
			clockSecond.innerHTML=second;
			var PM = document.getElementById('pmText');
			PM.style.color="white";
			PM.style.opacity="1";
			PM.style.textShadow = "2px 2px #003d99"
		}
		else{
			clock.innerHTML = hour + " : " + minute
			clockSecond.innerHTML=second;
			var AM = document.getElementById('amText');
			AM.style.color="white";
			AM.style.opacity="1";
			AM.style.textShadow = "2px 2px #003d99"

		}
		
		
	};
	
	var setTime = function(){
		getFullTime();
		setTimeout (setTime,1000)
	};
	setTime();
	//----------set up background----------//
	var canvas = document.getElementById('canvasSnow');
	var ctx = canvas.getContext('2d')
//	var canvasBackground = document.getElementById('background');
//	var canvasContext = canvasBackground.getContext('2d');
	
	var makeBackground = function(){
		var Wid = window.innerWidth;
		var Hei = window.innerHeight;
//		canvasBackground.width = Wid;
//		canvasBackground.height = Hei;
		canvas.width = Wid;
		canvas.height = Hei;
//		canvasContext.fillStyle = 'black';
//		canvasContext.fillRect(0,0,Wid,Hei);
		currentSnow = 0;
		
	};
	makeBackground();
	window.addEventListener('resize',makeBackground);
	
	//----------snowflakes----------//
	
	var maxParticle = 100;
	var particles = [];
	for(var i = 0; i < maxParticle; i++){
		console.log("snowCreated");
		particles.push({
			x:Math.random() * window.innerWidth,
			y:Math.random() * window.innerHeight,
			r:Math.random()*4+1,
			d:Math.random()*maxParticle,
		})
	}
	
	var drawSnow = function(){
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		ctx.fillStyle="rgba(255,255,255,0.9)";
		ctx.beginPath();
			for(var i = 0; i<maxParticle; i++){
				var p = particles[i];
				ctx.moveTo(p.x, p.y);
				ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
			}
		ctx.fill();
		move();
	};
	
	var angle = 0
	var move = function(){
		angle +=0.01
		for(var i=0; i<maxParticle;i++){
			var p = particles[i];
			p.y += (p.r /1.5) + 0.01*p.d ;
			p.x += Math.sin(angle) * 2
		
			if(p.y >= window.innerHeight){
				particles[i] = {
					x:Math.random() * window.innerWidth,
					y:0,
					r:p.r,
					d:p.d,
				}
			}
			else if(p.x >= window.innerWidth){
				particles[i]={
					x:0,
					y:p.y,
					r:p.r,
					d:p.d,
				}
			}
			else if (p.x <= 0){
				particles[i]={
					x:window.innerWidth,
					y:p.y,
					r:p.r,
					d:p.d,
				}
			}
		}
	};
	
	
	//setInterval(drawSnow,33)

	
	//----------Fast-falling snow----------//
	var maxFastParticle = 100;
	var fastParticle = [];
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;
	window.addEventListener('resize',function(){screenWidth = window.innerWidth; screenHeight = window.innerHeight})
	for(var i = 0; i < maxFastParticle; i++){
		fastParticle.push({
			x:Math.random() * ((screenWidth/2 + 200)-(screenWidth/2 - 200)+1)+(screenWidth/2 - 200),
			y:0,
			r:Math.random() * 2,
			d: Math.random() * maxFastParticle,
		})
	}
	
	var drawFastParticle = function(){
		ctx.fillStyle="white";
		ctx.beginPath();
		for(var i =0; i < maxFastParticle; i++){
			var fp = fastParticle[i];
			ctx.moveTo(fp.x, fp.y);
			ctx.arc(fp.x,fp.y,fp.r,0,Math.PI*2,true);
		}
		ctx.fill();
		moveFP();
	};
	
	
	FPangle= 0
	var moveFP = function(){
		FPangle+=0.01
		for(var i =0; i < maxFastParticle; i++){
			var fp = fastParticle[i]
			fp.x +=Math.sin(FPangle)*fp.d/75;
			fp.y+= fp.r *1.5 + fp.d/5;
				if(fp.y > screenHeight){
					fastParticle[i]={
					x:Math.random() * ((screenWidth/2 + 200)-(screenWidth/2 - 200)+1)+(screenWidth/2 - 200),
					y:0,
					r:fp.r,
					d:fp.d,
					}
				}
		}
		
	};
	
	//setInterval(drawFastParticle, 33)
	
	//----------Font shadow----------//
	var word = document.getElementById('clock');
	var wordS = document.getElementById('clockSeconds');
	word.style.textShadow = "2px 2px #003d99"
	wordS.style.textShadow = "2px 2px #003d99"
	
	//----------draw both----------//
	var drawBoth = function(){
		
		drawSnow();
		drawFastParticle();
	};
	
	setInterval (drawBoth, 50)
};










