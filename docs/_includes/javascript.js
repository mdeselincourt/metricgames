
(function(window, document, undefined){

// code that should be taken care of right away

window.onload = init;

  function init(){
    // the code to be called when the dom has loaded
    // #document has its nodes
	
	var playersSlider = document.getElementById('playersRange');
	var hoursSlider = document.getElementById('hoursRange');
	var feelsSlider = document.getElementById('feelsRange');
	
	// Update UI when sliders are touched
	playersSlider.oninput = function() { redraw(); };
	hoursSlider.oninput = function() { redraw(); };
	feelsSlider.oninput = function() { redraw(); };

	var playersSliderVal = document.getElementById('playersRange').value;

	var players = playersSliderVal;
	
	// Inner function... redraw the UI
	function redraw() {
		
		// Get updated values
		
		var players = playersSlider.value;
		var hours = hoursSlider.value;
		var feels = feelsSlider.value;
		
		document.getElementById('playersOutput').innerHTML = (Math.round(100 * Math.pow(playersSlider.value / 100,5)));
		document.getElementById('hoursOutput').innerHTML = (hoursSlider.value);
		document.getElementById('feelsOutput').innerHTML = (feelsSlider.value / 10);
		
		
		var games = players * hours * ((feels-5)*(feels-5));
		
		document.getElementById('gamesOutput').innerHTML = (games + " metric " + " games");
	}
	
  }

})(window, document, undefined);




