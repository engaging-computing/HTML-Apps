document.addEventListener("DOMContentLoaded", init, false);

function init()
{
	var canvas = document.getElementById("world");
	canvas.addEventListener("mousedown", getPosition, false);
}

function getPosition(event)
{
	var canvas = document.getElementById("world");

	var x = (event.x - canvas.offsetLeft) - 439;
	//x = x * -1;
	var y = (event.y - canvas.offsetTop) - 270;
	y = y * -1;
	
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
			'2706': ['blue']
	 	}
	}
	
	// Modify this title to be the dataset name
	upload.title = 'TEST' + timestamp;
	
	// Post to iSENSEPROJECT
	$.post(
		'http://isenseproject.org/api/v1/projects/567/jsonDataUpload',
		upload
	);
}
