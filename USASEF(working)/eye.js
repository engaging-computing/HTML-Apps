document.addEventListener("DOMContentLoaded", init_picture, false);

function init_picture()
{
	var canvas = document.getElementById("world");
	canvas.addEventListener("mousedown", getCordinates, false);
}

function getCordinates(event)
{
	var canvas = document.getElementById("world");
	
	// Get X and Y values. Make the center 0,0 and everything else
	// between -180 and 180 (for x) and -90 and 90 (for y)
	var x = (event.x - canvas.offsetLeft) - 439;
	var y = (event.y - canvas.offsetTop) - 270;
	
	/* 	Note: the -439 and -270 are from the center of the page.
	   	I took (event.y - canvas.offsetTop) and saw what it was on the center
		of the page. This allows the X & Y to be centered - 0,0 is the middle
		of the page.	*/
	
	y = y * -1;		// Flip the sign.
	
	coord_x.innerHTML = x;
	coord_y.innerHTML = y;
	
	/*
		Formula for converting X & Y to lat & long
		Long = (360 / Map Width) * X
		Lat  = (180 / Map Height) * Y
	*/
	var long = (360 / 872) * x;
	var lat  = (180 / 533) * y; 
	
	// Update HTML page to show correct Lat/Long
	GPS_LONG.innerHTML = long;
	GPS_LAT.innerHTML = lat;
	
	// Get eye color that user selected.
	var color = document.getElementById("");
	
	// Get current time - used for timestamp & also to make title different for each
	// data set.
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
	
	// iSENSE
	var upload = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
			'2704': [lat],
			'2705': [long],
			'2706': []
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = 'TEST ' + timestamp;
	
	// Post to iSENSEPROJECT	
	$.post(
		'http://isenseproject.org/api/v1/projects/567/jsonDataUpload',
		upload
	);
}
