document.addEventListener("DOMContentLoaded", init, false);

function init()
{
	var canvas = document.getElementById("world");
	canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event)
{
	var canvas = document.getElementById("world");

	var x = event.x - canvas.offsetLeft;
	var y = event.y - canvas.offsetTop;

	console.log("x: " + x + "  y: " + y);
	
	coord_x.innerHTML = x;
	coord_y.innerHTML = y;
	
	// Figure out how to convert coordinates to GPS?
	GPS_X.innerHTML = "xx";
	GPS_Y.innerHTML = "xx";
}
