
(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	
	var playersSlider = document.getElementById('playersRange');
	var secondsSlider = document.getElementById('secondsRange');
	
	//var feelsSlider = document.getElementById('feelsRange');
	//var scaleSlider = document.getElementById('scaleRange');
	//var pointingSlider = document.getElementById('pointingRange');
	
	var larpSlider = document.getElementById('larpRange');
	var operationalitySlider = document.getElementById('operationalityRange');
	
	// Update UI when sliders are touched
	playersSlider.oninput = function() { redraw(); };
	secondsSlider.oninput = function() { redraw(); };
	//feelsSlider.oninput = function() { redraw(); };
	//scaleSlider.oninput = function() { redraw(); };
	//pointingSlider.oninput = function() { redraw(); };
	larpSlider.oninput = function() { redraw(); };
	operationalitySlider.oninput = function() { redraw(); };
	
	redraw();
	
	// Inner function... redraw the UI
	function redraw() {
		
		// Get updated values
		
		// The population of earth is about 100^4.95 but this isn't a flat enough curve
		
		// Dividing the % first gives lower values - obviously a flatter beginning
		
		var players = -1 + Math.ceil(playersSlider.value) + Math.ceil(Math.pow(playersSlider.value / 10,9.871));
		
		var seconds = sigFigs(Math.floor(Math.pow(secondsSlider.value,4.675)),1);
		console.log("seconds = " + seconds);		
		
		// use the prettyMs library to build an array that looks like ["8", "hours", "20", "minutes"]
		var prettyDurationArray = (prettyMs(seconds * 1000, {verbose: true})).split(' ');

		// Take only the most significant part e.g. "8" "hours"
		var prettyDuration = prettyDurationArray[0] + " " + prettyDurationArray[1];
		
		var larpiness = larpSlider.value / 100;
		var operationality = operationalitySlider.value / 100;
		
		//var feels = feelsSlider.value;
		//var scale = Math.pow(2, scaleSlider.value / 10); // For a slider from 0-40 i.e. 2^0 (1) to 2^4 (16)
		//var pointing = Math.pow(2, pointingSlider.value / 10); // For a slider from 0-40 i.e. 2^0 (1) to 2^4 (16)

		//var seconds = Math.round(Math.pow(secondsSlider.value / 100,5.6));
						
		const commafy = (x) => {
		  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		
		document.getElementById('playersOutput').innerHTML = commafy(players);
		
		// 5/7 hours is 18000-25000 seconds
		// a human lifetime is roughly 2,000,000,000 seconds
		//document.getElementById('secondsOutput').innerHTML = commafy(seconds);
		document.getElementById('secondsOutput').innerHTML = prettyDuration.toString();
		
		//document.getElementById('feelsOutput').innerHTML = (feelsPercent(feels));
		//document.getElementById('scaleOutput').innerHTML = (scalePercent(scale));// + "(" + scale + ")");
		//document.getElementById('pointingOutput').innerHTML = (pointingPercent(pointing));// + "(" + pointing + ")");
		
		document.getElementById('larpOutput').innerHTML = describeLarpiness(larpiness);
		document.getElementById('operationalityOutput').innerHTML = describeOperationality(operationality);
		
		
		var prefixes = ['','kilo','mega','giga', 'tera', 'peta', 'exa', 'zetta', 'yotta', 'kiloyotta', 'megayotta', 'gigayotta', 'terayotta', 'petayotta', 'exayotta', 'zettayotta', 'yottayotta', 'kiloyottayotta', 'megayottayotta'];
		
		prefixes[-1] = 'milli';
		prefixes[-2] = 'micro';
		prefixes[-3] = 'nano';
		prefixes[-4] = 'pico';
		prefixes[-5] = 'femto';
		prefixes[-6] = 'atto';
		prefixes[-7] = 'zepto';
		prefixes[-8] = 'yocto'; // ntbcw yotta which is BIG

		
		// femto, atto, zepto, yocto.
		
		// Calculate games
		//var games = players * hours * feels * scale * pointing;
		
		// USING GRAPHING CALCULATOR to link (1180800,1000000) and (14400,1) I derived: games = (playerSeconds/14400)^3.2975
		
		var playerSeconds = (players * seconds);
				
		const METRICGAMEWEIGHT = 14400;
		
		const UNIVERSALMEGAGAMECONSTANT = 3.135;
		
		var legitimacy = larpiness * operationality;
		
		// Calculate games in both "General" and fixed scientific notation
		var games = Math.pow((playerSeconds/METRICGAMEWEIGHT),(UNIVERSALMEGAGAMECONSTANT * legitimacy));
		console.log(":" + playerSeconds + "ps => " + playerSeconds/METRICGAMEWEIGHT + "^" + UNIVERSALMEGAGAMECONSTANT + " => games = " + games);
		
		var gamesScientific = games.toExponential(3);
		console.log(":: gamesScientific = " + gamesScientific);
	
		// Break result into coefficient and prefix		
		
		var gamesScientificCoefficient = gamesScientific.substring(0,5);
		console.log("gamesScientificCoefficient = " + gamesScientificCoefficient);
		
		// Convert exponent to prefix by dividing it by 3
		var gamesExponent = gamesScientific.substring(6);
		var gamesPrefixIndex = Math.floor(gamesExponent / 3); // Floor to ensure you get "100 games" not "0.1 kilogames" and "229 milligames" not "0.229 games"
		console.log("gamesPrefixIndex = " + gamesExponent + "/3 = " + gamesPrefixIndex);
		
		var gamesMetricCoefficient = games / Math.pow(10,3 * gamesPrefixIndex);
		console.log("gamesMetricCoefficient = " + gamesMetricCoefficient);
		
		
		// Find exponent e.g. a kilogame is +3
		
		//console.log("gamesExponent = " + gamesExponent);
		var gamesExponent = Math.round(games / Math.pow(10,3 * gamesPrefixIndex));
		
		var logGames = Math.floor(Math.log(games) * Math.LOG10E);
		var gamesPrefix = Math.floor(logGames/3);

		
		
		document.getElementById('gamesOutput').innerHTML = "You have designed " + Math.round(gamesMetricCoefficient) + " metric " + prefixes[gamesPrefixIndex] + "game" + pluralUnit(Math.round(gamesMetricCoefficient)); // + " (debug: " + games + ")";

	}
	
	function pluralUnit(n)
	{
		if (n != 1) {return "s";} else {return "";}
	}
	
	function feelsPercent(n) {
		if (n < 34) { return "Pawn to d4"; }
	else if (n < 67) { return "'We had a deal!'"; }
	else { return "Shedding real tears"; }
	}
	
	function describeLarpiness(n) {
		if (n > 0.50) { return "Not just a LARP"; } else { return "Just a LARP"; }
	}
	
	function describeOperationality(n) {
		if (n > 0.50) { return "Operational enough"; } else { return "Not Operational enough"; }
	}
	
	/*
	function scalePercent(n) {
	
	if (n < 1.5) { return "Personal"; }
		else if (n < 3) { return "Tactical"; }
		else if (n < 6) { return "Large-scale Tactical"; }
		else if (n < 12) { return "Operational"; }
		else { return "Grand Strategic"; }
	}
	
	function pointingPercent(n) {
	
	if (n < 1.5) { return "Once"; }
		else if (n < 3) { return "Limited"; }
		else if (n < 6) { return "Considerable"; }
		else if (n < 12) { return "Extensive"; }
		else { return "Ubiquitous"; }
	}
	*/
	
	function sigFigs(n, sig) {
		var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
		return Math.round(n * mult) / mult;
	}
	
  }

})(window, document, undefined);




