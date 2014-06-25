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
	
	var test1 = canvas.offsetLeft;
	var test2 = canvas.offsetTop;
	
	console.log("Looks like left is: " + test1 + " and " + test2);
	
	/* 	
		678.5
		314
		if(x < 678.5)
			x = 
		
		566
		
		
	*/
	
	console.log("x: " + x + "  y: " + y);
	
	coord_x.innerHTML = x;
	coord_y.innerHTML = y;
	
	// Figure out how to convert coordinates to GPS?
	/*
		One formula to try is:
		Long = (360 / Map Width) * X
		Lat = (180 / Map Height) * Y
	*/
	var long = (360 /  628) * x;
	var lat  = (180 / 1357) * y; 
	
	GPS_LONG.innerHTML = long;
	GPS_LAT.innerHTML = lat;
}
