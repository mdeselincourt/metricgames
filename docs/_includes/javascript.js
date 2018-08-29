


	var playersSlider = document.getElementById('playersRange');

	playersSlider.oninput = function() { redraw(); };

	var playersSliderVal = document.getElementById('playersRange').value;

	var players = playersSliderVal;



function redraw() {
	document.getElementById('javascriptDomTarget').innerHTML = (playersSlider.value);
}