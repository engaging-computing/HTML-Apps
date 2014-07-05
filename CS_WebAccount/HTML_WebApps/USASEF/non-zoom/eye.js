document.addEventListener("DOMContentLoaded", check_photo, false);

function check_photo()
{
	var canvas = document.getElementById("world");
	canvas.addEventListener("mousedown", getCoords, false);
}

function getCoords(event)
{
	var canvas = document.getElementById("world");
	
	/*  Get x & y coordinates. NOTE: the numbers 500 and 249 are to center
		the x & y coordinates on the center of the map. I also change the sign
		of the y coordinate for converting it to lat and long.	*/
	var x = (event.x - canvas.offsetLeft) - 500;
	var y = (event.y - canvas.offsetTop)  - 249;
	y = y * -1;
	
	// Update the HTML file.
	coord_x.innerHTML = x;
	coord_y.innerHTML = y;
	
	/*	Convert x & y to Lat & Long
		Long = (360 / Map Width)  * X
		Lat  = (180 / Map Height) * Y		*/
	var long = (360 / 1000) * x;
	var lat  = (180 /  500) * y; 
	
	// Round the lat & long
	var long_round, lat_round;
	long_round = long.toFixed(2);
	 lat_round = lat.toFixed(2);
	
	// Update HTML page to show current Lat/Long
	GPS_LONG.innerHTML = long_round;
	GPS_LAT.innerHTML  = lat_round;
	
	// Get eye color that user selected.
	var c = document.getElementById("eye_color");
	var color = c.options[c.selectedIndex].text;
	
	/* Get current time - used for timestamp & 
	   also to make title different for each data set. */
	var currentTime = new Date();
	var timestamp = JSON.stringify(currentTime);
	
	// Data to be uploaded to iSENSE
	var upload = {
		'email': 'j@j.j',
		'password': 'j',
		'title': [],
		'data':
	  	{
			'2704': [lat],
			'2705': [long],
			'2706': [color]
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = 'Test ' + timestamp;
	
	var reply;
	
	if(confirm("Do you want to upload this data to iSENSE?")) 
	{
		$.post(
			'http://isenseproject.org/api/v1/projects/567/jsonDataUpload',
			upload
		);
		reply = "Uploaded to iSENSE";
	}
	else {
		reply = "Canceled!";
	}
	
	RES.innerHTML = reply;
}
