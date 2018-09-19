
(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	
	var playersSlider = document.getElementById('playersRange');
	var secondsSlider = document.getElementById('secondsRange');
	
	var larpSlider = document.getElementById('larpRange');
	var operationalitySlider = document.getElementById('operationalityRange');
	
	// Update UI when sliders are touched
	playersSlider.oninput = function() { redraw(); };
	secondsSlider.oninput = function() { redraw(); };
	larpSlider.oninput = function() { redraw(); };
	operationalitySlider.oninput = function() { redraw(); };
	
	redraw();
	
	// Inner function... redraw the UI
	function redraw() {
		
		// Get updated values
		
		// The population of earth is about 100^4.95 but this isn't a flat enough curve
		// Dividing the % first gives lower values for a flatter beginning
		
		var players = -1 + Math.ceil(playersSlider.value) + Math.ceil(Math.pow(playersSlider.value / 10,9.871));
		
		var seconds = sigFigs(Math.floor(Math.pow(secondsSlider.value,4.675)),1);
		console.log("seconds = " + seconds);		
		
		// use the prettyMs library to build an array that looks like ["8", "hours", "20", "minutes"]
		var prettyDurationArray = (prettyMs(seconds * 1000, {verbose: true})).split(' ');

		// Take only the most significant part e.g. "8" "hours"
		var prettyDuration = prettyDurationArray[0] + " " + prettyDurationArray[1];
		
		// These are just fractions 0 - 1
		var larpiness = larpSlider.value / 100;
		var operationality = operationalitySlider.value / 100;
		
		const commafy = (x) => {
		  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		
		document.getElementById('playersOutput').innerHTML = commafy(players);
		
		// 5/7 hours is 18000-25000 seconds
		// a human lifetime is roughly 2,000,000,000 seconds
		document.getElementById('secondsOutput').innerHTML = prettyDuration.toString();
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
		prefixes[-8] = 'yocto'; // not to be confused with yotta
		
		// Calculate games
		
		// USING a graphing calculator to find a curve that fits both (1180800,1000000) and (14400,1) 
		//  I derived: games = (playerSeconds/14400)^3.2975
		
		var playerSeconds = (players * seconds);
				
		const METRICGAMEWEIGHT = 14400;
		
		const UNIVERSALMEGAGAMECONSTANT = 3.135;
		
		var legitimacy = larpiness * operationality;
		
		// Calculate games in both "General" and fixed scientific notation
		var games = Math.pow((playerSeconds/METRICGAMEWEIGHT),(UNIVERSALMEGAGAMECONSTANT * legitimacy));
		//console.log(":" + playerSeconds + "ps => " + playerSeconds/METRICGAMEWEIGHT + "^" + UNIVERSALMEGAGAMECONSTANT + " => games = " + games);
		
		var gamesScientific = games.toExponential(3);
		//console.log(":: gamesScientific = " + gamesScientific);
	
		// Break result into coefficient and prefix		
		
		var gamesScientificCoefficient = gamesScientific.substring(0,5);
		//console.log("gamesScientificCoefficient = " + gamesScientificCoefficient);
		
		// Convert exponent to prefix by dividing it by 3
		var gamesExponent = gamesScientific.substring(6);
		var gamesPrefixIndex = Math.floor(gamesExponent / 3); // Floor to ensure you get "100 games" not "0.1 kilogames" and "229 milligames" not "0.229 games"
		//console.log("gamesPrefixIndex = " + gamesExponent + "/3 = " + gamesPrefixIndex);
		
		var gamesMetricCoefficient = games / Math.pow(10,3 * gamesPrefixIndex);
		//console.log("gamesMetricCoefficient = " + gamesMetricCoefficient);
		
		
		// Find exponent e.g. a kilogame is +3
		
		//console.log("gamesExponent = " + gamesExponent);
		
		var gamesExponent = Math.round(games / Math.pow(10,3 * gamesPrefixIndex));
		
		// Work out the prefix
		var logGames = Math.floor(Math.log(games) * Math.LOG10E);
		var gamesPrefix = Math.floor(logGames/3);
		
		// Update the final result
		document.getElementById('gamesOutput').innerHTML = "You have designed " + Math.round(gamesMetricCoefficient) + " metric " + prefixes[gamesPrefixIndex] + "game" + pluralUnit(Math.round(gamesMetricCoefficient)); // + " (debug: " + games + ")";

	}
	
	// "1 megagame, 2 megagames"
	function pluralUnit(n)
	{
		if (n != 1) {return "s";} else {return "";}
	}
	
	function describeLarpiness(n) {
		if (n > 0.50) { return "Not just a LARP"; } else { return "Just a LARP"; }
	}
	
	function describeOperationality(n) {
		if (n > 0.50) { return "Operational enough"; } else { return "Not Operational enough"; }
	}
	
	// Returns n rounded to sig significant figures e.g. 1234 to 2 sf becomes 1200
	function sigFigs(n, sig) {
		var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
		return Math.round(n * mult) / mult;
	}
	
  }

})(window, document, undefined);




