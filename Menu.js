var main = function(){
	
	$('<div>').appendTo('#body').addClass('menu-btn');
	$('<p>').appendTo('.menu-btn').text("Menu");
	$('<div>').appendTo('#body').addClass('menu');
	$('<ul>').appendTo('.menu');
	$('<li>').appendTo('.menu ul').addClass('menu-close').text('Close');
	$('<li>').appendTo('.menu ul').addClass('link1');
	$('<a>').appendTo('.link1').attr("href","../home/index.html").text('Home');

	$('<li>').appendTo('.menu ul').addClass('link2');
	$('<a>').appendTo('.link2').attr("href","../activePoints/index.html").text('Points');

	$('<li>').appendTo('.menu ul').addClass('link3');
	$('<a>').appendTo('.link3').attr("href","../balance/index.html").text('Coin Balance');

	$('<li>').appendTo('.menu ul').addClass('link4');
	$('<a>').appendTo('.link4').attr("href","../smartbot/index.html").text('SmartBot');

	$('<li>').appendTo('.menu ul').addClass('link5');
	$('<a>').appendTo('.link5').attr("href","../rps/index.html").text('RPS');

	$('<li>').appendTo('.menu ul').addClass('link6');
	$('<a>').appendTo('.link6').attr("href","../snowflake/index.html").text('Snowflake');

	$('<li>').appendTo('.menu ul').addClass('link7');
	$('<a>').appendTo('.link7').attr("href","../cashier/index.html").text('Cashier');

	$('<li>').appendTo('.menu ul').addClass('link8');
	$('<a>').appendTo('.link8').attr("href","../timer/index.html").text('Timer');

	$('<li>').appendTo('.menu ul').addClass('link9');
	$('<a>').appendTo('.link9').attr("href","../game/index.html").text('Game');

	$('<li>').appendTo('.menu ul').addClass('link10');
	$('<a>').appendTo('.link10').attr("href","../water/index.html").text('Water');

	$('<li>').appendTo('.menu ul').addClass('link11');
	$('<a>').appendTo('.link11').attr("href","../circleBound/index.html").text('Cicle Bound');

	$('<li>').appendTo('.menu ul').addClass('link12');
	$('<a>').appendTo('.link12').attr("href","../cursor/index.html").text('Cursor');

	$('<li>').appendTo('.menu ul').addClass('link13');
	$('<a>').appendTo('.link13').attr("href","../drawing/index.html").text('Drawing');

	$('<li>').appendTo('.menu ul').addClass('link14');
	$('<a>').appendTo('.link14').attr("href","../osu/index.html").text('Osu Practice');

	$('<li>').appendTo('.menu ul').addClass('link15');
	$('<a>').appendTo('.link15').attr("href","../picture/index.html").text('Picture');

	$('<li>').appendTo('.menu ul').addClass('link16');
	$('<a>').appendTo('.link16').attr("href","../spotlight/index.html").text('Spotlight');

	$('<li>').appendTo('.menu ul').addClass('link17');
	$('<a>').appendTo('.link17').attr("href","../wordChanger/index.html").text('Word Changer');


	//$('<li>').appendTo('.menu ul').addClass('link____');
	//$('<a>').appendTo('.link____').attr("href","http://_______________").text('____');
	
	$('.menu-btn').click(function(){
		$('.menu').animate({
			left: "0px"
		}, 200);
		
		$('#container').animate({
			left: "150px"
		}, 200);
	});
	$('.menu-close').click(function(){
		$('.menu').animate({
			left: "-150px"
		}, 200);
		$('#container').animate({
			left: "0px"
		}, 200);
	});
};

$(document).ready(main);